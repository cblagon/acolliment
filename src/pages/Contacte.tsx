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

const SUBJECTS = [
  "Vull dir-te alguna cosa bonica 💛",
  "Tinc un suggeriment",
  "He trobat un error",
  "Col·laboració / proposta",
  "Una altra cosa",
];

function makeChallenge() {
  const a = Math.floor(Math.random() * 8) + 1;
  const b = Math.floor(Math.random() * 8) + 1;
  return { a, b };
}

export default function Contacte() {
  const [nom, setNom] = useState("");
  const [correu, setCorreu] = useState("");
  const [assumpte, setAssumpte] = useState(SUBJECTS[0]);
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
      toast.success("Missatge enviat! Gràcies 💛");
      setNom(""); setCorreu(""); setMissatge(""); setResposta("");
      setChallenge(makeChallenge());
    } catch (err: any) {
      toast.error(err?.message ?? "No s'ha pogut enviar. Torna-ho a provar.");
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
          <ArrowLeft className="w-4 h-4" /> Tornar
        </Link>
      </header>

      <main className="container mx-auto px-4 pb-16 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Contacta amb l'autora</h1>
          <p className="text-muted-foreground">
            Vols dir-me alguna cosa, fer un suggeriment o trobar un error?
            M'encantarà llegir-te 💛
          </p>
        </div>

        <Card className="p-6 sm:p-8 shadow-lg">
          {enviat ? (
            <div className="text-center py-10">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Gràcies de tot cor!</h2>
              <p className="text-muted-foreground mb-6">
                He rebut el teu missatge i et respondré tan aviat com pugui.
              </p>
              <Button onClick={() => setEnviat(false)} variant="outline">
                Enviar un altre missatge
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
                  <Label htmlFor="nom">El teu nom</Label>
                  <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)}
                    required maxLength={100} placeholder="Com et dius?" />
                </div>
                <div>
                  <Label htmlFor="correu">El teu correu</Label>
                  <Input id="correu" type="email" value={correu}
                    onChange={(e) => setCorreu(e.target.value)} required maxLength={200}
                    placeholder="exemple@correu.cat" />
                </div>
              </div>

              <div>
                <Label htmlFor="assumpte">Sobre què vols parlar?</Label>
                <select
                  id="assumpte"
                  value={assumpte}
                  onChange={(e) => setAssumpte(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <Label htmlFor="missatge">El teu missatge</Label>
                <Textarea id="missatge" value={missatge}
                  onChange={(e) => setMissatge(e.target.value)} required minLength={10}
                  maxLength={4000} rows={6}
                  placeholder="Escriu-me amb confiança..." />
                <p className="text-xs text-muted-foreground mt-1">
                  {missatge.length}/4000
                </p>
              </div>

              <div className="rounded-xl bg-muted/50 p-4">
                <Label htmlFor="challenge" className="flex items-center gap-2">
                  🔢 Prova ràpida anti-robot
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Quant fa <strong>{challenge.a} + {challenge.b}</strong>?
                </p>
                <Input id="challenge" type="number" value={resposta}
                  onChange={(e) => setResposta(e.target.value)} required
                  className="max-w-[120px]" />
              </div>

              <Button type="submit" disabled={enviant} className="w-full" size="lg">
                <Send className="w-4 h-4 mr-2" />
                {enviant ? "Enviant..." : "Enviar missatge"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Tractarem el teu correu només per respondre't. No el compartirem.
              </p>
            </form>
          )}
        </Card>
      </main>
    </div>
  );
}
