import { useState } from "react";
import { VocabularyWord } from "@/data/vocabulary";
import { cn } from "@/lib/utils";

interface FlashCardProps {
  word: VocabularyWord;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalWords: number;
}

export const FlashCard = ({
  word,
  onNext,
  onPrev,
  currentIndex,
  totalWords,
}: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    onNext();
  };

  const handlePrev = () => {
    setIsFlipped(false);
    onPrev();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-muted-foreground text-sm font-medium">
        {currentIndex + 1} / {totalWords}
      </div>

      <div
        className={cn(
          "flip-card w-full max-w-md aspect-[3/2] cursor-pointer",
          isFlipped && "flipped"
        )}
        onClick={handleFlip}
      >
        <div className="flip-card-inner w-full h-full relative">
          {/* Front */}
          <div className="flip-card-front absolute inset-0 bg-card rounded-2xl shadow-card border border-border p-8 flex flex-col items-center justify-center">
            <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              English
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              {word.english}
            </h2>
            <p className="text-muted-foreground text-sm mt-6">
              Kartochkani bosing ↩
            </p>
          </div>

          {/* Back */}
          <div className="flip-card-back absolute inset-0 gradient-primary rounded-2xl shadow-card p-8 flex flex-col items-center justify-center">
            <span className="text-xs uppercase tracking-wider text-primary-foreground/70 mb-4">
              O'zbekcha
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center">
              {word.uzbek}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="h-12 w-12 rounded-full bg-card border-2 border-border hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === totalWords - 1}
          className="h-12 w-12 rounded-full bg-card border-2 border-border hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          →
        </button>
      </div>
    </div>
  );
};
