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
]
