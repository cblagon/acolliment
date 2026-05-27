import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const NAMESPACE = "acolliment-lovable";
const KEY = "visits";
const SESSION_FLAG = "apren-visit-counted";

export const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem(SESSION_FLAG) === "1";
    const endpoint = alreadyCounted
      ? `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/`
      : `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`;

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        if (typeof data?.count === "number") {
          setCount(data.count);
          if (!alreadyCounted) sessionStorage.setItem(SESSION_FLAG, "1");
        }
      })
      .catch(() => {
        // silent fail — counter is non-critical
      });
  }, []);

  if (count === null) return null;

  return (
    <div
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-semibold"
      title="Visitants totals"
    >
      <Eye className="w-4 h-4 text-primary" />
      <span>{count.toLocaleString()}</span>
    </div>
  );
};
