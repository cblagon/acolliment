import { useState } from "react";
import { type Bloc, type Fitxa } from "@/data/blocksData";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";

const COLOR_OPTIONS = [
  { label: "Taronja", value: "bg-primary" },
  { label: "Blau", value: "bg-secondary" },
  { label: "Verd", value: "bg-accent" },
  { label: "Rosa", value: "bg-bloom-pink" },
  { label: "Lila", value: "bg-bloom-purple" },
  { label: "Groc", value: "bg-bloom-yellow" },
  { label: "Turquesa", value: "bg-bloom-teal" },
];

interface BlocEditorProps {
  bloc?: Bloc;
  onSave: (bloc: Bloc) => void;
  onCancel: () => void;
}

export function BlocEditor({ bloc, onSave, onCancel }: BlocEditorProps) {
  const [nom, setNom] = useState(bloc?.nom ?? "");
  const [emoji, setEmoji] = useState(bloc?.emoji ?? "📚");
  const [color, setColor] = useState(bloc?.color ?? "bg-primary");
  const [fitxes, setFitxes] = useState<Fitxa[]>(bloc?.fitxes ?? [
    { paraula: "", traduccio: "", emoji: "", frase: "" },
  ]);

  const addFitxa = () => setFitxes([...fitxes, { paraula: "", traduccio: "", emoji: "", frase: "" }]);
  const removeFitxa = (i: number) => setFitxes(fitxes.filter((_, j) => j !== i));
  const updateFitxa = (i: number, field: keyof Fitxa, value: string) =>
    setFitxes(fitxes.map((f, j) => (j === i ? { ...f, [field]: value } : f)));

  const handleSave = () => {
    const valid = fitxes.filter((f) => f.paraula.trim() && f.traduccio.trim());
    if (!nom.trim() || valid.length === 0) return;
    onSave({
      id: bloc?.id ?? nom.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      nom: nom.trim(),
      emoji,
      color,
      fitxes: valid.map((f) => ({ ...f, emoji: f.emoji || "📝", frase: f.frase || `Exemple: ${f.paraula}` })),
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto animate-reveal-up">
      <div className="flex items-center gap-3">
        <button onClick={onCancel} className="p-2 text-muted-foreground hover:text-foreground transition-colors active:scale-95">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-extrabold">{bloc ? "Editar Bloc" : "Nou Bloc"}</h2>
      </div>

      {/* Name & Emoji */}
      <div className="grid grid-cols-[1fr_80px] gap-3">
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom del bloc"
          className="rounded-xl border-2 border-border px-4 py-3 text-lg font-bold bg-card focus:outline-none focus:border-primary transition-colors"
        />
        <input
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          placeholder="Emoji"
          className="rounded-xl border-2 border-border px-3 py-3 text-2xl text-center bg-card focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Color */}
      <div className="flex flex-wrap gap-2">
        {COLOR_OPTIONS.map((c) => (
          <button
            key={c.value}
            onClick={() => setColor(c.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${c.value} text-white ${
              color === c.value ? "ring-2 ring-offset-2 ring-foreground scale-105" : "opacity-70 hover:opacity-100"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-muted-foreground">Fitxes ({fitxes.length})</h3>
        {fitxes.map((f, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center bg-card rounded-xl p-3 border border-border">
            <input
              value={f.emoji}
              onChange={(e) => updateFitxa(i, "emoji", e.target.value)}
              placeholder="😀"
              className="w-12 text-center text-xl bg-transparent focus:outline-none"
            />
            <input
              value={f.paraula}
              onChange={(e) => updateFitxa(i, "paraula", e.target.value)}
              placeholder="Paraula"
              className="px-3 py-2 rounded-lg bg-muted text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              value={f.traduccio}
              onChange={(e) => updateFitxa(i, "traduccio", e.target.value)}
              placeholder="Traducció"
              className="px-3 py-2 rounded-lg bg-muted text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button onClick={() => removeFitxa(i)} className="p-1.5 text-destructive/60 hover:text-destructive transition-colors active:scale-90">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button onClick={addFitxa} className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors active:scale-95">
          <Plus className="w-4 h-4" /> Afegir fitxa
        </button>
      </div>

      <button
        onClick={handleSave}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
      >
        <Save className="w-5 h-5" /> Desar
      </button>
    </div>
  );
}
