import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Languages, Loader2, Copy } from "lucide-react";

const TRANSLATE_LANGS = [
  { code: "es", label: "Castellà" },
  { code: "en", label: "Anglès" },
  { code: "fr", label: "Francès" },
  { code: "ca", label: "Català" },
  { code: "ar", label: "Àrab" },
  { code: "it", label: "Italià" },
  { code: "pt", label: "Portuguès" },
  { code: "de", label: "Alemany" },
  { code: "uk", label: "Ucraïnès" },
  { code: "ro", label: "Romanès" },
  { code: "zh", label: "Xinès" },
  { code: "hi", label: "Hindi" },
  { code: "ur", label: "Urdú" },
];

async function callAI(action: "spellcheck" | "translate", text: string, targetLang?: string) {
  const { data, error } = await supabase.functions.invoke("ai-text-tools", {
    body: { action, text, targetLang },
  });
  if (error) throw new Error(error.message);
  if ((data as any)?.error) throw new Error((data as any).error);
  return (data as { result: string }).result;
}

function ResultBox({ value }: { value: string }) {
  if (!value) return null;
  return (
    <div className="mt-4 rounded-md border bg-muted/40 p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{value}</p>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            navigator.clipboard.writeText(value);
            toast.success("Copiat!");
          }}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function SpellChecker() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const r = await callAI("spellcheck", input.trim());
      setOutput(r);
    } catch (e: any) {
      toast.error(e.message ?? "Error en la correcció");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Corrector ortogràfic català
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          placeholder="Escriu o enganxa aquí el text en català que vulguis corregir…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
        />
        <Button onClick={run} disabled={loading || !input.trim()} className="w-full sm:w-auto">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Corregir"}
        </Button>
        <ResultBox value={output} />
      </CardContent>
    </Card>
  );
}

function Translator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [target, setTarget] = useState("es");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const r = await callAI("translate", input.trim(), target);
      setOutput(r);
    } catch (e: any) {
      toast.error(e.message ?? "Error en la traducció");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          Traductor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          placeholder="Escriu o enganxa el text que vulguis traduir…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
        />
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="target-lang" className="text-sm text-muted-foreground">
            Traduir al:
          </label>
          <select
            id="target-lang"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="rounded-md border bg-background px-3 py-2 text-sm"
          >
            {TRANSLATE_LANGS.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          <Button onClick={run} disabled={loading || !input.trim()}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Traduir"}
          </Button>
        </div>
        <ResultBox value={output} />
      </CardContent>
    </Card>
  );
}

export default function Eines() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Eines de llengua</h1>
          <Button variant="ghost" asChild>
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Tornar</Link>
          </Button>
        </div>
        <p className="mb-6 text-muted-foreground">
          Corrector ortogràfic i traductor amb IA per a textos en català i altres idiomes.
        </p>
        <div className="grid gap-6 md:grid-cols-1">
          <SpellChecker />
          <Translator />
        </div>
      </div>
    </div>
  );
}
