import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Mail,
  Shield,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Lock,
  Inbox,
  AlertCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Clock,
  Send,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import {
  supabase,
  supabaseUrl,
  isSupabaseConfigured,
  supabaseEnvDiagnostics,
  fetchContactMessages,
  updateMessageReadStatus,
  deleteContactMessage,
  signInAdmin,
  signOutAdmin,
  getAdminUser,
  type ContactMessageRecord
} from '../lib/supabase';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Messages state
  const [messages, setMessages] = useState<ContactMessageRecord[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Initialize auth check and listen to auth changes
  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const currentUser = await getAdminUser();
      if (mounted) {
        setUser(currentUser);
        setLoadingUser(false);
      }
    }

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        setLoadingUser(false);
      }
    });

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Fetch messages when authenticated & dashboard opens
  const loadMessages = async () => {
    setLoadingMessages(true);
    setMessagesError(null);
    const result = await fetchContactMessages();
    setLoadingMessages(false);

    if (result.error) {
      setMessagesError(result.error);
    } else {
      setMessages(result.data);
    }
  };

  useEffect(() => {
    let ignore = false;
    if (isOpen && user) {
      (async () => {
        setLoadingMessages(true);
        setMessagesError(null);
        const result = await fetchContactMessages();
        if (!ignore) {
          setLoadingMessages(false);
          if (result.error) {
            setMessagesError(result.error);
          } else {
            setMessages(result.data);
          }
        }
      })();
    }
    return () => {
      ignore = true;
    };
  }, [isOpen, user]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Login submit handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    setLoginLoading(true);
    setLoginError(null);

    const { user: loggedInUser, error } = await signInAdmin(loginEmail, loginPassword);
    setLoginLoading(false);

    if (error) {
      setLoginError(error);
    } else if (loggedInUser) {
      setUser(loggedInUser);
      setLoginPassword('');
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await signOutAdmin();
    setUser(null);
    setMessages([]);
  };

  // Toggle Read Status
  const handleToggleRead = async (message: ContactMessageRecord) => {
    const nextStatus = !message.is_read;
    // Optimistic UI update
    setMessages((prev) =>
      prev.map((m) => (m.id === message.id ? { ...m, is_read: nextStatus } : m))
    );

    const { success, error } = await updateMessageReadStatus(message.id, nextStatus);
    if (!success) {
      // Revert if failed
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, is_read: message.is_read } : m))
      );
      alert(`Could not update message: ${error}`);
    }
  };

  // Delete message handler
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) {
      return;
    }

    setDeletingId(id);
    const { success, error } = await deleteContactMessage(id);
    setDeletingId(null);

    if (success) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessageId === id) setSelectedMessageId(null);
    } else {
      alert(`Could not delete message: ${error}`);
    }
  };

  // Filter messages based on search & tab
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchesTab =
        activeTab === 'all' ? true : activeTab === 'unread' ? !msg.is_read : msg.is_read;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        msg.name.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        (msg.subject && msg.subject.toLowerCase().includes(q)) ||
        msg.message.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [messages, activeTab, searchQuery]);

  const unreadCount = useMemo(() => messages.filter((m) => !m.is_read).length, [messages]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-[#070B14] border border-purple-500/20 shadow-2xl shadow-purple-950/40 overflow-hidden text-gray-200">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B0F1C]/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Admin Dashboard
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  SUPABASE
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Manage contact form submissions and inbox
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-red-400 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto">
          {loadingUser ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3 text-gray-400">
              <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
              <p className="text-xs font-mono">Checking authentication...</p>
            </div>
          ) : !user ? (
            /* Admin Login View */
            <div className="py-12 px-4 sm:px-6 max-w-md mx-auto">
              <div className="rounded-2xl p-6 sm:p-8 bg-[#0B0F1C]/90 border border-white/10 shadow-xl space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400 mb-2">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Admin Authentication</h3>
                  <p className="text-xs text-gray-400">
                    Sign in with your Supabase credentials to access submitted messages.
                  </p>
                </div>

                {!isSupabaseConfigured && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2 text-left">
                    <div className="flex items-center gap-2 font-semibold text-amber-300">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Missing Supabase API Key (Vercel / Local)</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-amber-100/90">
                      The environment variable <code className="px-1.5 py-0.5 rounded bg-black/40 font-mono text-purple-300">VITE_SUPABASE_ANON_KEY</code> is not set in this deployment.
                    </p>
                    <p className="text-[11px] leading-relaxed text-gray-300">
                      In <strong>Vercel Project Settings &rarr; Environment Variables</strong>, add <code className="px-1.5 py-0.5 rounded bg-black/40 font-mono text-purple-300">VITE_SUPABASE_ANON_KEY</code> and <code className="px-1.5 py-0.5 rounded bg-black/40 font-mono text-purple-300">VITE_SUPABASE_URL</code>, then redeploy.
                    </p>
                  </div>
                )}

                {loginError && (
                  <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2.5 text-left">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-medium text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-[#070A12] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-medium text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-3.5 pr-10 py-2 rounded-lg bg-[#070A12] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {loginLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <span>Sign In to Dashboard</span>
                    )}
                  </button>
                </form>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400 space-y-1.5 text-left">
                  <p className="font-semibold text-gray-300">Setting Up Admin Access:</p>
                  <p>
                    Create your admin user in your{' '}
                    <span className="text-purple-300 font-mono">
                      Supabase Dashboard &gt; Authentication &gt; Users &gt; Add User
                    </span>
                    . Once created, log in here to view live messages.
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono pt-1 border-t border-white/5">
                    Connected to: {supabaseUrl}
                  </p>
                </div>

                {/* Safe Environment Diagnostics (Never reveals secrets) */}
                <div className="rounded-xl border border-white/10 bg-black/30 overflow-hidden text-left">
                  <button
                    type="button"
                    onClick={() => setShowDiagnostics(!showDiagnostics)}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Info className="w-3.5 h-3.5 text-purple-400" />
                      <span>Configuration Diagnostics</span>
                    </span>
                    {showDiagnostics ? (
                      <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>

                  {showDiagnostics && (
                    <div className="p-3.5 pt-1 space-y-2 text-[11px] font-mono border-t border-white/5 text-gray-300">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Project Host:</span>
                        <span className="text-purple-300">{supabaseEnvDiagnostics.urlHost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">URL Source:</span>
                        <span className="text-gray-300">{supabaseEnvDiagnostics.urlSource}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">API Key Status:</span>
                        <span
                          className={
                            supabaseEnvDiagnostics.isConfigured
                              ? 'text-emerald-400 font-semibold'
                              : 'text-amber-400 font-semibold'
                          }
                        >
                          {supabaseEnvDiagnostics.isConfigured ? 'Configured' : 'Missing'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Key Type:</span>
                        <span className="text-gray-300">{supabaseEnvDiagnostics.keyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Key Variable:</span>
                        <span className="text-purple-300">{supabaseEnvDiagnostics.keySource}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Key Length:</span>
                        <span className="text-gray-300">{supabaseEnvDiagnostics.keyLength} chars</span>
                      </div>
                      {supabaseEnvDiagnostics.quotesStripped && (
                        <div className="text-[10px] text-emerald-400/90 font-sans pt-1 border-t border-white/5">
                          ✓ Accidental quotes around your key were detected and automatically stripped.
                        </div>
                      )}
                      <div className="text-[10px] text-gray-500 font-sans pt-1 border-t border-white/5">
                        Note: Actual API keys and passwords are never displayed or logged for security.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Authenticated Inbox View */
            <div className="p-4 sm:p-6 space-y-6">
              {/* Stats KPI Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#0B0F1C]/90 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Total Messages</p>
                    <p className="text-2xl font-bold text-white mt-1">{messages.length}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Inbox className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0F1C]/90 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Unread</p>
                    <p className="text-2xl font-bold text-amber-400 mt-1">{unreadCount}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Mail className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0F1C]/90 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Read / Resolved</p>
                    <p className="text-2xl font-bold text-emerald-400 mt-1">
                      {messages.length - unreadCount}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Controls: Search, Tabs & Refresh */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by sender, email, subject, or text..."
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0B0F1C] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Tabs & Refresh */}
                <div className="flex items-center gap-2">
                  <div className="flex rounded-lg bg-white/5 p-1 border border-white/10 text-xs">
                    {(['all', 'unread', 'read'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded-md capitalize font-medium transition-colors cursor-pointer ${
                          activeTab === tab
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {tab}
                        {tab === 'unread' && unreadCount > 0 && (
                          <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-black font-bold">
                            {unreadCount}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={loadMessages}
                    disabled={loadingMessages}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="Refresh messages"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${loadingMessages ? 'animate-spin text-purple-400' : ''}`}
                    />
                  </button>
                </div>
              </div>

              {/* Messages List Area */}
              {messagesError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">Unable to fetch messages</p>
                    <p>{messagesError}</p>
                    <p className="text-[11px] text-gray-400">
                      Ensure your Supabase project has the RLS SELECT policy enabled for{' '}
                      <code className="text-purple-300">authenticated</code> users (see{' '}
                      <code className="text-purple-300">supabase/schema.sql</code>).
                    </p>
                  </div>
                </div>
              )}

              {loadingMessages ? (
                <div className="py-16 text-center text-gray-400 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400" />
                  <p className="text-xs font-mono">Loading submissions from database...</p>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="py-16 px-4 text-center rounded-2xl bg-[#0B0F1C]/40 border border-dashed border-white/10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-400">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">No messages found</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    {searchQuery
                      ? 'No messages matched your search query.'
                      : activeTab === 'unread'
                      ? 'You have caught up with all unread messages!'
                      : 'No messages have been submitted through the contact form yet.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMessages.map((msg) => {
                    const formattedDate = new Date(msg.created_at).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    const isSelected = selectedMessageId === msg.id;

                    return (
                      <div
                        key={msg.id}
                        className={`rounded-xl border transition-all ${
                          msg.is_read
                            ? 'bg-[#0B0F1C]/60 border-white/5 hover:border-white/10'
                            : 'bg-[#0E1528] border-purple-500/40 shadow-sm shadow-purple-900/10'
                        } p-4 sm:p-5 space-y-3`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            {!msg.is_read && (
                              <span
                                className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse shrink-0"
                                title="Unread"
                              />
                            )}
                            <h4 className="text-sm font-bold text-white tracking-wide">
                              {msg.name}
                            </h4>
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                                msg.subject || 'Your message via Portfolio'
                              )}`}
                              className="text-xs text-purple-300 hover:text-purple-200 font-mono inline-flex items-center gap-1 hover:underline"
                            >
                              <span>{msg.email}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="w-3.5 h-3.5 text-gray-500" />
                            <span className="font-mono text-[11px]">{formattedDate}</span>
                          </div>
                        </div>

                        {/* Subject */}
                        {msg.subject && (
                          <div className="text-xs font-semibold text-gray-200">
                            <span className="text-gray-400 font-normal">Subject: </span>
                            {msg.subject}
                          </div>
                        )}

                        {/* Message body */}
                        <div
                          className={`text-xs text-gray-300 leading-relaxed p-3 rounded-lg bg-black/40 border border-white/5 font-sans whitespace-pre-wrap ${
                            !isSelected && msg.message.length > 280 ? 'line-clamp-3' : ''
                          }`}
                        >
                          {msg.message}
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center justify-between pt-1 border-t border-white/5 text-xs">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleRead(msg)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                                msg.is_read
                                  ? 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                                  : 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30'
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{msg.is_read ? 'Mark as Unread' : 'Mark as Read'}</span>
                            </button>

                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                                msg.subject || 'Your message via Portfolio'
                              )}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 text-gray-300 hover:text-white border border-white/10 transition-colors"
                            >
                              <Send className="w-3 h-3 text-purple-400" />
                              <span>Reply via Email</span>
                            </a>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDelete(msg.id)}
                            disabled={deletingId === msg.id}
                            className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                            title="Delete message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
