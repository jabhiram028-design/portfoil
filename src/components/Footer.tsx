import React from 'react';
import { ArrowUp, Code2, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons';
import { portfolioConfig } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Learning Journey', href: '#journey' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#02050E] text-gray-400 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/5">
          {/* Brand Logo & Statement */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-mono font-bold text-base text-white tracking-tight">
                &lt;/&gt; J. Abhiram
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm">
              Designed and built with curiosity and passion for web development.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-purple-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={portfolioConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="w-9 h-9 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-500/50 flex items-center justify-center text-purple-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>&copy; {portfolioConfig.copyrightYear} J. Abhiram. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Built with React, Vite &amp; Tailwind CSS</span>
            <Heart className="w-3 h-3 text-purple-400 fill-purple-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
