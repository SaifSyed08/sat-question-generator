export type Category = 'Reading' | 'Writing' | 'Math';

export type MathTopic = 'algebra' | 'geometry' | 'trigonometry';

export type Question = {
  id: string;
  category: Category;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  formula?: string | null;
};

export type MathQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  formula: string | null;
};

export type TestResult = {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
};