import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useBlocSubmissions, submissionToBloc } from "@/hooks/useBlocSubmissions";
import { FitxaViewer } from "@/components/FitxaViewer";
import { useLanguages } from "@/hooks/useLanguage";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Trash2, ArrowLeft, Eye } from "lucide-react";

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-300",
  approved: "bg-green-100 text-green-800 border-green-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
};

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const { submissions, loading, updateStatus, remove } = useBlocSubmissions();
  const { targetLang, helpLang } = useLanguages();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [previewId, setPreviewId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? submissions : submissions.filter((s) => s.status === filter)),
    [submissions, filter]
  );
  const previewSub = submissions.find((s) => s.id === previewId);

  if (authLoading || adminLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregant…</div>;
  }
  if (!user) {
    navigate("/auth");
    return null;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-2xl font-bold">Accés restringit</h1>
        <p className="text-muted-foreground">Aquesta secció és només per a l'administradora del web.</p>
        <Link to="/" className="text-primary underline">Tornar a l'inici</Link>
      </div>
    );
  }

  if (previewSub) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-6">
          <button
            onClick={() => setPreviewId(null)}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Tornar al panell
          </button>
          <FitxaViewer
            bloc={submissionToBloc(previewSub)}
            targetLang={targetLang}
            helpLang={helpLang}
            onBack={() => setPreviewId(null)}
            onStartQuiz={() => {}}
            onStartSongs={() => {}}
          />
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button
              onClick={async () => {
                try { await updateStatus(previewSub.id, "approved"); toast.success("Aprovat"); setPreviewId(null); }
                catch (e: any) { toast.error(e.message); }
              }}
              className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
            >
              ✅ Aprovar
            </button>
            <button
              onClick={async () => {
                const notes = window.prompt("Motiu del rebuig (opcional):") ?? undefined;
                try { await updateStatus(previewSub.id, "rejected", notes); toast.success("Rebutjat"); setPreviewId(null); }
                catch (e: any) { toast.error(e.message); }
              }}
              className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700"
            >
              ❌ Rebutjar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold">🛡️ Panell d'administració</h1>
            <p className="text-xs text-muted-foreground">Modera les aportacions dels usuaris</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/stats" className="text-sm font-semibold text-primary hover:underline">📊 Estadístiques</Link>
            <Link to="/" className="text-sm font-semibold text-primary hover:underline">← Inici</Link>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        <div className="flex gap-2 flex-wrap">
          {(["pending", "approved", "rejected", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              {f === "pending" && "⏳ Pendents"}
              {f === "approved" && "✅ Aprovats"}
              {f === "rejected" && "❌ Rebutjats"}
              {f === "all" && "📋 Tots"}
              {" "}({f === "all" ? submissions.length : submissions.filter((s) => s.status === f).length})
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-muted-foreground">Carregant aportacions…</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">No hi ha aportacions {filter !== "all" ? `(${filter})` : ""}.</p>
        ) : (
          <div className="grid gap-3">
            {filtered.map((s) => (
              <div key={s.id} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4 flex-wrap">
                <span className="text-3xl">{s.emoji}</span>
                <div className="flex-1 min-w-[200px]">
                  <div className="font-bold">{s.nom}</div>
                  <div className="text-xs text-muted-foreground">
                    Nivell {s.level} · {(s.data?.fitxes?.length ?? 0)} fitxes · {new Date(s.created_at).toLocaleDateString("ca-ES")}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full border text-xs font-bold ${statusColor[s.status]}`}>
                  {s.status === "pending" ? "Pendent" : s.status === "approved" ? "Aprovat" : "Rebutjat"}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setPreviewId(s.id)} title="Veure" className="p-2 rounded-lg bg-muted hover:bg-muted/70">
                    <Eye className="w-4 h-4" />
                  </button>
                  {s.status !== "approved" && (
                    <button
                      onClick={async () => { try { await updateStatus(s.id, "approved"); toast.success("Aprovat"); } catch (e: any) { toast.error(e.message); } }}
                      title="Aprovar"
                      className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  {s.status !== "rejected" && (
                    <button
                      onClick={async () => {
                        const notes = window.prompt("Motiu del rebuig (opcional):") ?? undefined;
                        try { await updateStatus(s.id, "rejected", notes); toast.success("Rebutjat"); } catch (e: any) { toast.error(e.message); }
                      }}
                      title="Rebutjar"
                      className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={async () => {
                      if (!window.confirm("Esborrar definitivament aquesta aportació?")) return;
                      try { await remove(s.id); toast.success("Esborrat"); } catch (e: any) { toast.error(e.message); }
                    }}
                    title="Esborrar"
                    className="p-2 rounded-lg bg-muted hover:bg-red-100 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
