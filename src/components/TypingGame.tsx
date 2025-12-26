import { useState, useEffect, useRef } from "react";
import { VocabularyWord, shuffleArray } from "@/data/vocabulary";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X, RotateCcw, ArrowRight, Keyboard } from "lucide-react";

interface TypingGameProps {
  words: VocabularyWord[];
  onComplete: (score: number, total: number) => void;
}

export const TypingGame = ({ words, onComplete }: TypingGameProps) => {
  const [gameWords, setGameWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initGame();
  }, [words]);

  const initGame = () => {
    const shuffled = shuffleArray(words).slice(0, 10);
    setGameWords(shuffled);
    setCurrentIndex(0);
    setUserInput("");
    setScore(0);
    setShowAnswer(false);
    setIsCorrect(null);
    setGameComplete(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const normalizeString = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ");
  };

  const checkAnswer = () => {
    if (!userInput.trim()) return;

    const currentWord = gameWords[currentIndex];
    const normalized = normalizeString(userInput);
    const correctNormalized = normalizeString(currentWord.english);
    
    // Also check if user typed a close match
    const isMatch = normalized === correctNormalized || 
      currentWord.english.toLowerCase().includes(normalized);

    setIsCorrect(normalized === correctNormalized);
    if (normalized === correctNormalized) {
      setScore((prev) => prev + 1);
    }
    setShowAnswer(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (showAnswer) {
        handleNext();
      } else {
        checkAnswer();
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < gameWords.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput("");
      setShowAnswer(false);
      setIsCorrect(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setGameComplete(true);
      onComplete(score, gameWords.length);
    }
  };

  if (gameWords.length === 0) return null;

  if (gameComplete) {
    const percentage = Math.round((score / gameWords.length) * 100);
    return (
      <div className="text-center animate-fadeIn">
        <div
          className={cn(
            "w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center",
            percentage >= 70 ? "gradient-success" : "gradient-accent"
          )}
        >
          <Keyboard className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {percentage >= 70 ? "Zo'r natija! 🎉" : "Yaxshi harakat! 💪"}
        </h2>
        <p className="text-muted-foreground mb-2">
          Siz {gameWords.length} ta so'zdan {score} tasini to'g'ri yozdingiz
        </p>
        <p className="text-2xl font-bold text-gradient mb-6">{percentage}%</p>
        <Button onClick={initGame} size="lg">
          <RotateCcw className="w-4 h-4 mr-2" />
          Qayta o'ynash
        </Button>
      </div>
    );
  }

  const currentWord = gameWords[currentIndex];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            So'z {currentIndex + 1}/{gameWords.length}
          </span>
          <span>
            To'g'ri: <span className="font-bold text-success">{score}</span>
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / gameWords.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Word to Type */}
      <div className="bg-card rounded-2xl p-8 shadow-card border border-border text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Bu so'zni inglizcha yozing:
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
          {currentWord.uzbek}
        </h2>
      </div>

      {/* Input */}
      <div className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={showAnswer}
          placeholder="Inglizcha so'zni yozing..."
          className={cn(
            "w-full p-4 text-lg rounded-xl border-2 bg-card focus:outline-none transition-all",
            !showAnswer && "border-border focus:border-primary",
            showAnswer && isCorrect && "border-success bg-success/10",
            showAnswer && !isCorrect && "border-destructive bg-destructive/10"
          )}
        />

        {showAnswer && (
          <div
            className={cn(
              "p-4 rounded-xl flex items-center gap-3 animate-fadeIn",
              isCorrect ? "bg-success/10" : "bg-destructive/10"
            )}
          >
            {isCorrect ? (
              <>
                <Check className="w-6 h-6 text-success" />
                <span className="text-success font-medium">To'g'ri! 🎉</span>
              </>
            ) : (
              <>
                <X className="w-6 h-6 text-destructive" />
                <div>
                  <span className="text-destructive font-medium">
                    Noto'g'ri.
                  </span>
                  <span className="text-muted-foreground ml-2">
                    To'g'ri javob:{" "}
                    <span className="font-bold text-foreground">
                      {currentWord.english}
                    </span>
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        {!showAnswer ? (
          <Button
            onClick={checkAnswer}
            size="lg"
            className="flex-1"
            disabled={!userInput.trim()}
          >
            Tekshirish
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg" className="flex-1">
            {currentIndex < gameWords.length - 1 ? (
              <>
                Keyingisi
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              "Natijani ko'rish"
            )}
          </Button>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Enter tugmasini bosing ↵
      </p>
    </div>
  );
};
