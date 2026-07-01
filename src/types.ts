export interface WasteItem {
  id: string;
  name: string;
  category: "electronics" | "appliances" | "it_telecom" | "batteries" | "accessories";
  description: string;
  recyclability: number; // percentage 0-100
  toxicity: "Low" | "Medium" | "High" | "Critical";
  preciousMetals: string[]; // e.g., ["Gold", "Silver", "Copper"]
  hazards: string[]; // e.g., ["Lead", "Mercury", "Cadmium"]
  disposalInstructions: string;
  facts: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EcoTip {
  id: string;
  title: string;
  content: string;
  category: "reduction" | "reuse" | "recycling" | "awareness";
  isDaily?: boolean;
  createdAt?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "educational" | "guides" | "impact";
  author: string;
  readTime: string;
  imageUrl?: string;
  createdAt?: string;
}

export interface DropoffPoint {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  acceptedItems: string[];
  lat: number;
  lng: number;
  createdAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizResult {
  id: string;
  nickname: string;
  score: number;
  totalQuestions: number;
  level: "Eco-Novice" | "E-Waste Learner" | "Green Champion";
  completedAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}
