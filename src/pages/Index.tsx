import { useNavigate } from "react-router-dom";
import { units } from "@/data/vocabulary";
import { UnitCard } from "@/components/UnitCard";
import { BookOpen, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fadeIn">
              <Sparkles className="w-4 h-4" />
              <span>500+ inglizcha so'zlar</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn" style={{ animationDelay: "100ms" }}>
              <span className="text-gradient">Vocabulary</span> Master
            </h1>
            <p className="text-lg text-muted-foreground animate-fadeIn" style={{ animationDelay: "200ms" }}>
              Ingliz tilini o'rganish uchun interaktiv o'yinlar va flashkartalar
            </p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-4 mb-12">
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { label: "Unitlar", value: units.length },
            { label: "So'zlar", value: "500+" },
            { label: "O'yinlar", value: "4" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-4 text-center shadow-soft border border-border animate-fadeIn"
              style={{ animationDelay: `${300 + i * 100}ms` }}
            >
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Units Grid */}
      <main className="container mx-auto px-4 pb-16">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Unitlarni tanlang</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {units.map((unit, index) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              index={index}
              onClick={() => navigate(`/unit/${unit.id}`)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Vocabulary Master — Ingliz tilini o'rganish platformasi</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
