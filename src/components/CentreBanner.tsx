import { useEffect, useState } from "react";
import { School, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const DISMISS_KEY = "apren-centre-dismiss";

export function CentreBanner() {
  const { user, loading } = useAuth();
  const [centre, setCentre] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    if (loading || !user) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("centre")
        .eq("id", user.id)
        .maybeSingle();
      setCentre((data as any)?.centre ?? null);
      setChecked(true);
    })();
  }, [user, loading]);

  if (loading || !user || !checked || centre || dismissed) return null;

  const save = async () => {
    const v = value.trim();
    if (v.length < 2) {
      toast.error("Escriu el nom del centre, si us plau.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ centre: v.slice(0, 120) })
        .eq("id", user.id);
      if (error) throw error;
      setCentre(v);
      toast.success("Gràcies! Centre desat 💛");
    } catch (e: any) {
      toast.error(e.message ?? "Error");
    } finally {
      setSaving(false);
    }
  };

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  };

  return (
    <div className="container pt-4">
      <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 relative">
        <button
          onClick={dismiss}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          title="Tancar"
          aria-label="Tancar"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3">
          <School className="w-8 h-8 text-primary shrink-0" />
          <div>
            <p className="font-bold text-foreground">Des de quin centre ens visites? 🏫</p>
            <p className="text-sm text-muted-foreground">
              Ens encantaria saber-ho per veure on arriba aquest projecte. Gràcies!
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:ml-auto">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Nom del centre educatiu"
            maxLength={120}
            className="flex-1 rounded-xl border-2 border-border px-3 py-2 bg-background focus:outline-none focus:border-primary"
          />
          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold shadow hover:shadow-md transition-all disabled:opacity-60"
          >
            {saving ? "Desant…" : "Desar"}
          </button>
        </div>
      </div>
    </div>
  );
}
