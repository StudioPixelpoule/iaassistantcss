import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, AlertCircle } from 'lucide-react';

interface NewDiscussionModalProps {
  onClose: () => void;
  onSubmit: (title: string, content: string, tags: string[]) => Promise<void>;
}

export default function NewDiscussionModal({ onClose, onSubmit }: NewDiscussionModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Le titre et le contenu sont requis');
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);
      await onSubmit(title.trim(), content.trim(), tags);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="fixed inset-0 bg-erie/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#2B2B2A] rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-eagle/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-narvik">Nouvelle discussion</h2>
          <button
            onClick={onClose}
            className="text-eagle hover:text-fire transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="bg-erie rounded-lg border border-sorbus/20 p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-sorbus shrink-0" size={20} />
            <p className="text-sorbus text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-fire font-medium mb-2">
              Titre
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="uber-input"
              placeholder="Donnez un titre à votre discussion"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-fire font-medium mb-2">
              Contenu
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="uber-input min-h-[200px]"
              placeholder="Décrivez votre sujet de discussion..."
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-fire font-medium mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-erie rounded-lg text-sm font-medium text-eagle border border-eagle/10 flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-eagle hover:text-fire"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="uber-input"
              placeholder="Ajoutez des tags (Appuyez sur Entrée pour ajouter)"
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
              disabled={isSubmitting}
              className="uber-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Publication...
                </>
              ) : (
                'Publier'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}