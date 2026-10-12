import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons';
import { portfolioConfig } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please write a message before sending.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate sending with realistic feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioConfig.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-[#030712] relative overflow-hidden border-b border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium tracking-wide mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            <span>LET'S CONNECT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Have an Idea or Want to Connect?
          </h2>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            I'm always excited to learn, collaborate, and connect with people who share an interest in technology and web development. Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact & Social Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Email Card */}
            <div className="rounded-2xl p-6 bg-[#0B0F19]/90 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Mail className="w-6 h-6" />
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-purple-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">Direct Email</h3>
              <p className="text-xs text-gray-400 mb-3">
                Send me a note anytime. I check my messages regularly.
              </p>

              <a
                href={`mailto:${portfolioConfig.contactEmail}`}
                className="inline-flex items-center gap-2 text-sm font-mono text-purple-300 hover:text-purple-200 transition-colors group"
              >
                <span>{portfolioConfig.contactEmail}</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Social Profiles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* GitHub Card */}
              <a
                href={portfolioConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl p-5 bg-[#0B0F19]/90 border border-white/10 hover:border-purple-500/40 transition-all hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-white transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    GitHub Profile
                  </h4>
                  <p className="text-xs text-gray-500 font-mono">
                    github.com/abhiram-dev
                  </p>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href={portfolioConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl p-5 bg-[#0B0F19]/90 border border-white/10 hover:border-purple-500/40 transition-all hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-white transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    LinkedIn Profile
                  </h4>
                  <p className="text-xs text-gray-500 font-mono">
                    linkedin.com/in/abhiram-dev
                  </p>
                </div>
              </a>
            </div>

            {/* Note on Customizing Placeholders */}
            <div className="rounded-xl p-4 bg-white/[0.02] border border-white/5 text-xs text-gray-400 space-y-1">
              <div className="font-semibold text-gray-300">Editable Contact Info:</div>
              <p>
                The email and social URLs are editable in <code className="text-purple-300 font-mono">src/data/portfolioData.ts</code>. Simply replace with your actual profiles.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-8 bg-[#0B0F19]/95 border border-white/10 shadow-2xl relative overflow-hidden">
              {isSubmitted ? (
                <div className="py-12 px-4 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-purple-300 font-medium">{formData.name}</span>. Your message has been received. I'm excited to connect with you and will reply as soon as possible.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-2">
                    <h3 className="text-lg font-bold text-white">Send a Message</h3>
                    <span className="text-xs font-mono text-gray-400">* Required fields</span>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="name" className="block text-xs font-medium text-gray-300">
                      Your Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="e.g. Alex Morgan"
                      className={`w-full px-4 py-2.5 rounded-lg bg-[#070A12] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.name ? 'border-red-500/60' : 'border-white/10 focus:border-purple-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1.5 text-xs text-red-400 pt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="email" className="block text-xs font-medium text-gray-300">
                      Email Address <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="e.g. alex@example.com"
                      className={`w-full px-4 py-2.5 rounded-lg bg-[#070A12] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.email ? 'border-red-500/60' : 'border-white/10 focus:border-purple-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1.5 text-xs text-red-400 pt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="subject" className="block text-xs font-medium text-gray-300">
                      Subject (Optional)
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Collaborating on a web project / Feedback"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#070A12] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="message" className="block text-xs font-medium text-gray-300">
                      Message <span className="text-purple-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Hi Abhiram, I came across your portfolio and wanted to connect..."
                      className={`w-full px-4 py-2.5 rounded-lg bg-[#070A12] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
                        errors.message ? 'border-red-500/60' : 'border-white/10 focus:border-purple-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1.5 text-xs text-red-400 pt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 hover:shadow-purple-800/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 text-purple-200" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
