// Database types - Ready for Supabase integration
// These types mirror the planned database schema

export type PlanType = 'free' | 'pro';

export interface UserPlan {
  user_id: string;
  plan_type: PlanType;
  created_at: string;
}

export interface CalculationHistory {
  id: string;
  user_id: string;
  calculator_type: string;
  input_data: Record<string, unknown>;
  result_data: Record<string, unknown>;
  created_at: string;
}

export interface SavedCalculation {
  id: string;
  user_id: string;
  calculator_type: string;
  name?: string;
  input_data: Record<string, unknown>;
  result_data: Record<string, unknown>;
  created_at: string;
}

export interface SharedCalculation {
  id: string;
  user_id: string;
  share_token: string;
  calculator_type: string;
  input_data: Record<string, unknown>;
  result_data: Record<string, unknown>;
  expires_at: string | null;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
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
