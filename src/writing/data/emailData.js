export const emailPrompts = [
  {
    id: 1,
    situation:
      'You took your team to a new restaurant recommended by your coworker, Kevin, but the food was disappointing and the service was slow.',
    goals: [
      'Explain what was wrong with the restaurant',
      'Describe the team\'s reaction',
      'Suggest alternative lunch arrangements',
    ],
    recipient: 'Kevin',
    sampleResponse: `I wanted to follow up on our team lunch at the restaurant you recommended yesterday. Unfortunately, the experience did not go well. The food arrived nearly forty minutes after we ordered, and when it finally came, several dishes were cold and underseasoned. The pasta was overcooked and my colleague's fish was dry. As you can imagine, the team was quite disappointed. A few people had back-to-back meetings afterward and felt the long wait added unnecessary stress to an already busy day. Morale at the table was noticeably low by the end of the meal. Going forward, I think it would be better to stick with our usual spot on Oak Street, which has always been reliable and quick. If anyone suggests a new place next time, perhaps we could try it on a less hectic day.`,
    sampleScore: 5,
  },
  {
    id: 2,
    situation:
      'You missed an important quiz in your biology class because of a family emergency. You need to contact your professor, Dr. Martinez.',
    goals: [
      'Explain why you missed the quiz',
      'Ask about make-up options',
      'Offer to provide documentation',
    ],
    recipient: 'Dr. Martinez',
    sampleResponse: `I am writing to inform you that I was unable to attend class on Thursday and therefore missed the biology quiz scheduled for that day. A family emergency arose early that morning that required my immediate attention, and I had no opportunity to notify you in advance. I sincerely apologize for any inconvenience this may have caused. I understand that the quiz covered material that is central to the upcoming unit, and I am eager to demonstrate my understanding of the content. I would be very grateful if there were any possibility of completing a make-up quiz at a time that is convenient for you. I am available before or after class most days this week. Additionally, I am happy to provide any supporting documentation related to the emergency if that would be helpful or required by department policy. Thank you for your understanding.`,
    sampleScore: 5,
  },
  {
    id: 3,
    situation:
      'The neighbors in the apartment above yours have been playing loud music late at night for the past two weeks. You want to contact the building manager, Ms. Thompson.',
    goals: [
      'Describe the noise issue and when it occurs',
      'Explain how it affects your daily life',
      'Request a specific resolution',
    ],
    recipient: 'Ms. Thompson',
    sampleResponse: `I am writing to bring a noise disturbance to your attention that has been affecting my apartment for the past two weeks. The tenants in the unit directly above mine, Apartment 4B, have been playing loud music most nights between 11:00 PM and 2:00 AM. The bass is clearly audible through my ceiling even with my door closed. This has significantly disrupted my sleep, and I have been arriving at work exhausted nearly every day as a result. I have also found it difficult to focus in the evenings when I need to study or prepare for early morning responsibilities. I attempted to speak with the neighbors directly last week, but the situation has not improved. I would respectfully request that you speak with them about adhering to the building's quiet hours policy. If that does not resolve the issue, I would appreciate knowing what further steps are available to me.`,
    sampleScore: 5,
  },
  {
    id: 4,
    situation:
      'You stayed at a hotel for a work conference last week. When your company reviewed your expense report, they found the hotel had charged your card twice for the same night. Contact the hotel manager, Ms. Rivera.',
    goals: [
      'Explain the billing error clearly',
      'Reference your booking details',
      'Request a refund and corrected invoice',
    ],
    recipient: 'Ms. Rivera',
    sampleResponse: `I am writing regarding a billing discrepancy on the account for my recent stay at your hotel from the 14th to the 17th of this month, under the reservation name James Holloway. Upon reviewing my credit card statement, I noticed a duplicate charge for the night of the 15th. The amount of $189 appears twice, resulting in an overcharge of $189. I have attached a screenshot of my bank statement highlighting both transactions. My company's travel department requires a corrected itemized invoice before they can process my reimbursement, so resolving this as soon as possible would be greatly appreciated. I would kindly ask that you investigate the charge, issue a refund for the duplicate amount to the card on file, and send a corrected invoice to this email address. Thank you for your attention to this matter, and I look forward to your prompt response.`,
    sampleScore: 5,
  },
  {
    id: 5,
    situation:
      'The heating system in your apartment has not been working properly for the past ten days. Temperatures at night have been below freezing. You need to write to your landlord, Mr. Collins.',
    goals: [
      'Describe the problem and how long it has persisted',
      'Explain the impact on your health and daily routine',
      'Request urgent repairs and specify a reasonable deadline',
    ],
    recipient: 'Mr. Collins',
    sampleResponse: `I am writing to report a serious maintenance issue that has remained unresolved for ten days now. The heating system in my apartment, Unit 3A, stopped functioning properly on the evening of the 2nd of this month, and despite reporting it via the building's maintenance portal the following day, no repair has been made. Over the past week, overnight temperatures in the city have dropped below freezing, and inside my apartment the temperature has regularly fallen to 12 degrees Celsius by early morning. As a result, I have been waking up with headaches and have had difficulty sleeping, which is affecting my performance at work. I have been forced to purchase an electric space heater at my own expense as a temporary solution. I would respectfully request that a qualified technician be sent to inspect and repair the heating unit no later than the end of this week. If the issue cannot be resolved within that timeframe, please let me know what alternatives the building management is prepared to offer. I appreciate your prompt attention to this matter.`,
    sampleScore: 5,
  },
  {
    id: 6,
    situation:
      'You saw an online listing for a part-time sales associate position at a local independent bookstore. You want to apply and ask for more information. Write to the store owner, Ms. Park.',
    goals: [
      'Express your genuine interest and relevant background',
      'Ask about the weekly hours and key responsibilities',
      'Request an interview or next steps',
    ],
    recipient: 'Ms. Park',
    sampleResponse: `I am writing to express my interest in the part-time sales associate position I saw advertised on the bookstore's website. I am a second-year literature student at Greenfield University and have been a regular customer of your store for the past two years, so I am genuinely enthusiastic about the possibility of joining your team. I have previous retail experience from a summer job at a gift shop, where I handled customer inquiries, managed inventory, and operated the point-of-sale system. I believe that background, combined with my familiarity with a wide range of book genres, would allow me to assist customers effectively and contribute positively to the store's atmosphere. Before submitting a formal application, I would appreciate clarification on a few points: specifically, the expected weekly hours and whether weekend availability is required. I would also love to learn more about the day-to-day responsibilities of the role. I am available for an interview at your convenience and can be reached at this email address or by phone. Thank you very much for considering my inquiry.`,
    sampleScore: 5,
  },
  {
    id: 7,
    situation:
      'You recently completed a six-month internship at a marketing agency. You want to ask your supervisor, Ms. Harper, for a reference letter for a full-time position you are applying for.',
    goals: [
      'Remind her of the specific projects you worked on together',
      'Explain the position you are applying for and why it is a good fit',
      'Ask if she is willing to write the letter and provide the deadline',
    ],
    recipient: 'Ms. Harper',
    sampleResponse: `I hope this message finds you well. I am reaching out to ask whether you would be willing to write a reference letter on my behalf. I recently applied for a full-time digital marketing coordinator position at Brightfield Media, and I believe a letter from you would significantly strengthen my application. During my internship with your team, I had the opportunity to lead the social media campaign for the Avalon product launch and contribute to the quarterly analytics report, both of which gave me a strong foundation in data-driven marketing. The role at Brightfield closely mirrors the work I did under your guidance, focusing on content strategy and campaign performance analysis, and I feel genuinely prepared for the responsibilities it involves. The application deadline is the 30th of this month, so I would need the letter submitted by the 27th if possible. I completely understand if your schedule does not allow it, and I am happy to provide any additional information that might be useful. Thank you very much for considering my request.`,
    sampleScore: 5,
  },
  {
    id: 8,
    situation:
      'You signed up for an online professional development course through your company, but the course materials are outdated and the instructor has not responded to student questions in three weeks. Contact the course administrator, Mr. Patel.',
    goals: [
      'Describe the specific problems with the course',
      'Explain how this is affecting your learning and professional development',
      'Request a concrete solution or a full refund',
    ],
    recipient: 'Mr. Patel',
    sampleResponse: `I am writing to raise serious concerns about the Advanced Project Management course I enrolled in through your platform on the 5th of last month. There are two issues that I feel need to be addressed urgently. First, several of the course modules reference tools and methodologies that have been superseded by newer industry standards, making parts of the content less applicable to current professional practice. Second, and more critically, the course instructor has not responded to any student questions in the discussion forum for the past three weeks. I and several other participants have posted detailed questions about the certification capstone project and have received no guidance whatsoever. My company enrolled me in this course specifically to prepare for a certification exam in May, and the lack of support is putting that goal at risk. I would ask that you either arrange for an active instructor to take over the forum or provide a clear timeline for when responses will be forthcoming. If neither is possible within the next five business days, I would like to request a full refund of the course fee. Thank you for your attention to this matter.`,
    sampleScore: 5,
  },
  {
    id: 9,
    situation:
      'You organized a charity fundraising dinner for your local community center. A local bakery, owned by Mr. Torres, donated 50 pastries for the event but was never officially thanked. Write to express your gratitude.',
    goals: [
      'Thank him sincerely and describe how the donation contributed to the event',
      'Share a specific detail about the positive impact his contribution had',
      'Invite him to be involved in future events',
    ],
    recipient: 'Mr. Torres',
    sampleResponse: `I am writing on behalf of the Riverside Community Center to offer our sincere and heartfelt thanks for your generous donation of pastries to our annual fundraising dinner last Saturday evening. Your contribution made a wonderful impression on our guests. The pastries were displayed prominently on the dessert table and were among the first items to disappear, prompting several attendees to ask where they had come from. Your support helped create the warm, welcoming atmosphere that encouraged our guests to give generously, and I am delighted to tell you that we exceeded our fundraising target by nearly fifteen percent. That money will go directly toward after-school programs for children in the neighborhood. The work you do to support community events does not go unnoticed, and we would be honored to have Elmwood Bakery involved in our spring gala in April. I will be in touch closer to the date with more details, but please know that your participation would be very much valued. Thank you again for your kindness.`,
    sampleScore: 5,
  },
  {
    id: 10,
    situation:
      'Your university recently changed its policy to require all students to complete a mandatory wellness seminar as a graduation requirement. You believe the policy is unfair and want to write to the Dean of Students, Dr. Washington.',
    goals: [
      'Explain why you find the requirement unreasonable',
      'Suggest a fairer alternative or modification to the policy',
      'Request that your concerns be reviewed before the policy takes full effect',
    ],
    recipient: 'Dr. Washington',
    sampleResponse: `I am writing to respectfully share my concerns regarding the newly announced requirement that all students must complete the Wellness Seminar series as a condition of graduation. While I fully appreciate the university's commitment to student well-being, I believe the policy as currently designed presents some significant challenges that are worth reviewing before it takes effect. My primary concern is that the requirement adds approximately 20 hours of mandatory attendance to the schedules of students who may already be managing heavy course loads, part-time employment, or family responsibilities. Students who are already practicing healthy habits or who have completed comparable training through other programs are being asked to repeat material that may add little value to their development. I would like to suggest that the university consider offering a waiver option for students who can demonstrate equivalent knowledge or prior participation in similar programs, or alternatively, that the seminar be offered in a flexible self-paced online format rather than scheduled sessions. I would greatly appreciate the opportunity for student concerns to be heard before the policy is fully implemented, and I would be glad to participate in any consultation process. Thank you for your time and consideration.`,
    sampleScore: 5,
  },
]
