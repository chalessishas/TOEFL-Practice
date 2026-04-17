// 2026 新托福 Practice Pack 6 — Reading Section

export const pack6 = {
  id: 'pack6',
  name: 'Practice Pack 6',
  modules: [
    // ═══ Module 1 ═══
    {
      id: 'pack6-m1',
      name: 'Module 1',
      time: 11 * 60 + 30,
      sections: [
        // --- Complete the Words ---
        {
          type: 'complete_words',
          id: 'pack6-m1-cw',
          title: 'Rain and Ecosystems',
          instructions: 'Fill in the missing letters in the paragraph.',
          paragraph: [
            { text: 'Rain is a crucial part of Earth\'s ecosystem, supporting both plant growth and animal survival.  As ' },
            { blank: 'itation', prefix: 'precip', answer: 'precipitation' },
            { text: ' falls ' },
            { blank: 'om', prefix: 'fr', answer: 'from' },
            { text: ' ' },
            { blank: 'ky', prefix: 'the s', answer: 'the sky' },
            { text: ', it ' },
            { blank: 'nishes', prefix: 'reple', answer: 'replenishes' },
            { text: ' water ' },
            { blank: 'rces', prefix: 'sou', answer: 'sources' },
            { text: ', nourishes ' },
            { blank: 'ation', prefix: 'veget', answer: 'vegetation' },
            { text: ', and ' },
            { blank: 'ains', prefix: 'sust', answer: 'sustains' },
            { text: ' wildlife.  Some ' },
            { blank: 'ions', prefix: 'reg', answer: 'regions' },
            { text: ' receive ' },
            { blank: 'dant', prefix: 'abun', answer: 'abundant' },
            { text: ' rainfall, ' },
            { blank: 'ile', prefix: 'wh', answer: 'while' },
            { text: ' others experience prolonged dry periods, affecting local environments.  Excessive rain can lead to floods, creating hazards for communities and natural habitats.  Despite occasional dangers, rainfall is essential for maintaining ecological balance, ensuring that plants and animals thrive in diverse climates around the world.' },
          ],
        },

        // --- Read in Daily Life: Maria's Email ---
        {
          type: 'daily_life',
          id: 'pack6-m1-dl1',
          title: 'Assignment Extension Request',
          material_type: 'email',
          material: {
            subject: 'Assignment Extension Request',
            from: 'Maria',
            to: 'Professor Kim',
            body: "Dear Professor Kim,\n\nI'm writing to request a two-day extension for the research paper. My laptop crashed and I lost three days of work. I have already started rewriting and can submit by Friday. Thank you for considering my request.\n\nBest regards,\nMaria",
          },
          questions: [
            {
              id: 11,
              text: 'What does Maria\'s mention of having "already started rewriting" suggest about her attitude?',
              options: [
                'Maria expects the professor to automatically approve her request.',
                'Maria is trying to make the professor feel sorry for her situation.',
                'Maria believes technical problems excuse students from meeting deadlines.',
                'Maria is taking responsibility and showing effort to complete the work.',
              ],
              correct: 3,
              question_type: 'inference',
              explanation: 'By mentioning she has "already started rewriting," Maria demonstrates proactive effort rather than passivity. She is not just explaining a problem — she is showing she is actively working toward a solution, which signals responsibility.',
            },
            {
              id: 12,
              text: 'What is Maria asking for?',
              options: [
                'Help recovering her lost computer files',
                'Additional time to complete an assignment',
                'Permission to submit a shorter research paper',
                'Technical support for her laptop problems',
              ],
              correct: 1,
              question_type: 'detail',
              explanation: 'Maria explicitly writes "I\'m writing to request a two-day extension for the research paper." She is asking for more time, not file recovery, a shorter paper, or tech support.',
            },
          ],
        },

        // --- Read in Daily Life: Heating Maintenance ---
        {
          type: 'daily_life',
          id: 'pack6-m1-dl2',
          title: 'Heating System Maintenance',
          material_type: 'email',
          material: {
            subject: 'Upcoming Heating System Maintenance – Tuesday, May 27',
            from: 'Robert Thompson',
            to: 'Ms. Gardner',
            body: "Dear Ms. Gardner,\n\nI hope you're doing well. I'm writing to inform you of a scheduled maintenance procedure on the office heating system, set to take place on Tuesday, May 27, from 8:00 A.M. to 5:00 P.M. This essential work is part of our seasonal inspection and efficiency upgrade initiative to ensure optimal performance during the colder months.\n\nPlease note that the heating system will be offline throughout the day, and indoor temperatures will drop noticeably. We recommend dressing in warm layers and advising your team to do the same. If any team members are particularly sensitive to cooler environments, remote work arrangements may be considered.\n\nAdditionally, as external technicians will be on-site, please ensure all confidential materials are secured appropriately.\n\nShould you have any questions, contact the maintenance team at 555-7264.\n\nWarm regards,\nRobert Thompson",
          },
          questions: [
            {
              id: 13,
              text: 'What is indicated about the office heating system?',
              options: [
                'It failed an inspection.',
                'It will not be functioning during maintenance.',
                'It is not working properly.',
                'It performs optimally.',
              ],
              correct: 1,
              question_type: 'detail',
              explanation: 'The email states "the heating system will be offline throughout the day." This directly indicates it will not be functioning during maintenance. There is no mention of it having failed an inspection or not working properly — the maintenance is scheduled and preventive.',
            },
            {
              id: 14,
              text: 'What can be inferred about the weather on May 27?',
              options: [
                'It will be cooler than the temperature at which the office is normally kept.',
                'It will be unusual for the season.',
                'It will require office workers to stay home rather than going to the office.',
                'It will change throughout the day.',
              ],
              correct: 0,
              question_type: 'inference',
              explanation: 'The email says "indoor temperatures will drop noticeably" when the heating is off, and recommends "dressing in warm layers." This implies the outdoor/unheated temperature is cooler than the office is normally kept. Remote work is only "considered" for sensitive employees, not required for everyone.',
            },
            {
              id: 15,
              text: 'Who will be performing maintenance?',
              options: [
                'Ms. Gardner',
                'Ms. Gardner\'s team members',
                'Professionals from another company',
                'Robert Thompson',
              ],
              correct: 2,
              question_type: 'detail',
              explanation: 'The email mentions "external technicians will be on-site," meaning professionals from outside the company. Robert Thompson is the sender, not the maintenance worker, and Ms. Gardner\'s team is asked to secure confidential materials, not perform repairs.',
            },
          ],
        },

        // --- Read an Academic Passage: Fungi ---
        {
          type: 'academic_passage',
          id: 'pack6-m1-ap',
          title: 'The Role of Fungi in Ecosystems',
          passage: `Fungi play a crucial role in ecosystems, often working behind the scenes to decompose organic matter and recycle nutrients. Unlike plants, fungi do not photosynthesize; instead, they obtain energy by breaking down dead plants and animals. This decomposition process is essential for nutrient cycling, as it releases vital elements like nitrogen and phosphorus back into the soil, supporting new plant growth. Their role in nutrient cycling is indispensable for healthy ecosystems.

One fascinating group of fungi is mycorrhizal fungi, which form symbiotic relationships with plant roots. These fungi extend the root system of plants, allowing them to access water and nutrients more efficiently. In return, the plants provide the fungi with carbohydrates produced through photosynthesis. This mutually beneficial relationship enhances plant growth and resilience, particularly in nutrient-poor soils.

Not all fungi are beneficial. Some pathogenic fungi cause diseases in plants and animals, leading to significant agricultural and ecological impacts. For example, the chytrid fungus has devastated amphibian populations worldwide. Understanding the diverse roles of fungi in ecosystems can help scientists develop strategies to mitigate their negative effects while leveraging their benefits for environmental sustainability.`,
          questions: [
            {
              id: 16,
              paragraph: 1,
              text: 'According to the passage, fungi are beneficial to plants in terms of',
              options: [
                'helping plants to decompose organic matter',
                'making it possible for plants to photosynthesize',
                'reducing the amount of nitrogen and phosphorus inside plants',
                'helping plants to obtain nutrients',
              ],
              correct: 3,
              question_type: 'detail',
              explanation: 'Paragraph 2 describes mycorrhizal fungi that "extend the root system of plants, allowing them to access water and nutrients more efficiently." This directly supports option D. Fungi decompose matter themselves (not helping plants do it), and the passage says fungi don\'t photosynthesize.',
            },
            {
              id: 17,
              paragraph: 0,
              text: 'The word "indispensable" in the passage is closest in meaning to',
              options: [
                'similar',
                'well-known',
                'essential',
                'useful',
              ],
              correct: 2,
              question_type: 'vocab',
              highlighted_word: 'indispensable',
              explanation: '"Indispensable" means absolutely necessary or essential — something you cannot do without. The sentence says fungi\'s role "is indispensable for healthy ecosystems," meaning it is essential/required. "Useful" is too weak; "similar" and "well-known" are unrelated.',
            },
            {
              id: 18,
              paragraph: null,
              text: 'Which of the following is NOT mentioned in the passage as a process performed by fungi?',
              options: [
                'Decomposing organic matter',
                'Releasing nitrogen and phosphorus into the soil',
                'Forming important relationships with plant roots',
                'Producing their own food',
              ],
              correct: 3,
              question_type: 'negative_fact',
              explanation: 'The passage explicitly states fungi "do not photosynthesize" — they cannot produce their own food. All other options are directly mentioned: decomposing organic matter (P1), releasing nitrogen/phosphorus (P1), and forming relationships with plant roots (P2).',
            },
            {
              id: 19,
              paragraph: 2,
              text: 'What can be inferred about the diverse roles of fungi?',
              options: [
                'This diversity makes fungi especially difficult for scientists to understand.',
                'This diversity is considered to be important for the ongoing health of the environment.',
                'This diversity will decline when harmful fungi are eliminated.',
                'This diversity has been linked to the sustainability of amphibian populations.',
              ],
              correct: 1,
              question_type: 'inference',
              explanation: 'The passage concludes that understanding fungi\'s diverse roles can help "leveraging their benefits for environmental sustainability." This implies their diversity is important for environmental health. The chytrid fungus devastated amphibians — fungi diversity isn\'t linked to amphibian sustainability.',
            },
            {
              id: 20,
              paragraph: 1,
              text: 'What can be inferred about mycorrhizal fungi?',
              options: [
                'They compete with plants for carbohydrates.',
                'They help plants absorb nutrients.',
                'They decompose dead plants and animals.',
                'They can cause diseases in plants.',
              ],
              correct: 1,
              question_type: 'inference',
              explanation: 'Paragraph 2 says mycorrhizal fungi "extend the root system of plants, allowing them to access water and nutrients more efficiently." This means they help plants absorb nutrients. They receive carbohydrates from plants (not compete for them). Decomposition and disease are roles of other fungi types.',
            },
            {
              id: 22,
              paragraph: 1,
              text: 'Look at the four squares [■] that indicate where the following sentence could be added to the passage. Where would the sentence best fit?',
              insert_sentence: 'Unlike most surface roots, these fungal extensions can reach far into the soil, accessing pockets of water and minerals that would otherwise be unavailable to the plant.',
              insertion_points: [
                'One fascinating group',
                'These fungi extend',
                'In return',
                'This mutually beneficial',
              ],
              options: ['■A', '■B', '■C', '■D'],
              correct: 2,
              question_type: 'text_insertion',
              explanation: 'Position C (before "In return") is best. The insert sentence explains HOW the fungi reach deeper resources — a detail that logically follows the general claim that fungi "extend the root system" (sentence 2) and precedes the exchange relationship ("In return, the plants provide carbohydrates", sentence 3). Positions A and B are too early; the sentence needs the context of mycorrhizal fungi. Position D breaks up the summary statement.',
            },
            {
              id: 21,
              paragraph: 0,
              text: 'Which of the following best expresses the essential information in the highlighted sentence? Incorrect choices change the meaning or leave out essential information.',
              highlighted_word: 'This decomposition process is essential for nutrient cycling, as it releases vital elements like nitrogen and phosphorus back into the soil, supporting new plant growth.',
              options: [
                'Nutrient cycling by plants releases nitrogen and phosphorus, which fungi then use to decompose organic matter.',
                'The breakdown of organic matter by fungi returns key nutrients to the soil, helping new plants grow.',
                'Fungi must absorb nitrogen and phosphorus from the soil before they can begin the decomposition process.',
                'Because plants need nitrogen and phosphorus, fungi decompose soil to create space for new plant roots.',
              ],
              correct: 1,
              question_type: 'sentence_simplification',
              explanation: 'The original sentence has two parts: (1) fungi decompose organic matter, and (2) this releases nitrogen/phosphorus into the soil, which supports plant growth. Option B captures both parts accurately. Option A reverses who does the cycling. Option C misrepresents fungi as absorbing rather than releasing nutrients. Option D invents a claim about creating space for roots.',
            },
          ],
        },
      ],
    },

    // ═══ Module 2 ═══
    {
      id: 'pack6-m2',
      name: 'Module 2',
      time: 9 * 60,
      sections: [
        // --- Complete the Words ---
        {
          type: 'complete_words',
          id: 'pack6-m2-cw',
          title: 'Volcanoes',
          instructions: 'Fill in the missing letters in the paragraph.',
          paragraph: [
            { text: 'Volcanoes are openings in Earth\'s crust through which molten rock, ash, and gases are ejected.  Volcanic ' },
            { blank: 'tions', prefix: 'erup', answer: 'eruptions' },
            { text: ' can ' },
            { blank: 'ate', prefix: 'cre', answer: 'create' },
            { text: ' islands, ' },
            { blank: 'tains', prefix: 'moun', answer: 'mountains' },
            { text: ', and ' },
            { blank: 'her', prefix: 'ot', answer: 'other' },
            { text: ' landforms, but ' },
            { blank: 'ey', prefix: 'th', answer: 'they' },
            { text: ' can ' },
            { blank: 'so', prefix: 'al', answer: 'also' },
            { text: ' be ' },
            { blank: 'uctive', prefix: 'destr', answer: 'destructive' },
            { text: ', causing ' },
            { blank: 'age', prefix: 'dam', answer: 'damage' },
            { text: ' to ' },
            { blank: 'by', prefix: 'near', answer: 'nearby' },
            { text: ' areas.  ' },
            { blank: 'ying', prefix: 'Stud', answer: 'Studying' },
            { text: ' volcanoes helps scientists understand Earth\'s internal processes: for example, how volcanoes form at tectonic plate boundaries or over hotspots in the mantle and how magma rises up from the mantle and erupts as lava on the surface.' },
          ],
        },

        // --- Read in Daily Life: Community Solar Program ---
        {
          type: 'daily_life',
          id: 'pack6-m2-dl1',
          title: 'Community Solar Enrollment',
          material_type: 'email',
          material: {
            subject: 'Invitation to Join the Maplewood Community Solar Program',
            from: 'Green Horizons Energy',
            to: 'Maplewood Residents',
            body: "Dear Maplewood Resident,\n\nWe are pleased to invite you to enroll in the Maplewood Community Solar Program, launching this spring. By joining, you can access locally generated solar electricity without installing any equipment on your property.\n\nParticipants receive a monthly credit on their utility bill based on their share of the solar array's output. Average savings are estimated at 10–15% per year. Enrollment is free, and there are no cancellation fees if you move or change your mind within the first 60 days.\n\nSpaces are limited. Please return the enclosed enrollment form by April 30 or visit greenhorizons.com/maplewood to sign up online.\n\nWarm regards,\nGreen Horizons Energy",
          },
          questions: [
            {
              id: 19,
              text: 'What is one benefit of joining the program mentioned in the email?',
              options: [
                'Free solar panels installed on your home',
                'A reduction in monthly electricity bills',
                'Guaranteed electricity during power outages',
                'Priority access to city energy subsidies',
              ],
              correct: 1,
              question_type: 'detail',
              explanation: 'The email states participants receive "a monthly credit on their utility bill," resulting in estimated savings of 10–15% per year — a reduction in electricity bills. Installing panels on your home, outage protection, and subsidy priority are not mentioned.',
            },
            {
              id: 20,
              text: 'What can be inferred about residents who enroll but then move within the first two months?',
              options: [
                'They will be required to pay a cancellation fee.',
                'They can leave the program without financial penalty.',
                'They must transfer their enrollment to the new resident.',
                'They will lose any bill credits they have already received.',
              ],
              correct: 1,
              question_type: 'inference',
              explanation: 'The email explicitly states "there are no cancellation fees if you move or change your mind within the first 60 days." 60 days equals approximately two months, so residents who move within that period can exit the program at no cost.',
            },
          ],
        },

        // --- Read in Daily Life: Office Energy Policy ---
        {
          type: 'daily_life',
          id: 'pack6-m2-dl2',
          title: 'Office Energy Conservation Policy',
          material_type: 'email',
          material: {
            subject: 'New Office Energy Conservation Guidelines – Effective Monday',
            from: 'Facilities Management',
            to: 'All Staff',
            body: "Dear Team,\n\nAs part of our commitment to reducing the building's carbon footprint, Facilities Management is introducing the following energy conservation guidelines, effective this Monday:\n\n1. Computers and monitors must be shut down — not merely put to sleep — at the end of each workday.\n2. Lights in meeting rooms should be turned off when not in use. Motion-sensor lights have been installed in Rooms 3A and 3B.\n3. The air conditioning setpoint has been raised from 21°C to 23°C during summer months. Personal desk fans are permitted.\n4. Staff are encouraged to use the stairs for floors 1–4 to reduce elevator energy use.\n\nThese measures are expected to cut the building's electricity consumption by approximately 12%. Compliance will be tracked quarterly, and departments that meet targets will be recognized in the company newsletter.\n\nThank you for your cooperation.\nFacilities Management",
          },
          questions: [
            {
              id: 21,
              text: 'According to the email, what change has been made to Rooms 3A and 3B?',
              options: [
                'The air conditioning setpoint has been lowered.',
                'The rooms have been converted into storage areas.',
                'Lighting has been automated with motion sensors.',
                'Computers in those rooms must now be fully shut down.',
              ],
              correct: 2,
              question_type: 'detail',
              explanation: 'The email states "Motion-sensor lights have been installed in Rooms 3A and 3B." This means the lighting in those rooms is now automated — it turns on or off based on detected movement.',
            },
            {
              id: 22,
              text: 'What is indicated about the new air conditioning policy?',
              options: [
                'Personal cooling devices are prohibited under the new policy.',
                'The change applies to all seasons equally.',
                'Staff may use personal fans to compensate for the warmer setting.',
                'The setpoint was previously set to 23°C.',
              ],
              correct: 2,
              question_type: 'detail',
              explanation: 'The email raises the A/C setpoint to 23°C during summer and adds "Personal desk fans are permitted," meaning staff can use fans to stay comfortable. Fans are permitted, not prohibited. The change only applies to summer months, not all seasons. The previous setpoint was 21°C, not 23°C.',
            },
            {
              id: 23,
              text: 'What can be inferred about how compliance will be monitored?',
              options: [
                'Individual employees will be penalized for violations.',
                'The building will undergo daily inspections by Facilities Management.',
                'Progress will be assessed on a team basis every three months.',
                'Results will only be shared with department heads.',
              ],
              correct: 2,
              question_type: 'inference',
              explanation: '"Compliance will be tracked quarterly, and departments that meet targets will be recognized" implies that performance is measured at the department level every quarter (three months). Penalizing individuals, daily inspections, and restricted reporting are not mentioned.',
            },
          ],
        },

        // --- Read an Academic Passage: Renewable Energy ---
        {
          type: 'academic_passage',
          id: 'pack6-m2-ap',
          title: 'Renewable Energy Sources',
          passage: `Renewable energy sources, such as solar, wind, and hydroelectric power, are increasingly gaining attention as alternatives to fossil fuels. Solar panels convert sunlight into electricity, providing a clean and abundant energy source. Wind turbines harness the power of wind, while hydroelectric plants use flowing water to generate electricity. These technologies offer significant environmental benefits, including reduced greenhouse gas emissions and decreased reliance on non-renewable resources.

However, renewable energy is not without its challenges. Solar and wind energy are intermittent, meaning they can be inconsistent depending on weather conditions. This intermittency requires the development of advanced storage solutions to ensure a steady supply of electricity. Additionally, the initial cost of installing renewable energy infrastructure can be high, although long-term savings and environmental benefits often outweigh this investment.

Recent innovations are addressing these issues. For instance, researchers are developing more efficient solar panels and energy storage systems that can store excess power generated during peak times. Wind turbines are being designed to operate in lower wind speeds, increasing their efficiency. Governments and private companies are also investing in renewable energy projects, recognizing the importance of transitioning to sustainable energy sources.`,
          questions: [
            {
              id: 11,
              paragraph: 0,
              text: 'Which of the following is mentioned in the passage as one environmental benefit of renewable energy sources?',
              options: [
                'They lower the amount of greenhouse gas produced.',
                'They provide a steady supply of electricity.',
                'They are easy to install.',
                'They can operate in all weather conditions.',
              ],
              correct: 0,
              question_type: 'detail',
              explanation: 'Paragraph 1 explicitly lists "reduced greenhouse gas emissions" as an environmental benefit. A "steady supply" is actually a challenge (paragraph 2 discusses intermittency). The passage never says they are easy to install or work in all weather.',
            },
            {
              id: 12,
              paragraph: 1,
              text: 'What challenge is associated with solar and wind energy?',
              options: [
                'High greenhouse gas emissions',
                'Inconsistent energy production',
                'Excessive reliance on fossil fuels',
                'Limited technological development',
              ],
              correct: 1,
              question_type: 'detail',
              explanation: 'Paragraph 2 states solar and wind energy "are intermittent, meaning they can be inconsistent depending on weather conditions." This directly matches "inconsistent energy production." Renewable energy reduces greenhouse gas emissions, not increases them.',
            },
            {
              id: 13,
              paragraph: 2,
              text: 'How are researchers addressing the issue of energy intermittency?',
              options: [
                'By developing more efficient solar panels',
                'By decreasing the cost of installation',
                'By using fossil fuels as a backup',
                'By limiting the use of renewable energy',
              ],
              correct: 0,
              question_type: 'detail',
              explanation: 'Paragraph 3 says "researchers are developing more efficient solar panels and energy storage systems." While storage directly addresses intermittency, the question asks about researchers\' approach, and developing better solar panels is explicitly mentioned. Fossil fuel backup and limiting use are never discussed.',
            },
            {
              id: 14,
              paragraph: 0,
              text: 'The word "reliance" in the passage is closest in meaning to',
              options: [
                'dependence',
                'trust',
                'use',
                'production',
              ],
              correct: 0,
              question_type: 'vocab',
              highlighted_word: 'reliance',
              explanation: '"Reliance" means the state of depending on something. "Decreased reliance on non-renewable resources" means reduced dependence on them. While "trust" is a related sense of the word, in this context it refers to dependence/need, not confidence.',
            },
            {
              id: 15,
              paragraph: 2,
              text: 'What is the author\'s purpose in mentioning "recent innovations"?',
              options: [
                'To highlight the drawbacks of renewable energy',
                'To suggest that fossil fuels are still necessary',
                'To describe solutions to the challenges of renewable energy',
                'To argue that the cost of renewable energy is too high',
              ],
              correct: 2,
              question_type: 'purpose',
              highlighted_word: 'Recent innovations',
              explanation: 'Paragraph 3 opens with "Recent innovations are addressing these issues" — "these issues" refers to the challenges discussed in paragraph 2 (intermittency and cost). The purpose is to show that solutions exist, not to criticize renewable energy or promote fossil fuels.',
            },
            {
              id: 16,
              paragraph: null,
              text: 'According to the passage, which of the following is NOT mentioned as a method of generating renewable energy?',
              options: [
                'Converting sunlight into electricity',
                'Harnessing the power of wind',
                'Using nuclear reactions to produce heat',
                'Using flowing water to generate electricity',
              ],
              correct: 2,
              question_type: 'negative_fact',
              explanation: 'The passage mentions solar panels (sunlight), wind turbines (wind), and hydroelectric plants (flowing water) as renewable energy methods. Nuclear reactions are never mentioned in the passage — nuclear power is not classified as renewable energy in the text.',
            },
            {
              id: 18,
              paragraph: 1,
              text: 'Look at the four squares [■] that indicate where the following sentence could be added to the passage. Where would the sentence best fit?',
              insert_sentence: 'Battery technology, for instance, has recently become more affordable and efficient, making large-scale energy storage increasingly viable.',
              insertion_points: [
                'However, renewable energy',
                'Solar and wind energy',
                'This intermittency requires',
                'Additionally, the initial cost',
              ],
              options: ['■A', '■B', '■C', '■D'],
              correct: 3,
              question_type: 'text_insertion',
              explanation: 'Position D (before "Additionally") is best. The insert sentence gives a specific example of a storage solution — it logically follows the sentence stating that "advanced storage solutions" are needed (position C\'s paragraph) and provides a concrete example before the passage moves on to discuss costs. Position A is too early (before challenges are introduced). Position B interrupts the definition of intermittency. Position C would separate "intermittency" from its storage solution context.',
            },
            {
              id: 17,
              paragraph: 1,
              text: 'Which of the following best expresses the essential information in the highlighted sentence? Incorrect choices change the meaning or leave out essential information.',
              highlighted_word: 'Solar and wind energy are intermittent, meaning they can be inconsistent depending on weather conditions.',
              options: [
                'Solar and wind power will eventually be replaced by energy sources that are not affected by weather.',
                'Because weather affects how much power solar and wind sources produce, their output is not always steady.',
                'The intermittency of renewable energy has caused governments to invest in fossil fuel alternatives.',
                'Solar and wind energy generate inconsistent levels of pollution depending on current weather conditions.',
              ],
              correct: 1,
              question_type: 'sentence_simplification',
              explanation: 'The original sentence states that solar and wind energy output varies based on weather (intermittent = inconsistent). Option B captures this accurately: weather affects output, making it unsteady. Option A introduces replacement by other sources, which is not stated. Option C inverts the relationship and brings in fossil fuels incorrectly. Option D misrepresents "inconsistent" as referring to pollution levels.',
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════
    // MODULE 3 — Climate Systems & Ocean Acidification
    // ═══════════════════════════════════════════════════════
    {
      id: 'pack6-m3',
      name: 'Module 3',
      time: 9 * 60,
      sections: [
        // --- Complete the Words ---
        {
          type: 'complete_words',
          id: 'pack6-m3-cw',
          title: 'Climate Systems',
          instructions: 'Fill in the missing letters in the paragraph.',
          paragraph: [
            { text: 'Earth\'s climate is shaped by complex interactions between the atmosphere, oceans, land, and living organisms. Solar ' },
            { blank: 'tion', prefix: 'radia', answer: 'radiation' },
            { text: ' warms the planet\'s surface, while greenhouse gases such as carbon dioxide ' },
            { blank: 'ain', prefix: 'ret', answer: 'retain' },
            { text: ' heat in the atmosphere. Human ' },
            { blank: 'ivities', prefix: 'act', answer: 'activities' },
            { text: ', especially the burning of fossil fuels, have ' },
            { blank: 'sed', prefix: 'increa', answer: 'increased' },
            { text: ' the concentration of these gases, leading to ' },
            { blank: 'al', prefix: 'glob', answer: 'global' },
            { text: ' warming. Rising temperatures are causing glaciers to ' },
            { blank: 't', prefix: 'mel', answer: 'melt' },
            { text: ', sea levels to ' },
            { blank: 'e', prefix: 'ris', answer: 'rise' },
            { text: ', and weather ' },
            { blank: 'terns', prefix: 'pat', answer: 'patterns' },
            { text: ' to become more extreme. Understanding these processes is essential for developing effective strategies to ' },
            { blank: 'igate', prefix: 'mit', answer: 'mitigate' },
            { text: ' climate change and protect ecosystems worldwide.' },
          ],
        },

        // --- Read in Daily Life: Campus Recycling Program ---
        {
          type: 'daily_life',
          id: 'pack6-m3-dl1',
          title: 'Campus Recycling Initiative',
          material_type: 'email',
          material: {
            subject: 'Launch of the Green Campus Recycling Initiative – Your Participation Needed',
            from: 'Office of Campus Sustainability',
            to: 'All Students and Staff',
            body: "Dear Campus Community,\n\nWe are excited to announce the launch of the Green Campus Recycling Initiative, beginning on the first of next month. New color-coded recycling bins have been installed in all dormitories, classrooms, and common areas.\n\nHere is a quick guide:\n• Blue bins — paper and cardboard\n• Yellow bins — plastic bottles and aluminum cans\n• Green bins — food waste and compostable items\n• Gray bins — general non-recyclable waste\n\nPlease note that contaminated materials (e.g., greasy pizza boxes or items with food residue) should go in the gray bins even if the material itself is recyclable. Contamination reduces the value of recyclable materials and can cause entire batches to be rejected.\n\nWorkshops on proper sorting will be held every Thursday at 12:00 PM in the Student Union, Room 204, throughout the month. Attendance is optional but encouraged.\n\nThank you for helping us build a more sustainable campus.\n\nOffice of Campus Sustainability",
          },
          questions: [
            {
              id: 11,
              text: 'According to the email, where should a greasy pizza box be placed?',
              options: [
                'In the blue bin, since it is made of cardboard',
                'In the green bin, because it contains food residue',
                'In the gray bin, regardless of the material',
                'In the yellow bin, after removing the grease',
              ],
              correct: 2,
              question_type: 'detail',
              explanation: 'The email explicitly states that "contaminated materials (e.g., greasy pizza boxes or items with food residue) should go in the gray bins even if the material itself is recyclable." A pizza box is cardboard (recyclable) but contamination overrides the material rule.',
            },
            {
              id: 12,
              text: 'What can be inferred about why contamination is a problem for recycling?',
              options: [
                'It makes the bins harder to clean after collection.',
                'It can cause recyclable materials to become non-recyclable in bulk.',
                'It releases harmful gases during the sorting process.',
                'It increases the cost of operating the gray waste bins.',
              ],
              correct: 1,
              question_type: 'inference',
              explanation: 'The email warns that contamination "can cause entire batches to be rejected." This implies that a single contaminated item can ruin an entire collection of otherwise recyclable materials, making the bulk non-recyclable. The other options introduce ideas not mentioned in the email.',
            },
          ],
        },

        // --- Read in Daily Life: Water Conservation Notice ---
        {
          type: 'daily_life',
          id: 'pack6-m3-dl2',
          title: 'Building Water Conservation Notice',
          material_type: 'email',
          material: {
            subject: 'Mandatory Water Conservation Measures – Building 7 & 8',
            from: 'Property Management Office',
            to: 'Residents of Buildings 7 and 8',
            body: "Dear Residents,\n\nDue to ongoing drought conditions in the region, the city has requested that all commercial and residential properties reduce water consumption by at least 20% over the next 60 days. To comply with this request, the following measures will be implemented in Buildings 7 and 8 starting this Friday:\n\n1. Laundry facilities will operate on reduced hours: Monday, Wednesday, and Friday from 9:00 AM to 6:00 PM only.\n2. Outdoor landscaping irrigation will be suspended until further notice.\n3. Pool and jacuzzi areas will be temporarily closed.\n4. Residents are asked to limit showers to five minutes and report any visible leaks to the office immediately.\n\nWe understand these restrictions may be inconvenient, and we appreciate your cooperation. Residents who exceed average water usage by more than 30% may be contacted individually.\n\nProperty Management Office",
          },
          questions: [
            {
              id: 13,
              text: 'What is the primary reason for the water conservation measures?',
              options: [
                'A burst pipe has reduced water pressure in the buildings.',
                'The property management wants to lower utility expenses.',
                'City authorities have requested reduced water use due to drought.',
                'New environmental regulations require all buildings to cut water use.',
              ],
              correct: 2,
              question_type: 'detail',
              explanation: 'The notice states "the city has requested that all commercial and residential properties reduce water consumption" due to "ongoing drought conditions." The measures are a response to a city request prompted by drought, not a pipe issue, cost-cutting, or new regulations.',
            },
            {
              id: 14,
              text: 'On which days can residents use the laundry facilities?',
              options: [
                'Every day from 9:00 AM to 6:00 PM',
                'Tuesday, Thursday, and Saturday',
                'Monday, Wednesday, and Friday',
                'Weekdays only, with no hour restrictions',
              ],
              correct: 2,
              question_type: 'detail',
              explanation: 'The notice specifies laundry will operate "Monday, Wednesday, and Friday from 9:00 AM to 6:00 PM only." Tuesday, Thursday, and Saturday are excluded. Hours are restricted to 9 AM–6 PM, not the full day.',
            },
            {
              id: 15,
              text: 'What can be inferred about residents who use significantly more water than usual?',
              options: [
                'They will be fined immediately by the property management.',
                'They may receive personal follow-up from building management.',
                'Their water supply will be automatically restricted.',
                'They will be required to attend a conservation workshop.',
              ],
              correct: 1,
              question_type: 'inference',
              explanation: 'The notice states residents who exceed average usage by more than 30% "may be contacted individually." This means management will follow up personally — an inference, since the notice says "may be contacted," not "will be fined," "restricted," or "required to attend workshops."',
            },
          ],
        },

        // --- Read an Academic Passage: Ocean Acidification ---
        {
          type: 'academic_passage',
          id: 'pack6-m3-ap',
          title: 'Ocean Acidification',
          passage: `The world's oceans play a critical role in regulating Earth's climate by absorbing approximately one-quarter of the carbon dioxide released into the atmosphere each year. While this absorption helps moderate global warming, it triggers a chemical reaction that is fundamentally altering the ocean's chemistry. When carbon dioxide dissolves in seawater, it forms carbonic acid, which then releases hydrogen ions, lowering the ocean's pH. This process, known as ocean acidification, has caused a measurable decline in the pH of surface ocean waters — from an average of 8.2 in the pre-industrial era to approximately 8.1 today. Though this shift may appear small, the pH scale is logarithmic, meaning the ocean has actually become about 26% more acidic.

The consequences of ocean acidification are particularly severe for marine organisms that build shells or skeletons from calcium carbonate, a compound that becomes less available as acidity increases. Oysters, mussels, sea urchins, and corals are among the most vulnerable species. Laboratory experiments have demonstrated that elevated acidity inhibits shell formation in mollusks and causes coral skeletons to dissolve at rates faster than they can be rebuilt. Coral reefs, which support roughly 25% of all marine biodiversity despite covering less than 1% of the ocean floor, face the prospect of widespread bleaching and structural collapse under projected acidification scenarios.

Beyond individual species, ocean acidification threatens entire food webs. Pteropods — small free-swimming snails sometimes called "sea butterflies" — are a foundational food source for salmon, herring, and baleen whales in many ocean regions. Studies have already documented shell dissolution in pteropods collected from parts of the Southern Ocean and the Pacific Northwest. If pteropod populations collapse, the cascading effects on commercial fisheries and marine ecosystems could be profound. Scientists emphasize that unlike many other environmental stressors, ocean acidification is directly tied to atmospheric CO₂ concentrations, meaning meaningful reduction in carbon emissions represents the most effective long-term solution.`,
          questions: [
            {
              id: 16,
              paragraph: 0,
              text: 'The word "logarithmic" in paragraph 1 is closest in meaning to:',
              options: [
                'based on exponential multiplication rather than linear addition',
                'related to the temperature of a chemical solution',
                'measured in units that double with each step',
                'describing a process that occurs gradually over centuries',
              ],
              correct: 0,
              question_type: 'vocab',
              explanation: '"Logarithmic" describes a scale where each unit represents a multiplicative (exponential) change rather than an additive one. The passage uses this to explain that a 0.1 pH drop means the ocean is 26% more acidic — a much larger real change than the number implies.',
            },
            {
              id: 17,
              paragraph: 1,
              text: 'According to the passage, which of the following is NOT listed as a direct effect of ocean acidification on marine organisms?',
              options: [
                'Inhibited shell formation in mollusks',
                'Coral skeleton dissolution',
                'Increased migration of fish to warmer waters',
                'Bleaching and structural collapse of coral reefs',
              ],
              correct: 2,
              question_type: 'negative_fact',
              explanation: 'The passage mentions inhibited shell formation (mollusks), coral skeleton dissolution, and bleaching/structural collapse of reefs. Fish migration to warmer waters is never mentioned — it is not listed as an effect of acidification in the passage.',
            },
            {
              id: 18,
              paragraph: 0,
              text: 'Based on the passage, what can be inferred about the relationship between carbon emissions and ocean health?',
              options: [
                'Reducing emissions would halt all ocean acidification immediately.',
                'Ocean health is primarily determined by temperature, not CO₂ levels.',
                'Lowering atmospheric CO₂ is the most direct path to slowing acidification.',
                'Ocean acidification is irreversible regardless of changes in carbon emissions.',
              ],
              correct: 2,
              question_type: 'inference',
              explanation: 'The passage states ocean acidification is "directly tied to atmospheric CO₂ concentrations" and calls emission reduction "the most effective long-term solution." This supports inference C. Option A overstates ("halt all... immediately"). Option B contradicts the passage\'s focus on CO₂. Option D contradicts the passage\'s implication that solutions exist.',
            },
            {
              id: 19,
              paragraph: 1,
              text: 'Which of the following best expresses the essential information in the highlighted sentence? Incorrect choices change the meaning or leave out essential information.',
              highlighted_word: 'Coral reefs, which support roughly 25% of all marine biodiversity despite covering less than 1% of the ocean floor, face the prospect of widespread bleaching and structural collapse under projected acidification scenarios.',
              options: [
                'Coral reefs cover 25% of the ocean floor but support less than 1% of marine species.',
                'Although coral reefs occupy a small portion of the ocean, their ecological importance makes acidification-driven collapse particularly significant.',
                'Bleaching events have already destroyed most coral reefs, which once covered 25% of the ocean floor.',
                'Coral reefs will survive acidification because their biodiversity makes them resilient to environmental change.',
              ],
              correct: 1,
              question_type: 'sentence_simplification',
              explanation: 'The original sentence conveys two ideas: coral reefs are ecologically disproportionate (support 25% of biodiversity on <1% of ocean floor) and they face acidification threats (bleaching, collapse). Option B captures both correctly. Option A reverses the statistics. Option C misrepresents tense and current status. Option D contradicts the passage\'s warning.',
            },
            {
              id: 20,
              paragraph: 2,
              text: 'According to the passage, why are pteropods significant in marine ecosystems?',
              options: [
                'They directly absorb carbon dioxide from seawater.',
                'They are the primary producers of calcium carbonate in the ocean.',
                'They serve as a key food source for several larger marine animals.',
                'They are the only species currently affected by ocean acidification.',
              ],
              correct: 2,
              question_type: 'detail',
              explanation: 'The passage describes pteropods as "a foundational food source for salmon, herring, and baleen whales." Their significance is as a prey species in food webs, not CO₂ absorption, calcium carbonate production, or exclusive vulnerability to acidification.',
            },
            {
              id: 21,
              paragraph: 1,
              text: 'Look at the four squares [■] that indicate where the following sentence could be added to the passage. Where would the sentence best fit?',
              insert_sentence: 'The rate of this dissolution can exceed the rate of skeletal growth, leaving reefs structurally weakened within decades.',
              insertion_points: [
                'Laboratory experiments have demonstrated',
                'Coral reefs, which support',
                'face the prospect of widespread bleaching',
              ],
              options: ['■A', '■B', '■C'],
              correct: 0,
              question_type: 'text_insertion',
              explanation: 'The insert sentence talks about dissolution rate exceeding growth rate — a direct elaboration on the preceding idea that acid causes coral skeletons to "dissolve at rates faster than they can be rebuilt." Inserting after that clause (■A) creates a logical continuation: dissolution can happen, AND the rate can exceed rebuilding capacity. ■B and ■C appear later in the paragraph and discuss reef-scale collapse, which is a higher-level consequence rather than the mechanism detail described here.',
            },
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════
// Append m4 into pack6.modules at runtime is done below
// ═══════════════════════════════════════════════════════
pack6.modules.push({
  id: 'pack6-m4',
  name: 'Module 4',
  time: 9 * 60,
  sections: [
    // --- Complete the Words ---
    {
      type: 'complete_words',
      id: 'pack6-m4-cw',
      title: 'Ancient Trade Routes',
      instructions: 'Fill in the missing letters in the paragraph.',
      paragraph: [
        { text: 'Long before modern transportation, merchants traveled vast distances to ' },
        { blank: 'ange', prefix: 'exch', answer: 'exchange' },
        { text: ' goods across continents. The Silk Road was one of the most ' },
        { blank: 'ificant', prefix: 'sign', answer: 'significant' },
        { text: ' trade ' },
        { blank: 'orks', prefix: 'netw', answer: 'networks' },
        { text: ' in history, connecting China, Central Asia, and the Mediterranean for over a thousand years. Along these routes, not only ' },
        { blank: 'odities', prefix: 'comm', answer: 'commodities' },
        { text: ' such as silk, spices, and precious metals were ' },
        { blank: 'ported', prefix: 'trans', answer: 'transported' },
        { text: ', but also ideas, religions, and technologies. The ' },
        { blank: 'ead', prefix: 'spr', answer: 'spread' },
        { text: ' of Buddhism and Islam along these routes ' },
        { blank: 'onstrates', prefix: 'dem', answer: 'demonstrates' },
        { text: ' how trade fostered cultural ' },
        { blank: 'ange', prefix: 'exch', answer: 'exchange' },
        { text: ' far beyond mere commerce.' },
      ],
    },

    // --- Read in Daily Life: Museum Lecture Invitation ---
    {
      type: 'daily_life',
      id: 'pack6-m4-dl1',
      title: 'Museum Lecture Series Invitation',
      material_type: 'email',
      material: {
        subject: 'Invitation: "Seeds of Change" Lecture – Riverside History Museum',
        from: 'Riverside History Museum',
        to: 'Museum Members',
        body: "Dear Museum Member,\n\nWe are pleased to invite you to the next installment of our Autumn Lecture Series: \"Seeds of Change: How the Columbian Exchange Transformed the World,\" presented by Dr. Elena Vasquez of the University of Western Ontario.\n\nDate: Saturday, October 18\nTime: 2:00 PM – 3:30 PM\nLocation: The Hartley Auditorium, Riverside History Museum\n\nDr. Vasquez will explore how the exchange of crops, animals, and diseases between the Americas and Europe following 1492 reshaped global diets, economies, and populations. The lecture will be followed by a 30-minute Q&A session.\n\nAdmission is free for museum members. Non-members may purchase tickets at the door for $12. Seating is limited to 150 guests, so early arrival is encouraged.\n\nLight refreshments will be served in the lobby from 1:30 PM.\n\nWe hope to see you there.\nRiverside History Museum",
      },
      questions: [
        {
          id: 11,
          text: 'What is indicated about non-members who wish to attend the lecture?',
          options: [
            'They must register online in advance to reserve a seat.',
            'They can attend for free if accompanied by a member.',
            'They can pay for admission when they arrive.',
            'They are not permitted to attend the Q&A session.',
          ],
          correct: 2,
          question_type: 'detail',
          explanation: 'The email states non-members "may purchase tickets at the door for $12." This means walk-in ticket purchase is available at the venue — no advance registration is mentioned, and no restrictions on accompanying a member or attending the Q&A are stated.',
        },
        {
          id: 12,
          text: 'What can be inferred about the lecture venue?',
          options: [
            'It has a seating capacity larger than 150 people.',
            'It is located outside the museum building.',
            'It will not have enough seats for all attendees.',
            'It was recently renovated to accommodate larger audiences.',
          ],
          correct: 0,
          question_type: 'inference',
          explanation: 'The email says "seating is limited to 150 guests." This implies 150 is the cap being set for this event, not that the venue holds exactly 150. The phrase "early arrival is encouraged" suggests demand may approach that limit, but the venue itself must have capacity of at least 150.',
        },
      ],
    },

    // --- Read in Daily Life: Library Archive Notice ---
    {
      type: 'daily_life',
      id: 'pack6-m4-dl2',
      title: 'Library Special Collection Notice',
      material_type: 'email',
      material: {
        subject: 'Special Collection Access – Age of Exploration Archive Now Open',
        from: 'Hartfield University Library – Special Collections',
        to: 'Faculty and Graduate Students',
        body: "Dear Faculty and Graduate Students,\n\nWe are pleased to announce that the Age of Exploration Archive is now open to researchers in Special Collections, Room 214. The collection includes original correspondence, navigation charts, and botanical illustrations from the 15th to 18th centuries related to European exploration of the Americas, Africa, and Asia.\n\nAccess Policy:\n• Appointments are required. Walk-in access is not permitted.\n• Researchers must present a valid university ID and complete a handling agreement form.\n• Cameras and personal scanners are not allowed. High-resolution scans can be requested from staff at $0.20 per page.\n\nThe archive is open Tuesday through Friday, 10:00 AM to 4:00 PM. We recommend booking at least one week in advance, as appointment slots fill quickly.\n\nTo schedule an appointment, email special.collections@hartfield.edu or call extension 4821.\n\nWe look forward to supporting your research.\nSpecial Collections Staff",
      },
      questions: [
        {
          id: 13,
          text: 'What must researchers do before visiting the special collection?',
          options: [
            'Submit a written research proposal to the library committee.',
            'Arrange a scheduled visit in advance.',
            'Obtain written approval from their academic department.',
            'Attend an orientation session on document handling.',
          ],
          correct: 1,
          question_type: 'detail',
          explanation: 'The notice states "Appointments are required. Walk-in access is not permitted." Researchers must schedule a visit in advance. Submitting a research proposal, departmental approval, and orientation sessions are not mentioned.',
        },
        {
          id: 14,
          text: 'What is indicated about bringing personal photography equipment to the archive?',
          options: [
            'It is allowed if researchers sign a permission form.',
            'It is permitted only for faculty members, not students.',
            'It is prohibited, but digital copies can be obtained through staff.',
            'It is allowed for up to 30 minutes per visit.',
          ],
          correct: 2,
          question_type: 'detail',
          explanation: 'The policy states "Cameras and personal scanners are not allowed." However, the notice adds that "High-resolution scans can be requested from staff at $0.20 per page." Personal equipment is banned entirely, but an official scanning service exists as an alternative.',
        },
        {
          id: 15,
          text: 'What can be inferred about the demand for appointments at the archive?',
          options: [
            'Appointments are rarely needed because few researchers use the collection.',
            'The archive is so new that appointment slots have not yet been filled.',
            'Researchers who wait too long to book may not get their preferred time.',
            'The staff limits appointments to prevent overuse of fragile materials.',
          ],
          correct: 2,
          question_type: 'inference',
          explanation: 'The notice recommends "booking at least one week in advance, as appointment slots fill quickly." This implies slots get taken fast — researchers who delay may miss preferred times. The note suggests high demand, not low use or staff-imposed artificial limits.',
        },
      ],
    },

    // --- Read an Academic Passage: The Columbian Exchange ---
    {
      type: 'academic_passage',
      id: 'pack6-m4-ap',
      title: 'The Columbian Exchange',
      passage: `The Columbian Exchange refers to the widespread transfer of plants, animals, culture, human populations, technology, and diseases between the Americas and the Old World — Europe, Africa, and Asia — following Christopher Columbus's voyages beginning in 1492. Historian Alfred Crosby, who coined the term in 1972, argued that this biological and cultural exchange was among the most consequential events in human history, fundamentally reshaping the world's ecosystems, demographics, and economies. The exchange was largely asymmetrical: while the Americas contributed crops such as maize, potatoes, tomatoes, and cacao, Europe introduced horses, cattle, wheat, and a range of pathogens to which Indigenous populations had no prior immunity.

The demographic consequences were catastrophic for Indigenous peoples of the Americas. European diseases — particularly smallpox, measles, and typhus — swept through populations that had no acquired resistance, causing mortality rates in some regions estimated at 50 to 90 percent within a century of contact. Some historians argue that this demographic collapse, rather than military conquest alone, was the primary mechanism by which European colonial powers were able to establish dominance. The depopulation of vast regions also altered land use patterns, allowing dense forests to regenerate across formerly cultivated areas — a phenomenon that may have temporarily lowered atmospheric CO₂ by absorbing carbon from the atmosphere.

The nutritional and agricultural dimensions of the Columbian Exchange were equally transformative. The introduction of the potato to Europe helped sustain population growth in cool, northern climates where traditional grain crops underperformed. Maize became a caloric staple across parts of Africa. Meanwhile, Old World crops like sugarcane and coffee, transplanted to tropical regions of the Americas, generated plantation economies that drove the Atlantic slave trade. These cascading effects illustrate how a set of biological transfers initiated in the late fifteenth century continued to reshape political, economic, and social structures for centuries thereafter.`,
      questions: [
        {
          id: 16,
          paragraph: 0,
          text: 'The word "asymmetrical" in paragraph 1 is closest in meaning to:',
          options: [
            'unequal or not balanced between the two sides',
            'occurring gradually over a long period of time',
            'involving hidden or secret motivations',
            'relating to biological processes in nature',
          ],
          correct: 0,
          question_type: 'vocab',
          explanation: '"Asymmetrical" means not equal or balanced between parties. The passage uses it to describe how the exchange was one-sided: the Americas sent crops, while Europe sent crops AND devastating diseases. The imbalance is both in type and in consequence.',
        },
        {
          id: 17,
          paragraph: 1,
          text: 'According to the passage, which of the following is NOT mentioned as a cause of Indigenous population decline?',
          options: [
            'Lack of immunity to European diseases',
            'Military conflict with European colonizers',
            'Forced relocation by colonial authorities',
            'Spread of smallpox, measles, and typhus',
          ],
          correct: 2,
          question_type: 'negative_fact',
          explanation: 'The passage mentions lack of immunity (no prior resistance), military conquest (mentioned as secondary to disease), and the specific diseases smallpox, measles, and typhus. Forced relocation is never mentioned in the passage as a cause of population decline.',
        },
        {
          id: 18,
          paragraph: 1,
          text: 'Based on paragraph 2, what can be inferred about the relationship between Indigenous population decline and European colonization?',
          options: [
            'Military force was the sole reason Europeans gained control over the Americas.',
            'Disease may have made European dominance easier to establish than it would otherwise have been.',
            'European colonizers deliberately spread disease to weaken Indigenous resistance.',
            'Population collapse in the Americas had no lasting effect on land use or ecology.',
          ],
          correct: 1,
          question_type: 'inference',
          explanation: 'The passage states that some historians argue the demographic collapse "was the primary mechanism by which European colonial powers were able to establish dominance" — implying disease facilitated colonial conquest. Option A contradicts this by claiming only military force mattered. Option C introduces intent (deliberate spread), which the passage does not claim. Option D is contradicted by the passage\'s description of forest regeneration.',
        },
        {
          id: 19,
          paragraph: 0,
          text: 'Which of the following best expresses the essential information in the highlighted sentence? Incorrect choices change the meaning or leave out essential information.',
          highlighted_word: 'The exchange was largely asymmetrical: while the Americas contributed crops such as maize, potatoes, tomatoes, and cacao, Europe introduced horses, cattle, wheat, and a range of pathogens to which Indigenous populations had no prior immunity.',
          options: [
            'Both the Americas and Europe contributed equally useful plants and animals during the Columbian Exchange.',
            'The Columbian Exchange was imbalanced — the Americas primarily sent food crops while Europe sent both agricultural goods and deadly diseases.',
            'Europe\'s introduction of horses and cattle was more important to the Americas than the food crops the Americas sent to Europe.',
            'The Columbian Exchange benefited Europe because the Americas had no animals of economic value to offer.',
          ],
          correct: 1,
          question_type: 'sentence_simplification',
          explanation: 'The original sentence makes two points: the exchange was unequal (asymmetrical), and the imbalance is illustrated by the Americas sending crops while Europe sent crops plus pathogens. Option B captures both accurately. Option A says "equally useful" — contradicting asymmetry. Option C makes a comparative value judgment not in the sentence. Option D claims the Americas had no economic animals, which is not stated.',
        },
        {
          id: 20,
          paragraph: 2,
          text: 'According to paragraph 3, how did the introduction of the potato affect Europe?',
          options: [
            'It replaced wheat as the main crop across all of Europe.',
            'It enabled population growth in colder regions where grain crops were less productive.',
            'It caused widespread famine when harvests failed due to disease.',
            'It was primarily used to feed livestock rather than people.',
          ],
          correct: 1,
          question_type: 'detail',
          explanation: 'The passage states the potato "helped sustain population growth in cool, northern climates where traditional grain crops underperformed." It supported growth in specific cold-climate areas — not a continent-wide wheat replacement. The passage does not mention famine or livestock use in this context.',
        },
        {
          id: 21,
          paragraph: 1,
          text: 'Look at the four squares [■] that indicate where the following sentence could be added to the passage. Where would the sentence best fit?',
          insert_sentence: 'In some areas, entire communities were destroyed before they ever had direct contact with European settlers.',
          insertion_points: [
            'European diseases — particularly smallpox',
            'causing mortality rates in some regions',
            'this demographic collapse, rather than military conquest',
            'The depopulation of vast regions',
          ],
          options: ['■A', '■B', '■C', '■D'],
          correct: 1,
          question_type: 'text_insertion',
          explanation: 'The inserted sentence describes communities destroyed before direct contact — a consequence of disease spreading ahead of settlers. This follows most naturally after the clause describing high mortality rates (■B), amplifying the severity before the passage moves to historical interpretation. ■A comes before mortality rates are introduced. ■C shifts to historians\' arguments about colonialism. ■D discusses land-use and ecology, a different sub-topic.',
        },
      ],
    },
  ],
});

// --- Module 5: Psychology of Memory ---
pack6.modules.push({
  id: 'pack6-m5',
  name: 'Module 5',
  time: 9 * 60,
  sections: [
    // --- Complete the Words ---
    {
      type: 'complete_words',
      id: 'pack6-m5-cw',
      title: 'Memory and the Brain',
      instructions: 'Fill in the missing letters in the paragraph.',
      paragraph: [
        { text: 'Human memory is not a single system but a collection of ' },
        { blank: 'ter', prefix: 'in', answer: 'interconnected' },
        { text: ' processes. When we ' },
        { blank: 'ode', prefix: 'enc', answer: 'encode' },
        { text: ' information, the brain converts it into a form that can be ' },
        { blank: 'ored', prefix: 'st', answer: 'stored' },
        { text: '. The hippocampus plays a crucial role in ' },
        { blank: 'olidating', prefix: 'cons', answer: 'consolidating' },
        { text: ' short-term memories into long-term ones. ' },
        { blank: 'rieval', prefix: 'Ret', answer: 'Retrieval' },
        { text: ' — the process of accessing stored memories — can be influenced by ' },
        { blank: 'textual', prefix: 'con', answer: 'contextual' },
        { text: ' cues such as smell or location. Failure to ' },
        { blank: 'all', prefix: 'rec', answer: 'recall' },
        { text: ' information is often due to interference from similar memories rather than permanent ' },
        { blank: 'ss', prefix: 'lo', answer: 'loss' },
        { text: '.' },
      ],
    },
    // --- Daily Life Reading 1: Email ---
    {
      type: 'daily_life',
      id: 'pack6-m5-dl1',
      subtype: 'email',
      title: 'Study Group Announcement',
      from: 'Professor Elena Marsh <e.marsh@university.edu>',
      to: 'PSY 201 Students',
      subject: 'Exam Prep: Memory Techniques Workshop',
      body: `Dear Students,

I wanted to let you know about an optional study session I am hosting next Thursday from 3:00 to 5:00 PM in Room 204 of the Psychology Building.

The session will focus on evidence-based memory strategies that are directly relevant to our upcoming midterm. We will cover spaced repetition, the testing effect, and dual-coding techniques. Research consistently shows that students who use these methods outperform those who rely on re-reading alone.

Please bring your lecture notes and any questions about concepts you find difficult. Attendance is voluntary, but I strongly encourage you to come — especially if you struggled with the first quiz.

Light refreshments will be provided.

Best,
Professor Marsh`,
      questions: [
        {
          id: 1,
          text: 'What is the main purpose of Professor Marsh\'s email?',
          options: [
            'To announce a mandatory exam review session',
            'To invite students to a voluntary workshop on study strategies',
            'To distribute practice questions for the midterm',
            'To inform students that the midterm has been rescheduled',
          ],
          correct: 1,
          question_type: 'detail',
          explanation: 'The email explicitly states the session is "optional" and "voluntary" and describes it as covering memory strategies relevant to the midterm.',
        },
        {
          id: 2,
          text: 'According to the email, which students does Professor Marsh especially encourage to attend?',
          options: [
            'Students who already scored well on the midterm',
            'Students who have not yet purchased the textbook',
            'Students who found the first quiz challenging',
            'Students who are majoring in Psychology',
          ],
          correct: 2,
          question_type: 'detail',
          explanation: 'Professor Marsh writes "especially if you struggled with the first quiz," targeting students who had difficulty.',
        },
      ],
    },
    // --- Daily Life Reading 2: Notice ---
    {
      type: 'daily_life',
      id: 'pack6-m5-dl2',
      subtype: 'notice',
      title: 'Library Study Room Policy Update',
      body: `UNIVERSITY LIBRARY — STUDY ROOM RESERVATION POLICY (Effective Monday)

The Library is updating its individual and group study room policies to support focused learning during the final examination period.

INDIVIDUAL ROOMS (Rooms 1–10):
Maximum booking: 2 hours per day per student. Rooms must be vacated 5 minutes before the reservation ends. No extensions will be granted during peak hours (10:00 AM – 6:00 PM).

GROUP ROOMS (Rooms 11–20):
Minimum group size: 3 students. Maximum booking: 3 hours per day. Groups must show a reservation confirmation at the front desk before entering.

GENERAL RULES:
- Noise level must remain below 40 dB (quiet conversation only).
- Personal belongings left unattended for more than 15 minutes will be removed.
- Food and drinks are permitted in sealed containers only.

Reservations can be made online at library.university.edu/rooms up to 48 hours in advance.

For questions, contact the front desk or email library@university.edu.`,
      questions: [
        {
          id: 3,
          text: 'According to the notice, what is required to use a group study room?',
          options: [
            'Prior approval from a professor',
            'A minimum of three students and a reservation confirmation',
            'A student ID showing library membership',
            'A deposit held at the front desk',
          ],
          correct: 1,
          question_type: 'detail',
          explanation: 'The notice states groups need "Minimum group size: 3 students" and must "show a reservation confirmation at the front desk before entering."',
        },
        {
          id: 4,
          text: 'Which of the following is NOT permitted under the new policy?',
          options: [
            'Eating a snack from a sealed lunch box',
            'Booking a room 24 hours in advance',
            'Extending an individual room reservation at noon',
            'Quiet conversation between group members',
          ],
          correct: 2,
          question_type: 'negative_fact',
          explanation: 'The policy explicitly states "No extensions will be granted during peak hours (10:00 AM – 6:00 PM)" — noon falls within peak hours.',
        },
        {
          id: 5,
          text: 'What can be inferred about the timing of this policy change?',
          options: [
            'It was introduced in response to student complaints about noise',
            'It coincides with a period of high academic pressure',
            'It replaces an older policy that had no time limits',
            'It was mandated by the university administration',
          ],
          correct: 1,
          question_type: 'inference',
          explanation: 'The notice mentions the policy supports "focused learning during the final examination period," implying the change aligns with exam season.',
        },
      ],
    },
    // --- Academic Passage ---
    {
      type: 'academic_passage',
      id: 'pack6-m5-ap',
      title: 'The Reconstructive Nature of Human Memory',
      passage: `Memory has long been conceived as a kind of mental recording device — an internal camera that captures experiences and replays them with fidelity. Modern cognitive science has thoroughly dismantled this notion. Rather than retrieving a stored copy of the past, humans reconstruct memories each time they recall an event, drawing on fragments of genuine experience and filling in gaps with knowledge, expectation, and inference. This reconstructive quality makes memory both flexible and fallible.

The work of psychologist Frederic Bartlett in the 1930s provided early evidence for reconstructive memory. In a series of experiments, Bartlett asked participants to read an unfamiliar Native American folk tale and reproduce it from memory after varying intervals. Over successive recalls, the story underwent systematic distortions: culturally unfamiliar details were omitted or replaced by more familiar concepts, and the narrative was shortened and rationalized to fit participants' existing schemas. Bartlett concluded that memory is not passive storage but active construction shaped by prior knowledge.

Decades later, Elizabeth Loftus extended this insight by demonstrating that memories can be altered by information encountered after an event. In her influential studies on eyewitness testimony, participants who watched a video of a car accident gave different estimates of the vehicle's speed depending on whether they were asked how fast the car was going when it "smashed" or "contacted" another car. More strikingly, a subset of participants later reported seeing broken glass that was never present in the original video. These findings challenged the legal system's reliance on eyewitness accounts and prompted reforms in how police conduct witness interviews.

The neurological basis of memory reconstruction lies partly in the hippocampus and prefrontal cortex. The hippocampus is essential for binding together the elements of an episode — sights, sounds, emotions, and context — into a coherent trace. ■A During retrieval, these elements are reactivated and reassembled, a process that is susceptible to interference from subsequent experiences. ■B The prefrontal cortex contributes by monitoring the plausibility of retrieved information, helping to distinguish genuine memories from false ones, though this monitoring process is imperfect. ■C Neural research has shown that recalling a memory renders it temporarily unstable, a phenomenon known as reconsolidation. ■D During this window, the memory can be updated or corrupted before being restabilized.

The reconstructive nature of memory carries significant implications across multiple domains. In legal contexts, it underlines the unreliability of eyewitness testimony and supports the use of corroborating physical evidence. In education, it argues for teaching strategies that encourage elaborative encoding — connecting new material to existing knowledge — rather than rote repetition. In clinical psychology, it informs therapies that aim to weaken traumatic memories by introducing new, neutral associations during the reconsolidation window.`,
      questions: [
        {
          id: 6,
          text: 'The word "fallible" in paragraph 1 is closest in meaning to',
          options: ['unreliable', 'creative', 'unconscious', 'detailed'],
          correct: 0,
          question_type: 'vocabulary',
          explanation: '"Fallible" means capable of making errors or being wrong — i.e., unreliable.',
        },
        {
          id: 7,
          text: 'According to paragraph 2, what did Bartlett\'s participants tend to do when recalling the folk tale?',
          options: [
            'Add culturally unfamiliar details to make the story more interesting',
            'Reproduce the story with high accuracy regardless of time elapsed',
            'Replace unfamiliar elements with concepts matching their own schemas',
            'Refuse to recall details they considered irrelevant',
          ],
          correct: 2,
          question_type: 'detail',
          explanation: 'Bartlett found that "culturally unfamiliar details were omitted or replaced by more familiar concepts" — fitting participants\' existing schemas.',
        },
        {
          id: 8,
          text: 'Which of the following is NOT mentioned as a finding of Loftus\'s eyewitness studies?',
          options: [
            'Participants\' speed estimates varied with the wording of questions',
            'Some participants reported seeing objects that were not in the video',
            'Eyewitness errors were more common in younger participants',
            'The research influenced reforms in police interview practices',
          ],
          correct: 2,
          question_type: 'negative_fact',
          explanation: 'Paragraph 3 discusses question wording, false memories (broken glass), and legal reforms — but never mentions age differences between participants.',
        },
        {
          id: 9,
          text: 'What can be inferred from paragraph 3 about the legal system before Loftus\'s research?',
          options: [
            'Judges were aware that eyewitness testimony was often inaccurate',
            'Eyewitness accounts were treated as highly reliable evidence',
            'Police routinely used misleading questions to test memory accuracy',
            'Physical evidence was valued more than witness statements in court',
          ],
          correct: 1,
          question_type: 'inference',
          explanation: 'The passage says the findings "challenged the legal system\'s reliance on eyewitness accounts," implying such accounts were previously trusted.',
        },
        {
          id: 10,
          text: 'According to paragraph 4, why is memory reconstruction susceptible to interference?',
          options: [
            'The hippocampus deteriorates with each retrieval attempt',
            'Reactivated memory elements can be affected by subsequent experiences',
            'The prefrontal cortex prevents accurate binding of episodic elements',
            'Reconsolidation permanently destroys the original memory trace',
          ],
          correct: 1,
          question_type: 'detail',
          explanation: 'The passage states that during retrieval, "elements are reactivated and reassembled, a process that is susceptible to interference from subsequent experiences."',
        },
        {
          id: 11,
          text: 'Which sentence best expresses the essential information in this sentence from paragraph 4: "Neural research has shown that recalling a memory renders it temporarily unstable, a phenomenon known as reconsolidation."',
          options: [
            'Neural studies prove that memories become permanently unstable once recalled.',
            'Reconsolidation is a process in which memories are permanently destroyed during recall.',
            'Research indicates that the act of remembering temporarily destabilizes a memory, a process called reconsolidation.',
            'Scientists have found that unstable memories can only be restabilized through repeated neural firing.',
          ],
          correct: 2,
          question_type: 'sentence_simplification',
          explanation: 'Option C accurately captures both key ideas: recall causes temporary instability, and this is called reconsolidation. Option A incorrectly says "permanently." Option B mischaracterizes reconsolidation as destruction. Option D introduces unsupported claims about repeated firing.',
        },
        {
          id: 12,
          paragraph: 3,
          text: 'Look at the four squares [■] that indicate where the following sentence could be added to the passage. Where would the sentence best fit?',
          insert_sentence: 'When any one of these bound elements is weakened or lost, the entire memory becomes difficult to retrieve accurately.',
          insertion_points: [
            'The hippocampus is essential for binding together the elements of an episode',
            'During retrieval, these elements are reactivated and reassembled',
            'The prefrontal cortex contributes by monitoring the plausibility',
            'Neural research has shown that recalling a memory renders it temporarily unstable',
          ],
          options: ['■A', '■B', '■C', '■D'],
          correct: 1,
          question_type: 'text_insertion',
          explanation: 'The sentence explains a consequence of the binding process — when bound elements weaken, retrieval suffers. This follows naturally after ■A, which describes the hippocampus binding elements together, and before ■B, which discusses reactivation during retrieval. Placing it at ■B introduces it too late (reactivation has already begun). ■C and ■D are mid-topic shifts to prefrontal monitoring and reconsolidation respectively.',
        },
      ],
    },
  ],
});

// ═══════════════════════════════════════════════════════
// MODULE 6 — Language & Communication (Language Acquisition)
// ═══════════════════════════════════════════════════════
pack6.modules.push({
  id: 'pack6-m6',
  name: 'Module 6',
  time: 9 * 60,
  sections: [
    // --- Complete the Words ---
    {
      type: 'complete_words',
      id: 'pack6-m6-cw',
      title: 'Human Communication',
      instructions: 'Fill in the missing letters in the paragraph.',
      paragraph: [
        { text: 'Language is one of the most complex and distinctly human abilities. Children ' },
        { blank: 'uire', prefix: 'acq', answer: 'acquire' },
        { text: ' their native language naturally, without formal ' },
        { blank: 'uction', prefix: 'instr', answer: 'instruction' },
        { text: ', simply through ' },
        { blank: 'osure', prefix: 'exp', answer: 'exposure' },
        { text: ' to speech in their environment. Linguists have long debated whether this ability is primarily ' },
        { blank: 'etic', prefix: 'gen', answer: 'genetic' },
        { text: ' — hardwired into the brain — or ' },
        { blank: 'ned', prefix: 'lear', answer: 'learned' },
        { text: ' through social interaction. Most researchers today ' },
        { blank: 'ee', prefix: 'agr', answer: 'agree' },
        { text: ' that both biology and environment play essential roles in language ' },
        { blank: 'lopment', prefix: 'deve', answer: 'development' },
        { text: '. The speed and accuracy with which young children ' },
        { blank: 'ster', prefix: 'ma', answer: 'master' },
        { text: ' grammar rules they were never explicitly taught remains one of the most ' },
        { blank: 'ling', prefix: 'compel', answer: 'compelling' },
        { text: ' puzzles in cognitive science.' },
      ],
    },

    // --- Read in Daily Life: Language Exchange Program ---
    {
      type: 'daily_life',
      id: 'pack6-m6-dl1',
      title: 'Language Exchange Partnership Notice',
      material_type: 'email',
      material: {
        subject: 'Join the Spring Language Exchange Program – Sign-Ups Now Open',
        from: 'International Student Services',
        to: 'All Enrolled Students',
        body: "Dear Students,\n\nWe are pleased to announce that sign-ups for the Spring Language Exchange Program are now open. This program pairs domestic and international students for weekly conversation practice sessions in each other's native languages.\n\nHow it works:\n• Each pair meets once or twice per week for 60–90 minutes.\n• Each session is divided equally: half the time is spent speaking one partner's language, half in the other's.\n• Partners are matched based on language background and scheduling availability.\n\nBenefits include improved conversational fluency, cultural exchange, and friendship. Participants who complete at least eight sessions will receive a Certificate of Participation, which can be included in resumes and scholarship applications.\n\nTo register, visit the International Student Services portal by April 25. Spaces are limited to 60 pairs this semester.\n\nIf you have questions, contact us at languageexchange@university.edu.\n\nInternational Student Services",
      },
      questions: [
        {
          id: 11,
          text: 'What do participants receive after completing the required number of sessions?',
          options: [
            'Academic credit toward a foreign language course',
            'A formal certificate they can use in applications',
            'Free enrollment in an advanced language class',
            'Priority placement in future exchange programs',
          ],
          correct: 1,
          question_type: 'detail',
          explanation: 'The email states participants who complete at least eight sessions receive "a Certificate of Participation, which can be included in resumes and scholarship applications." This is a formal document for applications, not academic credit, course enrollment, or future placement priority.',
        },
        {
          id: 12,
          text: 'What can be inferred about how session time is structured?',
          options: [
            'Partners can decide freely how to divide their time each session.',
            'Each partner spends equal time practicing their target language.',
            'Sessions are conducted entirely in the less-proficient partner\'s language.',
            'The program requires partners to alternate languages each week.',
          ],
          correct: 1,
          question_type: 'inference',
          explanation: 'The email states "half the time is spent speaking one partner\'s language, half in the other\'s" — meaning each partner gets equal time practicing the other\'s language in every session. The format is fixed (equal split per session), not freely decided, not one-language-only, and not alternated weekly.',
        },
      ],
    },

    // --- Read in Daily Life: Writing Center Policy ---
    {
      type: 'daily_life',
      id: 'pack6-m6-dl2',
      title: 'Writing Center Services Notice',
      material_type: 'email',
      material: {
        subject: 'Writing Center – Updated Policies for the Fall Semester',
        from: 'University Writing Center',
        to: 'All Students',
        body: "Dear Students,\n\nWe are writing to inform you of updated policies at the University Writing Center, effective this fall semester.\n\n1. Appointment Length: All appointments are now standardized at 50 minutes. Same-day drop-in sessions remain available but are limited to 25 minutes.\n\n2. Submission Requirement: Students must submit their draft at least 24 hours before their appointment. Consultants will not review drafts submitted after this deadline.\n\n3. Scope of Assistance: Writing Center consultants will help with structure, argument development, and clarity. They will not proofread or correct grammar errors directly; this is to encourage students to develop independent editing skills.\n\n4. ESL Support: Students writing in a language other than their native language may request a consultant who specializes in ESL writing.\n\nAppointments can be booked through the student portal. Walk-in availability is posted daily at 8:00 AM.\n\nWe look forward to supporting your writing.\nUniversity Writing Center",
      },
      questions: [
        {
          id: 13,
          text: 'According to the notice, which of the following is NOT a service provided by Writing Center consultants?',
          options: [
            'Helping students improve the structure of their writing',
            'Assisting with argument development',
            'Directly correcting grammar mistakes',
            'Supporting ESL students with specialized consultants',
          ],
          correct: 2,
          question_type: 'negative_fact',
          explanation: 'The notice explicitly states consultants "will not proofread or correct grammar errors directly." Structure, argument development, and ESL support are all listed as services the center does provide.',
        },
        {
          id: 14,
          text: 'What must students do before a scheduled Writing Center appointment?',
          options: [
            'Attend an orientation session about writing strategies',
            'Submit their draft at least one day in advance',
            'Complete a grammar review checklist provided by the center',
            'Confirm their appointment within 12 hours of booking',
          ],
          correct: 1,
          question_type: 'detail',
          explanation: 'The notice states "Students must submit their draft at least 24 hours before their appointment." 24 hours equals one day. No orientation, grammar checklist, or 12-hour confirmation is mentioned.',
        },
        {
          id: 15,
          text: 'What can be inferred about why consultants do not correct grammar errors directly?',
          options: [
            'Consultants are not trained to identify grammar errors.',
            'The center lacks enough staff to provide grammar instruction.',
            'The policy is intended to help students build their own editing abilities.',
            'Grammar correction is reserved for ESL specialists only.',
          ],
          correct: 2,
          question_type: 'inference',
          explanation: 'The notice explains the reason directly: "this is to encourage students to develop independent editing skills." The policy is pedagogical — building student autonomy — not a staffing or qualification issue.',
        },
      ],
    },

    // --- Read an Academic Passage: Critical Period Hypothesis ---
    {
      type: 'academic_passage',
      id: 'pack6-m6-ap',
      title: 'The Critical Period Hypothesis in Language Acquisition',
      passage: `The Critical Period Hypothesis (CPH) proposes that there is a biologically determined window of time — typically from infancy through early adolescence — during which the human brain is especially receptive to language acquisition. First formally articulated by neurologist Wilder Penfield in the 1950s and later expanded by linguist Eric Lenneberg in 1967, the hypothesis draws on evidence from neuroscience, developmental psychology, and case studies of individuals who learned language under unusual circumstances. Lenneberg argued that language acquisition must occur before puberty, after which the brain's neural plasticity — its ability to reorganize and form new connections — declines significantly.

The most widely cited evidence for the CPH comes from studies of children who were severely isolated from language during their early years. The case of Genie, a girl discovered in 1970 who had been confined and denied linguistic input until age thirteen, is particularly instructive. Despite years of subsequent language therapy, Genie never acquired normal grammatical competence, though she developed a substantial vocabulary. Critics of the CPH note, however, that Genie's profound psychological trauma and cognitive deprivation may have confounded results, making it difficult to isolate the effect of age from other variables. Second language acquisition research presents a more nuanced picture: adult learners can achieve high levels of proficiency, especially in vocabulary and reading, though they rarely attain native-like phonological accuracy.

The CPH has important implications for education policy and language teaching. If a sensitive period for language acquisition exists, early childhood language programs may yield disproportionate long-term benefits. Some researchers have applied CPH reasoning to argue for bilingual education beginning in kindergarten rather than secondary school. However, others caution that the hypothesis has been overgeneralized — not all aspects of language are equally sensitive to age, and motivation, instruction quality, and amount of exposure remain powerful predictors of success at any age.`,
      questions: [
        {
          id: 16,
          paragraph: 0,
          text: 'The word "plasticity" in paragraph 1 is closest in meaning to:',
          options: [
            'the brain\'s capacity to adapt and form new neural pathways',
            'the physical flexibility of the brain\'s outer surface',
            'a measure of how quickly information is processed',
            'the ability to store long-term memories permanently',
          ],
          correct: 0,
          question_type: 'vocab',
          explanation: '"Neural plasticity" refers to the brain\'s ability to reorganize itself by forming new connections — the passage defines it as "its ability to reorganize and form new connections." This matches capacity to adapt and form new neural pathways. Physical flexibility, processing speed, and memory storage are related but distinct concepts.',
        },
        {
          id: 17,
          paragraph: 1,
          text: 'According to the passage, what was a limitation of the Genie case study as evidence for the CPH?',
          options: [
            'Genie was too young when discovered to provide useful linguistic data.',
            'Genie eventually developed full grammatical competence, contradicting the CPH.',
            'Other factors such as trauma may have influenced Genie\'s language outcomes.',
            'Genie\'s case was never formally studied by linguists.',
          ],
          correct: 2,
          question_type: 'detail',
          explanation: 'The passage states critics note that "Genie\'s profound psychological trauma and cognitive deprivation may have confounded results, making it difficult to isolate the effect of age from other variables." Genie was 13 when discovered (not too young), never achieved full grammatical competence (not contradicting CPH), and was formally studied extensively.',
        },
        {
          id: 18,
          paragraph: 1,
          text: 'Based on paragraph 2, what can be inferred about adult second language learners?',
          options: [
            'Adults are incapable of reaching high proficiency in a second language.',
            'Adults can become highly proficient but may retain a foreign accent.',
            'Adults who study intensively can match native speakers in all aspects of language.',
            'Phonological accuracy is easier for adults to acquire than vocabulary.',
          ],
          correct: 1,
          question_type: 'inference',
          explanation: 'The passage says adult learners "can achieve high levels of proficiency, especially in vocabulary and reading, though they rarely attain native-like phonological accuracy." This supports: high proficiency is possible, but accent (phonology) is harder — inferring adults can be highly proficient yet retain an accent. Option A overstates the limitation. Option C contradicts "rarely native-like." Option D reverses the relative difficulty.',
        },
        {
          id: 19,
          paragraph: 0,
          text: 'Which of the following best expresses the essential information in the highlighted sentence? Incorrect choices change the meaning or leave out essential information.',
          highlighted_word: 'Lenneberg argued that language acquisition must occur before puberty, after which the brain\'s neural plasticity — its ability to reorganize and form new connections — declines significantly.',
          options: [
            'Lenneberg believed all learning becomes impossible once the brain loses plasticity after puberty.',
            'According to Lenneberg, the brain\'s decreasing flexibility after puberty makes early language learning essential.',
            'Lenneberg found that children who learn language before puberty have larger vocabularies than those who learn later.',
            'The brain reaches peak plasticity at puberty, which is why teenage years are the best time to learn a language.',
          ],
          correct: 1,
          question_type: 'sentence_simplification',
          explanation: 'The original sentence has two claims: (1) language must be acquired before puberty, and (2) this is because brain plasticity declines after puberty. Option B captures both accurately. Option A overgeneralizes to "all learning." Option C introduces vocabulary size, which is not mentioned. Option D reverses the claim — plasticity declines at puberty, not peaks.',
        },
        {
          id: 20,
          paragraph: 2,
          text: 'According to paragraph 3, which of the following represents a criticism of how the CPH has been applied?',
          options: [
            'It has been used to argue against any form of early language education.',
            'Researchers have applied it too broadly, ignoring that age affects different language skills differently.',
            'The hypothesis has been rejected by most educators as scientifically invalid.',
            'CPH supporters have ignored the role of genetics in language development.',
          ],
          correct: 1,
          question_type: 'detail',
          explanation: 'The passage states "others caution that the hypothesis has been overgeneralized — not all aspects of language are equally sensitive to age." This means critics argue the CPH has been applied too broadly without accounting for variation across language domains. The passage does not say it argues against early education, has been rejected, or ignores genetics.',
        },
        {
          id: 21,
          paragraph: 1,
          text: 'Look at the four squares [■] that indicate where the following sentence could be added to the passage. Where would the sentence best fit?',
          insert_sentence: 'This gap between lexical and grammatical development has since become a key data point in debates about what the critical period actually governs.',
          insertion_points: [
            'The case of Genie, a girl discovered',
            'Genie never acquired normal grammatical competence, though she developed a substantial vocabulary',
            'Critics of the CPH note, however',
            'Second language acquisition research presents',
          ],
          options: ['■A', '■B', '■C', '■D'],
          correct: 1,
          question_type: 'text_insertion',
          explanation: 'The inserted sentence refers to "this gap between lexical and grammatical development" — a direct reference to the preceding clause about Genie having vocabulary but lacking grammar (■B). Inserting here creates a logical bridge: Genie\'s split profile (vocabulary yes, grammar no) → that split is a key data point in CPH debates. ■A comes before Genie\'s outcomes are described. ■C and ■D shift to criticism and adult learners, moving away from Genie\'s specific case.',
        },
        {
          id: 22,
          text: 'An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting the THREE answer choices that express the most important ideas in the passage. Some answer choices do not belong because they express ideas not presented in the passage or are minor ideas. This question is worth 2 points.',
          question_type: 'prose_summary',
          lead_sentence: 'The Critical Period Hypothesis holds that language acquisition depends on a biologically determined developmental window, though the evidence and its educational implications remain contested.',
          options: [
            'Neural plasticity declines after puberty, and Lenneberg argued this makes early childhood the optimal window for acquiring a first language.',
            'The case of Genie provides evidence for a critical period, but critics note that psychological trauma and deprivation make it difficult to attribute her language deficits to age alone.',
            'Although CPH reasoning has influenced arguments for early bilingual education, researchers caution the hypothesis has been overgeneralized since motivation and instruction also predict language success.',
            'Adult second language learners are entirely unable to achieve proficiency because neural plasticity disappears completely once puberty ends.',
            'Wilder Penfield rejected Lenneberg\'s model of the critical period and proposed a competing hypothesis grounded in his brain surgery findings.',
            'Genie\'s case conclusively settled the debate about the critical period, proving that language cannot be acquired after age thirteen under any circumstances.',
          ],
          correct: [0, 1, 2],
          explanation: 'Options A, B, and C capture the three main ideas: the neurological basis and Lenneberg\'s claim (A); the Genie evidence and its methodological limitation (B); and educational implications with the overgeneralization critique (C). Option D contradicts the passage — adults can achieve high proficiency. Option E is factually wrong — Lenneberg expanded on Penfield\'s work, not rejected it. Option F overstates the Genie case; the passage explicitly notes confounding factors prevent conclusive interpretation.',
        },
      ],
    },
  ],
});
