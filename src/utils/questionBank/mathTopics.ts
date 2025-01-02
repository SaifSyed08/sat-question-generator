import { MathTopic, MathQuestion } from '../../types';

export const mathTopics: Record<MathTopic, {
  generateQuestion: () => MathQuestion;
}> = {
  algebra: {
    generateQuestion: () => {
      const questions = [
        {
          question: 'If f(x) = 2x² + 3x - 5, what is the value of f(2)?',
          options: ['3', '7', '9', '11'],
          correctAnswer: '7',
          explanation: 'To find f(2), substitute x=2 into the function:\nf(2) = 2(2)² + 3(2) - 5\n= 2(4) + 6 - 5\n= 8 + 6 - 5\n= 7',
          formula: 'f(x) = 2x² + 3x - 5'
        },
        {
          question: 'Solve for x: 3x + 7 = 4x - 2',
          options: ['-9', '-7', '9', '7'],
          correctAnswer: '-9',
          explanation: '3x + 7 = 4x - 2\n3x - 4x = -2 - 7\n-x = -9\nx = -9',
          formula: null
        }
      ];
      return questions[Math.floor(Math.random() * questions.length)];
    }
  },
  geometry: {
    generateQuestion: () => {
      const questions = [
        {
          question: 'In a circle with radius 6 units, what is the length of an arc that subtends a central angle of 60°?',
          options: ['2π', '3π', '4π', '6π'],
          correctAnswer: '2π',
          explanation: 'Arc length = (θ/360°) × 2πr\n= (60/360) × 2π(6)\n= (1/6) × 12π\n= 2π',
          formula: 'Arc length = (θ/360°) × 2πr'
        },
        {
          question: 'What is the area of a triangle with base 8 units and height 6 units?',
          options: ['12', '24', '48', '64'],
          correctAnswer: '24',
          explanation: 'Area of a triangle = (1/2) × base × height\n= (1/2) × 8 × 6\n= 24 square units',
          formula: 'Area = (1/2)bh'
        }
      ];
      return questions[Math.floor(Math.random() * questions.length)];
    }
  },
  trigonometry: {
    generateQuestion: () => {
      const questions = [
        {
          question: 'If sin θ = 0.6 and θ is in the first quadrant, what is cos θ?',
          options: ['0.6', '0.8', '0.5', '0.4'],
          correctAnswer: '0.8',
          explanation: 'Using the Pythagorean identity: sin²θ + cos²θ = 1\n0.6² + cos²θ = 1\n0.36 + cos²θ = 1\ncos²θ = 0.64\ncos θ = 0.8 (positive in first quadrant)',
          formula: 'sin²θ + cos²θ = 1'
        },
        {
          question: 'What is the tangent of 45°?',
          options: ['0', '1', '√2', '2'],
          correctAnswer: '1',
          explanation: 'At 45°, the sine and cosine are equal (1/√2).\ntan θ = sin θ / cos θ\n= (1/√2)/(1/√2)\n= 1',
          formula: 'tan θ = sin θ / cos θ'
        }
      ];
      return questions[Math.floor(Math.random() * questions.length)];
    }
  }
};