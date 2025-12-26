import { BookOpen, Gamepad2, Target, Keyboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameSelectorProps {
  onSelect: (game: "flashcard" | "quiz" | "multiple" | "typing") => void;
}

const games = [
  {
    id: "flashcard" as const,
    title: "Flashkartalar",
    description: "So'zlarni kartalar orqali o'rganing",
    icon: BookOpen,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "quiz" as const,
    title: "Quiz - Moslashtirish",
    description: "So'zlarni ta'rifiga moslang",
    icon: Gamepad2,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "multiple" as const,
    title: "Ko'p tanlovli test",
    description: "To'g'ri javobni tanlang",
    icon: Target,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "typing" as const,
    title: "Yozish mashqi",
    description: "So'zlarni yozib o'rganing",
    icon: Keyboard,
    gradient: "from-orange-500 to-amber-500",
  },
];

export const GameSelector = ({ onSelect }: GameSelectorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {games.map((game, index) => (
        <button
          key={game.id}
          onClick={() => onSelect(game.id)}
          className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-soft card-hover p-6 text-left animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Background gradient on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300",
              game.gradient
            )}
          />

          {/* Icon */}
          <div
            className={cn(
              "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
              game.gradient
            )}
          >
            <game.icon className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-lg font-bold text-foreground mb-1">
            {game.title}
          </h3>
          <p className="text-sm text-muted-foreground">{game.description}</p>
        </button>
      ))}
    </div>
  );
};
