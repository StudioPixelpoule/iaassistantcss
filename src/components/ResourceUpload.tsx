import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Loader2, AlertCircle, Plus, File } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ResourceCategory {
  id: string;
  name: string;
  description: string | null;
}

interface ResourceUploadProps {
  onClose: () => void;
  onSuccess?: () => void;
}

// Allowed file types and their MIME types
const ALLOWED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-powerpoint': '.ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx'
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ResourceUpload({ onClose, onSuccess }: ResourceUploadProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('guide');
  const [categoryId, setCategoryId] = useState<string>('');
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('resource_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  }

  async function handleCreateCategory() {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('resource_categories')
        .insert([{
          name: newCategoryName,
          description: newCategoryDescription
        }]);

      if (error) throw error;

      await fetchCategories();
      setNewCategoryName('');
      setNewCategoryDescription('');
      setShowNewCategory(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check file type
    if (!Object.keys(ALLOWED_FILE_TYPES).includes(selectedFile.type)) {
      setError('Type de fichier non supporté. Types acceptés : PDF, DOC, DOCX, PPT, PPTX');
      return;
    }

    // Check file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('Le fichier est trop volumineux. Taille maximum : 10MB');
      return;
    }

    setFile(selectedFile);
    setTitle(selectedFile.name.split('.')[0]); // Use filename as default title
    setError(null);
  }

  async function uploadFile() {
    if (!file) return null;

    const fileExt = ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES];
    const fileName = `${Math.random().toString(36).slice(2)}${fileExt}`;
    const filePath = `resources/${fileName}`;

    try {
      const { error: uploadError, data } = await supabase.storage
        .from('resources')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      throw new Error('Erreur lors du téléchargement du fichier');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !description || (!url && !file) || !type) return;

    try {
      setLoading(true);
      let finalUrl = url;

      if (file) {
        finalUrl = await uploadFile() || '';
      }

      const { error } = await supabase
        .from('resources')
        .insert([{
          title,
          description,
          url: finalUrl,
          type,
          category_id: categoryId || null
        }]);

      if (error) throw error;

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-erie/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#2B2B2A] rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-eagle/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-narvik">Ajouter une ressource</h2>
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
              placeholder="Titre de la ressource"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-fire font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="uber-input min-h-[100px]"
              placeholder="Description de la ressource"
              required
            />
          </div>

          <div>
            <label className="block text-fire font-medium mb-2">
              Ressource
            </label>
            <div className="space-y-4">
              <div className="bg-erie rounded-lg border border-eagle/10 p-4">
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <label className="uber-button cursor-pointer">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        className="hidden"
                      />
                      <Upload size={20} className="mr-2" />
                      Télécharger un fichier
                    </label>
                  </div>
                  <div className="text-sm text-eagle">
                    PDF, Word ou PowerPoint (max 10MB)
                  </div>
                </div>
                {file && (
                  <div className="mt-4 flex items-center gap-3 text-sm">
                    <File size={16} className="text-fire" />
                    <span className="text-narvik">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-eagle hover:text-fire ml-auto"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-eagle">ou</span>
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="uber-input pl-12"
                  placeholder="Lien vers une ressource externe"
                  disabled={!!file}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-fire font-medium mb-2">
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="uber-input"
              required
            >
              <option value="guide">Guide</option>
              <option value="video">Vidéo</option>
              <option value="document">Document</option>
              <option value="link">Lien</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="category" className="text-fire font-medium">
                Catégorie
              </label>
              <button
                type="button"
                onClick={() => setShowNewCategory(true)}
                className="text-sm text-eagle hover:text-fire transition-colors duration-200"
              >
                <Plus size={16} className="inline mr-1" />
                Nouvelle catégorie
              </button>
            </div>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
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

          {showNewCategory && (
            <div className="bg-erie rounded-lg border border-eagle/10 p-4 space-y-4">
              <h3 className="text-lg font-medium text-narvik">
                Nouvelle catégorie
              </h3>
              <div>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="uber-input mb-2"
                  placeholder="Nom de la catégorie"
                />
                <textarea
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  className="uber-input"
                  placeholder="Description (optionnelle)"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewCategory(false)}
                  className="px-4 py-2 text-eagle hover:text-narvik transition-colors duration-200"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={!newCategoryName || loading}
                  className="uber-button"
                >
                  Créer la catégorie
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-eagle hover:text-narvik transition-colors duration-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || (!url && !file)}
              className="uber-button"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Upload size={20} className="mr-2" />
                  Publier la ressource
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}