import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
