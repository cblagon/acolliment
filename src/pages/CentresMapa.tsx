import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, School, Trash2 } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { toast } from "sonner";

type CentreVisit = {
  id: string;
  centre: string;
  city: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
};

async function geocode(query: string): Promise<{ lat: number; lng: number; display_name: string } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers: { "Accept-Language": "ca" } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      display_name: data[0].display_name,
    };
  } catch {
    return null;
  }
}

export default function CentresMapa() {
  const { isAdmin } = useIsAdmin();
  const [visits, setVisits] = useState<CentreVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [centre, setCentre] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("centre_visits")
      .select("id,centre,city,country,lat,lng,created_at")
      .order("created_at", { ascending: false })
      .limit(2000);
    setVisits((data ?? []) as CentreVisit[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const c = centre.trim();
    if (c.length < 2) { toast.error("Escriu el nom del centre."); return; }
    setSubmitting(true);
    try {
      const query = [c, city.trim(), country.trim()].filter(Boolean).join(", ");
      const geo = await geocode(query);
      if (!geo) {
        const fallback = await geocode([city.trim(), country.trim()].filter(Boolean).join(", "));
        if (!fallback) {
          toast.error("No hem pogut trobar la ubicació. Prova d'afegir la ciutat.");
          setSubmitting(false);
          return;
        }
        geo.lat = fallback.lat; geo.lng = fallback.lng;
      }
      const { error } = await supabase.from("centre_visits").insert({
        centre: c.slice(0, 120),
        city: city.trim().slice(0, 120) || null,
        country: country.trim().slice(0, 120) || null,
        lat: geo.lat,
        lng: geo.lng,
      });
      if (error) throw error;
      toast.success("Gràcies per dir-nos d'on vens! 💛");
      setCentre(""); setCity(""); setCountry("");
      load();
    } catch (e: any) {
      toast.error(e.message ?? "Error en desar");
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Esborrar aquesta entrada?")) return;
    const { error } = await supabase.from("centre_visits").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Esborrat"); load(); }
  };

  const points = useMemo(() => {
    const m = new Map<string, { lat: number; lng: number; entries: CentreVisit[] }>();
    for (const v of visits) {
      if (v.lat == null || v.lng == null) continue;
      const key = `${v.lat.toFixed(3)}_${v.lng.toFixed(3)}`;
      let e = m.get(key);
      if (!e) { e = { lat: v.lat, lng: v.lng, entries: [] }; m.set(key, e); }
      e.entries.push(v);
    }
    return [...m.values()];
  }, [visits]);

  const maxCount = Math.max(1, ...points.map((p) => p.entries.length));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" /> D'on ens visiten
            </h1>
            <p className="text-xs text-muted-foreground">Comparteix el teu centre i mira el mapa de la comunitat</p>
          </div>
          <Link to="/" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Tornar
          </Link>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <section className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <School className="w-7 h-7 text-primary" />
            <div>
              <h2 className="font-extrabold text-lg">Des de quin centre ens visites? 🏫</h2>
              <p className="text-sm text-muted-foreground">
                Ens encantaria saber on arriba aquest projecte. Pots afegir el teu centre encara que no estiguis registrat.
              </p>
            </div>
          </div>
          <form onSubmit={submit} className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
            <input
              type="text"
              value={centre}
              onChange={(e) => setCentre(e.target.value)}
              placeholder="Nom del centre (institut, escola…)"
              maxLength={120}
              required
              className="rounded-xl border-2 border-border px-3 py-2 bg-background focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ciutat"
              maxLength={120}
              className="rounded-xl border-2 border-border px-3 py-2 bg-background focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="País"
              maxLength={120}
              className="rounded-xl border-2 border-border px-3 py-2 bg-background focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold shadow hover:shadow-md transition-all disabled:opacity-60"
            >
              {submitting ? "Desant…" : "Afegir al mapa"}
            </button>
          </form>
        </section>

        <div className="rounded-2xl overflow-hidden border border-border" style={{ height: "60vh", minHeight: 380 }}>
          <MapContainer center={[41.6, 1.7]} zoom={4} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points.map((p, i) => {
              const radius = 8 + Math.round((p.entries.length / maxCount) * 14);
              return (
                <CircleMarker
                  key={i}
                  center={[p.lat, p.lng]}
                  radius={radius}
                  pathOptions={{ color: "hsl(24, 95%, 53%)", fillColor: "hsl(24, 95%, 53%)", fillOpacity: 0.5, weight: 2 }}
                >
                  <Popup>
                    <div className="text-sm space-y-1">
                      {p.entries.slice(0, 12).map((e) => (
                        <div key={e.id} className="flex items-center gap-2">
                          <span className="font-semibold">{e.centre}</span>
                          {e.city && <span className="text-muted-foreground">· {e.city}</span>}
                        </div>
                      ))}
                      {p.entries.length > 12 && (
                        <div className="text-xs text-muted-foreground">i {p.entries.length - 12} més…</div>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold mb-4">Centres que ens visiten ({visits.length})</h2>
          {loading ? (
            <p className="text-sm text-muted-foreground">Carregant…</p>
          ) : visits.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sigues el primer a afegir el teu centre!</p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2">
              {visits.map((v) => (
                <li key={v.id} className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2">
                  <School className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{v.centre}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {[v.city, v.country].filter(Boolean).join(" · ") || "—"}
                    </div>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => remove(v.id)}
                      title="Esborrar"
                      className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-100 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
