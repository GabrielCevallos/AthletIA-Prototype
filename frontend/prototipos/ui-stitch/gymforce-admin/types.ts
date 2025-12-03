export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  thumbnail: string;
  videoUrl?: string;
  description?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Pending';
  plan: 'Basic' | 'Premium' | 'Annual';
  joinDate: string;
  avatar: string;
}

export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}
