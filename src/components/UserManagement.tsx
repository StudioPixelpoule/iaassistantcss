import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Shield, UserX, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  is_admin?: boolean;
}

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ title, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-erie/90 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#2B2B2A] rounded-xl p-6 max-w-md w-full border border-eagle/10"
      >
        <h3 className="text-xl font-medium text-narvik mb-4">{title}</h3>
        <p className="text-eagle mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-eagle hover:text-narvik transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-sorbus text-white rounded-lg hover:bg-sorbus/90 transition-colors duration-200"
          >
            Confirmer
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function UserManagement({ onClose }: { onClose: () => void }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmAction, setConfirmAction] = useState<{
    type: 'delete' | 'admin' | null;
    profile: Profile | null;
  }>({ type: null, profile: null });

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      setLoading(true);
      
      // First get all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Then get all users to check admin status
      const { data: { users }, error: usersError } = await supabase.rpc('get_users');
      
      if (usersError) throw usersError;

      // Combine profile data with admin status
      const profilesWithAdmin = profilesData?.map(profile => ({
        ...profile,
        is_admin: users.find(user => user.id === profile.id)?.metadata?.is_admin || false
      }));

      setProfiles(profilesWithAdmin || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteUser(profile: Profile) {
    try {
      setActionLoading(true);
      const { error } = await supabase.rpc('delete_user', { user_id: profile.id });
      
      if (error) throw error;
      
      await fetchProfiles();
      setConfirmAction({ type: null, profile: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleToggleAdmin(profile: Profile) {
    try {
      setActionLoading(true);
      const { error } = await supabase.rpc('toggle_user_admin', {
        user_id: profile.id,
        is_admin: !profile.is_admin
      });
      
      if (error) throw error;
      
      await fetchProfiles();
      setConfirmAction({ type: null, profile: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setActionLoading(false);
    }
  }

  const filteredProfiles = profiles.filter(profile => 
    profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-erie/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#2B2B2A] rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-eagle/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-narvik">Gestion des utilisateurs</h2>
          <button
            onClick={onClose}
            className="text-eagle hover:text-fire transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-eagle" size={20} />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="uber-input pl-12 pr-10"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-eagle hover:text-narvik transition-colors duration-200"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {error && (
          <div className="bg-erie rounded-lg border border-sorbus/20 p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-sorbus shrink-0" size={20} />
            <p className="text-sorbus text-sm">{error}</p>
          </div>
        )}

        {/* Users List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 size={24} className="animate-spin mx-auto text-eagle mb-4" />
              <p className="text-eagle">Chargement des utilisateurs...</p>
            </div>
          ) : filteredProfiles.length === 0 ? (
            <p className="text-center text-eagle">Aucun utilisateur trouvé.</p>
          ) : (
            filteredProfiles.map(profile => (
              <div
                key={profile.id}
                className="bg-erie rounded-xl p-6 border border-eagle/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-narvik mb-1">
                      {profile.email}
                    </h3>
                    <p className="text-sm text-eagle">
                      Inscrit le {new Date(profile.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {profile.is_admin && (
                      <span className="px-3 py-1 bg-fire/20 text-fire text-sm font-medium rounded-full">
                        Admin
                      </span>
                    )}
                    <button
                      onClick={() => setConfirmAction({ type: 'admin', profile })}
                      className="p-2 text-eagle hover:text-fire transition-colors duration-200"
                      title={profile.is_admin ? "Retirer les droits admin" : "Donner les droits admin"}
                    >
                      <Shield size={20} />
                    </button>
                    <button
                      onClick={() => setConfirmAction({ type: 'delete', profile })}
                      className="p-2 text-eagle hover:text-sorbus transition-colors duration-200"
                      title="Supprimer l'utilisateur"
                    >
                      <UserX size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action loading overlay */}
        {actionLoading && (
          <div className="absolute inset-0 bg-erie/50 backdrop-blur-sm flex items-center justify-center">
            <Loader2 size={32} className="animate-spin text-fire" />
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmAction.type === 'delete' && confirmAction.profile && (
          <ConfirmModal
            title="Supprimer l'utilisateur"
            message={`Êtes-vous sûr de vouloir supprimer l'utilisateur ${confirmAction.profile.email} ? Cette action est irréversible.`}
            onConfirm={() => handleDeleteUser(confirmAction.profile!)}
            onCancel={() => setConfirmAction({ type: null, profile: null })}
          />
        )}

        {confirmAction.type === 'admin' && confirmAction.profile && (
          <ConfirmModal
            title={confirmAction.profile.is_admin ? "Retirer les droits admin" : "Donner les droits admin"}
            message={`Êtes-vous sûr de vouloir ${confirmAction.profile.is_admin ? 'retirer' : 'donner'} les droits administrateur à ${confirmAction.profile.email} ?`}
            onConfirm={() => handleToggleAdmin(confirmAction.profile!)}
            onCancel={() => setConfirmAction({ type: null, profile: null })}
          />
        )}
      </motion.div>
    </div>
  );
}