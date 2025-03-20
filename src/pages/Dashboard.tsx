import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, Users, FolderHeart, Library } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const features = [
  {
    title: 'Méthode PIF',
    description: 'Apprenez à créer des prompts efficaces avec la méthode PIF',
    icon: Brain,
    path: '/pif-method',
    color: 'bg-erie',
    iconColor: 'text-fire',
  },
  {
    title: 'Banque de prompts',
    description: 'Accédez à une collection de prompts prêts à l\'emploi',
    icon: BookOpen,
    path: '/prompt-bank',
    color: 'bg-erie',
    iconColor: 'text-fire',
  },
  {
    title: 'Espace collaboratif',
    description: 'Partagez et échangez avec vos collègues',
    icon: Users,
    path: '/collaborative',
    color: 'bg-erie',
    iconColor: 'text-fire',
  },
  {
    title: 'Mes prompts',
    description: 'Gérez votre bibliothèque personnelle',
    icon: FolderHeart,
    path: '/my-prompts',
    color: 'bg-erie',
    iconColor: 'text-fire',
  },
  {
    title: 'Ressources',
    description: 'Consultez nos guides et documentation',
    icon: Library,
    path: '/resources',
    color: 'bg-erie',
    iconColor: 'text-fire',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-erie">
      <div className="max-w-uber mx-auto px-4 md:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-medium text-narvik mb-6">
            IA Assistant CSS
          </h1>
          <p className="text-2xl text-eagle max-w-2xl mx-auto">
            Explorez nos outils et ressources pour maîtriser l'IA dans votre travail quotidien
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.path}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <Link
                to={feature.path}
                className="block h-full bg-[#2B2B2A] rounded-xl p-8 border border-eagle/10 hover:border-eagle/20 transition-all duration-200"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-lg border border-eagle/10 mb-6 group-hover:border-eagle/20 transition-all duration-200`}>
                  <feature.icon size={24} className={feature.iconColor} />
                </div>
                <h2 className="text-2xl font-medium text-narvik mb-3">
                  {feature.title}
                </h2>
                <p className="text-eagle/80 group-hover:text-eagle transition-colors duration-200">
                  {feature.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-eagle">
            Commencez par explorer la{' '}
            <Link 
              to="/pif-method" 
              className="text-fire hover:text-fire/80 transition-colors duration-200 font-medium"
            >
              méthode PIF
            </Link>
            {' '}pour créer des prompts efficaces.
          </p>
        </motion.div>
      </div>
    </div>
  );
}