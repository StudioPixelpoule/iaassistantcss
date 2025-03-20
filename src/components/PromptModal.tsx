import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Prompt } from '../data/prompts/types';

interface PromptModalProps {
  prompt: Prompt;
  onClose: () => void;
}

export default function PromptModal({ prompt, onClose }: PromptModalProps) {
  return (
    <div className="fixed inset-0 bg-erie/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#2B2B2A] rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-eagle/10"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-medium text-narvik">{prompt.title}</h2>
          <button
            onClick={onClose}
            className="text-eagle hover:text-fire transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-fire mb-2">Contexte d'utilisation</h3>
            <p className="text-eagle/90">{prompt.context}</p>
          </div>
          <div>
            <h3 className="font-medium text-fire mb-2">Prompt</h3>
            <pre className="bg-erie border border-eagle/10 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm text-narvik">
              {prompt.content}
            </pre>
          </div>
          <div>
            <h3 className="font-medium text-fire mb-2">Exemple</h3>
            <p className="text-eagle/90">{prompt.example}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}