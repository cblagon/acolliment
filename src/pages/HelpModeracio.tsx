import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Clock, Eye, MessageCircleHeart } from "lucide-react";

export default function HelpModeracio() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/ajuda" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Ajuda
          </Link>
          <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">Inici</Link>
        </div>
      </header>

      <main className="container py-10 max-w-3xl space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> Comunitat segura
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold">Com es revisen les teves aportacions 💛</h1>
          <p className="text-muted-foreground">
            Les teves contribucions són molt benvingudes! Per garantir la qualitat pedagògica i un entorn segur per a tot l'alumnat, cada nou bloc passa per una revisió breu.
          </p>
        </div>

        <section className="grid gap-4">
          <div className="rounded-2xl border border-border bg-card p-5 flex gap-4 items-start">
            <div className="text-3xl">📝</div>
            <div>
              <h2 className="font-bold text-lg">1. Crees el teu bloc</h2>
              <p className="text-sm text-muted-foreground">Quan inicies sessió pots crear nous blocs de vocabulari amb paraules, traduccions, emojis i frases d'exemple.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 flex gap-4 items-start">
            <Clock className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
            <div>
              <h2 className="font-bold text-lg">2. Queda en estat «Pendent de revisió»</h2>
              <p className="text-sm text-muted-foreground">
                El bloc apareix immediatament a la teva sessió amb un distintiu groc <span className="inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">⏳ Pendent</span> perquè el puguis veure i editar. La resta d'usuaris encara no el veuen.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 flex gap-4 items-start">
            <Eye className="w-8 h-8 text-primary shrink-0 mt-1" />
            <div>
              <h2 className="font-bold text-lg">3. L'administradora el revisa</h2>
              <p className="text-sm text-muted-foreground">
                La professora responsable comprova que el contingut sigui adequat per a alumnat nouvingut (vocabulari correcte, llenguatge inclusiu, sense errors). Aquesta revisió garanteix la qualitat i seguretat de la comunitat d'aprenentatge.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 flex gap-4 items-start">
            <div className="text-3xl">✅</div>
            <div>
              <h2 className="font-bold text-lg">4. Aprovació i publicació</h2>
              <p className="text-sm text-muted-foreground">
                Quan el bloc s'aprova, queda visible per a tothom i el distintiu desapareix. Si cal modificar alguna cosa, rebràs un comentari per millorar-lo.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-primary/5 border border-primary/20 p-6 flex gap-4 items-start">
          <MessageCircleHeart className="w-8 h-8 text-primary shrink-0" />
          <div>
            <h2 className="font-bold text-lg mb-1">Gràcies per la teva paciència 🙏</h2>
            <p className="text-sm text-muted-foreground">
              La revisió sol ser ràpida, però depèn de la disponibilitat de l'administradora. Mentrestant pots continuar creant més blocs o practicar amb els que ja hi ha. Cada aportació teva fa més rica aquesta comunitat d'aprenentatge!
            </p>
          </div>
        </section>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90">
            Tornar a l'inici
          </Link>
        </div>
      </main>
    </div>
  );
}
