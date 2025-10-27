import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, Task } from '../lib/supabase';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskComplete: (id: string) => Promise<void>;
  reorderTasks: (tasks: Task[]) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    initUser();
    loadTasks();
  }, []);

  const initUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUserId(session?.user?.id || null);
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        const localTasks = localStorage.getItem('fadultask-tasks');
        if (localTasks) {
          const parsedTasks = JSON.parse(localTasks);
          // Migrate old emoji data to icon IDs
          const migratedTasks = parsedTasks.map((task: Task) => ({
            ...task,
            emoji: task.emoji && !task.emoji.includes('-') ? 'file-text' : task.emoji || 'file-text'
          }));
          setTasks(migratedTasks);
        }
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('position', { ascending: true });

      if (error) throw error;
      
      // Migrate old emoji data to icon IDs
      const migratedTasks = (data || []).map((task: Task) => ({
        ...task,
        emoji: task.emoji && !task.emoji.includes('-') ? 'file-text' : task.emoji || 'file-text'
      }));
      
      setTasks(migratedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveLocalTasks = (updatedTasks: Task[]) => {
    if (!userId) {
      localStorage.setItem('fadultask-tasks', JSON.stringify(updatedTasks));
    }
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      // Ensure emoji field contains icon ID, not emoji
      const processedTaskData = {
        ...taskData,
        emoji: taskData.emoji || 'file-text'
      };

      if (!session) {
        const newTask: Task = {
          ...processedTaskData,
          id: crypto.randomUUID(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: null,
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveLocalTasks(updatedTasks);
        return;
      }

      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...processedTaskData, user_id: session.user.id }])
        .select()
        .single();

      if (error) throw error;
      setTasks([...tasks, data]);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        const updatedTasks = tasks.map(task =>
          task.id === id ? { ...task, ...updates, updated_at: new Date().toISOString() } : task
        );
        setTasks(updatedTasks);
        saveLocalTasks(updatedTasks);
        return;
      }

      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        saveLocalTasks(updatedTasks);
        return;
      }

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  const toggleTaskComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    await updateTask(id, { completed: !task.completed });
  };

  const reorderTasks = async (reorderedTasks: Task[]) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const tasksWithPosition = reorderedTasks.map((task, index) => ({
        ...task,
        position: index,
      }));

      setTasks(tasksWithPosition);

      if (!session) {
        saveLocalTasks(tasksWithPosition);
        return;
      }

      for (const task of tasksWithPosition) {
        await supabase
          .from('tasks')
          .update({ position: task.position })
          .eq('id', task.id);
      }
    } catch (error) {
      console.error('Error reordering tasks:', error);
    }
  };

  const refreshTasks = async () => {
    await loadTasks();
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        reorderTasks,
        refreshTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
}
