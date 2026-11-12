export type PageId = 'home' | 'diensten' | 'kantoor' | 'tarieven' | 'kennis' | 'contact';

export interface ServiceCategory {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  image: string;
  leadParagraph: string;
  deeds: {
    name: string;
    description: string;
    whenNeeded: string;
    turnaround: string;
    indicativePrice: string;
    included: string[];
    checklist: string[];
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  subtitle: string;
  badge?: string;
  email: string;
  phone: string;
  education: string;
  yearsExperience: string;
  specialisms: string[];
  bio: string;
  quote: string;
  memberships: string[];
  workingDays: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  keyTakeaways: string[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  text: string;
}

export interface QuoteCalculation {
  category: string;
  serviceId: string;
  serviceName: string;
  basePrice: number;
  options: {
    id: string;
    name: string;
    price: number;
    checked: boolean;
  }[];
  kadasterFee: number;
  knbContribution: number;
  vatRate: number;
}

export interface AppointmentBooking {
  serviceType: string;
  preferredNotary: string;
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  isConfirmed: boolean;
}
