export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  dp?: string;
}

export type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cPassword: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type forgotPasswordData = {
  password: string;
  cPassword: string;
};

export type GetInTouchData = {
  name: string;
  email: string;
  message: string;
};

export interface formData {
  country: string;
  pincode: string;
  category: string;
  fundraisingFor: string;
  amount: number;
  thumbnail: string|null;
  youtube: string;
  title: string;
  story: string;
}

export interface FormState {
  title: string;
  walletAddress: string;
  description: string;
  thumbnail: File | null;
  images: File[];
  totalAmount: number;
  role: "NGO" | "Individual";
  amountDonated?: number;
  address?: string;
  name?: string;
  email?: string;
}

export interface RaisingState {
  title: string;
  walletAddress: string;
  description: string;
  thumbnail: string;
  images: string[];
  amountDonated: number;
  totalAmount: number;
  role: "NGO" | "Individual";
  address?: string;
  name?: string;
  email?: string;
  id: string;
}