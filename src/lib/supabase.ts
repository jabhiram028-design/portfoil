import { createClient, type User } from '@supabase/supabase-js';

// Read Vite environment variables
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback to default project URL if not provided
export const supabaseUrl = (
  rawSupabaseUrl && typeof rawSupabaseUrl === 'string' && rawSupabaseUrl.trim() !== ''
    ? rawSupabaseUrl.trim()
    : 'https://lqdyosgevaoghvjzclyl.supabase.co'
).replace(/\/+$/, ''); // Remove trailing slashes if any

export const supabaseAnonKey = (
  rawSupabaseAnonKey && typeof rawSupabaseAnonKey === 'string'
    ? rawSupabaseAnonKey.trim()
    : ''
);

// Determine if a real API key is configured
export const isSupabaseConfigured = Boolean(
  supabaseAnonKey &&
  supabaseAnonKey !== 'your_supabase_anon_public_key_here' &&
  supabaseAnonKey !== 'placeholder-anon-key' &&
  supabaseAnonKey.length > 10
);

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
    return 'Invalid Supabase API key. Please check your VITE_SUPABASE_ANON_KEY environment variable in Vercel Project Settings and trigger a redeploy.';
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
      '[Supabase Warning] VITE_SUPABASE_ANON_KEY is not configured. Submission saved in local console only:',
      messageData
    );
    // Return friendly error so visitors and admins know why message didn't save to the live database
    return {
      success: false,
      error:
        'The contact form is currently in offline mode because VITE_SUPABASE_ANON_KEY is not configured in environment variables.',
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
        'Supabase is not configured. Please add VITE_SUPABASE_ANON_KEY to your environment variables (e.g. in Vercel Project Settings) and redeploy.',
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
