import { createClient, type User } from '@supabase/supabase-js';

/**
 * Sanitizes environment variable values by trimming whitespace and
 * stripping any accidental surrounding double quotes or single quotes.
 */
function sanitizeEnvValue(val?: unknown): string {
  if (!val || typeof val !== 'string') return '';
  return val.trim().replace(/^["']|["']$/g, '').trim();
}

// Check for variable across standard conventions (Vite, Next.js, and Supabase CLI)
const rawUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL;

const rawKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY;

// Sanitize URL and Key
const cleanUrl = sanitizeEnvValue(rawUrl);
const cleanKey = sanitizeEnvValue(rawKey);

export const supabaseUrl = (
  cleanUrl && cleanUrl.length > 0
    ? cleanUrl
    : 'https://lqdyosgevaoghvjzclyl.supabase.co'
).replace(/\/+$/, '');

export const supabaseAnonKey = cleanKey;

// Check if key is validly configured
export const isSupabaseConfigured = Boolean(
  supabaseAnonKey &&
  supabaseAnonKey !== 'your_supabase_anon_public_key_here' &&
  supabaseAnonKey !== 'placeholder-anon-key' &&
  supabaseAnonKey.length > 15
);

// Determine which environment variable source provided the values (for safe diagnostics)
export const supabaseEnvDiagnostics = {
  isConfigured: isSupabaseConfigured,
  urlHost: (() => {
    try {
      return new URL(supabaseUrl).host;
    } catch {
      return 'invalid-url';
    }
  })(),
  urlSource: import.meta.env.VITE_SUPABASE_URL
    ? 'VITE_SUPABASE_URL'
    : import.meta.env.NEXT_PUBLIC_SUPABASE_URL
    ? 'NEXT_PUBLIC_SUPABASE_URL'
    : import.meta.env.SUPABASE_URL
    ? 'SUPABASE_URL'
    : 'default_fallback',
  keySource: import.meta.env.VITE_SUPABASE_ANON_KEY
    ? 'VITE_SUPABASE_ANON_KEY'
    : import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
    : import.meta.env.SUPABASE_ANON_KEY
    ? 'SUPABASE_ANON_KEY'
    : 'none',
  keyType: !isSupabaseConfigured
    ? ('missing' as const)
    : supabaseAnonKey.startsWith('sb_publishable_') || supabaseAnonKey.startsWith('sbp_')
    ? ('publishable' as const)
    : supabaseAnonKey.startsWith('eyJ')
    ? ('jwt_anon' as const)
    : ('custom' as const),
  keyLength: supabaseAnonKey ? supabaseAnonKey.length : 0,
  quotesStripped: Boolean(
    typeof rawKey === 'string' && (/^["']/.test(rawKey.trim()) || /["']$/.test(rawKey.trim()))
  ),
};

// Initialize Supabase client
export const supabase = createClient(
  supabaseUrl,
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key'
);

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
}

/**
 * Friendly error message formatter for Supabase responses
 */
export function formatSupabaseError(errorMsg?: string): string {
  if (!errorMsg) return 'An unexpected error occurred.';

  const lower = errorMsg.toLowerCase();
  if (lower.includes('invalid api key') || lower.includes('unauthorized_invalid_api_key')) {
    return 'Invalid Supabase API key. Please check your VITE_SUPABASE_ANON_KEY environment variable in Vercel Project Settings (ensure there are no quotes or spaces) and trigger a redeploy.';
  }
  if (lower.includes('invalid login credentials')) {
    return 'Invalid email or password. Please verify your credentials or create an admin user in Supabase Authentication.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Email address is not confirmed. In Supabase Dashboard > Authentication > Users, check "Auto Confirm User" or confirm your email.';
  }
  if (lower.includes('relation "public.contact_messages" does not exist') || lower.includes('table not found')) {
    return 'Database table "contact_messages" does not exist. Please run the script in supabase/schema.sql in your Supabase SQL Editor.';
  }
  if (lower.includes('permission denied') || lower.includes('violates row-level security policy')) {
    return 'Access blocked by database security (RLS). Please verify policies in supabase/schema.sql have been applied.';
  }
  return errorMsg;
}

/**
 * Public: Submit a message from the portfolio contact form
 */
export async function submitContactMessage(messageData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    console.warn(
      '[Supabase Warning] API key is not configured in environment variables. Submission:',
      messageData
    );
    return {
      success: false,
      error:
        'Database connection is not configured yet. Please configure VITE_SUPABASE_ANON_KEY on Vercel or email directly.',
    };
  }

  try {
    const { error } = await supabase.from('contact_messages').insert([
      {
        name: messageData.name.trim(),
        email: messageData.email.trim(),
        subject: messageData.subject?.trim() || null,
        message: messageData.message.trim(),
      },
    ]);

    if (error) {
      console.error('Error inserting message into Supabase:', error);
      return { success: false, error: formatSupabaseError(error.message) };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Unexpected error inserting message:', err);
    return { success: false, error: formatSupabaseError(errorMessage) };
  }
}

/**
 * Admin: Fetch all contact messages
 */
export async function fetchContactMessages(): Promise<{
  data: ContactMessageRecord[];
  error?: string;
}> {
  if (!isSupabaseConfigured) {
    return {
      data: [],
      error:
        'Supabase is not configured. Please add VITE_SUPABASE_ANON_KEY to your Vercel Project Settings and redeploy.',
    };
  }

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      return { data: [], error: formatSupabaseError(error.message) };
    }

    return { data: (data as ContactMessageRecord[]) || [] };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
    return { data: [], error: formatSupabaseError(errorMessage) };
  }
}

/**
 * Admin: Toggle read status of a message
 */
export async function updateMessageReadStatus(
  id: string,
  isRead: boolean
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase is not configured.' };
  }

  try {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: isRead })
      .eq('id', id);

    if (error) {
      return { success: false, error: formatSupabaseError(error.message) };
    }
    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to update message';
    return { success: false, error: formatSupabaseError(errorMessage) };
  }
}

/**
 * Admin: Delete a contact message
 */
export async function deleteContactMessage(
  id: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase is not configured.' };
  }

  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: formatSupabaseError(error.message) };
    }
    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to delete message';
    return { success: false, error: formatSupabaseError(errorMessage) };
  }
}

/**
 * Admin Auth: Sign in with email and password
 */
export async function signInAdmin(
  email: string,
  pass: string
): Promise<{ user: User | null; error?: string }> {
  if (!isSupabaseConfigured) {
    return {
      user: null,
      error:
        'Supabase API key is missing. Please configure VITE_SUPABASE_ANON_KEY in your environment variables (in Vercel: Project Settings → Environment Variables) and redeploy.',
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: pass,
    });

    if (error) {
      return { user: null, error: formatSupabaseError(error.message) };
    }
    return { user: data.user };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Authentication failed';
    return { user: null, error: formatSupabaseError(msg) };
  }
}

/**
 * Admin Auth: Sign out
 */
export async function signOutAdmin(): Promise<{ error?: string }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { error: formatSupabaseError(error.message) };
    return {};
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Sign out failed';
    return { error: formatSupabaseError(msg) };
  }
}

/**
 * Admin Auth: Get currently logged-in user
 */
export async function getAdminUser(): Promise<User | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch {
    return null;
  }
}
