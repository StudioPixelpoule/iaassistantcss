import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PifMethod from './pages/PifMethod';
import PromptBank from './pages/PromptBank';
import Collaborative from './pages/Collaborative';
import MyPrompts from './pages/MyPrompts';
import Resources from './pages/Resources';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import AuthProvider from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pif-method" element={<PifMethod />} />
              <Route path="/prompt-bank" element={<PromptBank />} />
              <Route path="/collaborative" element={<Collaborative />} />
              <Route path="/my-prompts" element={<MyPrompts />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </Router>
  );
}

export default App;