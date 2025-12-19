import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Json } from '@/integrations/supabase/types';

export interface CalculationHistoryItem {
  id: string;
  calculator_type: string;
  calculator_name: string;
  inputs: Record<string, unknown>;
  result: Record<string, unknown>;
  created_at: string;
}

export interface SavedCalculationItem {
  id: string;
  calculator_type: string;
  calculator_name: string;
  title: string;
  inputs: Record<string, unknown>;
  result: Record<string, unknown>;
  is_shared: boolean;
  share_id: string | null;
  created_at: string;
}

export interface SharedCalculationItem {
  id: string;
  saved_calculation_id: string;
  share_token: string;
  views: number;
  expires_at: string | null;
  created_at: string;
}

export const useCalculationHistory = () => {
  const { user, isPro } = useAuth();
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!user || !isPro) {
      setHistory([]);
      return;
    }
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from('calculation_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (!error && data) {
      setHistory(data.map(item => ({
        id: item.id,
        calculator_type: item.calculator_type,
        calculator_name: item.calculator_name,
        inputs: (item.inputs || {}) as Record<string, unknown>,
        result: (item.result || {}) as Record<string, unknown>,
        created_at: item.created_at,
      })));
    }
    setIsLoading(false);
  }, [user, isPro]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const addToHistory = async (
    calculatorType: string,
    calculatorName: string,
    inputs: Record<string, unknown>,
    result: Record<string, unknown>
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from('calculation_history')
      .insert([{
        user_id: user.id,
        calculator_type: calculatorType,
        calculator_name: calculatorName,
        inputs: inputs as Json,
        result: result as Json,
      }]);

    if (!error && isPro) {
      fetchHistory();
    }
  };

  const clearHistory = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('calculation_history')
      .delete()
      .eq('user_id', user.id);

    if (!error) {
      setHistory([]);
    }
  };

  return {
    history,
    isLoading,
    addToHistory,
    clearHistory,
    refreshHistory: fetchHistory,
    canAccessHistory: isPro,
  };
};

export const useSavedCalculations = () => {
  const { user, isPro } = useAuth();
  const [saved, setSaved] = useState<SavedCalculationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSaved = useCallback(async () => {
    if (!user || !isPro) {
      setSaved([]);
      return;
    }
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from('saved_calculations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setSaved(data.map(item => ({
        id: item.id,
        calculator_type: item.calculator_type,
        calculator_name: item.calculator_name,
        title: item.title,
        inputs: (item.inputs || {}) as Record<string, unknown>,
        result: (item.result || {}) as Record<string, unknown>,
        is_shared: item.is_shared,
        share_id: item.share_id,
        created_at: item.created_at,
      })));
    }
    setIsLoading(false);
  }, [user, isPro]);

  useEffect(() => {
    fetchSaved();
  }, [fetchSaved]);

  const saveCalculation = async (
    calculatorType: string,
    calculatorName: string,
    title: string,
    inputs: Record<string, unknown>,
    result: Record<string, unknown>
  ) => {
    if (!user || !isPro) return null;

    const { data, error } = await supabase
      .from('saved_calculations')
      .insert([{
        user_id: user.id,
        calculator_type: calculatorType,
        calculator_name: calculatorName,
        title,
        inputs: inputs as Json,
        result: result as Json,
      }])
      .select()
      .single();

    if (!error && data) {
      fetchSaved();
      return data;
    }
    return null;
  };

  const deleteSaved = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('saved_calculations')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (!error) {
      setSaved(prev => prev.filter(c => c.id !== id));
    }
  };

  const renameSaved = async (id: string, title: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('saved_calculations')
      .update({ title })
      .eq('id', id)
      .eq('user_id', user.id);

    if (!error) {
      fetchSaved();
    }
  };

  return {
    saved,
    isLoading,
    saveCalculation,
    deleteSaved,
    renameSaved,
    refreshSaved: fetchSaved,
    canAccessSaved: isPro,
  };
};

export const useSharedCalculations = () => {
  const { user, isPro } = useAuth();
  const [shared, setShared] = useState<SharedCalculationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchShared = useCallback(async () => {
    if (!user || !isPro) {
      setShared([]);
      return;
    }
    
    setIsLoading(true);
    
    // Get shared calculations for user's saved calculations
    const { data: savedData } = await supabase
      .from('saved_calculations')
      .select('id')
      .eq('user_id', user.id);
    
    if (savedData && savedData.length > 0) {
      const savedIds = savedData.map(s => s.id);
      const { data, error } = await supabase
        .from('shared_calculations')
        .select('*')
        .in('saved_calculation_id', savedIds)
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setShared(data);
      }
    } else {
      setShared([]);
    }
    setIsLoading(false);
  }, [user, isPro]);

  useEffect(() => {
    fetchShared();
  }, [fetchShared]);

  const createShare = async (savedCalculationId: string, expiresAt?: Date) => {
    if (!user || !isPro) return null;

    const shareToken = crypto.randomUUID();

    const { data, error } = await supabase
      .from('shared_calculations')
      .insert({
        saved_calculation_id: savedCalculationId,
        share_token: shareToken,
        expires_at: expiresAt?.toISOString() || null,
      })
      .select()
      .single();

    if (!error && data) {
      // Update the saved calculation to mark as shared
      await supabase
        .from('saved_calculations')
        .update({ is_shared: true, share_id: shareToken })
        .eq('id', savedCalculationId);
      
      fetchShared();
      return data;
    }
    return null;
  };

  const deleteShared = async (id: string) => {
    const { error } = await supabase
      .from('shared_calculations')
      .delete()
      .eq('id', id);

    if (!error) {
      setShared(prev => prev.filter(s => s.id !== id));
    }
  };

  const getByToken = async (token: string) => {
    const { data: shareData, error: shareError } = await supabase
      .from('shared_calculations')
      .select('*')
      .eq('share_token', token)
      .maybeSingle();

    if (shareError || !shareData) return null;

    // Increment view count
    await supabase
      .from('shared_calculations')
      .update({ views: (shareData.views || 0) + 1 })
      .eq('id', shareData.id);

    // Get the saved calculation data
    const { data: savedData } = await supabase
      .from('saved_calculations')
      .select('*')
      .eq('id', shareData.saved_calculation_id)
      .maybeSingle();

    return { share: shareData, calculation: savedData };
  };

  return {
    shared,
    isLoading,
    createShare,
    deleteShared,
    getByToken,
    refreshShared: fetchShared,
    canAccessShared: isPro,
  };
};
