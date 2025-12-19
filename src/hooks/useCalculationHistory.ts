import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { CalculationHistory, SavedCalculation, SharedCalculation } from "@/types/database";

// Local storage keys
const HISTORY_KEY = "calcbrew_history";
const SAVED_KEY = "calcbrew_saved";
const SHARED_KEY = "calcbrew_shared";

// Helper to generate IDs
const generateId = () => crypto.randomUUID();
const generateShareToken = () => Math.random().toString(36).substring(2, 15);

export const useCalculationHistory = () => {
  const { user, isPro } = useAuth();
  const [history, setHistory] = useState<CalculationHistory[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Add calculation to history (Pro only)
  const addToHistory = useCallback((
    calculator_type: string,
    input_data: Record<string, unknown>,
    result_data: Record<string, unknown>
  ) => {
    if (!user || !isPro) return null;
    
    // TODO: Replace with supabase.from('calculation_history').insert()
    const newEntry: CalculationHistory = {
      id: generateId(),
      user_id: user.id,
      calculator_type,
      input_data,
      result_data,
      created_at: new Date().toISOString(),
    };

    setHistory((prev) => {
      const updated = [newEntry, ...prev].slice(0, 100); // Keep last 100
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });

    return newEntry;
  }, [user, isPro]);

  // Get user's calculation history
  const getHistory = useCallback(() => {
    if (!user || !isPro) return [];
    // TODO: Replace with supabase.from('calculation_history').select().eq('user_id', user.id)
    return history.filter((h) => h.user_id === user.id);
  }, [user, isPro, history]);

  // Clear history
  const clearHistory = useCallback(() => {
    if (!user) return;
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, [user]);

  return {
    history: getHistory(),
    addToHistory,
    clearHistory,
    canAccessHistory: isPro,
  };
};

export const useSavedCalculations = () => {
  const { user, isPro } = useAuth();
  const [saved, setSaved] = useState<SavedCalculation[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(SAVED_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const saveCalculation = useCallback((
    calculator_type: string,
    input_data: Record<string, unknown>,
    result_data: Record<string, unknown>,
    name?: string
  ) => {
    if (!user || !isPro) return null;
    
    // TODO: Replace with supabase.from('saved_calculations').insert()
    const newEntry: SavedCalculation = {
      id: generateId(),
      user_id: user.id,
      calculator_type,
      name,
      input_data,
      result_data,
      created_at: new Date().toISOString(),
    };

    setSaved((prev) => {
      const updated = [newEntry, ...prev];
      localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
      return updated;
    });

    return newEntry;
  }, [user, isPro]);

  const deleteSaved = useCallback((id: string) => {
    if (!user) return;
    // TODO: Replace with supabase.from('saved_calculations').delete().eq('id', id)
    setSaved((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [user]);

  const renameSaved = useCallback((id: string, name: string) => {
    if (!user) return;
    // TODO: Replace with supabase.from('saved_calculations').update({ name }).eq('id', id)
    setSaved((prev) => {
      const updated = prev.map((s) => s.id === id ? { ...s, name } : s);
      localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [user]);

  const getSaved = useCallback(() => {
    if (!user || !isPro) return [];
    return saved.filter((s) => s.user_id === user.id);
  }, [user, isPro, saved]);

  return {
    saved: getSaved(),
    saveCalculation,
    deleteSaved,
    renameSaved,
    canAccessSaved: isPro,
  };
};

export const useSharedCalculations = () => {
  const { user, isPro } = useAuth();
  const [shared, setShared] = useState<SharedCalculation[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(SHARED_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const shareCalculation = useCallback((
    calculator_type: string,
    input_data: Record<string, unknown>,
    result_data: Record<string, unknown>,
    expiresInDays?: number
  ) => {
    if (!user || !isPro) return null;
    
    // TODO: Replace with supabase.from('shared_calculations').insert()
    const newEntry: SharedCalculation = {
      id: generateId(),
      user_id: user.id,
      share_token: generateShareToken(),
      calculator_type,
      input_data,
      result_data,
      expires_at: expiresInDays 
        ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
        : null,
      created_at: new Date().toISOString(),
    };

    setShared((prev) => {
      const updated = [newEntry, ...prev];
      localStorage.setItem(SHARED_KEY, JSON.stringify(updated));
      return updated;
    });

    return newEntry;
  }, [user, isPro]);

  const deleteShared = useCallback((id: string) => {
    if (!user) return;
    // TODO: Replace with supabase.from('shared_calculations').delete().eq('id', id)
    setShared((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem(SHARED_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [user]);

  const getShared = useCallback(() => {
    if (!user || !isPro) return [];
    return shared.filter((s) => s.user_id === user.id);
  }, [user, isPro, shared]);

  const getByToken = useCallback((token: string) => {
    // TODO: Replace with supabase.from('shared_calculations').select().eq('share_token', token)
    return shared.find((s) => s.share_token === token && (!s.expires_at || new Date(s.expires_at) > new Date()));
  }, [shared]);

  return {
    shared: getShared(),
    shareCalculation,
    deleteShared,
    getByToken,
    canAccessShared: isPro,
  };
};
