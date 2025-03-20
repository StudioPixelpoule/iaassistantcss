import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Share2, Star, Filter, Search, Sparkles, Clock, ArrowUp, X } from 'lucide-react';
import { useDiscussions } from '../hooks/useDiscussions';
import NewDiscussionModal from '../components/NewDiscussionModal';
import DiscussionReplies from '../components/DiscussionReplies';
import { useAuth } from '../contexts/AuthContext';
import type { Discussion } from '../types/database.types';

const filters = [
  "Tous les sujets",
  "Évaluation",
  "Différenciation",
  "Projets",
  "Technologies",
  "Inclusion",
  "Gestion de classe",
  "Collaboration"
];

const sortOptions = [
  { id: 'recent', label: 'Plus récents', icon: Clock },
  { id: 'popular', label: 'Plus populaires', icon: Sparkles },
  { id: 'discussed', label: 'Plus discutés', icon: MessageSquare }
];

export default function Collaborative() {
  const { discussions, loading, error, createDiscussion, toggleReaction, hasUserReaction, addReply } = useDiscussions();
  const { user } = useAuth();
  
  const [selectedFilter, setSelectedFilter] = useState("Tous les sujets");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState('recent');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and sort discussions
  const filteredAndSortedDiscussions = React.useMemo(() => {
    let filtered = [...discussions];

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(discussion =>
        discussion.title.toLowerCase().includes(search) ||
        discussion.content.toLowerCase().includes(search)
      );
    }

    // Apply tag filter
    if (selectedFilter !== "Tous les sujets") {
      filtered = filtered.filter(discussion =>
        discussion.tags?.some(tag => tag.name === selectedFilter)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => ((b.reactions_count as any)?.count || 0) - ((a.reactions_count as any)?.count || 0));
        break;
      case 'discussed':
        filtered.sort((a, b) => ((b.replies_count as any)?.count || 0) - ((a.replies_count as any)?.count || 0));
        break;
      default: // 'recent'
        filtered.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    return filtered;
  }, [discussions, searchTerm, selectedFilter, sortBy]);

  const handleCreateDiscussion = async (title: string, content: string, tags: string[]) => {
    await createDiscussion(title, content, tags);
    setShowNewDiscussionModal(false);
  };

  const handleReply = async (content: string) => {
    if (!selectedDiscussion) return;
    await addReply(selectedDiscussion.id, content);
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
          Espace collaboratif
        </h1>
        <p className="text-2xl text-eagle max-w-2xl mx-auto">
          Échangez avec vos collègues et partagez vos meilleures pratiques
        </p>
      </motion.div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
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
        <button 
          className="uber-button"
          onClick={() => setShowNewDiscussionModal(true)}
        >
          <MessageSquare size={20} className="mr-2" />
          Nouvelle discussion
        </button>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 flex-1">
          <Filter size={20} className="text-eagle shrink-0" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedFilter === filter
                  ? 'bg-fire text-erie'
                  : 'bg-[#2B2B2A] text-eagle hover:text-narvik border border-eagle/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  sortBy === option.id
                    ? 'bg-fire text-erie'
                    : 'bg-[#2B2B2A] text-eagle hover:text-narvik border border-eagle/10'
                }`}
              >
                <Icon size={16} />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Discussions */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-eagle">Chargement des discussions...</p>
          </div>
        ) : filteredAndSortedDiscussions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-eagle">Aucune discussion trouvée.</p>
          </div>
        ) : (
          filteredAndSortedDiscussions.map((discussion) => (
            <motion.div
              key={discussion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#2B2B2A] rounded-xl p-6 border border-eagle/10 hover:border-eagle/20 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-medium text-narvik">
                      {discussion.title}
                    </h3>
                    {new Date(discussion.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000) && (
                      <span className="px-2 py-1 bg-fire/20 text-fire text-xs font-medium rounded-full">
                        Nouveau
                      </span>
                    )}
                    {((discussion.reactions_count as any)?.count || 0) > 10 && (
                      <span className="px-2 py-1 bg-jaffa/20 text-jaffa text-xs font-medium rounded-full">
                        Populaire
                      </span>
                    )}
                  </div>
                  <p className="text-eagle/80 line-clamp-2">{discussion.content}</p>
                </div>
                <button 
                  className={`text-eagle hover:text-fire transition-colors duration-200 ml-4 ${
                    hasUserReaction(discussion, 'star') ? 'text-fire' : ''
                  }`}
                  onClick={() => toggleReaction(discussion.id, 'star')}
                >
                  <Star size={18} className={hasUserReaction(discussion, 'star') ? 'fill-current' : ''} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {discussion.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-erie rounded-lg text-sm font-medium text-eagle border border-eagle/10"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-eagle">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{discussion.profile?.email}</span>
                  </div>
                  <span className="text-eagle/60">
                    {new Date(discussion.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedDiscussion(discussion)}
                    className="flex items-center gap-2 px-4 py-2 bg-erie rounded-lg text-eagle hover:text-fire transition-colors duration-200"
                  >
                    <MessageSquare size={16} />
                    <span>{(discussion.replies_count as any)?.count || 0} réponses</span>
                  </button>
                  <div className="flex items-center gap-2 text-eagle">
                    <Share2 size={16} />
                    <span>{(discussion.reactions_count as any)?.count || 0}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-fire text-erie rounded-full shadow-lg hover:bg-fire/90 transition-all duration-200 ${
          showScrollTop ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <ArrowUp size={20} />
      </motion.button>

      {/* Modals */}
      {showNewDiscussionModal && (
        <NewDiscussionModal
          onClose={() => setShowNewDiscussionModal(false)}
          onSubmit={handleCreateDiscussion}
        />
      )}

      {selectedDiscussion && (
        <DiscussionReplies
          discussion={selectedDiscussion}
          onClose={() => setSelectedDiscussion(null)}
          onReply={handleReply}
        />
      )}
    </div>
  );
}