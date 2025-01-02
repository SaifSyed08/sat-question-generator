import { Question } from '../types';


interface QuestionCardProps {
  question: Question | null;
  userAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showResult: boolean;
}


export function QuestionCard({ question, userAnswer, onAnswerSelect, showResult }: QuestionCardProps) {
  if (!question || !question.options) return <div>Loading question...</div>;
  
  const isCorrect = userAnswer === question.correctAnswer;


  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
          {question.category}
        </span>
      </div>
     
      <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
     
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswerSelect(option)}
            className={`w-full text-left p-3 rounded transition-colors ${
              showResult
              ? option === question.correctAnswer && isCorrect
                ? 'bg-green-100 border-green-500'
                : option === userAnswer && option !== question.correctAnswer && !isCorrect
                  ? 'bg-red-100 border-red-500'
                  : 'bg-gray-50'
                : userAnswer === option
                ? 'bg-blue-100 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100'
            } border ${
              userAnswer === option ? 'border-2' : 'border'
            }`}
            disabled={showResult && isCorrect}
          >
            {option}
          </button>
        ))}
      </div>


      {showResult && (
        <div className={`mt-4 p-4 rounded ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          <p className="mt-2 text-gray-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
