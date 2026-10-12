import React from 'react';
import { BookOpen, Code2, TrendingUp, CheckCircle, Heart, Compass } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export const About: React.FC = () => {
  const cards = [
    {
      title: 'Always Learning',
      subtitle: 'Exploring concepts & modern tools',
      description:
        'Constantly exploring HTML, CSS, JavaScript, and modern frameworks. Reading documentation and building daily habits.',
      icon: BookOpen,
      badge: 'Continuous Growth',
      color: 'from-purple-500/20 to-purple-800/10',
      borderColor: 'border-purple-500/20 hover:border-purple-500/40',
      iconColor: 'text-purple-400',
    },
    {
      title: 'Building Projects',
      subtitle: 'Hands-on practical execution',
      description:
        'Applying what I study into tangible web pages. From responsive landing pages to dynamic JavaScript applications.',
      icon: Code2,
      badge: 'Action-Driven',
      color: 'from-indigo-500/20 to-indigo-800/10',
      borderColor: 'border-indigo-500/20 hover:border-indigo-500/40',
      iconColor: 'text-indigo-400',
    },
    {
      title: 'Growing Every Day',
      subtitle: 'Code quality & problem solving',
      description:
        'Improving problem-solving and clean code practices. Embracing mistakes as the quickest path to mastery.',
      icon: TrendingUp,
      badge: 'Daily Progress',
      color: 'from-violet-500/20 to-violet-800/10',
      borderColor: 'border-violet-500/20 hover:border-violet-500/40',
      iconColor: 'text-violet-400',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#030712] relative overflow-hidden border-b border-white/5">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium tracking-wide mb-3">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>ABOUT ME</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {portfolioConfig.aboutHeading}
          </h2>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            {portfolioConfig.aboutDescription}
          </p>
        </div>

        {/* 3 Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`relative rounded-xl p-6 bg-[#0B0F19]/90 border ${card.borderColor} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/20 group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                    {card.title}
                  </h3>

                  <div className="text-xs font-medium text-purple-300/80 mb-3">
                    {card.subtitle}
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Beginner mindset, dedicated effort</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Proposition Callout Box */}
        <div className="rounded-xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-[#0B0F19] to-indigo-950/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <Heart className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white mb-1">
                Authentic, Passionate, and Ready to Collaborate
              </h4>
              <p className="text-sm text-gray-400 max-w-2xl">
                I do not claim decades of corporate experience. What I offer is genuine curiosity, attention to detail, consistent daily coding, and an excitement to contribute to real-world web projects.
              </p>
            </div>
          </div>

          <a
            href="#skills"
            className="shrink-0 px-4 py-2 rounded-lg text-xs font-mono font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-colors"
          >
            Explore My Skills &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
