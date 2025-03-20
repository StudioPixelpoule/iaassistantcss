import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Users, Database, Shield, AlertCircle, Upload, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import UserManagement from '../components/UserManagement';
import ResourceUpload from '../components/ResourceUpload';
import CollaborativeSettings from '../components/CollaborativeSettings';

export default function Settings() {
  const { user } = useAuth();
  const metadata = user?.user_metadata;
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showResourceUpload, setShowResourceUpload] = useState(false);
  const [showCollaborativeSettings, setShowCollaborativeSettings] = useState(false);

  // Redirect non-admin users
  if (!metadata?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-uber mx-auto px-4 md:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-medium text-narvik mb-6">
          Paramètres
        </h1>
        <p className="text-2xl text-eagle max-w-2xl mx-auto">
          Gérez les paramètres de l'application
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Gestion des utilisateurs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#2B2B2A] rounded-xl p-8 border border-eagle/10"
        >
          <div className="p-3 bg-erie rounded-xl w-fit mb-6 border border-eagle/10">
            <Users size={24} className="text-fire" />
          </div>
          <h2 className="text-2xl font-medium text-narvik mb-4">
            Utilisateurs
          </h2>
          <p className="text-eagle/80 mb-6">
            Gérez les comptes utilisateurs, les rôles et les permissions
          </p>
          <button 
            className="uber-button w-full"
            onClick={() => setShowUserManagement(true)}
          >
            Gérer les utilisateurs
          </button>
        </motion.div>

        {/* Ressources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#2B2B2A] rounded-xl p-8 border border-eagle/10"
        >
          <div className="p-3 bg-erie rounded-xl w-fit mb-6 border border-eagle/10">
            <Upload size={24} className="text-fire" />
          </div>
          <h2 className="text-2xl font-medium text-narvik mb-4">
            Ressources
          </h2>
          <p className="text-eagle/80 mb-6">
            Ajoutez et gérez les ressources disponibles
          </p>
          <button 
            className="uber-button w-full"
            onClick={() => setShowResourceUpload(true)}
          >
            Ajouter une ressource
          </button>
        </motion.div>

        {/* Espace collaboratif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#2B2B2A] rounded-xl p-8 border border-eagle/10"
        >
          <div className="p-3 bg-erie rounded-xl w-fit mb-6 border border-eagle/10">
            <MessageSquare size={24} className="text-fire" />
          </div>
          <h2 className="text-2xl font-medium text-narvik mb-4">
            Espace collaboratif
          </h2>
          <p className="text-eagle/80 mb-6">
            Gérez les discussions, les tags et la modération
          </p>
          <button 
            className="uber-button w-full"
            onClick={() => setShowCollaborativeSettings(true)}
          >
            Gérer les discussions
          </button>
        </motion.div>
      </div>

      {/* Message d'avertissement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-erie rounded-xl p-6 border border-fire/20"
      >
        <div className="flex items-start gap-4">
          <AlertCircle className="text-fire shrink-0" size={24} />
          <div>
            <h3 className="text-lg font-medium text-fire mb-2">
              Zone administrative
            </h3>
            <p className="text-eagle/80">
              Cette section est réservée aux administrateurs. Toutes les actions effectuées ici sont enregistrées et peuvent avoir un impact important sur l'application.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      {showUserManagement && (
        <UserManagement onClose={() => setShowUserManagement(false)} />
      )}
      {showResourceUpload && (
        <ResourceUpload onClose={() => setShowResourceUpload(false)} />
      )}
      {showCollaborativeSettings && (
        <CollaborativeSettings onClose={() => setShowCollaborativeSettings(false)} />
      )}
    </div>
  );
}