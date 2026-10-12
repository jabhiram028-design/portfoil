import React, { useState } from 'react';
import { ExternalLink, FolderGit2, Eye, Sparkles } from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';
import { projectsData } from '../data/portfolioData';
import type { Project } from '../types';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-[#030712] relative overflow-hidden border-b border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium tracking-wide mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
              <span>MY PROJECTS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Things I'm Building and Exploring
            </h2>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Practical starter projects demonstrating front-end fundamentals, responsive layouts, and interactive JavaScript. Each project is designed to be easily updated with real repository links and deployments.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs font-mono text-gray-400">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>3 Starter Showcases</span>
          </div>
        </div>

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-[#0B0F19]/90 border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-950/30 flex flex-col justify-between overflow-hidden"
            >
              {/* Project Visual Mockup / Card Top */}
              <div>
                <div
                  className={`h-48 relative p-4 flex flex-col justify-between bg-gradient-to-br ${project.previewGradient} border-b border-white/5 overflow-hidden`}
                >
                  {/* Subtle code pattern backdrop */}
                  <div className="absolute inset-0 opacity-15 font-mono text-[10px] text-purple-200 p-3 select-none pointer-events-none overflow-hidden leading-tight">
                    {project.previewCode}
                  </div>

                  {/* Window Bar Mockup */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/50 text-purple-300 border border-white/10 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Visual Project Title Card */}
                  <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10 group-hover:border-purple-500/40 transition-colors">
                    <div className="text-[11px] font-mono text-purple-400 font-semibold">
                      {project.number}
                    </div>
                    <div className="text-base font-bold text-white tracking-tight">
                      {project.title}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Live Demo & View Code */}
              <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/30 transition-all duration-200 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-colors cursor-pointer"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View Code</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Note for Customization */}
        <div className="mt-12 rounded-xl p-4 bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              Starter project ideas are ready to be connected to real deployed links and repositories as you build them.
            </span>
          </div>
          <span className="text-purple-300 font-mono text-[11px] whitespace-nowrap">
            Easy to edit in portfolioData.ts
          </span>
        </div>
      </div>

      {/* Interactive Project Preview Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
