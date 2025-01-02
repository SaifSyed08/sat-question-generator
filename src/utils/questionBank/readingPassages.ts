// Collection of passage templates and topics for Reading section
export const readingPassageTemplates = {
  literature: [
    {
      topic: 'Victorian Literature',
      context: 'A young woman navigates social expectations in 19th century England',
      generatePassage: () => {
        const situations = [
          'At the grand ball, Elizabeth observed the subtle interplay of social hierarchies...',
          'The drawing room buzzed with whispered conversations as news of the inheritance spread...',
          'Morning light filtered through the library windows as Margaret contemplated her position...'
        ];
        return situations[Math.floor(Math.random() * situations.length)];
      }
    },
    {
      topic: 'Modern Fiction',
      context: 'An immigrant family adapts to life in a new country',
      generatePassage: () => {
        const situations = [
          'The aroma of unfamiliar spices wafted through the neighborhood...',
          'Between two languages, Maria found herself translating more than just words...',
          'The first snow fell like a blanket over their new home...'
        ];
        return situations[Math.floor(Math.random() * situations.length)];
      }
    }
  ],
  science: [
    {
      topic: 'Environmental Science',
      context: 'Climate adaptation in marine ecosystems',
      generatePassage: () => {
        const situations = [
          'Recent studies of coral reefs have revealed unprecedented adaptations...',
          'Marine biologists tracking deep-sea thermal vents discovered...',
          'The interaction between ocean acidification and marine life...'
        ];
        return situations[Math.floor(Math.random() * situations.length)];
      }
    }
  ],
  socialScience: [
    {
      topic: 'Psychology',
      context: 'Decision-making processes',
      generatePassage: () => {
        const situations = [
          'Research into cognitive biases has revealed that human decision-making...',
          'The relationship between emotion and rational thought...',
          'Studies of group dynamics demonstrate that collective wisdom...'
        ];
        return situations[Math.floor(Math.random() * situations.length)];
      }
    }
  ]
};