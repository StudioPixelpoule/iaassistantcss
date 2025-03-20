import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Star, Clock, Hash, X, Pencil, Trash2, Copy } from 'lucide-react';
import { usePrompts } from '../hooks/usePrompts';
import PromptEditor from '../components/PromptEditor';

export default function MyPrompts() {
  const {
    prompts,
    categories,
    loading,
    error,
    createPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    incrementUsage
  } = usePrompts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<any>(null);

  // Filter prompts based on search term and category
  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = searchTerm.toLowerCase() === '' ||
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCreatePrompt = async (title: string, content: string, categoryId?: string) => {
    await createPrompt(title, content, categoryId);
    setShowEditor(false);
  };

  const handleUpdatePrompt = async (title: string, content: string, categoryId?: string) => {
    if (!editingPrompt) return;
    await updatePrompt(editingPrompt.id, { title, content, category: categoryId });
    setEditingPrompt(null);
  };

  const handleCopyPrompt = async (prompt: any) => {
    await navigator.clipboard.writeText(prompt.content);
    await incrementUsage(prompt.id);
  };

  const handleDeletePrompt = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce prompt ?')) {
      await deletePrompt(id);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-fire">Une erreur est survenue: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-uber mx-auto px-4 md:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-medium text-narvik mb-6">
          Mes prompts
        </h1>
        <p className="text-2xl text-eagle max-w-2xl mx-auto">
          Gérez votre bibliothèque personnelle de prompts
        </p>
      </motion.div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-eagle" size={20} />
          <input
            type="text"
            placeholder="Rechercher un prompt..."
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
        <button 
          className="uber-button"
          onClick={() => setShowEditor(true)}
        >
          <Plus size={20} className="mr-2" />
          Nouveau prompt
        </button>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 mb-8">
        <Hash size={20} className="text-eagle shrink-0" />
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            !selectedCategory
              ? 'bg-fire text-erie'
              : 'bg-[#2B2B2A] text-eagle hover:text-narvik border border-eagle/10'
          }`}
        >
          Tous les prompts
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-fire text-erie'
                : 'bg-[#2B2B2A] text-eagle hover:text-narvik border border-eagle/10'
            }`}
            style={{
              backgroundColor: selectedCategory === category.id ? category.color : undefined
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-eagle">Chargement de vos prompts...</p>
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-eagle">Aucun prompt trouvé.</p>
          </div>
        ) : (
          filteredPrompts.map((prompt) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#2B2B2A] rounded-xl p-6 border border-eagle/10 hover:border-eagle/20 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-narvik mb-2">
                    {prompt.title}
                  </h3>
                  {prompt.category_name && (
                    <span
                      className="px-3 py-1 rounded-lg text-xs font-medium"
                      style={{ backgroundColor: prompt.category_color }}
                    >
                      {prompt.category_name}
                    </span>
                  )}
                </div>
                <button 
                  className={`text-eagle hover:text-fire transition-colors duration-200 ${
                    prompt.is_favorite ? 'text-fire' : ''
                  }`}
                  onClick={() => toggleFavorite(prompt.id)}
                >
                  <Star size={18} />
                </button>
              </div>

              <pre className="bg-erie border border-eagle/10 p-4 rounded-lg text-sm font-mono text-eagle/80 whitespace-pre-wrap mb-4 max-h-32 overflow-y-auto">
                {prompt.content}
              </pre>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-eagle">
                  <Clock size={16} />
                  <span>
                    {prompt.last_used_at
                      ? new Date(prompt.last_used_at).toLocaleDateString()
                      : 'Jamais utilisé'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyPrompt(prompt)}
                    className="p-2 text-eagle hover:text-fire transition-colors duration-200"
                    title="Copier"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setEditingPrompt(prompt);
                      setShowEditor(true);
                    }}
                    className="p-2 text-eagle hover:text-fire transition-colors duration-200"
                    title="Modifier"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDeletePrompt(prompt.id)}
                    className="p-2 text-eagle hover:text-fire transition-colors duration-200"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Prompt Editor Modal */}
      {showEditor && (
        <PromptEditor
          title={editingPrompt?.title}
          content={editingPrompt?.content}
          categoryId={editingPrompt?.category}
          categories={categories}
          onSave={editingPrompt ? handleUpdatePrompt : handleCreatePrompt}
          onClose={() => {
            setShowEditor(false);
            setEditingPrompt(null);
          }}
        />
      )}
    </div>
  );
}