export const passage = `In 1912, German meteorologist Alfred Wegener proposed one of the most transformative ideas in the history of geology: the theory of continental drift. Wegener observed that the coastlines of South America and Africa fit together like puzzle pieces and that identical fossil species appeared on continents separated by vast oceans. He concluded that the modern continents were once assembled into a single supercontinent he called Pangaea, which gradually broke apart over hundreds of millions of years. Despite the compelling evidence, most scientists of the time rejected Wegener's hypothesis because he could not explain what force could move entire continents through solid oceanic crust.

The mechanism Wegener lacked became apparent several decades later when oceanographers began mapping the ocean floor in detail. Researchers discovered mid-ocean ridges—enormous underwater mountain chains stretching tens of thousands of kilometers—where molten rock rises from within Earth and solidifies into new crust. As fresh material accumulates at these ridges, existing oceanic crust is pushed outward and eventually forced beneath adjacent plates in a process called subduction. This seafloor spreading, documented through characteristic magnetic stripe patterns preserved in rocks on either side of mid-ocean ridges, provided the missing explanation for how continents drift apart. By the 1960s, plate tectonics had become the foundational framework of modern geology.

Geologists recognize three distinct types of boundaries where tectonic plates interact. At divergent boundaries, plates pull apart, generating new crust as magma wells up from below; the East African Rift Valley, where Africa is slowly splitting into two plates, exemplifies this process. At convergent boundaries, plates collide: when two continental plates meet, the collision buckles the crust upward, forming mountain ranges such as the Himalayas; when an oceanic plate meets a continental plate, the denser oceanic plate sinks beneath the lighter continental crust. Transform boundaries occur where plates slide horizontally past one another, generating powerful earthquakes along fault lines such as California's San Andreas Fault.

Plate tectonics has far-reaching consequences for Earth's geography, climate, and natural resources. Volcanic arcs that form above subduction zones concentrate economically significant deposits of copper, gold, and other metals, making certain regions disproportionately rich in mineral wealth. Over millions of years, the shifting positions of continents alter ocean circulation and atmospheric patterns, influencing global temperatures and triggering ice ages. The theory also helps explain geologic hazards: earthquakes cluster along plate boundaries, and volcanoes form predictably where plates diverge or where subducting slabs release water that lowers the melting point of surrounding rock. Understanding plate movement has thus become essential not only for scientific inquiry but also for practical hazard assessment and resource management.

Despite the theory's explanatory power, researchers continue to debate the mechanisms driving plate movement. Early models attributed drift primarily to convection currents in the mantle—slow circulation of partially molten rock driven by heat from Earth's core—but more recent studies suggest that the weight of descending slabs at subduction zones may be equally or more important than mantle convection. Anomalous volcanic hotspots, such as those underlying the Hawaiian Islands, remain incompletely explained within the standard plate tectonic model. Looking ahead, geophysicists predict that in roughly 250 million years the continents will once again converge into a single supercontinent, provisionally named Pangaea Proxima, suggesting that the forces reshaping Earth's surface continue to operate on timescales that dwarf human history.`;

export const questions = [
  {
    id: 1,
    type: 'vocab',
    paragraph: 1,
    text: 'The word "transformative" in paragraph 1 is closest in meaning to:',
    options: ['Controversial', 'Revolutionary', 'Incremental', 'Temporary'],
    correct: 1,
    explanation: '"Transformative" describes something that fundamentally changes the state of affairs. The passage uses it to characterize Wegener\'s theory, which reorganized the entire field of geology.',
  },
  {
    id: 2,
    type: 'detail',
    paragraph: 1,
    text: 'According to the passage, why did most scientists reject Wegener\'s theory of continental drift?',
    options: [
      'He relied entirely on fossil evidence and ignored geological data',
      'His proposed supercontinent did not match the actual shapes of modern coastlines',
      'He could not identify a force capable of moving continents through oceanic crust',
      'His calculations placed Pangaea in the wrong hemisphere',
    ],
    correct: 2,
    explanation: 'The passage states that scientists rejected the hypothesis "because he could not explain what force could move entire continents through solid oceanic crust."',
  },
  {
    id: 3,
    type: 'inference',
    paragraph: 2,
    text: 'What can be inferred about the discovery of seafloor spreading?',
    options: [
      'It was anticipated by most geologists well before the 1960s',
      'It demonstrated that mid-ocean ridges are unrelated to plate movement',
      'It resolved the central weakness in Wegener\'s original argument',
      'It showed that subduction is a less significant process than previously assumed',
    ],
    correct: 2,
    explanation: 'The passage states Wegener\'s theory was rejected because he lacked a mechanism, and that seafloor spreading provided "the missing explanation." This directly implies the discovery addressed the weakness that had prevented acceptance of his idea.',
  },
  {
    id: 4,
    type: 'sentence_simplification',
    paragraph: 2,
    text: 'Which of the following best expresses the essential information in this sentence from paragraph 2: "This seafloor spreading, documented through characteristic magnetic stripe patterns preserved in rocks on either side of mid-ocean ridges, provided the missing explanation for how continents drift apart."',
    options: [
      'Magnetic stripe patterns caused seafloor spreading by creating pressure along mid-ocean ridges.',
      'Evidence of seafloor spreading, recorded in magnetic rock formations, explained the mechanism of continental drift.',
      'Scientists determined that magnetic stripes could only form above the surface of mid-ocean ridges.',
      'The discovery of mid-ocean ridges ultimately disproved Wegener\'s theory of continental drift.',
    ],
    correct: 1,
    explanation: 'The core meaning is that seafloor spreading, evidenced by magnetic stripes, explained how continents drift. Option B captures this relationship accurately without reversing or distorting the original claim.',
  },
  {
    id: 5,
    type: 'negative_fact',
    paragraph: 3,
    text: 'According to paragraph 3, all of the following are mentioned as results of tectonic plate interactions EXCEPT:',
    options: [
      'Formation of mountain ranges through continental collision',
      'Generation of new oceanic crust at divergent boundaries',
      'Rising sea levels along coastlines near convergent boundaries',
      'Occurrence of powerful earthquakes along transform fault lines',
    ],
    correct: 2,
    explanation: 'Mountain formation, new crust generation, and earthquakes at transform boundaries are all explicitly mentioned. Rising sea levels near convergent boundaries are never discussed in the passage.',
  },
  {
    id: 6,
    type: 'vocab',
    paragraph: 4,
    text: 'The word "disproportionately" in paragraph 4 is closest in meaning to:',
    options: ['Uniformly', 'Unevenly', 'Permanently', 'Noticeably'],
    correct: 1,
    explanation: '"Disproportionately" indicates something existing in quantities that exceed what would be proportionally expected. Here it means certain regions contain far more mineral wealth than their size or location alone would predict.',
  },
  {
    id: 7,
    type: 'purpose',
    paragraph: 4,
    text: 'Why does the author mention copper and gold in paragraph 4?',
    options: [
      'To argue that mining activity near volcanoes accelerates plate movement',
      'To illustrate an economic benefit that results from subduction zone geology',
      'To explain why volcanic regions tend to experience more frequent earthquakes',
      'To contrast the mineral wealth found at divergent versus convergent boundaries',
    ],
    correct: 1,
    explanation: 'The author cites copper and gold as examples of economically significant deposits that concentrate near volcanic arcs above subduction zones, illustrating one of the practical consequences of plate tectonics.',
  },
  {
    id: 8,
    type: 'detail',
    paragraph: 5,
    text: 'According to the passage, what do more recent studies suggest about what drives plate movement?',
    options: [
      'Mantle convection alone is fully sufficient to explain all observed continental drift',
      'The weight of descending slabs at subduction zones may rival mantle convection in importance',
      'Volcanic hotspots such as Hawaii are the primary engine of global plate motion',
      'The plates will stop moving once Pangaea Proxima forms in 250 million years',
    ],
    correct: 1,
    explanation: 'The passage states that "more recent studies suggest that the weight of descending slabs at subduction zones may be equally or more important than mantle convection."',
  },
  {
    id: 9,
    type: 'attitude',
    paragraph: 5,
    text: 'The author\'s attitude toward the theory of plate tectonics can best be described as:',
    options: [
      'Skeptical, emphasizing the many unresolved problems that undermine the theory',
      'Approving, while acknowledging that certain aspects remain debated or unexplained',
      'Strictly neutral, presenting the theory\'s supporters and critics with equal weight',
      'Enthusiastic, arguing that plate tectonics perfectly explains all geological phenomena',
    ],
    correct: 1,
    explanation: 'The author describes plate tectonics as the "foundational framework of modern geology" with broad explanatory power, while also noting ongoing debates about driving mechanisms and unresolved anomalies like hotspots—an approving but measured stance.',
  },
  {
    id: 10,
    type: 'text_insertion',
    paragraph: 2,
    text: 'The following sentence can be added to paragraph 2 (the seafloor spreading paragraph). Where would it best fit?\n\n"This symmetrical pattern, mirrored on both sides of a ridge, acts like a tape recorder of Earth\'s magnetic history."',
    options: [
      'Position A — at the beginning of paragraph 2, before "The mechanism Wegener lacked"',
      'Position B — after "pushed outward and eventually forced beneath adjacent plates in a process called subduction."',
      'Position C — after "characteristic magnetic stripe patterns preserved in rocks on either side of mid-ocean ridges,"',
      'Position D — at the end of paragraph 2, after "plate tectonics had become the foundational framework of modern geology."',
    ],
    correct: 2,
    explanation: 'Position C is best. The inserted sentence elaborates on the "magnetic stripe patterns" just mentioned — describing them as a "tape recorder of Earth\'s magnetic history" provides an analogy that clarifies what those stripes represent before the paragraph concludes. Position A places the analogy before stripes are introduced. Position B inserts it between subduction and magnetic evidence, breaking the flow. Position D places clarification after the conclusion is already drawn.',
  },
  {
    id: 11,
    type: 'multiple',
    paragraph: 5,
    text: 'According to the passage, which THREE of the following are identified as consequences of plate tectonic activity? (Select 3)',
    options: [
      'Formation of mountain ranges through continental plate collision',
      'Reduction of oceanic depth along active mid-ocean ridges',
      'Concentration of metal ore deposits near volcanic subduction zones',
      'Gradual shifts in global climate patterns over millions of years',
      'Increased tidal activity in regions above transform fault lines',
      'Accelerated weathering of rocks in tectonically stable continental interiors',
    ],
    correct: [0, 2, 3],
    explanation: 'Mountain formation (paragraph 3), concentration of copper and gold near volcanic arcs (paragraph 4), and long-term climate shifts (paragraph 4) are all explicitly cited. The other options are not mentioned in the passage.',
  },
];
