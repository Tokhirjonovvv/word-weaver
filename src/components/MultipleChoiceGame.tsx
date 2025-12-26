import { useState, useEffect } from "react";
import { VocabularyWord, shuffleArray } from "@/data/vocabulary";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X, RotateCcw, ArrowRight } from "lucide-react";

interface MultipleChoiceGameProps {
  words: VocabularyWord[];
  onComplete: (score: number, total: number) => void;
}

interface Question {
  word: VocabularyWord;
  options: string[];
  correctIndex: number;
}

export const MultipleChoiceGame = ({
  words,
  onComplete,
}: MultipleChoiceGameProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    initGame();
  }, [words]);

  const initGame = () => {
    const gameWords = shuffleArray(words).slice(0, 10);
    const generatedQuestions: Question[] = gameWords.map((word) => {
      const otherWords = words.filter((w) => w.id !== word.id);
      const wrongAnswers = shuffleArray(otherWords)
        .slice(0, 3)
        .map((w) => w.uzbek);
      const allAnswers = shuffleArray([...wrongAnswers, word.uzbek]);
      const correctIndex = allAnswers.indexOf(word.uzbek);

      return {
        word,
        options: allAnswers,
        correctIndex,
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowAnswer(false);
    setGameComplete(false);
  };

  const handleAnswer = (index: number) => {
    if (showAnswer) return;

    setSelectedAnswer(index);
    setShowAnswer(true);

    if (index === questions[currentIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setGameComplete(true);
      onComplete(score, questions.length);
    }
  };

  if (questions.length === 0) return null;

  if (gameComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center animate-fadeIn">
        <div
          className={cn(
            "w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center",
            percentage >= 70 ? "gradient-success" : "gradient-accent"
          )}
        >
          <span className="text-3xl font-bold text-primary-foreground">
            {percentage}%
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {percentage >= 70 ? "Ajoyib natija! 🎉" : "Yaxshi harakat! 💪"}
        </h2>
        <p className="text-muted-foreground mb-6">
          Siz {questions.length} ta savoldan {score} tasiga to'g'ri javob
          berdingiz
        </p>
        <Button onClick={initGame} size="lg">
          <RotateCcw className="w-4 h-4 mr-2" />
          Qayta o'ynash
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Savol {currentIndex + 1}/{questions.length}
          </span>
          <span>
            Ball: <span className="font-bold text-success">{score}</span>
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
        <p className="text-sm text-muted-foreground mb-2">
          Bu so'zning o'zbekcha tarjimasi nima?
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gradient">
          {currentQuestion.word.english}
        </h2>
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showAnswer}
            className={cn(
              "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left font-medium",
              !showAnswer &&
                "bg-card border-border hover:border-primary hover:shadow-soft",
              showAnswer &&
                index === currentQuestion.correctIndex &&
                "bg-success/10 border-success text-success",
              showAnswer &&
                selectedAnswer === index &&
                index !== currentQuestion.correctIndex &&
                "bg-destructive/10 border-destructive text-destructive"
            )}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showAnswer && index === currentQuestion.correctIndex && (
                <Check className="w-5 h-5 text-success" />
              )}
              {showAnswer &&
                selectedAnswer === index &&
                index !== currentQuestion.correctIndex && (
                  <X className="w-5 h-5 text-destructive" />
                )}
            </div>
          </button>
        ))}
      </div>

      {/* Next Button */}
      {showAnswer && (
        <Button onClick={handleNext} size="lg" className="w-full animate-fadeIn">
          {currentIndex < questions.length - 1 ? (
            <>
              Keyingi savol
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            "Natijani ko'rish"
          )}
        </Button>
      )}
    </div>
  );
};
