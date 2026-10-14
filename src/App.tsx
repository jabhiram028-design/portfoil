import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { LearningJourney } from './components/LearningJourney';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

export const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(
    () => typeof window !== 'undefined' && window.location.hash === '#admin'
  );

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
  };

  return (
    <div className="min-h-[100dvh] bg-[#030712] text-[#F9FAFB] flex flex-col selection:bg-purple-600/30 selection:text-purple-200">
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Skills Section */}
        <Skills />

        {/* 4. Projects Section */}
        <Projects />

        {/* 5. Learning Journey Roadmap */}
        <LearningJourney />

        {/* 6. Contact Section */}
        <Contact />
      </main>

      {/* Footer with Admin Portal trigger */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Admin Dashboard Modal / Overlay */}
      <AdminDashboard isOpen={isAdminOpen} onClose={handleCloseAdmin} />
    </div>
  );
};

export default App;
