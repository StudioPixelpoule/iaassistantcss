import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Users, FolderHeart, Library, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const isAdmin = user?.user_metadata?.is_admin;

  const navItems = [
    { path: '/', icon: Brain, label: 'Tableau de bord' },
    { path: '/pif-method', icon: BookOpen, label: 'Méthode PIF' },
    { path: '/prompt-bank', icon: Library, label: 'Banque de prompts' },
    { path: '/collaborative', icon: Users, label: 'Espace collaboratif' },
    { path: '/my-prompts', icon: FolderHeart, label: 'Mes prompts' },
    { path: '/resources', icon: Library, label: 'Ressources' },
    ...(isAdmin ? [{ path: '/settings', icon: Settings, label: 'Paramètres' }] : []),
  ];

  return (
    <nav className="bg-erie border-b border-eagle/10">
      <div className="max-w-uber mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center space-x-2 text-base font-medium transition-all duration-200
                  ${location.pathname === item.path 
                    ? 'text-fire' 
                    : 'text-narvik hover:text-fire'}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-fire"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-2 text-base font-medium text-narvik hover:text-fire transition-colors duration-200"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </nav>
  );
}