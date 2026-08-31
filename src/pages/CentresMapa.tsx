import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, MapPin, School, Trash2 } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useLanguages, LANGUAGES, type LangCode } from "@/hooks/useLanguage";
import { centresStrings, CENTRES_STRINGS } from "@/i18n/centresMapa";
import { toast } from "sonner";

type CentreVisit = {
  id: string;
  centre: string;
  city: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
  status: "approved" | "hidden";
  created_at: string;
};

async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers: { "Accept-Language": "ca" } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

export default function CentresMapa() {
  const { isAdmin } = useIsAdmin();
  const { helpLang } = useLanguages();
  const [altLang, setAltLang] = useState<LangCode | null>(null);
  const hasHelpLang = !!CENTRES_STRINGS[helpLang];
  const viewLang: LangCode = hasHelpLang ? helpLang : (altLang ?? "ca");
  const s = centresStrings(viewLang);
  const availableLangs = (Object.keys(CENTRES_STRINGS) as LangCode[]);
  const [visits, setVisits] = useState<CentreVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [centre, setCentre] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

  const [showReal, setShowReal] = useState(true);
  const [realPoints, setRealPoints] = useState<
    { lat: number; lng: number; city: string; country: string; sessions: number }[]
  >([]);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("centre_visits")
      .select("id,centre,city,country,lat,lng,status,created_at")
      .order("created_at", { ascending: false })
      .limit(2000);
    setVisits((data ?? []) as CentreVisit[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  // Admin-only: real geolocated visits from page tracking (not registered by users)
  useEffect(() => {
    if (!isAdmin) { setRealPoints([]); return; }
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("page_events")
        .select("city,country,lat,lng,session_id")
        .not("lat", "is", null)
        .limit(10000);
      if (!active || !data) return;
      const m = new Map<string, { lat: number; lng: number; city: string; country: string; sessions: Set<string> }>();
      for (const r of data as any[]) {
        if (r.lat == null || r.lng == null) continue;
        const key = `${Number(r.lat).toFixed(2)}_${Number(r.lng).toFixed(2)}`;
        let e = m.get(key);
        if (!e) {
          e = { lat: r.lat, lng: r.lng, city: r.city ?? "—", country: r.country ?? "", sessions: new Set() };
          m.set(key, e);
        }
        e.sessions.add(r.session_id);
      }
      setRealPoints([...m.values()].map((e) => ({ ...e, sessions: e.sessions.size })));
    })();
    return () => { active = false; };
  }, [isAdmin]);


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const c = centre.trim();
    const ci = city.trim();
    const co = country.trim();
    if (!ci && !co) { toast.error(s.needCityOrCountry); return; }
    setSubmitting(true);
    try {
      const query = [c, ci, co].filter(Boolean).join(", ");
      let geo = await geocode(query);
      if (!geo) {
        geo = await geocode([ci, co].filter(Boolean).join(", "));
      }


      const { data, error } = await supabase.functions.invoke("submit-centre-visit", {
        body: {
          centre: c || null,
          city: ci || null,
          country: co || null,
          lat: geo?.lat ?? null,
          lng: geo?.lng ?? null,
        },
      });
      if (error) {
        // Try to surface server message
        const msg = (data as any)?.error || error.message || s.errorSave;
        throw new Error(msg);
      }
      if ((data as any)?.error) throw new Error((data as any).error);

      toast.success(s.thanks);
      setCentre(""); setCity(""); setCountry("");
      load();
    } catch (e: any) {
      toast.error(e.message ?? s.errorSave);
    } finally {
      setSubmitting(false);
    }
  };

  const setStatus = async (id: string, status: "approved" | "hidden") => {
    const { error } = await supabase.from("centre_visits").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success(status === "hidden" ? s.hiddenToast : s.visibleToast); load(); }
  };

  const remove = async (id: string) => {
    if (!window.confirm(s.confirmDelete)) return;
    const { error } = await supabase.from("centre_visits").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success(s.deleted); load(); }
  };

  const visibleVisits = useMemo(
    () => visits.filter((v) => v.status === "approved" || (isAdmin && showHidden)),
    [visits, isAdmin, showHidden],
  );

  const mapVisits = useMemo(
    () => visits.filter((v) => v.status === "approved"),
    [visits],
  );

  const points = useMemo(() => {
    const m = new Map<string, { lat: number; lng: number; entries: CentreVisit[] }>();
    for (const v of mapVisits) {
      if (v.lat == null || v.lng == null) continue;
      const key = `${v.lat.toFixed(3)}_${v.lng.toFixed(3)}`;
      let e = m.get(key);
      if (!e) { e = { lat: v.lat, lng: v.lng, entries: [] }; m.set(key, e); }
      e.entries.push(v);
    }
    return [...m.values()];
  }, [mapVisits]);

  const maxCount = Math.max(1, ...points.map((p) => p.entries.length));
  const hiddenCount = visits.filter((v) => v.status === "hidden").length;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" /> {s.title}
            </h1>
            <p className="text-xs text-muted-foreground">{s.subtitle}</p>
          </div>
          <Link to="/" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> {s.back}
          </Link>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {!hasHelpLang && (
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold">
              🌐 {LANGUAGES[helpLang]?.nativeName ?? helpLang}: no disponible / not available — {s.title}
            </span>
            <select
              value={viewLang}
              onChange={(e) => setAltLang(e.target.value as LangCode)}
              className="rounded-xl border-2 border-border px-3 py-1.5 bg-background text-sm font-semibold"
            >
              {availableLangs.map((code) => (
                <option key={code} value={code}>
                  {LANGUAGES[code]?.flag} {LANGUAGES[code]?.nativeName ?? code}
                </option>
              ))}
            </select>
          </div>
        )}
        <section className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-7 h-7 text-primary" />
            <div>
              <h2 className="font-extrabold text-lg">{s.formTitle}</h2>
              <p className="text-sm text-muted-foreground">
                {s.formText}
              </p>
            </div>
          </div>
          <form onSubmit={submit} className="grid gap-3 sm:grid-cols-[1fr_1fr_2fr_auto]">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={s.cityPh}
              maxLength={120}
              className="rounded-xl border-2 border-border px-3 py-2 bg-background focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={s.countryPh}
              maxLength={120}
              className="rounded-xl border-2 border-border px-3 py-2 bg-background focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              value={centre}
              onChange={(e) => setCentre(e.target.value)}
              placeholder={s.namePh}
              maxLength={120}
              className="rounded-xl border-2 border-border px-3 py-2 bg-background focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold shadow hover:shadow-md transition-all disabled:opacity-60"
            >
              {submitting ? s.saving : s.add}
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
                    <div className="text-sm space-y-1 min-w-[200px]">
                      {p.entries.slice(0, 12).map((e) => (
                        <div key={e.id} className="flex items-center gap-2 justify-between">
                          <div className="min-w-0">
                            <span className="font-semibold">{e.centre}</span>
                            {e.city && <span className="text-muted-foreground"> · {e.city}</span>}
                          </div>
                          {isAdmin && (
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => setStatus(e.id, "hidden")}
                                title={s.hideAction}
                                className="p-1 rounded hover:bg-amber-100 hover:text-amber-700"
                              >
                                <EyeOff className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => remove(e.id)}
                                title={s.deleteAction}
                                className="p-1 rounded hover:bg-red-100 hover:text-red-700"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
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
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <h2 className="text-lg font-bold">
              {s.listTitle} ({visibleVisits.length}
              {isAdmin && hiddenCount > 0 ? ` · ${hiddenCount} ${s.hidden}` : ""})
            </h2>
            {isAdmin && (
              <button
                onClick={() => setShowHidden((v) => !v)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/70"
              >
                {showHidden ? s.hideHidden : s.showHidden}
              </button>
            )}
          </div>
          {loading ? (
            <p className="text-sm text-muted-foreground">{s.loading}</p>
          ) : visibleVisits.length === 0 ? (
            <p className="text-sm text-muted-foreground">{s.empty}</p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2">
              {visibleVisits.map((v) => (
                <li
                  key={v.id}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 ${
                    v.status === "hidden" ? "bg-red-50 dark:bg-red-950/30 opacity-70" : "bg-muted/40"
                  }`}
                >
                  <School className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">
                      {v.centre}
                      {v.status === "hidden" && (
                        <span className="ml-2 text-[10px] uppercase font-bold text-red-700 dark:text-red-300">{s.hidden}</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {[v.city, v.country].filter(Boolean).join(" · ") || "—"}
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      {v.status === "approved" ? (
                        <button
                          onClick={() => setStatus(v.id, "hidden")}
                          title={s.hideAction}
                          className="p-1.5 rounded-lg text-muted-foreground hover:bg-amber-100 hover:text-amber-700"
                        >
                          <EyeOff className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setStatus(v.id, "approved")}
                          title={s.showAction}
                          className="p-1.5 rounded-lg text-muted-foreground hover:bg-green-100 hover:text-green-700"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => remove(v.id)}
                        title={s.deleteAction}
                        className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-100 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
