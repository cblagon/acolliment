import { supabase } from "@/integrations/supabase/client";

type Task<T> = () => Promise<T>;

const queue: Array<() => void> = [];
let active = 0;
const MAX_CONCURRENT = 2;

function next() {
  if (active >= MAX_CONCURRENT) return;
  const job = queue.shift();
  if (!job) return;
  active++;
  job();
}

function enqueue<T>(task: Task<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    queue.push(() => {
      task()
        .then(resolve, reject)
        .finally(() => {
          active--;
          next();
        });
    });
    next();
  });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function isRateLimited(error: unknown, data: unknown): boolean {
  const msg = (error as { message?: string } | null)?.message ?? "";
  const ctxStatus = (error as { context?: { status?: number } } | null)?.context?.status;
  const dataErr = (data as { error?: string } | null)?.error ?? "";
  return (
    ctxStatus === 429 ||
    /429|massa peticions|rate limit/i.test(msg) ||
    /massa peticions|rate limit/i.test(dataErr)
  );
}

/**
 * Invokes an edge function through a global queue (max 2 concurrent)
 * with bounded exponential backoff on 429 responses.
 */
export async function invokeQueued<T = unknown>(
  fn: string,
  body: unknown,
  maxRetries = 4,
): Promise<T> {
  return enqueue(async () => {
    let delay = 1200;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const { data, error } = await supabase.functions.invoke(fn, { body });
      if (!error && !(data as { error?: string } | null)?.error) return data as T;
      if (isRateLimited(error, data) && attempt < maxRetries) {
        await sleep(delay + Math.random() * 400);
        delay = Math.min(delay * 2, 10000);
        continue;
      }
      throw new Error(
        (data as { error?: string } | null)?.error ||
          (error as { message?: string } | null)?.message ||
          "Error de traducció",
      );
    }
    throw new Error("Error de traducció");
  });
}

/** Runs a task through the same global queue (max 2 concurrent). */
export function runQueued<T>(task: () => Promise<T>): Promise<T> {
  return enqueue(task);
}
