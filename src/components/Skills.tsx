import React, { useState } from 'react';
import {
  CodeXml,
  Palette,
  FileCode2,
  Smartphone,
  Layers,
  Sparkles,
  GitBranch,
  Terminal,
  Check,
  Clock,
  Flame,
  HelpCircle
} from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';
import { skillsData } from '../data/portfolioData';
import type { SkillLevel } from '../types';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Frontend Fundamentals',
    'Modern Web Development',
    'Developer Tools',
  ];

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CodeXml':
        return CodeXml;
      case 'Palette':
        return Palette;
      case 'FileCode2':
        return FileCode2;
      case 'Smartphone':
        return Smartphone;
      case 'Layers':
        return Layers;
      case 'Sparkles':
        return Sparkles;
      case 'GitBranch':
        return GitBranch;
      case 'Github':
        return GithubIcon;
      case 'Terminal':
        return Terminal;
      default:
        return CodeXml;
    }
  };

  const getLevelBadge = (level: SkillLevel) => {
    switch (level) {
      case 'Confident':
        return {
          label: 'Confident',
          classes: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          icon: Check,
          note: 'Comfortable writing and debugging independently',
        };
      case 'Practicing':
        return {
          label: 'Practicing',
          classes: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
          icon: Clock,
          note: 'Active hands-on application in small projects',
        };
      case 'Currently Learning':
        return {
          label: 'Currently Learning',
          classes: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          icon: Flame,
          note: 'Studying documentation and building exercises',
        };
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#030712] relative overflow-hidden border-b border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium tracking-wide mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>MY SKILLS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Technologies I'm Exploring
            </h2>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Transparent, honest representation of my technical toolkit. Rather than arbitrary percentages, each technology reflects my real-world familiarity and learning stage.
            </p>
          </div>

          {/* Legend of Skill Stages */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <Check className="w-3 h-3" /> Confident
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              <Clock className="w-3 h-3" /> Practicing
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <Flame className="w-3 h-3" /> Learning
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/5 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeCategory === category
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                  : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => {
            const Icon = getIcon(skill.iconName);
            const badge = getLevelBadge(skill.level);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={skill.name}
                className="group rounded-xl p-5 bg-[#0B0F19]/90 border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:text-purple-300 group-hover:bg-purple-950/30 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono border ${badge.classes}`}
                      title={badge.note}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                    {skill.name}
                  </h3>

                  <div className="text-xs font-mono text-gray-500 mb-2">
                    {skill.category}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Subtle capability indicator */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span className="flex items-center gap-1 text-gray-400">
                    <HelpCircle className="w-3 h-3 text-purple-400/80" />
                    <span>Status:</span>
                  </span>
                  <span className="text-gray-300">{badge.note}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
