import React, { useState, lazy, Suspense, useMemo, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, X } from 'lucide-react';
import { categories } from '../data/categories';
import { roles } from '../data/roles';
import { allPrompts } from '../data/prompts';
import type { Prompt } from '../data/prompts/types';

// Pre-load components to avoid suspense issues
const PromptCard = lazy(() => import('../components/PromptCard'));
const PromptModal = lazy(() => import('../components/PromptModal'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="text-center py-8">
    <p className="text-eagle">Chargement des prompts...</p>
  </div>
);

export default function PromptBank() {
  const [isPending, startTransition] = useTransition();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  // Optimized search function using useMemo
  const filteredPrompts = useMemo(() => {
    return allPrompts.filter(prompt => {
      if (selectedRole && prompt.role !== selectedRole) {
        return false;
      }
      if (selectedCategory && prompt.category !== selectedCategory) {
        return false;
      }

      if (searchTerm.trim()) {
        const search = searchTerm.toLowerCase().trim();
        return (
          prompt.title.toLowerCase().includes(search) ||
          prompt.context.toLowerCase().includes(search) ||
          prompt.content.toLowerCase().includes(search) ||
          prompt.example.toLowerCase().includes(search)
        );
      }

      return true;
    });
  }, [selectedRole, selectedCategory, searchTerm]);

  const availableCategories = useMemo(() => {
    if (!selectedRole) return categories;
    return categories.filter(category =>
      allPrompts.some(prompt => prompt.role === selectedRole && prompt.category === category.id)
    );
  }, [selectedRole]);

  const handleClearSearch = () => {
    startTransition(() => {
      setSearchTerm('');
    });
  };

  const handleRoleSelect = (roleId: string) => {
    startTransition(() => {
      setSelectedRole(roleId);
      setSelectedCategory('');
      setSearchTerm('');
    });
  };

  const handleBack = () => {
    startTransition(() => {
      setSelectedRole('');
      setSelectedCategory('');
      setSearchTerm('');
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    startTransition(() => {
      setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    });
  };

  const handlePromptSelect = (prompt: Prompt) => {
    startTransition(() => {
      setSelectedPrompt(prompt);
    });
  };

  const groupedPrompts = useMemo(() => {
    if (!searchTerm || selectedRole) return null;
    
    return filteredPrompts.reduce((acc, prompt) => {
      const role = roles.find(r => r.id === prompt.role);
      if (!acc[prompt.role]) {
        acc[prompt.role] = {
          role,
          prompts: []
        };
      }
      acc[prompt.role].prompts.push(prompt);
      return acc;
    }, {} as Record<string, { role: typeof roles[0] | undefined, prompts: Prompt[] }>);
  }, [filteredPrompts, searchTerm, selectedRole]);

  return (
    <div className="max-w-uber mx-auto px-4 md:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-medium text-narvik mb-6">
          Banque de prompts
        </h1>
        <p className="text-2xl text-eagle max-w-2xl mx-auto">
          Des prompts optimisés et prêts à l'emploi pour le personnel scolaire
        </p>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-eagle" size={20} />
        <input
          type="text"
          placeholder="Rechercher par titre, contexte, contenu ou exemple..."
          className="uber-input pl-12 pr-10"
          value={searchTerm}
          onChange={(e) => {
            startTransition(() => {
              setSearchTerm(e.target.value);
            });
          }}
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-eagle hover:text-narvik transition-colors duration-200"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {searchTerm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-eagle mb-8"
        >
          {filteredPrompts.length === 0 ? (
            <p>Aucun résultat trouvé pour "{searchTerm}"</p>
          ) : (
            <p>{filteredPrompts.length} prompt{filteredPrompts.length > 1 ? 's' : ''} trouvé{filteredPrompts.length > 1 ? 's' : ''}</p>
          )}
        </motion.div>
      )}

      {!selectedRole && !searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {roles.map((role) => (
            <motion.button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#2B2B2A] rounded-xl p-8 border border-eagle/10 hover:border-eagle/20 transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-erie rounded-xl border border-eagle/10">
                  <role.icon size={24} className="text-fire" />
                </div>
                <h2 className="text-2xl font-medium text-narvik">{role.name}</h2>
              </div>
              <p className="text-eagle/80">{role.description}</p>
            </motion.button>
          ))}
        </motion.div>
      )}

      {!selectedRole && searchTerm && groupedPrompts && (
        <Suspense fallback={<LoadingFallback />}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {Object.entries(groupedPrompts).map(([roleId, { role, prompts }]) => (
              <div key={roleId} className="space-y-6">
                <div className="flex items-center gap-4">
                  {role && (
                    <>
                      <div className="p-3 bg-erie rounded-xl border border-eagle/10">
                        <role.icon size={24} className="text-fire" />
                      </div>
                      <h2 className="text-2xl font-medium text-narvik">{role.name}</h2>
                      <span className="text-eagle">({prompts.length} résultats)</span>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {prompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      onClick={() => handlePromptSelect(prompt)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </Suspense>
      )}

      {selectedRole && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center text-eagle hover:text-fire transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Retour aux rôles
            </button>
            <h2 className="text-2xl font-medium text-narvik">
              {roles.find(r => r.id === selectedRole)?.name}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {availableCategories.map((category) => {
              const CategoryIcon = category.icon;
              const isSelected = selectedCategory === category.id;
              const promptCount = allPrompts.filter(
                p => p.role === selectedRole && p.category === category.id
              ).length;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all duration-200 ${
                    isSelected
                      ? 'bg-fire text-erie'
                      : 'bg-[#2B2B2A] text-eagle hover:text-narvik border border-eagle/10'
                  }`}
                >
                  <CategoryIcon size={24} />
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm opacity-75">{promptCount} prompts</span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${searchTerm}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <Suspense fallback={<LoadingFallback />}>
                {filteredPrompts.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-eagle">
                    Aucun prompt ne correspond à vos critères de recherche.
                  </div>
                ) : (
                  filteredPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      onClick={() => handlePromptSelect(prompt)}
                    />
                  ))
                )}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <Suspense fallback={null}>
        {selectedPrompt && (
          <PromptModal
            prompt={selectedPrompt}
            onClose={() => setSelectedPrompt(null)}
          />
        )}
      </Suspense>
    </div>
  );
}