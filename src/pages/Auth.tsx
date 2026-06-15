import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLanguages } from "@/hooks/useLanguage";
import { ArrowLeft, LogIn, UserPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

type AuthStrings = {
  title: string;
  subtitle: string;
  restrictedNotice: string;
  email: string;
  password: string;
  signIn: string;
  signUp: string;
  toggleToSignUp: string;
  toggleToSignIn: string;
  back: string;
  successSignUp: string;
  successSignIn: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  forgot: string;
  forgotPrompt: string;
  forgotSent: string;
  forgotNeedEmail: string;
};

const STRINGS: Partial<Record<string, AuthStrings>> = {
  ca: {
    title: "Inicia sessió",
    subtitle: "Accés restringit per a editors de continguts",
    restrictedNotice:
      "Acció restringida. Per poder afegir nous mòduls a la web, és necessari que tinguis un compte. Si us plau, inicia sessió amb el teu correu i contrasenya o registra't.",
    email: "Correu electrònic",
    password: "Contrasenya",
    signIn: "Entrar",
    signUp: "Crear compte",
    toggleToSignUp: "No tens compte? Registra't",
    toggleToSignIn: "Ja tens compte? Inicia sessió",
    back: "Tornar a l'inici",
    successSignUp: "Compte creat! Ja pots afegir mòduls.",
    successSignIn: "Sessió iniciada correctament.",
    emailPlaceholder: "el-teu-correu@exemple.com",
    passwordPlaceholder: "Mínim 6 caràcters",
    forgot: "Has oblidat la contrasenya?",
    forgotPrompt: "Introdueix el teu correu i et farem arribar un enllaç per recuperar la contrasenya.",
    forgotSent: "Correu enviat! Revisa la teva safata d'entrada.",
    forgotNeedEmail: "Escriu primer el teu correu electrònic.",
  },
  es: {
    title: "Iniciar sesión",
    subtitle: "Acceso restringido para editores de contenido",
    restrictedNotice:
      "Acción restringida. Para poder añadir nuevos módulos a la web, es necesario que tengas una cuenta. Por favor, inicia sesión con tu correo y contraseña o regístrate.",
    email: "Correo electrónico",
    password: "Contraseña",
    signIn: "Entrar",
    signUp: "Crear cuenta",
    toggleToSignUp: "¿No tienes cuenta? Regístrate",
    toggleToSignIn: "¿Ya tienes cuenta? Inicia sesión",
    back: "Volver al inicio",
    successSignUp: "¡Cuenta creada! Ya puedes añadir módulos.",
    successSignIn: "Sesión iniciada correctamente.",
    emailPlaceholder: "tu-correo@ejemplo.com",
    passwordPlaceholder: "Mínimo 6 caracteres",
    forgot: "¿Has olvidado la contraseña?",
    forgotPrompt: "Introduce tu correo y te enviaremos un enlace para recuperar la contraseña.",
    forgotSent: "¡Correo enviado! Revisa tu bandeja de entrada.",
    forgotNeedEmail: "Escribe primero tu correo electrónico.",
  },
  en: {
    title: "Sign in",
    subtitle: "Restricted access for content editors",
    restrictedNotice:
      "Restricted action. To add new modules to the site you need an account. Please sign in with your email and password or sign up.",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    signUp: "Create account",
    toggleToSignUp: "No account? Sign up",
    toggleToSignIn: "Have an account? Sign in",
    back: "Back to home",
    successSignUp: "Account created! You can now add modules.",
    successSignIn: "Signed in successfully.",
    emailPlaceholder: "your-email@example.com",
    passwordPlaceholder: "At least 6 characters",
    forgot: "Forgot your password?",
    forgotPrompt: "Enter your email and we'll send you a link to reset your password.",
    forgotSent: "Email sent! Check your inbox.",
    forgotNeedEmail: "Please enter your email first.",
  },
};

const credSchema = z.object({
  email: z.string().trim().email({ message: "Correu no vàlid" }).max(255),
  password: z.string().min(6, { message: "Mínim 6 caràcters" }).max(72),
});

export default function Auth() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { helpLang } = useLanguages();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const s = STRINGS[helpLang] ?? STRINGS.en!;
  const showNotice = params.get("reason") === "restricted";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate("/", { replace: true });
  }, [authLoading, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = credSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        toast.success(s.successSignUp);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast.success(s.successSignIn);
      }
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
            <div className="text-5xl mb-2">🔐</div>
            <h1 className="text-2xl font-extrabold text-foreground">{s.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{s.subtitle}</p>
          </div>

          {showNotice && (
            <div className="mb-5 rounded-xl bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100 text-sm p-3">
              {s.restrictedNotice}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1.5">{s.email}</label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={s.emailPlaceholder}
                required
                maxLength={255}
                className="w-full rounded-xl border-2 border-border px-4 py-3 bg-background focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1.5">{s.password}</label>
              <input
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={s.passwordPlaceholder}
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
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : mode === "signup" ? (
                <UserPlus className="w-5 h-5" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {mode === "signup" ? s.signUp : s.signIn}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="mt-5 w-full text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {mode === "signup" ? s.toggleToSignIn : s.toggleToSignUp}
          </button>
        </div>
      </main>
    </div>
  );
}
