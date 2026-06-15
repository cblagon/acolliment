import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLanguages } from "@/hooks/useLanguage";
import { ArrowLeft, KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";

const STRINGS: Record<string, { title: string; subtitle: string; password: string; placeholder: string; submit: string; success: string; back: string; loginRequired: string }> = {
  ca: { title: "Canviar contrasenya", subtitle: "Introdueix la teva nova contrasenya", password: "Nova contrasenya", placeholder: "Mínim 6 caràcters", submit: "Desar contrasenya", success: "Contrasenya actualitzada!", back: "Tornar a l'inici", loginRequired: "Has d'iniciar sessió per canviar la contrasenya." },
  es: { title: "Cambiar contraseña", subtitle: "Introduce tu nueva contraseña", password: "Nueva contraseña", placeholder: "Mínimo 6 caracteres", submit: "Guardar contraseña", success: "¡Contraseña actualizada!", back: "Volver al inicio", loginRequired: "Debes iniciar sesión para cambiar la contraseña." },
  en: { title: "Change password", subtitle: "Enter your new password", password: "New password", placeholder: "At least 6 characters", submit: "Save password", success: "Password updated!", back: "Back to home", loginRequired: "You must be signed in to change your password." },
};

export default function ChangePassword() {
  const navigate = useNavigate();
  const { helpLang } = useLanguages();
  const { isAuthenticated, loading, user } = useAuth();
  const s = STRINGS[helpLang] ?? STRINGS.en;
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/auth?reason=restricted", { replace: true });
  }, [loading, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error(s.placeholder); return; }
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success(s.success);
      navigate("/", { replace: true });
    } catch (err: any) {
      toast.error(err?.message ?? "Error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="container py-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> {s.back}
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-md p-6 sm:p-8 animate-reveal-up">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🔑</div>
            <h1 className="text-2xl font-extrabold text-foreground">{s.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{s.subtitle}</p>
            {user?.email && <p className="text-xs text-muted-foreground mt-2">{user.email}</p>}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1.5">{s.password}</label>
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={s.placeholder}
                required
                minLength={6}
                maxLength={72}
                className="w-full rounded-xl border-2 border-border px-4 py-3 bg-background focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-60"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <KeyRound className="w-5 h-5" />}
              {s.submit}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
