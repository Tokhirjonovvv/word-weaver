import { Unit } from "@/data/vocabulary";
import { cn } from "@/lib/utils";
import { BookOpen, Gamepad2, Target, Keyboard } from "lucide-react";

interface UnitCardProps {
  unit: Unit;
  onClick: () => void;
  index: number;
}

export const UnitCard = ({ unit, onClick, index }: UnitCardProps) => {
  const gradients = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-blue-500",
    "from-green-500 to-emerald-500",
    "from-red-500 to-orange-500",
    "from-purple-500 to-pink-500",
    "from-cyan-500 to-blue-500",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-card card-hover p-6 text-left w-full"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Background gradient on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300",
          gradient
        )}
      />

      {/* Unit number badge */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
          gradient
        )}
      >
        <span className="text-lg font-bold text-white">{unit.id}</span>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">{unit.title}</h3>
      <p className="text-muted-foreground text-sm mb-4">
        {unit.words.length} ta so'z
      </p>

      {/* Features */}
      <div className="flex gap-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
          <BookOpen className="w-3 h-3" />
          <span>Kartalar</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
          <Gamepad2 className="w-3 h-3" />
          <span>O'yin</span>
        </div>
      </div>
    </button>
  );
};
