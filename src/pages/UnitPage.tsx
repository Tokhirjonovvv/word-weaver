import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUnitById } from "@/data/vocabulary";
import { FlashCard } from "@/components/FlashCard";
import { QuizGame } from "@/components/QuizGame";
import { MultipleChoiceGame } from "@/components/MultipleChoiceGame";
import { TypingGame } from "@/components/TypingGame";
import { GameSelector } from "@/components/GameSelector";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

type GameType = "flashcard" | "quiz" | "multiple" | "typing" | null;

const UnitPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const unit = getUnitById(Number(id));

  if (!unit) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Unit topilmadi</h1>
          <Button onClick={() => navigate("/")}>Bosh sahifaga</Button>
        </div>
      </div>
    );
  }

  const handleGameComplete = (score: number, total: number) => {
    console.log(`Game complete: ${score}/${total}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (selectedGame ? setSelectedGame(null) : navigate("/"))}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-bold text-lg">{unit.title}</h1>
            <p className="text-sm text-muted-foreground">
              {selectedGame
                ? selectedGame === "flashcard"
                  ? "Flashkartalar"
                  : selectedGame === "quiz"
                  ? "Quiz"
                  : selectedGame === "multiple"
                  ? "Test"
                  : "Yozish"
                : `${unit.words.length} ta so'z`}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {!selectedGame ? (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-bold mb-6 text-center">
              O'yin turini tanlang
            </h2>
            <GameSelector onSelect={setSelectedGame} />
          </div>
        ) : selectedGame === "flashcard" ? (
          <FlashCard
            word={unit.words[currentCardIndex]}
            currentIndex={currentCardIndex}
            totalWords={unit.words.length}
            onNext={() => setCurrentCardIndex((i) => Math.min(i + 1, unit.words.length - 1))}
            onPrev={() => setCurrentCardIndex((i) => Math.max(i - 1, 0))}
          />
        ) : selectedGame === "quiz" ? (
          <QuizGame words={unit.words} onComplete={handleGameComplete} />
        ) : selectedGame === "multiple" ? (
          <MultipleChoiceGame words={unit.words} onComplete={handleGameComplete} />
        ) : (
          <TypingGame words={unit.words} onComplete={handleGameComplete} />
        )}
      </main>
    </div>
  );
};

export default UnitPage;
