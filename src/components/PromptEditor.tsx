import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';

interface PromptEditorProps {
  title?: string;
  content?: string;
  categoryId?: string;
  categories: Array<{ id: string; name: string; color: string }>;
  onSave: (title: string, content: string, categoryId?: string) => Promise<void>;
  onClose: () => void;
}

export default function PromptEditor({
  title = '',
  content = '',
  categoryId,
  categories,
  onSave,
  onClose
}: PromptEditorProps) {
  const [promptTitle, setPromptTitle] = useState(title);
  const [promptContent, setPromptContent] = useState(content);
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptTitle.trim() || !promptContent.trim()) return;

    try {
      setIsSaving(true);
      await onSave(promptTitle, promptContent, selectedCategory);
      onClose();
    } finally {
      setIsSaving(false);
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
          <h2 className="text-2xl font-medium text-narvik">
            {title ? 'Modifier le prompt' : 'Nouveau prompt'}
          </h2>
          <button
            onClick={onClose}
            className="text-eagle hover:text-fire transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-fire font-medium mb-2">
              Titre
            </label>
            <input
              type="text"
              id="title"
              value={promptTitle}
              onChange={(e) => setPromptTitle(e.target.value)}
              className="uber-input"
              placeholder="Donnez un titre à votre prompt"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-fire font-medium mb-2">
              Contenu
            </label>
            <textarea
              id="content"
              value={promptContent}
              onChange={(e) => setPromptContent(e.target.value)}
              className="uber-input min-h-[200px] font-mono"
              placeholder="Écrivez votre prompt..."
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-fire font-medium mb-2">
              Catégorie
            </label>
            <select
              id="category"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || undefined)}
              className="uber-input"
            >
              <option value="">Sans catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
              disabled={isSaving}
              className="uber-button"
            >
              <Save size={20} className="mr-2" />
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}