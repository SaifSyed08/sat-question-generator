export type Category = 'Math' | 'Reading' | 'Writing';

export interface Question {
  id: string;
  category: Category;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface TestResult {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
} 