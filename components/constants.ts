import {
  NavItem,
  Feature,
  PricingPlan,
  Testimonial,
  FAQ,
} from "./landingpage/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Mentors", href: "#mentors" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export const FEATURES: Feature[] = [
  {
    id: "f1",
    title: "Live Video Conversation",
    description:
      "Real-time, face-to-face interaction with advanced AI avatars that respond to your emotions.",
    icon: "videocam",
  },
  {
    id: "f2",
    title: "Personalized Mentorship",
    description:
      "Tailored advice that adapts to your unique career path, learning style, and goals.",
    icon: "auto_awesome",
  },
  {
    id: "f3",
    title: "Available 24/7",
    description:
      "Guidance whenever you need it, day or night. No scheduling conflicts, just instant support.",
    icon: "schedule",
  },
];

export const STEPS = [
  {
    number: 1,
    title: "Choose a mentorship topic",
    description:
      "Explore our curated library of specialized topics tailored to your specific career goals.",
    icon: "search",
  },
  {
    number: 2,
    title: "Book a live AI session",
    description:
      "Select a time slot that works for you. Our AI mentors are available 24/7 for you.",
    icon: "calendar_add_on",
  },
  {
    number: 3,
    title: "Talk and get instant guidance",
    description:
      "Jump into a high-quality video call. Have a natural conversation and receive feedback.",
    icon: "video_camera_front",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Flex",
    price: "$15",
    period: "session",
    description: "Perfect for occasional guidance.",
    features: [
      "Pay as you go",
      "Access to all AI mentors",
      "Standard video quality",
      "No commitment",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    period: "month",
    description: "Best for continuous learning & growth.",
    isPopular: true,
    features: [
      "Unlimited sessions",
      "Priority matching",
      "HD video & recording",
      "Progress tracking dashboard",
      "Custom learning path",
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "Frontend Developer",
    content:
      '"My AI mentor helped me solve a specific bug in 10 minutes that had me stuck for days. The explanation was crystal clear and the code examples were spot on."',
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhHZU5HrzpEuMa43nerWnTgxNdZavNs9GaCI1iqzVDeZ1hAyOGHYhDS3DBm7QQtQd-wS99cfI6DXMme4Auhi7BhZzH0K95N2YIDVpg-OAkZ5McVYWC-BMJ_ZED-QNY-me9vuRF3MQj7r5WVVH7XoMII0syU6-JcJYyBUQRwm7ikOzYQDMsK7pHp2l_xFYgTSGiY0fa8x8iM0vntQ0RZszStYYwIl1qiNYQC9AJA5yQmXriuRBCeNm_E9Cl2cVvnNp83TZjL_Qtz7k",
    rating: 5,
    timeAgo: "2 days ago",
  },
  {
    name: "David Chen",
    role: "Full Stack Engineer",
    content:
      '"The interview prep mode is a game changer. I practiced realistic system design questions and landed the senior role I wanted at a top tech company."',
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzik9fhimIgybyDW794CDcT5jmTFZq71q4CeTsOiiWFRBDgfNPZnAJ-5oQxN_RWL1_Ak-gxwyyxBae0BfI2onVDJtxPzESFDSL9sAp7u7QW1zJFtRmF3molrepzyi6eVmr3hGiG6AZwjKReUMl577S-b9CnNgkqE1w-Mx2D00XePcR9UJg1kt4YmRuQak4Yob3nizwaxsQ8tprhLawklRLaiB-IGqVbUJLrGZlNa8Tb8RBvYmD_mpTq9zNJkDIqs-HZuqXL7WTC7g",
    rating: 5,
    timeAgo: "1 week ago",
  },
];

export const FAQS: FAQ[] = [
  {
    question: "How do the live video calls with AI work?",
    answer:
      "Our AI mentors use advanced real-time processing to generate low-latency video responses. The avatars are photorealistic and synchronized with generated voice for a seamless experience.",
    icon: "videocam",
  },
  {
    question: "Is my conversation private and secure?",
    answer:
      "Absolutely. We use end-to-end encryption for all video and audio data. Your conversations are processed ephemerally and are not stored permanently.",
    icon: "lock",
  },
];
