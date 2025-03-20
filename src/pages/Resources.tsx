import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Video, FileText, Link as LinkIcon, X, ExternalLink } from 'lucide-react';
import { useResources } from '../hooks/useResources';

const resourceTypes = [
  { id: 'guide', label: 'Guides', icon: BookOpen },
  { id: 'video', label: 'Vidéos', icon: Video },
  { id: 'document', label: 'Documents', icon: FileText },
  { id: 'link', label: 'Liens utiles', icon: LinkIcon },
];

export default function Resources() {
  const { resources, loading, error } = useResources();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Filter resources based on search term and type
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm.toLowerCase() === '' ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || resource.type === selectedType;
    
    return matchesSearch && matchesType;
  });

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
          Ressources
        </h1>
        <p className="text-2xl text-eagle max-w-2xl mx-auto">
          Découvrez nos guides, tutoriels et ressources pour maîtriser l'IA en éducation
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="space-y-8 mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-eagle" size={20} />
          <input
            type="text"
            placeholder="Rechercher une ressource..."
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

        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              !selectedType
                ? 'bg-fire text-erie'
                : 'bg-[#2B2B2A] text-eagle hover:text-narvik border border-eagle/10'
            }`}
          >
            Toutes les ressources
          </button>
          {resourceTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id === selectedType ? null : type.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedType === type.id
                    ? 'bg-fire text-erie'
                    : 'bg-[#2B2B2A] text-eagle hover:text-narvik border border-eagle/10'
                }`}
              >
                <Icon size={16} />
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-eagle">Chargement des ressources...</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-eagle">Aucune ressource trouvée.</p>
          </div>
        ) : (
          filteredResources.map((resource) => {
            const TypeIcon = resourceTypes.find(t => t.id === resource.type)?.icon || FileText;
            return (
              <motion.a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-[#2B2B2A] rounded-xl p-6 border border-eagle/10 hover:border-eagle/20 transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-erie rounded-xl border border-eagle/10 group-hover:border-eagle/20 transition-all duration-200">
                    <TypeIcon size={24} className="text-fire" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-medium text-narvik mb-2 truncate">
                      {resource.title}
                    </h3>
                    <p className="text-eagle/80 line-clamp-2">
                      {resource.description}
                    </p>
                  </div>
                  <ExternalLink size={16} className="text-eagle group-hover:text-fire shrink-0 transition-colors duration-200" />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-erie rounded-lg text-sm font-medium text-eagle border border-eagle/10 group-hover:border-eagle/20 transition-all duration-200">
                    {resourceTypes.find(t => t.id === resource.type)?.label || 'Document'}
                  </span>
                  <span className="text-sm text-eagle/60">
                    {new Date(resource.created_at).toLocaleDateString()}
                  </span>
                </div>
              </motion.a>
            );
          })
        )}
      </div>
    </div>
  );
}