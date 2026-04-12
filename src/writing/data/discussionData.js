export const discussionPrompts = [
  {
    id: 1,
    professor: {
      name: 'Dr. Johnson',
      question: 'Universities today often compete fiercely to attract new students. Consequently, many institutions are spending significant portions of their budgets on non-academic amenities, such as luxury dormitories, state-of-the-art recreation centers, and high-end dining halls. Critics, however, argue that this money should be directed exclusively toward hiring better faculty, expanding libraries, and funding research. In your opinion, is it justifiable for universities to invest heavily in student amenities, or should the focus remain on academic resources?',
    },
    students: [
      {
        name: 'Sarah',
        opinion: 'I believe that investing in amenities is important because when students are happy and healthy mentally, they perform better in their classes. A good recreation center or comfortable living space can reduce stress and create a sense of community on campus.',
      },
      {
        name: 'Mark',
        opinion: 'I strongly disagree. The primary reason we pay for university is to get an education that prepares us for a career. Every dollar spent on a fancy gym or luxury dorm is a dollar taken away from hiring qualified professors or funding important research.',
      },
    ],
    sampleResponse: "I side with Mark's perspective that academic resources must take priority. While comfortable amenities can reduce student stress, as Sarah suggests, the core value of a university lies in the quality of its instruction and research output. A well-funded library or a renowned professor will impact a student's career trajectory far more than a luxury dormitory. However, I acknowledge that completely neglecting student well-being is counterproductive. A balanced approach is ideal: universities should ensure basic, functional living and recreational facilities while directing the majority of discretionary funds toward academic excellence. The primary measure of a university's worth should remain its educational outcomes, not the opulence of its facilities.",
    sampleScore: 5,
  },
  {
    id: 2,
    professor: {
      name: 'Prof. Williams',
      question: 'Many educational systems follow a traditional calendar with a long summer vacation of two to three months. However, some districts have adopted year-round schooling, where students attend school for the same total number of days but with shorter, more frequent breaks throughout the year. Which calendar system do you think is more beneficial for students, and why?',
    },
    students: [
      {
        name: 'Liam',
        opinion: 'Students undergo a tremendous amount of stress during the academic year, and they need a significant, uninterrupted block of time to truly decompress. Summer break also provides opportunities for employment, camps, and family travel that are essential for personal development.',
      },
      {
        name: 'Maya',
        opinion: 'Research has shown that extended breaks cause significant knowledge loss, often called the "summer slide." Frequent, shorter breaks throughout the year prevent burnout much more effectively than waiting nine exhausting months for a vacation.',
      },
    ],
    sampleResponse: "I find Maya's argument about the year-round calendar more compelling. The 'summer slide' is a well-documented phenomenon where students, particularly those from disadvantaged backgrounds, lose significant academic progress over long breaks, widening achievement gaps. Shorter, more frequent breaks can provide adequate rest without the cognitive cost of extended disengagement. While Liam raises a valid point about the value of summer experiences like employment and travel, these opportunities are not available to all students equally. A year-round calendar could promote greater equity by ensuring consistent learning. The minor adjustment to scheduling family activities seems a worthwhile trade-off for the academic benefits and reduced burnout that more regular breaks provide.",
    sampleScore: 5,
  },
  {
    id: 3,
    professor: {
      name: 'Dr. Chen',
      question: 'Biometric technologies such as facial recognition and fingerprint scanning are increasingly being used in everyday life, from unlocking smartphones to making payments. Some people welcome this technology for its convenience and security benefits, while others express concerns about privacy and the potential misuse of personal data. Do the benefits of using biometric technology for everyday tasks outweigh the potential privacy risks?',
    },
    students: [
      {
        name: 'Alex',
        opinion: 'Biometrics are unique to each individual and always with you, making everyday transactions not only faster but also significantly more secure than traditional passwords. The convenience factor alone makes adoption worthwhile.',
      },
      {
        name: 'Priya',
        opinion: 'If someone steals your password, you can simply change it. But if a database containing your fingerprint or facial scan is hacked, your biometric identity is compromised forever. This permanent vulnerability is simply too great a risk.',
      },
    ],
    sampleResponse: "Priya's concern about the irreversibility of biometric data breaches is the most critical issue in this debate. Alex is correct that biometrics offer genuine convenience and security against common threats like password phishing. However, the asymmetry of risk is profound: a compromised password is fixable, but a compromised fingerprint is not. As data breaches become increasingly common, centralizing citizens' permanent biometric identifiers creates an unacceptable single point of failure. I believe biometrics can be used responsibly for local authentication, such as unlocking a personal device where data is stored on-chip, but should not be used for centralized databases. The potential for permanent, irreversible identity theft outweighs the convenience benefits for high-stakes applications.",
    sampleScore: 5,
  },
  {
    id: 4,
    professor: {
      name: 'Dr. Adams',
      question: 'The rise of remote work technology has led many companies to question whether a physical office is necessary at all. Some organizations have already moved to fully remote models, while others are mandating a return to the office full-time, citing concerns about collaboration and company culture. In your view, should companies require employees to work in the office full-time, adopt a fully remote model, or pursue a hybrid approach? What factors are most important in making this decision?',
    },
    students: [
      {
        name: 'Emma',
        opinion: 'Remote work has proven that productivity does not depend on physical presence. Employees save hours commuting, report higher job satisfaction, and companies can hire talent from anywhere. Forcing people back to an office seems like a step backward when the technology to work effectively from home already exists.',
      },
      {
        name: 'James',
        opinion: 'Spontaneous hallway conversations and in-person brainstorming sessions produce breakthroughs that are simply impossible to replicate on a video call. Junior employees especially miss out on mentorship and the subtle cultural learning that happens naturally in an office environment.',
      },
    ],
    sampleResponse: "Both Emma and James identify genuine strengths, but I believe the hybrid model best serves most organizations. Emma is correct that remote work has demonstrated real productivity gains and employee satisfaction improvements, particularly for focused, individual tasks. However, James raises a critical point that in-person interaction facilitates a different kind of collaboration — the spontaneous, serendipitous exchange of ideas that often drives innovation. The solution is not a binary choice. A structured hybrid approach, where teams gather on designated days for collaborative work while retaining flexibility for individual tasks, captures the benefits of both models. The most important factors in this decision should be the nature of the work itself and the career stage of employees, since early-career professionals genuinely benefit more from in-person mentorship than experienced remote workers do.",
    sampleScore: 5,
  },
  {
    id: 5,
    professor: {
      name: 'Prof. Rodriguez',
      question: 'Several countries are considering legislation that would prohibit children under the age of 16 from creating social media accounts. Proponents argue this is necessary to protect young people from cyberbullying, harmful content, and addictive design. Critics contend that such restrictions are difficult to enforce, infringe on young people\'s rights, and ignore the genuine social and educational benefits of these platforms. Do you think strict age restrictions on social media are the right policy response?',
    },
    students: [
      {
        name: 'Sophie',
        opinion: 'The mental health data on teenagers and social media is alarming. Platforms are deliberately designed to be addictive, and young brains are especially vulnerable. An age restriction gives children the developmental time they need before being exposed to those pressures.',
      },
      {
        name: 'Ethan',
        opinion: 'Age restrictions are almost impossible to enforce — children simply lie about their age, and parents share their own accounts. Instead of banning access, we should focus on teaching digital literacy and holding platforms accountable for their algorithmic choices.',
      },
    ],
    sampleResponse: "Ethan's argument that age restrictions are unenforceable is the strongest practical objection to this policy. Sophie is right that the mental health evidence is serious, but a law that is routinely circumvented provides only the illusion of protection. A child who creates an account using a false birthdate loses none of the platform's harmful features while gaining no supervision. I believe the more effective approach combines two things: meaningful platform accountability through regulation of addictive design features and algorithmic amplification of harmful content, and investment in digital literacy education that equips young people to navigate these environments critically. Strict age limits might serve as a useful delay mechanism, but they should be seen as a supplementary measure rather than a primary solution to what is fundamentally a design and oversight problem.",
    sampleScore: 5,
  },
  {
    id: 6,
    professor: {
      name: 'Dr. Lee',
      question: 'To accelerate the transition away from fossil fuels, several governments are proposing legislation to ban the sale of new gasoline and diesel-powered vehicles by 2035. Supporters argue this is a necessary step to meet international climate targets and will stimulate innovation in the electric vehicle industry. Opponents argue the deadline is unrealistically fast, that charging infrastructure is insufficient, and that the policy will disproportionately burden lower-income consumers. Do you think a 2035 ban on new combustion engine vehicle sales is the right policy?',
    },
    students: [
      {
        name: 'Noah',
        opinion: 'Climate science is unambiguous that we need drastic action within this decade. A firm 2035 deadline sends a clear signal to automakers and investors, which will accelerate the very infrastructure development and cost reductions that critics say are lacking. Without hard deadlines, the transition will always be delayed.',
      },
      {
        name: 'Chloe',
        opinion: 'A family in a rural area who drives 50 miles to work every day cannot simply switch to an EV when there are no charging stations nearby and the cheapest models still cost $35,000. This policy, as written, would be felt most harshly by people who can least afford it.',
      },
    ],
    sampleResponse: "Chloe identifies the most serious flaw in a blunt 2035 ban: it distributes the burden of the energy transition unequally. Noah is correct that firm deadlines drive investment and that delay is costly in climate terms, but the effectiveness of a mandate depends entirely on whether the supporting infrastructure exists. A better policy framework would tie the ban date to measurable benchmarks — a minimum density of public fast-chargers per capita in rural areas and an affordable EV price threshold — rather than a fixed calendar date. This approach preserves the urgency Noah advocates for while addressing the equity concerns Chloe raises. Governments should also pair any phase-out with substantial subsidies targeted at low-income buyers and investment in rural charging networks, ensuring the transition is genuinely accessible rather than theoretically possible.",
    sampleScore: 5,
  },
]
