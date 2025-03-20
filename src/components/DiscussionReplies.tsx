import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Users, Loader2, AlertCircle } from 'lucide-react';
import type { Discussion, DiscussionReply } from '../types/database.types';

interface DiscussionRepliesProps {
  discussion: Discussion;
  onClose: () => void;
  onReply: (content: string) => Promise<void>;
}

export default function DiscussionReplies({ discussion, onClose, onReply }: DiscussionRepliesProps) {
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) {
      setError('Le contenu de la réponse est requis');
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);
      await onReply(replyContent.trim());
      setReplyContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-erie/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#2B2B2A] rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-eagle/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-narvik">Réponses</h2>
          <button
            onClick={onClose}
            className="text-eagle hover:text-fire transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Original Discussion */}
        <div className="bg-erie rounded-xl p-6 mb-8 border border-eagle/10">
          <div className="flex items-center gap-4 text-sm text-eagle mb-4">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{discussion.profile?.email}</span>
            </div>
            <span>{new Date(discussion.created_at).toLocaleDateString()}</span>
          </div>
          <h3 className="text-xl font-medium text-narvik mb-4">
            {discussion.title}
          </h3>
          <p className="text-eagle/80">{discussion.content}</p>
        </div>

        {/* Replies List */}
        <div className="space-y-4 mb-8">
          {discussion.replies?.length === 0 ? (
            <p className="text-center text-eagle">Aucune réponse pour le moment.</p>
          ) : (
            discussion.replies?.map((reply: DiscussionReply) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-erie rounded-xl p-6 border border-eagle/10"
              >
                <div className="flex items-center gap-4 text-sm text-eagle mb-4">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{reply.profile?.email}</span>
                  </div>
                  <span>{new Date(reply.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-eagle/80">{reply.content}</p>
              </motion.div>
            ))
          )}
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-erie rounded-lg border border-sorbus/20 p-4 flex items-start gap-3">
              <AlertCircle className="text-sorbus shrink-0" size={20} />
              <p className="text-sorbus text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="reply" className="block text-fire font-medium mb-2">
              Votre réponse
            </label>
            <textarea
              id="reply"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="uber-input min-h-[100px]"
              placeholder="Écrivez votre réponse..."
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-eagle hover:text-narvik transition-colors duration-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !replyContent.trim()}
              className="uber-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Envoi...
                </>
              ) : (
                <>
                  <Send size={20} className="mr-2" />
                  Répondre
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}