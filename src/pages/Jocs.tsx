import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2, Target } from "lucide-react";
import { useLanguages } from "@/hooks/useLanguage";
import { t } from "@/i18n/ui";

interface GameCard {
  id: string;
  to: string;
  titleKey: "hangman";
  icon: React.ReactNode;
  color: string;
  available: boolean;
}

const Jocs = () => {
  const { helpLang } = useLanguages();

  const games: GameCard[] = [
    {
      id: "penjat",
      to: "/penjat",
      titleKey: "hangman",
      icon: <Target className="w-8 h-8" />,
      color: "bg-bloom-pink",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container py-4 flex items-center justify-between gap-3 flex-wrap">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t(helpLang, "back")}
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <h1 className="text-xl font-extrabold">{t(helpLang, "games")}</h1>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="container py-10 max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link
              key={game.id}
              to={game.available ? game.to : "#"}
              className={`group relative flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 active:scale-95 ${
                game.available ? "" : "opacity-60 cursor-not-allowed"
              }`}
            >
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-2xl text-white ${game.color} shadow-sm`}
              >
                {game.icon}
              </div>
              <div className="text-center">
                <h2 className="text-lg font-extrabold text-foreground">
                  {t(helpLang, game.titleKey)}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {game.available ? t(helpLang, "play") : t(helpLang, "comingSoon")}
                </p>
              </div>
              {!game.available && (
                <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  🚧
                </span>
              )}
            </Link>
          ))}

          {/* Placeholder for future games */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-border bg-card/50 p-8 opacity-70">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted text-muted-foreground">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-extrabold text-muted-foreground">
                {t(helpLang, "comingSoon")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">+ jocs</p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Aquí trobaràs jocs per practicar vocabulari i expressió oral mentre aprens.
        </p>
      </main>
    </div>
  );
};

export default Jocs;
