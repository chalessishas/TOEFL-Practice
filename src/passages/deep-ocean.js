export const passage = `The ocean covers more than seventy percent of Earth's surface, yet the vast majority of its depths remain largely unexplored. Scientists estimate that humanity has mapped less than twenty percent of the world's ocean floor, making the deep sea one of the least understood environments on the planet. Advances in technology over recent decades have begun to change this reality, allowing researchers to venture into regions that were once completely inaccessible.

Exploring the deep ocean presents formidable technical challenges. At depths exceeding one thousand meters, known as the midnight zone, seawater pressure increases dramatically—reaching levels that would instantly destroy conventional equipment. Temperatures hover near freezing, and the complete absence of sunlight makes visual navigation virtually impossible without specialized illumination systems. Developing submersibles capable of withstanding these conditions has required significant engineering innovation and substantial financial investment.

Despite these obstacles, deep-sea exploration has yielded remarkable discoveries that have transformed our understanding of life on Earth. In 1977, researchers investigating the Galápagos Rift discovered hydrothermal vents—openings in the ocean floor that release superheated water rich in minerals. Surrounding these vents, scientists found thriving ecosystems sustained not by sunlight but by chemosynthesis, the process by which bacteria convert chemicals into energy. This discovery demonstrated that life could exist entirely independent of solar energy, profoundly challenging long-held assumptions about the prerequisites for biological communities.

The deep ocean also holds substantial economic interest. Vast deposits of polymetallic nodules—mineral-rich formations containing manganese, cobalt, and rare earth elements—lie scattered across the seafloor. Mining companies have proposed extracting these resources to meet growing demand for materials used in electronics and batteries. However, environmental scientists warn that such activities could cause irreversible damage to fragile ecosystems that took millennia to develop. The potential disruption of deep-sea sediment could spread toxic plumes affecting marine life across entire ocean basins.

The future of deep-ocean research likely hinges on advances in autonomous underwater vehicles, commonly called AUVs, which can operate without human crews for extended periods. These robotic explorers are increasingly capable of collecting high-resolution data, mapping terrain, and even conducting basic experiments independently. While challenges related to communication and power supply remain significant, researchers anticipate that improvements in AUV technology will eventually make systematic, large-scale deep-sea exploration both feasible and cost-effective.`;

export const questions = [
  {
    id: 1,
    type: 'vocab',
    paragraph: 1,
    text: 'The word "formidable" in paragraph 2 is closest in meaning to:',
    options: ['Fascinating', 'Daunting', 'Familiar', 'Minimal'],
    correct: 1,
    explanation: '"Formidable" describes something that is intimidating or difficult to overcome. The passage uses it to characterize technical challenges that present serious obstacles to exploration.',
  },
  {
    id: 2,
    type: 'detail',
    paragraph: 2,
    text: 'According to the passage, what did scientists find near hydrothermal vents?',
    options: [
      'Vast mineral deposits suitable for commercial mining',
      'Ecosystems that thrive without sunlight',
      'Ancient marine fossils from the Cretaceous period',
      'Evidence of prehistoric human coastal settlements',
    ],
    correct: 1,
    explanation: 'The passage explicitly states that scientists found "thriving ecosystems sustained not by sunlight but by chemosynthesis" near hydrothermal vents.',
  },
  {
    id: 3,
    type: 'negative_fact',
    paragraph: 1,
    text: 'According to the passage, all of the following make deep-sea exploration difficult EXCEPT:',
    options: [
      'Extremely high water pressure',
      'Complete absence of light',
      'Near-freezing temperatures',
      'Shortage of mineral resources on the seafloor',
    ],
    correct: 3,
    explanation: 'The passage lists pressure, darkness, and temperature as challenges. It never mentions a shortage of minerals—in fact, the opposite is stated: the ocean floor contains abundant polymetallic nodule deposits.',
  },
  {
    id: 4,
    type: 'vocab',
    paragraph: 2,
    text: 'The word "yielded" in paragraph 3 is closest in meaning to:',
    options: ['Surrendered', 'Produced', 'Concealed', 'Delayed'],
    correct: 1,
    explanation: '"Yielded" here means produced or resulted in. Deep-sea exploration has produced remarkable discoveries that changed scientific understanding.',
  },
  {
    id: 5,
    type: 'inference',
    paragraph: 2,
    text: 'What can be inferred about the significance of chemosynthesis from the passage?',
    options: [
      'It had already been widely studied before the 1977 discovery',
      'It functions identically to photosynthesis in surface ecosystems',
      'It demonstrated that solar energy is not a universal requirement for life',
      'It is now the dominant energy pathway in all marine ecosystems',
    ],
    correct: 2,
    explanation: 'The passage states the discovery "profoundly challenged long-held assumptions about the prerequisites for biological communities," implying that the scientific community previously assumed all life required solar energy.',
  },
  {
    id: 6,
    type: 'purpose',
    paragraph: 3,
    text: 'Why does the author mention polymetallic nodules in paragraph 4?',
    options: [
      'To explain the origin of hydrothermal vents',
      'To describe how AUVs are powered underwater',
      'To establish that the deep ocean has economic appeal that brings environmental risks',
      'To argue that mining regulations are already sufficient',
    ],
    correct: 2,
    explanation: 'The author introduces polymetallic nodules to show that the deep ocean attracts commercial interest, then uses this context to raise the environmental concerns associated with deep-sea mining.',
  },
  {
    id: 7,
    type: 'sentence_simplification',
    paragraph: 2,
    text: 'Which of the following best expresses the essential information in this sentence from paragraph 3: "This discovery demonstrated that life could exist entirely independent of solar energy, profoundly challenging long-held assumptions about the prerequisites for biological communities."',
    options: [
      'Scientists had long assumed that sunlight was required for all forms of life.',
      'Finding life that thrives without sunlight forced researchers to reconsider what conditions life actually requires.',
      'The discovery of hydrothermal vents proved that solar energy reaches the deep ocean floor.',
      'Bacteria capable of chemosynthesis were already well understood before 1977.',
    ],
    correct: 1,
    explanation: 'The sentence\'s core meaning is that life existing without sunlight challenged existing scientific assumptions. Option B captures both the finding (life without solar energy) and its consequence (reconsidering assumptions). The other options either reverse the meaning or state things the passage contradicts.',
  },
  {
    id: 8,
    type: 'detail',
    paragraph: 3,
    text: 'What specific environmental risk does the passage associate with deep-sea mining?',
    options: [
      'It would require more workers than are currently available',
      'Sediment disruption could spread toxic plumes across ocean basins',
      'The technology needed is not yet available',
      'Mineral deposits are too small to make extraction profitable',
    ],
    correct: 1,
    explanation: 'The passage states that "disruption of deep-sea sediment could spread toxic plumes affecting marine life across entire ocean basins" — this is the specific environmental risk identified.',
  },
  {
    id: 9,
    type: 'vocab',
    paragraph: 4,
    text: 'The phrase "hinges on" in paragraph 5 most nearly means:',
    options: ['Depends on', 'Moves away from', 'Argues against', 'Is unrelated to'],
    correct: 0,
    explanation: '"Hinges on" is an idiom meaning "depends critically on." The future of deep-ocean research is stated to depend on advances in AUV technology.',
  },
  {
    id: 10,
    type: 'attitude',
    paragraph: null,
    text: "The author's overall attitude toward the future of deep-sea exploration can best be described as:",
    options: [
      'Pessimistic — the technical and economic obstacles are insurmountable',
      'Indifferent — the passage presents only factual information without perspective',
      'Cautiously optimistic — significant challenges remain, but progress is anticipated',
      'Unconditionally enthusiastic — the author predicts complete success is guaranteed',
    ],
    correct: 2,
    explanation: 'The author acknowledges remaining challenges ("challenges...remain significant") while expressing that researchers "anticipate" improvements will make exploration "feasible and cost-effective." This balanced stance — acknowledging difficulty while expecting progress — reflects cautious optimism.',
  },
];
