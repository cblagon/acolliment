import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguages, LANGUAGES, type LangCode } from "@/hooks/useLanguage";
import { contacteStrings, CONTACTE_STRINGS } from "@/i18n/contacte";

function makeChallenge() {
  const a = Math.floor(Math.random() * 8) + 1;
  const b = Math.floor(Math.random() * 8) + 1;
  return { a, b };
}

export default function Contacte() {
  const { helpLang } = useLanguages();
  const [altLang, setAltLang] = useState<LangCode | null>(null);
  const hasHelpLang = !!CONTACTE_STRINGS[helpLang];
  const viewLang: LangCode = hasHelpLang ? helpLang : (altLang ?? "ca");
  const s = contacteStrings(viewLang);
  const availableLangs = useMemo(() => (Object.keys(CONTACTE_STRINGS) as LangCode[]), []);

  const [nom, setNom] = useState("");
  const [correu, setCorreu] = useState("");
  const [assumpte, setAssumpte] = useState(s.subjects[0]);
  const [missatge, setMissatge] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [challenge, setChallenge] = useState(makeChallenge);
  const [resposta, setResposta] = useState("");
  const [enviant, setEnviant] = useState(false);
  const [enviat, setEnviat] = useState(false);
  const startedAt = useRef<number>(Date.now());

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    setAssumpte(s.subjects[0]);
  }, [s.subjects]);

  const challengeText = useMemo(
    () => s.challengeText.replace("{a}", String(challenge.a)).replace("{b}", String(challenge.b)),
    [s.challengeText, challenge.a, challenge.b],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviant) return;
    setEnviant(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-contact", {
        body: {
          nom,
          correu,
          assumpte,
          missatge,
          honeypot,
          challenge_a: challenge.a,
          challenge_b: challenge.b,
          challenge_answer: Number(resposta),
          started_at: startedAt.current,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setEnviat(true);
      toast.success(s.toastSuccess);
      setNom(""); setCorreu(""); setMissatge(""); setResposta("");
      setChallenge(makeChallenge());
    } catch (err: any) {
      toast.error(err?.message ?? s.toastError);
      setChallenge(makeChallenge());
      setResposta("");
    } finally {
      setEnviant(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-amber-50 to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> {s.back}
        </Link>
      </header>

      <main className="container mx-auto px-4 pb-16 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{s.title}</h1>
          <p className="text-muted-foreground">
            {s.subtitle}
          </p>
        </div>

        {!hasHelpLang && (
          <div className="mb-6 rounded-2xl border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-4 flex flex-wrap items-center gap-3">
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

        <Card className="p-6 sm:p-8 shadow-lg">
          {enviat ? (
            <div className="text-center py-10">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{s.successTitle}</h2>
              <p className="text-muted-foreground mb-6">
                {s.successText}
              </p>
              <Button onClick={() => setEnviat(false)} variant="outline">
                {s.successButton}
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Honeypot ocult */}
              <div className="hidden" aria-hidden="true">
                <label>No omplir aquest camp</label>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom">{s.nameLabel}</Label>
                  <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)}
                    required maxLength={100} placeholder={s.namePlaceholder} />
                </div>
                <div>
                  <Label htmlFor="correu">{s.emailLabel}</Label>
                  <Input id="correu" type="email" value={correu}
                    onChange={(e) => setCorreu(e.target.value)} required maxLength={200}
                    placeholder={s.emailPlaceholder} />
                </div>
              </div>

              <div>
                <Label htmlFor="assumpte">{s.subjectLabel}</Label>
                <select
                  id="assumpte"
                  value={assumpte}
                  onChange={(e) => setAssumpte(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {s.subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
                </select>
              </div>

              <div>
                <Label htmlFor="missatge">{s.messageLabel}</Label>
                <Textarea id="missatge" value={missatge}
                  onChange={(e) => setMissatge(e.target.value)} required minLength={10}
                  maxLength={4000} rows={6}
                  placeholder={s.messagePlaceholder} />
                <p className="text-xs text-muted-foreground mt-1">
                  {missatge.length}/4000
                </p>
              </div>

              <div className="rounded-xl bg-muted/50 p-4">
                <Label htmlFor="challenge" className="flex items-center gap-2">
                  {s.challengeLabel}
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>{challengeText}</strong>
                </p>
                <Input id="challenge" type="number" value={resposta}
                  onChange={(e) => setResposta(e.target.value)} required
                  className="max-w-[120px]" />
              </div>

              <Button type="submit" disabled={enviant} className="w-full" size="lg">
                <Send className="w-4 h-4 mr-2" />
                {enviant ? s.sending : s.sendButton}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {s.privacyNote}
              </p>
            </form>
          )}
        </Card>
      </main>
    </div>
  );
}
