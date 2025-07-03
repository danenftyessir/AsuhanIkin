export interface User {
  id: string;
  email: string;
  name: string;
  role: "INVESTOR" | "FARMER" | "ADMIN";
  avatar?: string;
  phone?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;

  // farmer specific
  experience?: number;
  rating?: number;
  totalProjects?: number;
  verified?: boolean;

  // investor specific
  totalInvestment?: number;
  totalReturn?: number;
}

export interface Investment {
  id: string;
  title: string;
  description: string;
  location: string;
  roi: number;
  duration: number;
  minInvest: number;
  target: number;
  collected: number;
  status: "FUNDING" | "PLANTING" | "HARVESTING" | "COMPLETED";
  category: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;

  farmerId: string;
  farmer: User;

  investors: InvestmentUser[];
  iotData: IoTData[];
  progressLogs: ProgressLog[];

  // computed fields
  progress?: number;
  investorsCount?: number;
  daysLeft?: number;
}

export interface InvestmentUser {
  id: string;
  amount: number;
  investmentId: string;
  userId: string;
  createdAt: Date;

  investment: Investment;
  user: User;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  stock: number;
  image?: string;
  organic: boolean;
  harvestDate: Date;
  createdAt: Date;
  updatedAt: Date;

  farmerId: string;
  farmer: User;

  reviews: Review[];
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: Date;

  userId: string;
  user: User;
  productId: string;
  product: Product;
}

export interface ChatMessage {
  id: string;
  content: string;
  createdAt: Date;

  senderId: string;
  sender: User;
  receiverId: string;
}

export interface IoTData {
  id: string;
  temperature: number;
  humidity: number;
  soilPh: number;
  nutrients: number;
  timestamp: Date;

  investmentId: string;
  investment: Investment;
}

export interface ProgressLog {
  id: string;
  stage: string;
  description: string;
  progress: number;
  createdAt: Date;

  investmentId: string;
  investment: Investment;
}

export interface Notification {
  id: string;
  type: "INVESTMENT" | "ORDER" | "RETURN" | "SYSTEM";
  message: string;
  read: boolean;
  createdAt: Date;

  userId: string;
  user: User;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: number;
  modules: number;
  rating?: number;
  students: number;
  instructor: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;

  enrollments: Enrollment[];
}

export interface Enrollment {
  id: string;
  progress: number;
  createdAt: Date;
  updatedAt: Date;

  userId: string;
  user: User;
  courseId: string;
  course: Course;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  replies: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;

  authorId: string;
  author: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
