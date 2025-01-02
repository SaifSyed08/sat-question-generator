import { useState, useEffect } from 'react';
import { Category, Question, TestResult } from './types';
import { generateQuestion } from './utils/questionGenerator';
import { QuestionCard } from './components/QuestionCard';
import { CategorySelector } from './components/CategorySelector';
import { GraduationCap } from 'lucide-react';

function App() {
  const [category, setCategory] = useState<Category>('Reading');
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preloadedQuestions, setPreloadedQuestions] = useState<Record<Category, Question | null>>({
    Math: null,
    Reading: null,
    Writing: null
  });
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [questionCache, setQuestionCache] = useState<Record<Category, Question>>({} as Record<Category, Question>);
  const [pendingQuestions, setPendingQuestions] = useState<Record<Category, Question>>({} as Record<Category, Question>);

  const handleNewQuestion = async () => {
    setIsLoading(true);
    try {
      if (pendingQuestions[category]) {
        setQuestion(pendingQuestions[category]);
        setPendingQuestions(prev => {
          const { [category]: _, ...rest } = prev;
          return rest;
        });
        preloadQuestion(category);
      } else {
        const newQuestion = await generateQuestion(category);
        setQuestion(newQuestion);
      }
      setUserAnswer(null);
      setShowResult(false);
      setIsAnswerCorrect(null);
    } finally {
      setIsLoading(false);
    }

    preloadQuestion(category);
  };

  const handleSubmit = () => {
    if (!userAnswer || !question) return;

    const isCorrect = userAnswer === question.correctAnswer;
    setIsAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      const result: TestResult = {
        questionId: question.id,
        userAnswer,
        isCorrect: true,
      };
      const updatedResults = results.filter(r => r.questionId !== question.id);
      setResults([...updatedResults, result]);
    }
    setShowResult(true);
  };

  const handleCategoryChange = async (newCategory: Category) => {
    setIsLoading(true);
    try {
      // Save current question to cache
      if (question && category) {
        setQuestionCache(prev => ({
          ...prev,
          [category]: question
        }));
      }

      // Set new category first
      setCategory(newCategory);

      // Try to get question from cache or pending
      if (questionCache[newCategory]) {
        setQuestion(questionCache[newCategory]);
        // Generate a new pending question for this category
        preloadQuestion(newCategory);
      } else if (pendingQuestions[newCategory]) {
        setQuestion(pendingQuestions[newCategory]);
        // Clear this question from pending
        setPendingQuestions(prev => {
          const { [newCategory]: _, ...rest } = prev;
          return rest;
        });
        // Generate a new pending question for this category
        preloadQuestion(newCategory);
      } else {
        // If no cached or pending question, generate new one
        const newQuestion = await generateQuestion(newCategory);
        setQuestion(newQuestion);
        // Start preloading next question
        preloadQuestion(newCategory);
      }

      setUserAnswer(null);
      setShowResult(false);
      setIsAnswerCorrect(null);
    } finally {
      setIsLoading(false);
    }
  };

  const correctAnswers = results.filter(r => r.isCorrect).length;

  const preloadQuestion = async (category: Category) => {
    try {
      const newQuestion = await generateQuestion(category);
      setPendingQuestions(prev => ({
        ...prev,
        [category]: newQuestion
      }));
    } catch (error) {
      console.error(`Error preloading ${category} question:`, error);
    }
  };

  useEffect(() => {
    const loadInitialQuestions = async () => {
      setIsLoading(true);
      try {
        const initialQuestion = await generateQuestion(category);
        setQuestion(initialQuestion);

        const categories: Category[] = ['Math', 'Reading', 'Writing'];
        for (const cat of categories) {
          if (cat !== category) {
            preloadQuestion(cat);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">SAT Practice</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <CategorySelector
            selectedCategory={category}
            onSelectCategory={handleCategoryChange}
          />

          <div className="w-full max-w-2xl">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <QuestionCard
                question={question}
                userAnswer={userAnswer}
                onAnswerSelect={(answer) => {
                  setUserAnswer(answer);
                  setShowResult(false); // Reset result when answer changes
                }}
                showResult={showResult}
              />
            )}

            <div className="mt-6 flex justify-between items-center">
              <div className="text-gray-600">
                Score: {correctAnswers}/{results.length}
                {results.length > 0 && ` (${Math.round((correctAnswers / results.length) * 100)}%)`}
              </div>

              <div className="space-x-4">
                {(!showResult || !isAnswerCorrect) && (
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                )}
                {showResult && isAnswerCorrect && (
                  <button
                    onClick={handleNewQuestion}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;