import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, Copy, Check, Code2, Eye, Info } from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'preview' | 'instructions'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.previewCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-[#0B0F19] border border-purple-500/30 shadow-2xl shadow-purple-950/50 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070A12]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              {project.number}
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-white/5 bg-[#080C16] px-6 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-purple-500 text-purple-300 bg-white/[0.02]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Overview &amp; Features</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'border-purple-500 text-purple-300 bg-white/[0.02]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('instructions')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'instructions'
                ? 'border-purple-500 text-purple-300 bg-white/[0.02]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>How to Customize</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'overview' && (
            <>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">{project.subtitle}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Technologies Tag Row */}
              <div>
                <div className="text-xs font-mono text-gray-400 mb-2">Technologies Used:</div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="rounded-xl p-4 bg-white/[0.02] border border-white/5 space-y-2.5">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                  Key Learnings &amp; Implementation Details:
                </div>
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">
                  Snippet from {project.title}:
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-[#060810] border border-white/10 font-mono text-xs sm:text-sm text-purple-200 overflow-x-auto leading-relaxed">
                <code>{project.previewCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="rounded-xl p-5 bg-[#0F172A] border border-indigo-500/20 space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                <Info className="w-4 h-4 text-indigo-400" />
                <span>Customizing Starter Project Slots</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                This project card is an editable starter slot designed specifically for J. Abhiram's portfolio. When you finish building your real project, update the details in <code className="text-purple-300 bg-black/40 px-1 py-0.5 rounded font-mono">src/data/portfolioData.ts</code>:
              </p>
              <ul className="text-xs text-gray-300 space-y-1.5 list-disc pl-5">
                <li>Replace <code className="text-purple-300 font-mono">title</code> and <code className="text-purple-300 font-mono">description</code> with your project's details.</li>
                <li>Set <code className="text-purple-300 font-mono">codeUrl</code> to your real GitHub repository.</li>
                <li>Set <code className="text-purple-300 font-mono">demoUrl</code> to your live Vercel / Netlify deployment.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#070A12] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-gray-400 font-mono">
            Status: Starter Project Showcase
          </div>

          <div className="flex items-center gap-3">
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repository Placeholder</span>
                <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
