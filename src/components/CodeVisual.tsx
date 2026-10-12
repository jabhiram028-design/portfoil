import React, { useState } from 'react';
import { Terminal, Sparkles, CheckCircle2, Laptop } from 'lucide-react';

export const CodeVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'stack' | 'goal'>('profile');

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Ambient background glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-purple-800/10 rounded-2xl blur-2xl -z-10 pointer-events-none" />

      {/* Main IDE Window Mockup */}
      <div className="rounded-xl border border-purple-500/20 bg-[#0B0F19]/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-purple-500/40">
        {/* Top window header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#070A12]/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-xs font-mono text-gray-500 hidden sm:inline-flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-purple-400" />
              abhiram-workspace ~ code-editor
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
              v2026.1
            </span>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-white/5 bg-[#080C16] text-xs font-mono overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 flex items-center gap-2 border-r border-white/5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#0B0F19] text-purple-300 border-t-2 border-t-purple-500'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]'
            }`}
          >
            <span className="text-purple-400">TS</span>
            Developer.ts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stack')}
            className={`px-4 py-2.5 flex items-center gap-2 border-r border-white/5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'stack'
                ? 'bg-[#0B0F19] text-purple-300 border-t-2 border-t-purple-500'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]'
            }`}
          >
            <span className="text-indigo-400">JSON</span>
            learning-stack.json
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('goal')}
            className={`px-4 py-2.5 flex items-center gap-2 border-r border-white/5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'goal'
                ? 'bg-[#0B0F19] text-purple-300 border-t-2 border-t-purple-500'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]'
            }`}
          >
            <span className="text-emerald-400">MD</span>
            mission.md
          </button>
        </div>

        {/* Code Content Area */}
        <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[220px]">
          {activeTab === 'profile' && (
            <div className="space-y-1.5 text-gray-300">
              <div>
                <span className="text-purple-400">const</span>{' '}
                <span className="text-indigo-300">developer</span> = &#123;
              </div>
              <div className="pl-4">
                <span className="text-gray-400">name:</span>{' '}
                <span className="text-emerald-300">"J. Abhiram"</span>,
              </div>
              <div className="pl-4">
                <span className="text-gray-400">status:</span>{' '}
                <span className="text-purple-300">"Aspiring Web Developer"</span>,
              </div>
              <div className="pl-4">
                <span className="text-gray-400">passion:</span>{' '}
                <span className="text-emerald-300">"Building clean web experiences"</span>,
              </div>
              <div className="pl-4">
                <span className="text-gray-400">mindset:</span> [
                <span className="text-amber-300">"Curious"</span>,{' '}
                <span className="text-amber-300">"Creative"</span>,{' '}
                <span className="text-amber-300">"Committed"</span>],
              </div>
              <div className="pl-4">
                <span className="text-gray-400">readyToGrow:</span>{' '}
                <span className="text-blue-400">true</span>,
              </div>
              <div>&#125;;</div>
              <div className="pt-2 text-gray-500 italic">
                // Continuous improvement through daily coding
              </div>
              <div>
                <span className="text-purple-400">export default</span>{' '}
                <span className="text-indigo-300">developer</span>;
              </div>
            </div>
          )}

          {activeTab === 'stack' && (
            <div className="space-y-1.5 text-gray-300">
              <div>&#123;</div>
              <div className="pl-4">
                <span className="text-purple-300">"foundations"</span>: [
                <span className="text-emerald-300">"HTML5"</span>,{' '}
                <span className="text-emerald-300">"CSS3"</span>,{' '}
                <span className="text-emerald-300">"JavaScript ES6"</span>],
              </div>
              <div className="pl-4">
                <span className="text-purple-300">"currentlyExploring"</span>: [
                <span className="text-indigo-300">"React 19"</span>,{' '}
                <span className="text-indigo-300">"Tailwind CSS"</span>,{' '}
                <span className="text-indigo-300">"Vite"</span>],
              </div>
              <div className="pl-4">
                <span className="text-purple-300">"workflowTools"</span>: [
                <span className="text-amber-300">"Git"</span>,{' '}
                <span className="text-amber-300">"GitHub"</span>,{' '}
                <span className="text-amber-300">"VS Code"</span>],
              </div>
              <div className="pl-4">
                <span className="text-purple-300">"dailyCommitment"</span>:{' '}
                <span className="text-emerald-300">"Practice every single day"</span>
              </div>
              <div>&#125;</div>
            </div>
          )}

          {activeTab === 'goal' && (
            <div className="space-y-1.5 text-gray-300">
              <div className="text-purple-300 font-bold"># My Development Philosophy</div>
              <div className="text-gray-400">
                &gt; "Every line of code is an opportunity to learn, solve a puzzle, and build something useful."
              </div>
              <div className="pt-2 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Turn concepts into practical code</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Learn from constructive feedback</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-400">
                <Sparkles className="w-4 h-4" />
                <span>Build with accessible, modern standards</span>
              </div>
            </div>
          )}
        </div>

        {/* Mini interactive terminal status line */}
        <div className="px-4 py-2.5 border-t border-white/5 bg-[#070A12] flex items-center justify-between text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-purple-300">$</span>
            <span className="text-gray-300">npm run build</span>
            <span className="text-emerald-400 font-semibold">[ready]</span>
          </div>
          <div className="text-[11px] text-gray-500">UTF-8</div>
        </div>
      </div>

      {/* Floating Decorative Badges */}
      <div className="hidden sm:flex absolute -top-4 -right-4 items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F172A]/90 border border-purple-500/30 text-xs font-mono text-purple-200 shadow-xl backdrop-blur-md animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        <span>&lt;Clean Code /&gt;</span>
      </div>

      <div className="hidden sm:flex absolute -bottom-4 -left-4 items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F172A]/90 border border-indigo-500/30 text-xs font-mono text-indigo-200 shadow-xl backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Eager to Learn &amp; Build</span>
      </div>
    </div>
  );
};
