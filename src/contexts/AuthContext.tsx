import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import type { User, Session, PlanType } from "@/types/database";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isPro: boolean;
  planType: PlanType;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithGithub: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  setPlanType: (plan: PlanType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USER_KEY = "calcbrew_user";
const SESSION_KEY = "calcbrew_session";
const PLAN_KEY = "calcbrew_plan";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [planType, setPlanTypeState] = useState<PlanType>('free');

  const isPro = planType === 'pro';

  // Initialize from localStorage (temporary until Supabase is connected)
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    const storedSession = localStorage.getItem(SESSION_KEY);
    const storedPlan = localStorage.getItem(PLAN_KEY) as PlanType;

    if (storedUser && storedSession) {
      setUser(JSON.parse(storedUser));
      setSession(JSON.parse(storedSession));
    }
    if (storedPlan) {
      setPlanTypeState(storedPlan);
    }
    setIsLoading(false);
  }, []);

  // Persist to localStorage
  const persistAuth = useCallback((user: User | null, session: Session | null) => {
    if (user && session) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  const setPlanType = useCallback((plan: PlanType) => {
    setPlanTypeState(plan);
    localStorage.setItem(PLAN_KEY, plan);
  }, []);

  // Mock sign in - Replace with Supabase auth.signInWithPassword
  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    try {
      // TODO: Replace with supabase.auth.signInWithPassword({ email, password })
      const mockUser: User = {
        id: crypto.randomUUID(),
        email,
        user_metadata: { full_name: email.split('@')[0] }
      };
      const mockSession: Session = {
        user: mockUser,
        access_token: `mock_token_${Date.now()}`,
        expires_at: Date.now() + 3600000
      };
      
      setUser(mockUser);
      setSession(mockSession);
      persistAuth(mockUser, mockSession);
      
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  // Mock sign up - Replace with Supabase auth.signUp
  const signUp = async (email: string, password: string): Promise<{ error: Error | null }> => {
    try {
      // TODO: Replace with supabase.auth.signUp({ email, password, options: { emailRedirectTo } })
      const mockUser: User = {
        id: crypto.randomUUID(),
        email,
        user_metadata: { full_name: email.split('@')[0] }
      };
      const mockSession: Session = {
        user: mockUser,
        access_token: `mock_token_${Date.now()}`,
        expires_at: Date.now() + 3600000
      };
      
      setUser(mockUser);
      setSession(mockSession);
      persistAuth(mockUser, mockSession);
      
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  // Mock OAuth - Replace with Supabase OAuth
  const signInWithGoogle = async (): Promise<{ error: Error | null }> => {
    // TODO: Replace with supabase.auth.signInWithOAuth({ provider: 'google' })
    return { error: new Error("Google OAuth requires Supabase integration. Enable Cloud to use this feature.") };
  };

  const signInWithGithub = async (): Promise<{ error: Error | null }> => {
    // TODO: Replace with supabase.auth.signInWithOAuth({ provider: 'github' })
    return { error: new Error("GitHub OAuth requires Supabase integration. Enable Cloud to use this feature.") };
  };

  const signOut = async () => {
    // TODO: Replace with supabase.auth.signOut()
    setUser(null);
    setSession(null);
    persistAuth(null, null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isPro,
        planType,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithGithub,
        signOut,
        setPlanType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
