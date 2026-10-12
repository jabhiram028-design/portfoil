import React from 'react';
import { Compass, CheckCircle2, Clock, Sparkles, ArrowRight, Milestone } from 'lucide-react';
import { roadmapSteps } from '../data/portfolioData';

export const LearningJourney: React.FC = () => {
  const getStatusBadge = (status: 'Completed' | 'In Progress' | 'Upcoming') => {
    switch (status) {
      case 'Completed':
        return {
          label: 'Completed Milestone',
          classes: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          icon: CheckCircle2,
          nodeBg: 'bg-emerald-500',
        };
      case 'In Progress':
        return {
          label: 'Active Focus',
          classes: 'bg-purple-500/15 text-purple-300 border-purple-500/40 animate-pulse',
          icon: Clock,
          nodeBg: 'bg-purple-500',
        };
      case 'Upcoming':
        return {
          label: 'Next Goal',
          classes: 'bg-white/5 text-gray-400 border-white/10',
          icon: Sparkles,
          nodeBg: 'bg-gray-600',
        };
    }
  };

  return (
    <section id="journey" className="py-20 bg-[#030712] relative overflow-hidden border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium tracking-wide mb-3">
            <Milestone className="w-3.5 h-3.5 text-purple-400" />
            <span>LEARNING ROADMAP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            My Journey Into Web Development
          </h2>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            I'm just getting started, and I'm excited about what lies ahead. Every new concept I learn helps me understand the web better. My goal is to keep practicing, build meaningful projects, explore new technologies, and gradually become a skilled web developer.
          </p>
        </div>

        {/* Visual Roadmap Grid (6 Steps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {roadmapSteps.map((step) => {
            const badge = getStatusBadge(step.status);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={step.step}
                className="group relative rounded-2xl bg-[#0B0F19]/90 border border-white/10 hover:border-purple-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/20"
              >
                <div>
                  {/* Step Header with Number & Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 font-mono font-bold text-sm text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                      0{step.step}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border ${badge.classes}`}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Key Learnings List */}
                <div className="pt-4 border-t border-white/5 space-y-1.5">
                  <div className="text-[11px] font-mono text-purple-300/80 uppercase tracking-wider mb-2">
                    Key Focus Areas:
                  </div>
                  {step.keyLearnings.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-gray-300"
                    >
                      <ArrowRight className="w-3 h-3 text-purple-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment Statement */}
        <div className="mt-12 rounded-xl p-6 bg-gradient-to-r from-purple-950/20 via-[#0B0F19] to-indigo-950/20 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-purple-400 shrink-0" />
            <p className="text-sm text-gray-300">
              <span className="text-white font-semibold">Continuous Evolution:</span> This roadmap is flexible and expands as I master each technology and take on new challenges.
            </p>
          </div>

          <a
            href="#contact"
            className="shrink-0 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors"
          >
            Connect With Me &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
