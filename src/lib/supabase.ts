import { createClient, type User } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lqdyosgevaoghvjzclyl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_public_key_here'
);

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || 'placeholder-anon-key'
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
      'Supabase anon key is not configured in .env. Message saved locally in console:',
      messageData
    );
    return { success: true };
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
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Unexpected error inserting message:', err);
    return { success: false, error: errorMessage };
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
      error: 'Supabase is not configured. Please add your credentials to .env',
    };
  }

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      return { data: [], error: error.message };
    }

    return { data: (data as ContactMessageRecord[]) || [] };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
    return { data: [], error: errorMessage };
  }
}

/**
 * Admin: Toggle read status of a message
 */
export async function updateMessageReadStatus(
  id: string,
  isRead: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: isRead })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to update message';
    return { success: false, error: errorMessage };
  }
}

/**
 * Admin: Delete a contact message
 */
export async function deleteContactMessage(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to delete message';
    return { success: false, error: errorMessage };
  }
}

/**
 * Admin Auth Helpers
 */
export async function signInAdmin(
  email: string,
  pass: string
): Promise<{ user: User | null; error?: string }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: pass,
    });

    if (error) {
      return { user: null, error: error.message };
    }
    return { user: data.user };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Authentication failed';
    return { user: null, error: msg };
  }
}

export async function signOutAdmin(): Promise<{ error?: string }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { error: error.message };
    return {};
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Sign out failed';
    return { error: msg };
  }
}

export async function getAdminUser(): Promise<User | null> {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch {
    return null;
  }
}
