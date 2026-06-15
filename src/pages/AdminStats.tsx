import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Eye, Activity, Globe, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";

type PageEvent = {
  id: string;
  user_id: string | null;
  session_id: string;
  path: string;
  language: string | null;
  created_at: string;
};

type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
};

type Submission = {
  user_id: string;
  status: string;
  created_at: string;
};

export default function AdminStats() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const navigate = useNavigate();

  const [events, setEvents] = useState<PageEvent[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<7 | 30 | 90>(30);

  useEffect(() => {
    if (!isAdmin) return;
    let active = true;
    (async () => {
      setLoading(true);
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
      const [evRes, prRes, subRes] = await Promise.all([
        supabase
          .from("page_events")
          .select("id,user_id,session_id,path,language,created_at")
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(5000),
        supabase
          .from("profiles")
          .select("id,email,display_name,created_at")
          .order("created_at", { ascending: false }),
        supabase
          .from("bloc_submissions")
          .select("user_id,status,created_at"),
      ]);
      if (!active) return;
      setEvents((evRes.data ?? []) as PageEvent[]);
      setProfiles((prRes.data ?? []) as Profile[]);
      setSubmissions((subRes.data ?? []) as Submission[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [isAdmin, days]);

  const stats = useMemo(() => {
    const sessions = new Set(events.map((e) => e.session_id));
    const loggedSessions = new Set(events.filter((e) => e.user_id).map((e) => e.session_id));
    const pathCount = new Map<string, number>();
    const byDay = new Map<string, number>();
    const langCount = new Map<string, number>();
    for (const e of events) {
      pathCount.set(e.path, (pathCount.get(e.path) ?? 0) + 1);
      const day = e.created_at.slice(0, 10);
      byDay.set(day, (byDay.get(day) ?? 0) + 1);
      const lang = (e.language ?? "?").split("-")[0];
      langCount.set(lang, (langCount.get(lang) ?? 0) + 1);
    }
    const topPaths = [...pathCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15);
    const topLangs = [...langCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    const daily = [...byDay.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    return {
      visits: events.length,
      uniqueSessions: sessions.size,
      loggedSessions: loggedSessions.size,
      topPaths,
      topLangs,
      daily,
    };
  }, [events]);

  const userActivity = useMemo(() => {
    return profiles
      .map((p) => {
        const userEvents = events.filter((e) => e.user_id === p.id);
        const userSubs = submissions.filter((s) => s.user_id === p.id);
        const last = userEvents[0]?.created_at ?? null;
        return {
          ...p,
          visits: userEvents.length,
          lastSeen: last,
          submissions: userSubs.length,
          approved: userSubs.filter((s) => s.status === "approved").length,
          pending: userSubs.filter((s) => s.status === "pending").length,
        };
      })
      .sort((a, b) => {
        if (a.lastSeen && b.lastSeen) return b.lastSeen.localeCompare(a.lastSeen);
        if (a.lastSeen) return -1;
        if (b.lastSeen) return 1;
        return b.created_at.localeCompare(a.created_at);
      });
  }, [profiles, events, submissions]);

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
        <Link to="/" className="text-primary underline">Tornar a l'inici</Link>
      </div>
    );
  }

  const maxDaily = Math.max(1, ...stats.daily.map(([, n]) => n));
  const maxPath = stats.topPaths[0]?.[1] ?? 1;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold">📊 Estadístiques d'ús</h1>
            <p className="text-xs text-muted-foreground">Qui es connecta, què visita i quan</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" /> Panell
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <div className="flex gap-2">
          {([7, 30, 90] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                days === d ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              Últims {d} dies
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-muted-foreground">Carregant dades…</p>
        ) : (
          <>
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={<Eye className="w-5 h-5" />} label="Visites totals" value={stats.visits} />
              <StatCard icon={<Activity className="w-5 h-5" />} label="Sessions úniques" value={stats.uniqueSessions} />
              <StatCard icon={<Users className="w-5 h-5" />} label="Usuaris registrats" value={profiles.length} />
              <StatCard icon={<Users className="w-5 h-5" />} label="Sessions amb login" value={stats.loggedSessions} />
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold mb-4">Visites per dia</h2>
              {stats.daily.length === 0 ? (
                <p className="text-sm text-muted-foreground">Encara no hi ha dades.</p>
              ) : (
                <div className="flex items-end gap-1 h-40">
                  {stats.daily.map(([day, n]) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1" title={`${day}: ${n}`}>
                      <div
                        className="w-full bg-primary rounded-t"
                        style={{ height: `${(n / maxDaily) * 100}%`, minHeight: "2px" }}
                      />
                      <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                        {day.slice(5)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-bold mb-4">Pàgines més visitades</h2>
                {stats.topPaths.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Sense dades.</p>
                ) : (
                  <ul className="space-y-2">
                    {stats.topPaths.map(([path, n]) => (
                      <li key={path} className="text-sm">
                        <div className="flex justify-between gap-2 mb-1">
                          <span className="font-mono truncate">{path}</span>
                          <span className="font-bold tabular-nums">{n}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded">
                          <div className="h-full bg-primary rounded" style={{ width: `${(n / maxPath) * 100}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5" /> Idiomes del navegador
                </h2>
                {stats.topLangs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Sense dades.</p>
                ) : (
                  <ul className="space-y-2">
                    {stats.topLangs.map(([lang, n]) => (
                      <li key={lang} className="flex justify-between text-sm">
                        <span className="font-mono">{lang}</span>
                        <span className="font-bold tabular-nums">{n}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold mb-4">Usuaris registrats ({profiles.length})</h2>
              {userActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground">Cap usuari registrat.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase">
                        <th className="py-2 pr-3">Email</th>
                        <th className="py-2 pr-3">Alta</th>
                        <th className="py-2 pr-3">Última visita</th>
                        <th className="py-2 pr-3 text-right">Visites</th>
                        <th className="py-2 pr-3 text-right">Aportacions</th>
                        <th className="py-2 pr-3 text-right">Aprovades</th>
                        <th className="py-2 text-right">Pendents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userActivity.map((u) => (
                        <tr key={u.id} className="border-b border-border/50">
                          <td className="py-2 pr-3 font-medium">{u.email ?? u.display_name ?? u.id.slice(0, 8)}</td>
                          <td className="py-2 pr-3 text-muted-foreground">
                            {new Date(u.created_at).toLocaleDateString("ca-ES")}
                          </td>
                          <td className="py-2 pr-3 text-muted-foreground">
                            {u.lastSeen ? new Date(u.lastSeen).toLocaleString("ca-ES") : "—"}
                          </td>
                          <td className="py-2 pr-3 text-right tabular-nums">{u.visits}</td>
                          <td className="py-2 pr-3 text-right tabular-nums">{u.submissions}</td>
                          <td className="py-2 pr-3 text-right tabular-nums text-green-600">{u.approved}</td>
                          <td className="py-2 text-right tabular-nums text-amber-600">{u.pending}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-3xl font-extrabold tabular-nums">{value.toLocaleString("ca-ES")}</div>
    </div>
  );
}
