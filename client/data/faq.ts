export type FAQ = {
  id: string;
  question: string;
  answer: string;
  order: number;
};

export const faqs: FAQ[] = [
  {
    id: "q1",
    question: "Do you provide Starlink hardware?",
    answer: "Yes. We handle Starlink sales, delivery, activation, and professional installation.",
    order: 1,
  },
  {
    id: "q2", 
    question: "How far can you extend WiFi?",
    answer: "With proper line-of-sight, we extend WiFi up to 10km using point-to-point links.",
    order: 2,
  },
  {
    id: "q3",
    question: "Do you support businesses and institutions?",
    answer: "Absolutely. From SMEs to large campuses, we design scalable networks and managed services.",
    order: 3,
  },
];
