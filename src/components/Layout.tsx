import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-erie">
      <Navigation />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="max-w-uber mx-auto px-4 py-8 md:px-8"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}