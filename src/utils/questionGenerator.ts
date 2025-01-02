import { Category, Question } from '../types';
import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from '@langchain/core/prompts';
import { QuestionCard } from '../components/QuestionCard';

// Initialize Llama 2 model using Ollama
let llm: Ollama;
try {
  llm = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama2",
  });
  console.log("Ollama initialized successfully");
} catch (error) {
  console.error("Failed to initialize Ollama:", error);
  throw error;
}

const exampleQuestions = {
  Math: [
    {
      question: "If f(x) = 2x² + 3x - 5, what is the value of f(-2)?",
      options: ["-1", "3", "-13", "1"],
      correctAnswer: "B",
      explanation: "Let's solve step by step: 1) f(-2) = 2(-2)² + 3(-2) - 5, 2) = 2(4) + (-6) - 5, 3) = 8 - 6 - 5 = -3"
    },
    {
      question: "In triangle ABC, angle A measures 60°, and side b = 8. If sin(B) = 0.8, what is the length of side a?",
      options: ["6.4", "7.2", "8.0", "9.6"],
      correctAnswer: "A",
      explanation: "Using the law of sines: a/sin(A) = b/sin(B). Therefore, a = b * sin(A)/sin(B)"
    }
  ],
  Reading: [
    {
      question: "Shimmering is a collective defense behavior that researchers have observed in giant honeybee colonies. When shimmering, different groups of bees flip their bodies up and down in what looks like waves. This defense is initiated when hornets hover near a colony, serving to deter the hornets from approaching the bees. Researchers hypothesize that this behavior is a specialized defense response to hornets, as it is not observed when other, larger predators approach the colony.\n Which choice best states the main idea of the text?",
      options: [
        "Hornets are known to be the main predator of giant honeybees.",
        "Several different species of insects use shimmering to defend against hornets",
        "Researchers think that shimmering in giant honeybees is a specific defense against hornets.",
        "Researchers are unsure how giant honeybees defend against predators larger than hornets."
      ],  
      correctAnswer: "C",
      explanation: "The text describes a study about how giant honeybees use shimmering to defend against hornets, but not other predators. The researchers conclude that shimmering could be a specialized defense response to hornets."
    },

    {
      question: "In order to combat climate change, many countries around the world have enacted policies to reduce greenhouse gas emissions. While these policies are generally lauded as positive steps, some critics argue that they do not go far enough. For instance, some carbon reduction policies allow companies to \"offset\" their emissions by investing in forest conservation or reforestation projects rather than actually reducing their own emissions. As a result, critics worry that these policies may inadvertently ______ \n Which choice most logically completes the text?",
      options: [
        "discourage companies from pursuing new methods to actually reduce their greenhouse gas emissions.",
        "encourage companies to reduce their emissions",
        "encourage companies to invest in reforestation",
        "encourage companies to invest in carbon capture"
      ],
      correctAnswer: "A",
      explanation: "The text suggests that these policies may discourage companies from pursuing new methods of carbon reduction, if offsetting practices are an easier or cheaper route to meeting guidelines."
    },

    {
       question: "The most recent iteration of the immersive theater experience Sleep No More, which premiered in New York City in 2011, transforms its performance space—a five-story warehouse—into a 1930s-era hotel. Audience members, who wander through the labyrinthine venue at their own pace and follow the actors as they play out simultaneous, interweaving narrative loops, confront the impossibility of experiencing the production in its entirety. The play’s refusal of narrative coherence thus hinges on the sense of spatial fragmentation that the venue’s immense and intricate layout generates. \n What does the text most strongly suggest about Sleep No More’s use of its performance space?",
       options: [
        "The production’s dependence on a particular performance environment would likely make it difficult to reproduce exactly in a different theatrical space.",
        "Audience members who navigate the space according to a recommended itinerary will likely have a better grasp of the play’s narrative than audience members who depart from that itinerary.",
        "The choice of a New York City venue likely enabled the play’s creators to experiment with the use of theatrical space in a way that venues from earlier productions could not.",
        "Audience members likely find the experience of the play disappointing because they generally cannot make their way through the entire venue."
       ],
       correctAnswer: "A",
       explanation: "The text says that the production’s use of its large, winding space has a very specific effect on the audience. Given that the space itself is so important to creating this effect, it would be difficult to reproduce the production in a different space."
    },

    {
      question: "Artist Justin Favela explained that he wanted to reclaim the importance of the piñata as a symbol in Latinx culture. To do so, he created numerous sculptures from strips of tissue paper, which is similar to the material used to create piñatas. In 2017, Favela created an impressive life-size piñata-like sculpture of the Gypsy Rose lowrider car, which was displayed at the Petersen Automotive Museum in Los Angeles, California. The Gypsy Rose lowrider was famously driven by Jesse Valadez, an early president of the Los Angeles Imperials Car Club. \n According to the text, which piece of Favela’s art was on display in the Petersen Automotive Museum in 2017?",
      options: [
        "A painting of Los Angeles",
        "A sculpture of Jesse Valadez",
        "A painting of a piñata",
        "A sculpture of a lowrider car"
      ],
      correctAnswer: "B",
      explanation: " The text describes Favela's approach to sculpture, and then describes the lowrider car that he depicted in 2017."
    },

    {
      question: "Utah is home to Pando, a colony of about 47,000 quaking aspen trees that all share a single root system. Pando is one of the largest single organisms by mass on Earth, but ecologists are worried that its growth is declining in part because of grazing by animals. The ecologists say that strong fences could prevent deer from eating young trees and help Pando start thriving again. According to the text, why are ecologists worried about Pando?",
      options: [
        "It isn’t growing at the same rate it used to.",
        "It isn’t producing young trees anymore. ",
        "It can’t grow into new areas because it is blocked by fences.",
        "Its root system can’t support many more new trees."
      ],
      correctAnswer: "A",
      explanation: " Choice A is the best answer because it presents an explanation that is directly stated in the text for why ecologists are worried about Pando."
    },
    {
      question: "“Loon Point” is a 1912 poem by Amy Lowell. In the poem, which presents a nighttime scene on a body of water, Lowell describes an element of nature as an active participant in the experience, writing, ______ \n Which quotation from “Loon Point” most effectively illustrates the claim?",
      options: [
        "Through the water the moon writes her legends / In light, on the smooth, wet sand.",
        "Softly the water ripples / Against the canoe’s curving side.",
        "“Or like the snow-white petals / Which drop from an overblown rose.",
        "But the moon in her wayward beauty / Is ever and always the same."
      ],
      correctAnswer: "A",
      explanation: "The text says that Lowell describes an element of nature as an active participant in the experience, and the first option is the only one that does this."
    },

    {
      question: "The following text is adapted from Edgar Allan Poe’s 1849 story \“Landor’s Cottage.\”\n During a pedestrian trip last summer, through one or two of the river counties of New York, I found myself, as the day declined, somewhat embarrassed about the road I was pursuing. The land undulated very remarkably; and my path, for the last hour, had wound about and about so confusedly, in its effort to keep in the valleys, that I no longer knew in what direction lay the sweet village of B——, where I had determined to stop for the night. \n Which choice best states the main idea of the text?",
      options: [
        "The narrator recalls fond memories of a journey that he took through some beautiful river counties.",
        "The narrator describes what he saw during a long trip through a frequently visited location.",
        "The narrator explains the difficulties he encountered on a trip and how he overcame them.",
        "The narrator remembers a trip he took and admits to getting lost."
      ],
      correctAnswer: "D",
      explanation: "Choice A is the best answer. The narrator is “embarrassed” about the route he took, which ends up leaving him lost and confused about how to get to his destination for the evening."
    },
    {
      question: "Birds sing to communicate over potentially great distances. For this reason, many researchers believe that birds in densely vegetated habitats generally sing at lower frequencies than birds living in comparatively sparse habitats, since dense vegetation tends to ______ the distance that high-frequency sounds can travel.\n Which choice completes the text with the most logical and precise word or phrase?",
      options: [
        "encompass",
        "conceal",
        "extend",
        "diminish"
      ],
      correctAnswer: "D",
      explanation: "Choice D is the best answer If birds sing to communicate over long distances, it would be logical to conclude that researchers believe that birds in densely vegetated habitats sing at lower frequencies than birds in relatively sparse habitats do."
    },
    {
      question: "Rydra Wong, the protagonist of Samuel R. Delany’s 1966 novel Babel-17, is a poet, an occupation which, in Delany’s work, is not ______: nearly a dozen of the characters that populate his novels are poets or writers. \n Which choice most logically completes the text?",
      options: [
        "uncommon",
        "unlikely",
        "unimportant",
        "unnecessary"
      ],
      correctAnswer: "A",
      explanation: "Choice A is the best answer. The text suggests that poets are not uncommon in Delany's work, and that Rydra Wong is one of them." 
    }
  ],
  Writing: [
    {
      question: "In order to create the Global Positioning System (GPS), scientists had to develop an accurate mathematical model of Earth’s shape that accounted for various forces, such as tides. ______ it was mathematician Gladys West who wrote the computer program that could perform these necessary calculations. \n Which choice completes the text with the most logical transition?",
      options: [
        "In other words,",
        "Ultimately,",
        "However,",
        "In addition,"
      ],
      correctAnswer: "B",
      explanation: "Choice B is the best answer. \"Ultimately\" logically signals that West’s completion of the computer program was the conclusion of the process described in the previous sentence."
    },
    {
      question: "Earth’s auroras—colorful displays of light seen above the northern and southern poles—result, broadly speaking, from the Sun’s activity. ______ the Sun releases charged particles that are captured by Earth’s magnetic eld and channeled toward the poles. These particles then collide with atoms in the atmosphere, causing the atoms to emit auroral light. \n Which choice most logically completes the text with the most logical transition?",
      options: [
        "Hence,",
        "Similarly,",
        "However,",
        "Specifically,"
      ],
      correctAnswer: "D",
      explanation: "Choice D is the best answer. \"Specifically\" logically signals that at the information in this sentence provides specic, precise details about how auroras result from the Sun’s activity."
    },
    {
      question: "\"Tulip mania\”—the rapid rise and sudden fall of the price of tulip bulbs in seventeenth-century Amsterdam—is often cited as an example of the perils of rampant market speculation. However, recent research has demonstrated that the episode was neither as frenzied nor as disastrous as has been thought. The popular myth surrounding it, ______ should be regarded with some skepticism. \n Which choice most logically completes the text with the most logical transition?",
      options: [
        "for example,",
        "by contrast,",
        "nevertheless,",
        "therefore,"
      ],
      correctAnswer: "D",
      explanation: "This sentence is arguing that new evidence contradicting popular beliefs about \“tulip mania\” should cast doubt on those beliefs. \“Therefore\” is a cause-and-effect transition, which ts perfectly in this context."
    },
    {
      question: "Bonnie Buratti of NASA’s Jet Propulsion Laboratory ______ data about Saturn’s rings collected by the Cassini spacecraft when she made an interesting discovery: the tiny moons embedded between and within Saturn’s rings are shaped by the buildup of ring material on the moons’ surfaces. \n Which choice completes the text so that it conforms to the conventions of Standard English?",
      options: [
        "studies",
        "has been studying",
        "will study",
        "was studying"
      ],
      correctAnswer: "D",
      explanation: "Choice D is the best answer. The past progressive tense correctly indicates that an ongoing action in the past was occurring (she was studying) at the same time that another past event occurred (she made an interesting discovery). It is also consistent with the tenses of other verbs in the sentence."
    },
    {
      question: "Roughly 300 nights a year, when the cold air descending from the Andes Mountains meets the warm air rising from Venezuela’s coastal Lake Maracaibo, the result is a spectacular lightning storm, its strikes so bright, so localized, and so ______ that it has become known as \“Maracaibo’s Lighthouse.\” \n Which choice completes the text so that it conforms to the conventions of Standard English?",
      options: [
        "dependable: ",
        "dependable; ",
        "dependable",
        "dependable, "
      ],
      correctAnswer: "C",
      explanation: "Choice C is the best answer. No punctuation is needed before the relative clause beginning with \"that\", so the word should be \"dependable\"."
    },
    {
      question: "Robin Wall Kimmerer of the Citizen Potawatomi Nation is a bryologist, a plant scientist who specializes in mosses. To Kimmerer, mosses are Earth’s most adaptable plants: they can clone ______ enter a dormant state in times of drought, and grow in areas that don’t have soil. \n Which choice completes the text so that it conforms to the conventions of Standard English?",
      options: [
        "themselves;",
        "themselves,",
        "themselves. And",
        "themselves"
      ],
      correctAnswer: "B",
      explanation: "Choice B is the best answer. The sentence introduces a list of facts about mosses, so the word should be \"themselves\"."
    },
    {
      question: "Water in the North Atlantic Ocean is pushed eastward by powerful winds, but the rotation of Earth and interference from nearby landmasses together cause ______ to swirl into a massive, churning whirlpool—also called the North Atlantic Gyre— that spins clockwise. \n Which choice completes the text so that it conforms to the conventions of Standard English?",
      options: [
        "these",
        "those",
        "them",
        "it"
      ],
      correctAnswer: "D",
      explanation: "Choice D is the best answer. The subject of the sentence is \"Water\", which is singular, so the word should be \"it\"."
    },
    {
      question: "On March 23, 2021, a gust of wind wreaked havoc on global trade. Ever Given, an international shipping container vessel, became lodged in Egypt’s Suez Canal, a major shipping route between Europe and Asia. The vessel took six days to ______ it’s as heavy as two thousand blue whales when fully loaded. \n Which choice most logically completes the text conforms to the conventions of Standard English?",
      options: [
        "dislodge in part due to its sheer size,",
        "dislodge, in part due to its sheer size:",
        "dislodge, in part, due to its sheer size,",
        "dislodge, in part, due to its sheer size"
      ],
      correctAnswer: "B",
      explanation: "Choice B is the best answer. The sentence correctly uses a colon to introduce another main clause, so the answer should be \"dislodge, in part due to its sheer size: \"."
    },
    {
      question: "Using natural debris, such as dried ______ such as plastic bags; and more traditional art supplies, such as tree glue, Ghanaian artist Ed Franklin Gavua creates his striking Yiiiiikakaii African masks, which he hopes can help viewers rethink how waste is used in their communities. \n Which choice most logically completes the text?",
      options: [
        "leaves, man-made trash:",
        "leaves; man-made trash,",
        "leaves, man-made trash,",
        "leaves; man-made trash;"
      ],
      correctAnswer: "B",
      explanation: "Choice B is the best answer. The sentence correctly uses a semicolon to separate a complex list, so the answer should be \"leaves; man-made trash:\""
    }
  ]
} as const;

export async function generateQuestion(category: Category): Promise<Question> {
  console.log(`Generating ${category} question...`);
  try {
    const example = exampleQuestions[category][
      Math.floor(Math.random() * exampleQuestions[category].length)
    ];
    
    const prompt = `You are an expert SAT question generator. Here's an example of a good ${category} question:

Question: ${example.question}
A) ${example.options[0]}
B) ${example.options[1]}
C) ${example.options[2]}
D) ${example.options[3]}
Logically Correct Answer: ${example.correctAnswer}
Explanation: ${example.explanation}

Now generate ONE similar SAT-style ${category} question STRICTLY following this format:


Question: [your question, include a passage/excerpt/context if necessary]

A) [first option]
B) [second option]
C) [third option]
D) [fourth option]
Logically Correct Answer: [A, B, C, or D]
Explanation: [logical explanation for the correct answer]

Make sure it's short, follows the format of the example question provided, and appropriate for the SAT exam.`;

    console.log('Sending prompt:', prompt);
    const response = await llm.call(prompt);
    console.log(`Raw ${category} response:`, response);
    
    const parsedResponse = parseModelResponse(response);
    console.log(`Parsed ${category} response:`, parsedResponse);
    
    return {
      id: Math.random().toString(36).substring(7),
      category,
      ...parsedResponse
    };
  } catch (error) {
    console.error(`Error generating ${category} question:`, error);
    throw error;
  }
}

function parseModelResponse(response: string) {
  const lines = response.split('\n');
  let passage = '';
  let question = '';
  let options: string[] = [];
  let correctAnswer = '';
  let explanation = '';
  
  let isInPassage = false;
  let isInQuestion = false;
  let isInExplanation = false;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (trimmedLine.startsWith('Passage:')) {
      isInPassage = true;
      isInQuestion = false;
      passage = trimmedLine.replace('Passage:', '').trim();
    } else if (trimmedLine.startsWith('Question:')) {
      isInPassage = false;
      isInQuestion = true;
      question = trimmedLine.replace('Question:', '').trim();
    } else if (trimmedLine.match(/^[A-D]\)/)) {
      isInQuestion = false;
      const option = trimmedLine;
      options.push(option.substring(3).trim());
    } else if (trimmedLine.startsWith('Logically Correct Answer:')) {
      const answer = trimmedLine.replace('Logically Correct Answer:', '').trim();
      const answerIndex = answer.charCodeAt(0) - 65;
      if (options[answerIndex]) {
        correctAnswer = options[answerIndex];
      }
    } else if (trimmedLine.startsWith('Explanation:')) {
      isInExplanation = true;
      explanation = trimmedLine.replace('Explanation:', '').trim();
    } else {
      // Append content based on current section
      if (isInPassage) {
        passage += '\n' + trimmedLine;
      } else if (isInQuestion) {
        question += '\n' + trimmedLine;
      } else if (isInExplanation) {
        explanation += '\n' + trimmedLine;
      }
    }
  }
  
  // Format the question with passage if it exists
  const fullQuestion = passage 
    ? `${passage}\n - - - \n${question}`
    : question;
  
  return { question: fullQuestion, options, correctAnswer, explanation };
}