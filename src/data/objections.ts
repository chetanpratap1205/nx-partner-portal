export type ObjectionCategory = 'pricing' | 'trust_privacy' | 'tech_staff' | 'competition' | 'time_efficiency' | 'patient_experience';

export interface Objection {
  id: string;
  category: ObjectionCategory;
  triggerWords: string[];
  doctorSays: string;
  rebuttal: string;
  tone: string;
}

export const OBJECTIONS: Objection[] = [
  // --- TIME & EFFICIENCY ---
  {
    id: 'too_busy_to_type',
    category: 'time_efficiency',
    triggerWords: ['busy', 'type', 'typing', '60 patients', 'rush', 'slow down', 'paper is faster'],
    doctorSays: "I see 60+ patients a day. Writing on paper takes 10 seconds. Typing on software will slow down my OPD.",
    rebuttal: "Doctor, you don't type; you tap. Doctor Diary is pre-loaded with templates specific to your specialty. What takes 30 seconds to write on paper takes 10 seconds to click. Over 60 patients, you save 20 minutes of sheer writing fatigue every single day. Plus, no more trying to decipher old handwriting on follow-ups.",
    tone: "Analytical and empathetic. Focus on removing fatigue and saving time."
  },
  {
    id: 'no_time_to_setup',
    category: 'time_efficiency',
    triggerWords: ['time', 'setup', 'later', 'next month', 'busy right now', 'no time'],
    doctorSays: "I'm too swamped right now to learn a new system. Come back next month.",
    rebuttal: "I completely understand you're swamped—that is exactly why we need to implement this today. The setup takes zero effort from you; my team handles the entire data upload and configuration. We just need 15 minutes of your receptionist's time. By tomorrow, your clinic will run 20% more efficiently.",
    tone: "Urgent but accommodating. Take the burden of setup entirely off their shoulders."
  },

  // --- TECH & STAFF ---
  {
    id: 'staff_turnover',
    category: 'tech_staff',
    triggerWords: ['staff', 'receptionist', 'attrition', 'leaves', 'change', 'train'],
    doctorSays: "My receptionists keep changing every 6 months. I can't keep training them on new software.",
    rebuttal: "That is the exact reason you need a system, Doctor. Right now, your clinic's intelligence walks out the door when a receptionist quits. With Doctor Diary, the system runs the clinic. It is so intuitive (like using WhatsApp) that a new receptionist can learn it in 10 minutes. Your clinic operations become staff-proof.",
    tone: "Strategic and authoritative. Shift the perspective from 'software is a burden' to 'software is security'."
  },
  {
    id: 'tech_illiterate',
    category: 'tech_staff',
    triggerWords: ['old', 'computer', 'tech', 'difficult', 'hard', 'not good with technology'],
    doctorSays: "I am old-school. I am not good with computers and neither is my staff.",
    rebuttal: "Doctor, do you use WhatsApp to text your family? Doctor Diary is built with that exact same simplicity. There are no complex menus. Just three buttons: Add Patient, Book Appointment, Generate Prescription. Plus, we provide 24/7 VIP support. If you ever get stuck, you call us, and we guide you in seconds.",
    tone: "Reassuring, respectful, and comforting."
  },

  // --- PRICING & ROI ---
  {
    id: 'price_too_high',
    category: 'pricing',
    triggerWords: ['expensive', 'cost', 'money', 'high', 'budget', 'price', 'too much'],
    doctorSays: "₹2,500 a month is an added expense. Paper diaries cost me ₹100.",
    rebuttal: "Doctor, paper diaries cost ₹100, but they cost you lakhs in lost revenue. How many patients book an appointment and don't show up? Doctor Diary sends automated WhatsApp reminders. If those reminders save just ONE no-show patient a month, the software pays for itself. Everything else is pure profit.",
    tone: "Consultative. Shift the framing from 'Expense' to 'Return on Investment'."
  },
  {
    id: 'free_alternative',
    category: 'pricing',
    triggerWords: ['free', 'whatsapp', 'google calendar', 'excel', 'free tools'],
    doctorSays: "I just use Google Calendar for appointments and WhatsApp for messaging. It's free.",
    rebuttal: "Free tools are great for personal use, but they make a clinic look unorganized. When a patient gets a professional, branded WhatsApp message with a secure link to their digital prescription, it elevates your clinic's prestige. Patients gladly pay premium consultation fees to doctors who provide a premium, modernized experience.",
    tone: "Appealing to prestige and brand image."
  },

  // --- TRUST, PRIVACY & COMPETITION ---
  {
    id: 'data_security_practo',
    category: 'trust_privacy',
    triggerWords: ['practo', 'steal', 'data', 'sell', 'competitor', 'patients data', 'lybrate', 'justdial'],
    doctorSays: "Practo used my data to show my patients other doctors. How do I know you won't?",
    rebuttal: "Doctor, Practo is a marketplace—their goal is to own the patient. Doctor Diary is a White-Label SaaS—our goal is to make YOU own the patient. We do not have a public portal for patients to browse. Your data is 256-bit encrypted and legally belongs 100% to you. We are building a fortress around your practice so patients never leave you.",
    tone: "Fiercely loyal and highly differentiated. Draw a hard line between Marketplaces and SaaS."
  },
  {
    id: 'patient_privacy',
    category: 'trust_privacy',
    triggerWords: ['safe', 'secure', 'privacy', 'leak', 'cloud', 'hack'],
    doctorSays: "I don't trust the cloud. What if patient records are leaked?",
    rebuttal: "Doctor, physical files in a cabinet are far more likely to be stolen, lost in a fire, or read by unauthorized staff. Our cloud infrastructure uses the same AWS security protocols that banks use. Plus, you have role-based access—your receptionist can only see appointments, while only you can see clinical notes.",
    tone: "Factual, reassuring, and logical."
  },

  // --- PATIENT EXPERIENCE ---
  {
    id: 'patients_prefer_paper',
    category: 'patient_experience',
    triggerWords: ['patients', 'paper', 'old patients', 'rural', 'smartphones'],
    doctorSays: "My patients are from rural areas. They want paper prescriptions, not digital links.",
    rebuttal: "We absolutely support that! You can hit 'Print' and hand them a beautiful, clearly legible paper prescription in seconds. The magic is that a digital copy is simultaneously saved to their WhatsApp and your cloud. When they lose that paper in 3 months and call you panicking, you can resend it to them in one click. They will love you for it.",
    tone: "Accommodating and highly practical."
  },
  {
    id: 'whatsapp_spam',
    category: 'patient_experience',
    triggerWords: ['spam', 'bother', 'annoy', 'too many messages', 'whatsapp'],
    doctorSays: "I don't want to spam my patients with automated WhatsApp messages.",
    rebuttal: "It's not spam; it's premium care. We only send transactional messages: 'Your appointment is confirmed for 4 PM' and 'Here is your prescription'. Patients appreciate this because it saves them from waiting in crowded lobbies. It shows you respect their time as much as your own.",
    tone: "Redefining the objection into a positive patient-care feature."
  }
];
