// Database types for CalcBrew
// These types represent the Supabase database schema

export type PlanType = 'free' | 'pro';
export type SubscriptionStatus = 'active' | 'canceled' | 'expired' | 'trialing';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  plan_type: PlanType;
  language: string | null;
  country: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: PlanType;
  status: SubscriptionStatus;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CalculationHistory {
  id: string;
  user_id: string;
  calculator_type: string;
  calculator_name: string;
  inputs: Record<string, unknown>;
  result: Record<string, unknown>;
  created_at: string;
}

export interface SavedCalculation {
  id: string;
  user_id: string;
  calculator_type: string;
  calculator_name: string;
  title: string;
  inputs: Record<string, unknown>;
  result: Record<string, unknown>;
  is_shared: boolean;
  share_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SharedCalculation {
  id: string;
  saved_calculation_id: string;
  share_token: string;
  views: number;
  expires_at: string | null;
  created_at: string;
}

// Legacy types for backward compatibility
export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface Session {
  user: User;
  access_token: string;
  expires_at?: number;
}
