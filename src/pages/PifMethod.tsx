import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Lightbulb, ArrowRight, Shield, ListChecks, Sparkles } from 'lucide-react';

const steps = [
  {
    title: 'Problématique',
    icon: Brain,
    description: 'La qualité de votre interaction avec l\'IA dépend directement de la clarté de vos instructions.',
    elements: [
      { title: 'Qui', description: 'Le public cible du document' },
      { title: 'Quoi', description: 'Le sujet exact, avec TOUS les détails pertinents' },
      { title: 'Quand', description: 'Les périodes, dates ou délais concernés' },
      { title: 'Où', description: 'Les lieux, établissements ou contextes spécifiques' },
      { title: 'Comment', description: 'Les spécificités d\'approche souhaitées' }
    ]
  },
  {
    title: 'Intention',
    icon: MessageSquare,
    description: 'Expliquez clairement POURQUOI vous avez besoin de ce document.',
    checklist: [
      'J\'ai clairement expliqué pourquoi j\'ai besoin de ce document',
      'J\'ai précisé l\'effet souhaité sur le destinataire',
      'J\'ai mentionné le résultat concret attendu',
      'J\'ai indiqué les enjeux ou sensibilités particulières'
    ]
  },
  {
    title: 'Format',
    icon: Lightbulb,
    description: 'Spécifiez la structure et le format de la réponse attendue.',
    checklist: [
      'J\'ai spécifié la structure souhaitée',
      'J\'ai indiqué la longueur approximative',
      'J\'ai précisé le ton et le style à adopter',
      'J\'ai mentionné les éléments spécifiques à inclure',
      'J\'ai demandé des éléments visuels si pertinent',
      'J\'ai précisé les conventions ou normes à respecter'
    ]
  }
];

const advancedTips = [
  {
    title: 'Role prompting',
    icon: Shield,
    description: 'Demandez à l\'IA d\'adopter un rôle spécifique pour obtenir une expertise adaptée.',
    example: 'Agis comme un spécialiste en communication scolaire avec 15 ans d\'expérience dans les centres de services scolaires du Québec.'
  },
  {
    title: 'Approche en étapes',
    icon: ListChecks,
    description: 'Pour les tâches complexes, demandez à l\'IA de procéder par étapes.',
    example: '1. D\'abord, propose une structure d\'ordre du jour\n2. Ensuite, suggère des points selon la période\n3. Enfin, propose un modèle de convocation'
  },
  {
    title: 'Auto-évaluation',
    icon: Sparkles,
    description: 'Demandez à l\'IA d\'évaluer et d\'améliorer sa propre réponse.',
    example: 'Après avoir rédigé cette lettre aux parents, révise-la en vérifiant:\n1. La clarté des informations\n2. Le ton approprié\n3. L\'absence d\'ambiguïtés'
  }
];

export default function PifMethod() {
  const [activeStep, setActiveStep] = useState(0);
  const [showConfidentiality, setShowConfidentiality] = useState(false);

  return (
    <div className="max-w-uber mx-auto px-4 md:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-medium text-narvik mb-6">
          Méthode PIF
        </h1>
        <p className="text-2xl text-eagle max-w-2xl mx-auto">
          Apprenez à créer des prompts efficaces avec la méthode PIF
        </p>
      </motion.div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#2B2B2A] rounded-2xl p-8 mb-12 border border-eagle/10"
      >
        <h2 className="text-2xl font-medium text-narvik mb-4">
          Pourquoi la formulation est cruciale
        </h2>
        <p className="text-eagle mb-8">
          La différence entre une réponse médiocre et une réponse exceptionnelle
          ne dépend pas de l'IA elle-même, mais de la qualité de votre requête.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps[0].elements.map((element, index) => (
            <motion.div
              key={element.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 group"
            >
              <div className="w-2 h-2 mt-2 rounded-full bg-fire shrink-0" />
              <div>
                <h3 className="text-fire font-medium mb-2">{element.title}</h3>
                <p className="text-eagle/80">{element.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`relative bg-[#2B2B2A] rounded-2xl p-8 cursor-pointer border transition-all duration-200
              ${activeStep === index 
                ? 'border-fire shadow-lg' 
                : 'border-eagle/10 hover:border-eagle/20'}`}
            onClick={() => setActiveStep(index)}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-erie rounded-xl">
                <step.icon size={24} className="text-fire" />
              </div>
              <h2 className="text-2xl font-medium text-narvik">{step.title}</h2>
            </div>
            <p className="text-eagle/80">{step.description}</p>
            
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-12 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight size={32} className="text-eagle/20" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Step Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-[#2B2B2A] rounded-2xl p-8 mb-12 border border-eagle/10"
      >
        <h3 className="text-2xl font-medium text-narvik mb-6">
          {steps[activeStep].title} en détail
        </h3>
        
        {activeStep === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps[0].elements.map((element, index) => (
              <motion.div
                key={element.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-erie p-6 rounded-xl border border-eagle/10"
              >
                <h4 className="text-fire font-medium mb-2">{element.title}</h4>
                <p className="text-eagle/80">{element.description}</p>
              </motion.div>
            ))}
          </div>
        )}

        {(activeStep === 1 || activeStep === 2) && (
          <div className="space-y-4">
            {steps[activeStep].checklist.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-eagle/20 text-fire focus:ring-fire/20 bg-erie"
                />
                <label className="text-eagle/80 group-hover:text-eagle transition-colors duration-200">
                  {item}
                </label>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Advanced Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-[#2B2B2A] rounded-2xl p-8 mb-12 border border-eagle/10"
      >
        <h3 className="text-2xl font-medium text-narvik mb-6">
          Astuces avancées
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advancedTips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-erie p-6 rounded-xl border border-eagle/10"
            >
              <div className="p-3 bg-[#2B2B2A] rounded-xl w-fit mb-4">
                <tip.icon size={24} className="text-fire" />
              </div>
              <h4 className="text-xl font-medium text-narvik mb-3">{tip.title}</h4>
              <p className="text-eagle/80 mb-4">{tip.description}</p>
              <pre className="bg-[#2B2B2A] p-4 rounded-lg border border-eagle/10 text-sm font-mono text-eagle/80 whitespace-pre-wrap">
                {tip.example}
              </pre>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Confidentiality Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-[#2B2B2A] rounded-2xl p-8 border border-eagle/10"
      >
        <button
          onClick={() => setShowConfidentiality(!showConfidentiality)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="text-2xl font-medium text-narvik">
            Précautions et confidentialité
          </h3>
          <ArrowRight
            size={24}
            className={`text-eagle transition-transform duration-200 ${
              showConfidentiality ? 'rotate-90' : ''
            }`}
          />
        </button>
        
        {showConfidentiality && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-8 space-y-8"
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-fire font-medium mb-3">1. Anonymisez systématiquement</h4>
                <ul className="list-disc list-inside space-y-2 text-eagle/80 ml-4">
                  <li>Utilisez des pseudonymes ou codes (Élève A, École B)</li>
                  <li>Ne mentionnez jamais les noms complets des élèves ou parents</li>
                  <li>Masquez les identifiants uniques (codes permanents, numéros d'assurance sociale)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-fire font-medium mb-3">2. Limitez les détails identifiants</h4>
                <ul className="list-disc list-inside space-y-2 text-eagle/80 ml-4">
                  <li>Évitez les combinaisons d'informations qui permettraient l'identification indirecte</li>
                  <li>Ne précisez pas les conditions médicales spécifiques ou situations familiales particulières</li>
                </ul>
              </div>

              <div className="bg-erie p-6 rounded-xl border border-eagle/10">
                <p className="text-fire font-medium mb-2">Exemple à éviter :</p>
                <p className="text-eagle/80 mb-4">
                  "Aide-moi à rédiger un plan d'intervention pour Lucas Martin, élève de 4e année à l'école Lafleur..."
                </p>
                <p className="text-fire font-medium mb-2">Version recommandée :</p>
                <p className="text-eagle/80">
                  "Aide-moi à rédiger un modèle de plan d'intervention pour un élève de niveau primaire présentant des difficultés d'attention..."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}