import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!globalThis.supabaseClient) {
  globalThis.supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = globalThis.supabaseClient;
