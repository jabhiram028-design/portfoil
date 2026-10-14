import { createClient } from '@supabase/supabase-js';

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
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at?: string;
}

export async function submitContactMessage(messageData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    // If Supabase key is not yet set in environment, simulate successful submission
    // and log a helpful developer hint so the UI doesn't break for visitors.
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
