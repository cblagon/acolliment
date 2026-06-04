import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Bloc, Level } from "@/data/blocksData";
import { useAuth } from "./useAuth";

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface BlocSubmission {
  id: string;
  user_id: string;
  bloc_id: string;
  level: Level;
  nom: string;
  emoji: string | null;
  color: string | null;
  data: { fitxes: Bloc["fitxes"] };
  status: SubmissionStatus;
  review_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export function submissionToBloc(s: BlocSubmission): Bloc {
  return {
    id: s.id,
    nom: s.nom,
    emoji: s.emoji ?? "📦",
    color: s.color ?? "bg-primary",
    level: s.level,
    fitxes: s.data.fitxes ?? [],
  };
}

export function useBlocSubmissions() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<BlocSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    // RLS handles filtering: approved for all + own pending/rejected for author + all for admins
    const { data, error } = await supabase
      .from("bloc_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setSubmissions(data as unknown as BlocSubmission[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh, user?.id]);

  const submit = useCallback(
    async (bloc: Bloc) => {
      if (!user) throw new Error("not authenticated");
      const { error } = await supabase.from("bloc_submissions").insert({
        user_id: user.id,
        bloc_id: bloc.id,
        level: bloc.level,
        nom: bloc.nom,
        emoji: bloc.emoji,
        color: bloc.color,
        data: { fitxes: bloc.fitxes },
        status: "pending",
      });
      if (error) throw error;
      await refresh();
    },
    [user, refresh]
  );

  const updateStatus = useCallback(
    async (id: string, status: SubmissionStatus, notes?: string) => {
      const { error } = await supabase
        .from("bloc_submissions")
        .update({
          status,
          review_notes: notes ?? null,
          reviewed_by: user?.id ?? null,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
      await refresh();
    },
    [user, refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("bloc_submissions").delete().eq("id", id);
      if (error) throw error;
      await refresh();
    },
    [refresh]
  );

  return { submissions, loading, refresh, submit, updateStatus, remove };
}
