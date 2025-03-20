import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        setUser(null);
        navigate('/login');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null);
        if (session?.user) {
          navigate('/');
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          shouldCreateUser: false
        }
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Email ou mot de passe incorrect.');
        }
        throw error;
      }

      if (data?.user) {
        setUser(data.user);
        navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Une erreur est survenue lors de la connexion.');
    }
  };

  const signUp = async (email: string, password: string) => {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`
      }
    });

    if (signUpError) throw signUpError;

    // Show success message and switch to sign in
    throw new Error('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear the user state after successful logout
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      // Still navigate to login page even if there's an error
      setUser(null);
      navigate('/login');
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}