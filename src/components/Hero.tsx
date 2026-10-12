import React from 'react';
import { ArrowDown, Send, Sparkles } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';
import { CodeVisual } from './CodeVisual';

interface HeroProps {
  onExploreProjects?: () => void;
  onConnect?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onConnect }) => {
  const techStack = [
    { name: 'HTML5', tag: 'Semantic Web' },
    { name: 'CSS3', tag: 'Modern Styling' },
    { name: 'JavaScript', tag: 'Core Logic' },
    { name: 'React', tag: 'Components' },
    { name: 'Tailwind CSS', tag: 'Utility-First' },
    { name: 'Git', tag: 'Version Control' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] pt-24 pb-16 flex flex-col justify-center overflow-hidden border-b border-white/5"
    >
      {/* Subtle radial ambient background light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* 2-Column Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Authentic Developer Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Role Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium tracking-wide mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>{portfolioConfig.role}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">J. Abhiram</span>
            </h1>

            {/* Subheading */}
            <h2 className="text-lg sm:text-xl font-medium text-purple-200/90 leading-snug mb-4">
              {portfolioConfig.heroSubheading}
            </h2>

            {/* Description (authentic beginner) */}
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mb-7">
              {portfolioConfig.heroDescription}
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  scrollTo('projects');
                  if (onExploreProjects) onExploreProjects();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              >
                <span>Explore My Projects</span>
                <ArrowDown className="w-4 h-4 text-purple-200" />
              </button>

              <button
                type="button"
                onClick={() => {
                  scrollTo('contact');
                  if (onConnect) onConnect();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-gray-200 hover:text-white bg-[#0F172A] hover:bg-[#1E293B] border border-purple-500/20 hover:border-purple-500/50 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              >
                <span>Let's Connect</span>
                <Send className="w-4 h-4 text-purple-400" />
              </button>
            </div>

            {/* Technology Row Underneath */}
            <div className="w-full pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Technologies I Use &amp; Learn:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium text-gray-300 bg-white/[0.03] border border-white/10 hover:border-purple-500/40 hover:bg-purple-950/20 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span className="text-white font-semibold">{tech.name}</span>
                    <span className="text-gray-500 hidden sm:inline text-[11px]">({tech.tag})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Code Editor Visual */}
          <div className="lg:col-span-5 w-full">
            <CodeVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
