import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      if (isSignUp) {
        await signUp(email, password);
        setSuccess('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        setIsSignUp(false);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      
      if (errorMessage.includes('user_already_exists') || errorMessage.includes('User already registered')) {
        setError('Un compte existe déjà avec cette adresse email. Veuillez vous connecter.');
        setIsSignUp(false);
      } else if (errorMessage.includes('Compte créé avec succès')) {
        setSuccess(errorMessage);
        setIsSignUp(false);
      } else if (errorMessage.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect.');
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen bg-erie flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#2B2B2A] p-8 rounded-2xl border border-eagle/10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-medium text-narvik mb-4">
              IA Assistant CSS
            </h1>
            <p className="text-eagle">
              {isSignUp 
                ? 'Créez votre compte pour commencer'
                : 'Connectez-vous à votre compte'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-fire mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-eagle" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="uber-input pl-12"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-fire mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-eagle" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="uber-input pl-12"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              {isSignUp && (
                <p className="mt-2 text-sm text-eagle/60">
                  Le mot de passe doit contenir au moins 6 caractères
                </p>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-erie rounded-lg border border-sorbus/20 p-4 flex items-start gap-3"
              >
                <AlertCircle className="text-sorbus shrink-0" size={20} />
                <p className="text-sorbus text-sm">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-erie rounded-lg border border-fire/20 p-4 flex items-start gap-3"
              >
                <AlertCircle className="text-fire shrink-0" size={20} />
                <p className="text-fire text-sm">{success}</p>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full uber-button"
            >
              {isSignUp ? 'Créer un compte' : 'Se connecter'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccess('');
                }}
                className="text-eagle hover:text-fire transition-colors duration-200"
              >
                {isSignUp 
                  ? 'Déjà un compte ? Se connecter'
                  : 'Pas encore de compte ? S\'inscrire'}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center mt-8 text-eagle/60">
          En vous connectant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
        </p>
      </motion.div>
    </div>
  );
}