import { useState, useEffect } from "react";
import { VocabularyWord, shuffleArray } from "@/data/vocabulary";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X, RotateCcw } from "lucide-react";

interface QuizGameProps {
  words: VocabularyWord[];
  onComplete: (score: number, total: number) => void;
}

interface MatchPair {
  word: VocabularyWord;
  isMatched: boolean;
}

export const QuizGame = ({ words, onComplete }: QuizGameProps) => {
  const [englishWords, setEnglishWords] = useState<MatchPair[]>([]);
  const [uzbekWords, setUzbekWords] = useState<MatchPair[]>([]);
  const [selectedEnglish, setSelectedEnglish] = useState<number | null>(null);
  const [selectedUzbek, setSelectedUzbek] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState<"correct" | "wrong" | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    initGame();
  }, [words]);

  const initGame = () => {
    const gameWords = shuffleArray(words).slice(0, 8);
    setEnglishWords(
      shuffleArray(gameWords.map((w) => ({ word: w, isMatched: false })))
    );
    setUzbekWords(
      shuffleArray(gameWords.map((w) => ({ word: w, isMatched: false })))
    );
    setSelectedEnglish(null);
    setSelectedUzbek(null);
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
  };

  useEffect(() => {
    if (selectedEnglish !== null && selectedUzbek !== null) {
      const englishWord = englishWords[selectedEnglish];
      const uzbekWord = uzbekWords[selectedUzbek];

      setAttempts((prev) => prev + 1);

      if (englishWord.word.id === uzbekWord.word.id) {
        setShowResult("correct");
        setScore((prev) => prev + 1);

        setTimeout(() => {
          setEnglishWords((prev) =>
            prev.map((w, i) =>
              i === selectedEnglish ? { ...w, isMatched: true } : w
            )
          );
          setUzbekWords((prev) =>
            prev.map((w, i) =>
              i === selectedUzbek ? { ...w, isMatched: true } : w
            )
          );
          setSelectedEnglish(null);
          setSelectedUzbek(null);
          setShowResult(null);

          // Check if game complete
          const matchedCount =
            englishWords.filter((w) => w.isMatched).length + 1;
          if (matchedCount === englishWords.length) {
            setGameComplete(true);
            onComplete(score + 1, englishWords.length);
          }
        }, 600);
      } else {
        setShowResult("wrong");
        setTimeout(() => {
          setSelectedEnglish(null);
          setSelectedUzbek(null);
          setShowResult(null);
        }, 600);
      }
    }
  }, [selectedEnglish, selectedUzbek]);

  if (gameComplete) {
    return (
      <div className="text-center animate-fadeIn">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-success flex items-center justify-center">
          <Check className="w-10 h-10 text-success-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Tabriklaymiz! 🎉</h2>
        <p className="text-muted-foreground mb-6">
          Siz {score} ta so'zni {attempts} ta urinishda topdingiz!
        </p>
        <Button onClick={initGame} size="lg">
          <RotateCcw className="w-4 h-4 mr-2" />
          Qayta o'ynash
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          To'g'ri: <span className="font-bold text-success">{score}</span> /{" "}
          {englishWords.length}
        </div>
        <div className="text-sm text-muted-foreground">
          Urinishlar: <span className="font-bold">{attempts}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* English Column */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground text-center mb-4">
            English
          </h3>
          {englishWords.map((item, index) => (
            <button
              key={`en-${item.word.id}`}
              onClick={() =>
                !item.isMatched &&
                selectedUzbek === null &&
                setSelectedEnglish(index)
              }
              disabled={item.isMatched}
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left font-medium",
                item.isMatched &&
                  "bg-success/10 border-success text-success opacity-60",
                !item.isMatched &&
                  selectedEnglish === index &&
                  "border-primary bg-primary/10",
                !item.isMatched &&
                  selectedEnglish !== index &&
                  "bg-card border-border hover:border-primary/50",
                showResult === "correct" &&
                  selectedEnglish === index &&
                  "animate-success bg-success/20 border-success",
                showResult === "wrong" &&
                  selectedEnglish === index &&
                  "animate-shake bg-destructive/20 border-destructive"
              )}
            >
              {item.word.english}
            </button>
          ))}
        </div>

        {/* Uzbek Column */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground text-center mb-4">
            O'zbekcha
          </h3>
          {uzbekWords.map((item, index) => (
            <button
              key={`uz-${item.word.id}`}
              onClick={() =>
                !item.isMatched &&
                selectedEnglish !== null &&
                setSelectedUzbek(index)
              }
              disabled={item.isMatched || selectedEnglish === null}
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left font-medium",
                item.isMatched &&
                  "bg-success/10 border-success text-success opacity-60",
                !item.isMatched &&
                  selectedUzbek === index &&
                  "border-primary bg-primary/10",
                !item.isMatched &&
                  selectedUzbek !== index &&
                  "bg-card border-border hover:border-primary/50",
                selectedEnglish === null && !item.isMatched && "opacity-50",
                showResult === "correct" &&
                  selectedUzbek === index &&
                  "animate-success bg-success/20 border-success",
                showResult === "wrong" &&
                  selectedUzbek === index &&
                  "animate-shake bg-destructive/20 border-destructive"
              )}
            >
              {item.word.uzbek}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        {selectedEnglish !== null
          ? "Endi o'zbekcha so'zni tanlang"
          : "Inglizcha so'zni tanlang"}
      </div>
    </div>
  );
};
