import React from 'react';
import { Star, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Prompt } from '../data/prompts/types';

interface PromptCardProps {
  prompt: Prompt;
  onClick: () => void;
}

export default function PromptCard({ prompt, onClick }: PromptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#2B2B2A] hover:bg-[#333332] border border-eagle/5 rounded-xl p-6 cursor-pointer transition-all duration-200"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-medium text-narvik">{prompt.title}</h3>
        <button className="text-eagle hover:text-fire transition-colors duration-200">
          <Star size={18} />
        </button>
      </div>
      <p className="text-eagle/80 mb-4 line-clamp-2 text-base">{prompt.context}</p>
      <div className="flex items-center text-sm text-fire font-medium">
        <BookOpen size={16} className="mr-2" />
        <span>Voir le prompt complet</span>
      </div>
    </motion.div>
  );
}