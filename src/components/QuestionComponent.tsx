import { useState, useEffect } from 'react';
import { generateQuestion } from '../utils/questionGenerator';
import { QuestionCard } from './QuestionCard';
import { Question } from '../types';

export function QuestionComponent() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        setLoading(true);
        console.log("Starting to generate question...");
        const newQuestion = await generateQuestion('Math');
        console.log("Generated question:", newQuestion);
        if (!newQuestion.question || !newQuestion.options) {
          console.error("Invalid question format:", newQuestion);
          throw new Error("Question generation failed");
        }
        setQuestion(newQuestion);
      } catch (error) {
        console.error("Error in loadQuestion:", error);
        setError(error instanceof Error ? error.message : 'Failed to generate question');
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;
  if (!question) return <div>No question available</div>;
  
  return <QuestionCard 
    question={question} 
    userAnswer={null} 
    onAnswerSelect={() => {}} 
    showResult={false}
  />;
} 