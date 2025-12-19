import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type PlanType = 'free' | 'pro';

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  plan_type: string;
  language: string | null;
  country: string | null;
}

interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  status: string;
  start_date: string;
  end_date: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  subscription: Subscription | null;
  isLoading: boolean;
  isPro: boolean;
  planType: PlanType;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithGithub: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const planType: PlanType = subscription?.plan === 'pro' ? 'pro' : 'free';
  const isPro = planType === 'pro';

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (!error && data) {
      setProfile(data as Profile);
    }
  }, []);

  const fetchSubscription = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (!error && data) {
      setSubscription(data as Subscription);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await Promise.all([
        fetchProfile(user.id),
        fetchSubscription(user.id)
      ]);
    }
  }, [user?.id, fetchProfile, fetchSubscription]);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer Supabase calls with setTimeout to prevent deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
            fetchSubscription(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setSubscription(null);
        }
      }
    );

    // THEN check for existing session
    let mounted = true;
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          fetchProfile(session.user.id);
          fetchSubscription(session.user.id);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
      authSubscription.unsubscribe();
    };
  }, [fetchProfile, fetchSubscription]);

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string): Promise<{ error: Error | null }> => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName || email.split('@')[0],
        }
      }
    });
    return { error };
  };

  const signInWithGoogle = async (): Promise<{ error: Error | null }> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      }
    });
    return { error };
  };

  const signInWithGithub = async (): Promise<{ error: Error | null }> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setSubscription(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        subscription,
        isLoading,
        isPro,
        planType,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithGithub,
        signOut,
        refreshProfile,
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
