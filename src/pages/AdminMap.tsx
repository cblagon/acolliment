import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, MapPin } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";

type Row = {
  centre: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
  session_id: string;
};

export default function AdminMap() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const navigate = useNavigate();

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<7 | 30 | 90 | 365>(90);

  useEffect(() => {
    if (!isAdmin) return;
    let active = true;
    (async () => {
      setLoading(true);
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
      const { data } = await supabase
        .from("page_events")
        .select("centre,city,region,country,lat,lng,session_id")
        .gte("created_at", since)
        .limit(10000);
      if (!active) return;
      setRows((data ?? []) as Row[]);
      setLoading(false);
    })();
    return () => { active = false; };
  }, [isAdmin, days]);

  const points = useMemo(() => {
    const map = new Map<string, { lat: number; lng: number; city: string; country: string; sessions: Set<string>; centres: Map<string, number> }>();
    for (const r of rows) {
      if (r.lat == null || r.lng == null) continue;
      const key = `${r.lat.toFixed(2)}_${r.lng.toFixed(2)}`;
      let entry = map.get(key);
      if (!entry) {
        entry = {
          lat: r.lat,
          lng: r.lng,
          city: r.city ?? "—",
          country: r.country ?? "",
          sessions: new Set(),
          centres: new Map(),
        };
        map.set(key, entry);
      }
      entry.sessions.add(r.session_id);
      if (r.centre) entry.centres.set(r.centre, (entry.centres.get(r.centre) ?? 0) + 1);
    }
    return [...map.values()];
  }, [rows]);

  const centresList = useMemo(() => {
    const m = new Map<string, { sessions: Set<string>; city: string | null; country: string | null }>();
    for (const r of rows) {
      if (!r.centre) continue;
      let e = m.get(r.centre);
      if (!e) { e = { sessions: new Set(), city: r.city, country: r.country }; m.set(r.centre, e); }
      e.sessions.add(r.session_id);
    }
    return [...m.entries()]
      .map(([centre, v]) => ({ centre, sessions: v.sessions.size, city: v.city, country: v.country }))
      .sort((a, b) => b.sessions - a.sessions);
  }, [rows]);

  if (authLoading || adminLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregant…</div>;
  }
  if (!user) { navigate("/auth"); return null; }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-2xl font-bold">Accés restringit</h1>
        <Link to="/" className="text-primary underline">Tornar a l'inici</Link>
      </div>
    );
  }

  const maxSessions = Math.max(1, ...points.map((p) => p.sessions.size));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold flex items-center gap-2"><MapPin className="w-6 h-6 text-primary" /> Mapa de visites</h1>
            <p className="text-xs text-muted-foreground">D'on es connecten les persones que visiten el web</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link to="/admin/stats" className="text-sm font-semibold text-primary hover:underline">📊 Estadístiques</Link>
            <Link to="/admin" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" /> Panell
            </Link>
            <button
              onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}
              className="flex items-center gap-1 text-sm font-semibold text-destructive hover:underline"
              title="Tancar sessió"
            >
              <LogOut className="w-4 h-4" /> Sortir
            </button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <div className="flex gap-2 flex-wrap">
          {([7, 30, 90, 365] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                days === d ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              {d === 365 ? "Últim any" : `Últims ${d} dies`}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-muted-foreground">Carregant mapa…</p>
        ) : (
          <>
            <div className="rounded-2xl overflow-hidden border border-border" style={{ height: "60vh", minHeight: 380 }}>
              <MapContainer
                center={[41.6, 1.7]}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {points.map((p, i) => {
                  const sessions = p.sessions.size;
                  const radius = 6 + Math.round((sessions / maxSessions) * 18);
                  return (
                    <CircleMarker
                      key={i}
                      center={[p.lat, p.lng]}
                      radius={radius}
                      pathOptions={{ color: "hsl(var(--primary))", fillColor: "hsl(var(--primary))", fillOpacity: 0.45, weight: 2 }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <div className="font-bold">{p.city}{p.country ? `, ${p.country}` : ""}</div>
                          <div>{sessions} {sessions === 1 ? "sessió única" : "sessions úniques"}</div>
                          {p.centres.size > 0 && (
                            <div className="mt-1">
                              <div className="font-semibold">Centres:</div>
                              <ul className="list-disc pl-4">
                                {[...p.centres.entries()].map(([c, n]) => (
                                  <li key={c}>{c} ({n})</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            </div>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold mb-4">Centres educatius ({centresList.length})</h2>
              {centresList.length === 0 ? (
                <p className="text-sm text-muted-foreground">Encara cap usuari ha indicat el seu centre.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase">
                        <th className="py-2 pr-3">Centre</th>
                        <th className="py-2 pr-3">Ciutat</th>
                        <th className="py-2 pr-3">País</th>
                        <th className="py-2 text-right">Sessions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {centresList.map((c) => (
                        <tr key={c.centre} className="border-b border-border/50">
                          <td className="py-2 pr-3 font-medium">{c.centre}</td>
                          <td className="py-2 pr-3 text-muted-foreground">{c.city ?? "—"}</td>
                          <td className="py-2 pr-3 text-muted-foreground">{c.country ?? "—"}</td>
                          <td className="py-2 text-right tabular-nums">{c.sessions}</td>
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
