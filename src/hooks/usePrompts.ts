import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface UserPrompt {
  id: string;
  title: string;
  content: string;
  category: string | null;
  is_favorite: boolean;
  created_at: string;
  last_used_at: string | null;
  usage_count: number;
  category_name?: string;
  category_color?: string;
}

interface PromptCategory {
  id: string;
  name: string;
  color: string;
  created_at: string;
}

export function usePrompts() {
  const [prompts, setPrompts] = useState<UserPrompt[]>([]);
  const [categories, setCategories] = useState<PromptCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrompts();
    fetchCategories();
  }, []);

  async function fetchPrompts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_prompts')
        .select(`
          *,
          prompt_categories (
            name,
            color
          )
        `)
        .order('is_favorite', { ascending: false })
        .order('last_used_at', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('prompt_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function createPrompt(title: string, content: string, categoryId?: string) {
    try {
      const { data, error } = await supabase
        .from('user_prompts')
        .insert([{
          title,
          content,
          category: categoryId
        }])
        .select()
        .single();

      if (error) throw error;
      await fetchPrompts();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }

  async function updatePrompt(id: string, updates: Partial<UserPrompt>) {
    try {
      const { error } = await supabase
        .from('user_prompts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchPrompts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function deletePrompt(id: string) {
    try {
      const { error } = await supabase
        .from('user_prompts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPrompts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function toggleFavorite(id: string) {
    const prompt = prompts.find(p => p.id === id);
    if (!prompt) return;

    try {
      const { error } = await supabase
        .from('user_prompts')
        .update({ is_favorite: !prompt.is_favorite })
        .eq('id', id);

      if (error) throw error;
      await fetchPrompts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function incrementUsage(id: string) {
    try {
      const { error } = await supabase
        .from('user_prompts')
        .update({
          usage_count: supabase.sql`usage_count + 1`,
          last_used_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      await fetchPrompts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function createCategory(name: string, color: string) {
    try {
      const { data, error } = await supabase
        .from('prompt_categories')
        .insert([{ name, color }])
        .select()
        .single();

      if (error) throw error;
      await fetchCategories();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }

  async function updateCategory(id: string, name: string, color: string) {
    try {
      const { error } = await supabase
        .from('prompt_categories')
        .update({ name, color })
        .eq('id', id);

      if (error) throw error;
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function deleteCategory(id: string) {
    try {
      const { error } = await supabase
        .from('prompt_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  return {
    prompts,
    categories,
    loading,
    error,
    createPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    incrementUsage,
    createCategory,
    updateCategory,
    deleteCategory,
    refresh: fetchPrompts
  };
}