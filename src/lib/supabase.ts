import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Mock client pour mode hors-ligne
const mockClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Mode hors-ligne' } }),
    signUp: () => Promise.resolve({ data: null, error: { message: 'Mode hors-ligne' } }),
    signOut: () => Promise.resolve({ error: null }),
    signInWithOAuth: () => Promise.resolve({ data: null, error: { message: 'Mode hors-ligne' } })
  },
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null })
  })
};

// Créer le client Supabase
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'undefined' && supabaseAnonKey !== 'undefined') 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockClient;

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  emoji: string; // Now stores icon ID instead of emoji
  color: string;
  due_date: string | null;
  completed: boolean;
  position: number;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  emoji: string;
  user_id: string | null;
  created_at: string;
}

export interface PomodoroSession {
  id: string;
  task_id: string | null;
  duration: number;
  completed: boolean;
  started_at: string;
  completed_at: string | null;
  user_id: string | null;
}

export interface DailyStats {
  id: string;
  date: string;
  tasks_completed: number;
  tasks_created: number;
  pomodoro_sessions: number;
  focus_time: number;
  user_id: string | null;
  created_at: string;
}
