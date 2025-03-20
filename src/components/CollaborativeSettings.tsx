import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Search, MessageSquare, Tag, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DiscussionWithDetails {
  id: string;
  title: string;
  content: string;
  created_at: string;
  is_pinned: boolean;
  is_closed: boolean;
  profile: {
    email: string;
  } | null;
  tags: {
    id: string;
    name: string;
  }[];
  replies_count: {
    count: number;
  };
}

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function ConfirmModal({ title, message, onConfirm, onCancel, isLoading }: ConfirmModalProps) {
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
            disabled={isLoading}
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-sorbus text-white rounded-lg hover:bg-sorbus/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Suppression...
              </>
            ) : (
              'Confirmer'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function CollaborativeSettings({ onClose }: { onClose: () => void }) {
  const [discussions, setDiscussions] = useState<DiscussionWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  async function fetchDiscussions() {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('discussions')
        .select(`
          *,
          profile:profiles(email),
          tags:discussion_tags(id, name),
          replies_count:discussion_replies(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDiscussions(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  async function handleTogglePin(id: string, currentValue: boolean) {
    try {
      setError(null);
      const { error } = await supabase
        .from('discussions')
        .update({ is_pinned: !currentValue })
        .eq('id', id);

      if (error) throw error;
      await fetchDiscussions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  }

  async function handleToggleClose(id: string, currentValue: boolean) {
    try {
      setError(null);
      const { error } = await supabase
        .from('discussions')
        .update({ is_closed: !currentValue })
        .eq('id', id);

      if (error) throw error;
      await fetchDiscussions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  }

  async function handleDelete(id: string) {
    try {
      setError(null);
      setDeleteLoading(true);
      
      // Use the new delete_discussion RPC function
      const { error } = await supabase.rpc('delete_discussion', {
        discussion_id: id
      });

      if (error) throw error;
      
      await fetchDiscussions();
      setConfirmDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la suppression');
    } finally {
      setDeleteLoading(false);
    }
  }

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (discussion.profile?.email.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
    discussion.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-erie/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#2B2B2A] rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-eagle/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-narvik">Gestion des discussions</h2>
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
            placeholder="Rechercher une discussion..."
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

        {/* Discussions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 size={24} className="animate-spin mx-auto text-eagle mb-4" />
              <p className="text-eagle">Chargement des discussions...</p>
            </div>
          ) : filteredDiscussions.length === 0 ? (
            <p className="text-center text-eagle">Aucune discussion trouvée.</p>
          ) : (
            filteredDiscussions.map(discussion => (
              <div
                key={discussion.id}
                className="bg-erie rounded-xl p-6 border border-eagle/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-narvik mb-2">
                      {discussion.title}
                    </h3>
                    <p className="text-eagle/80 line-clamp-2 mb-4">
                      {discussion.content}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {discussion.tags.map(tag => (
                        <span
                          key={tag.id}
                          className="px-3 py-1 bg-[#2B2B2A] rounded-lg text-sm font-medium text-eagle border border-eagle/10"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-eagle">
                      <span>{discussion.profile?.email || 'Utilisateur supprimé'}</span>
                      <span>{new Date(discussion.created_at).toLocaleDateString()}</span>
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} />
                        <span>{discussion.replies_count.count}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePin(discussion.id, discussion.is_pinned)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        discussion.is_pinned
                          ? 'bg-fire/20 text-fire'
                          : 'bg-[#2B2B2A] text-eagle hover:text-narvik'
                      }`}
                    >
                      {discussion.is_pinned ? 'Épinglée' : 'Épingler'}
                    </button>
                    <button
                      onClick={() => handleToggleClose(discussion.id, discussion.is_closed)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        discussion.is_closed
                          ? 'bg-sorbus/20 text-sorbus'
                          : 'bg-[#2B2B2A] text-eagle hover:text-narvik'
                      }`}
                    >
                      {discussion.is_closed ? 'Fermée' : 'Fermer'}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(discussion.id)}
                      className="p-2 text-eagle hover:text-sorbus transition-colors duration-200"
                      title="Supprimer la discussion"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Confirmation Modal */}
        {confirmDelete && (
          <ConfirmModal
            title="Supprimer la discussion"
            message="Êtes-vous sûr de vouloir supprimer cette discussion ? Cette action est irréversible."
            onConfirm={() => handleDelete(confirmDelete)}
            onCancel={() => setConfirmDelete(null)}
            isLoading={deleteLoading}
          />
        )}
      </motion.div>
    </div>
  );
}