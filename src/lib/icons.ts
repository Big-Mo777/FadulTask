import {
  FileText,
  Briefcase,
  Home,
  Target,
  Dumbbell,
  BookOpen,
  ShoppingCart,
  Plane,
  Palette,
  Lightbulb,
  Music,
  Activity,
  Heart,
  Coffee,
  Car,
  Smartphone,
  Calendar,
  Clock,
  Star,
  Zap
} from 'lucide-react';

export const iconOptions = [
  { id: 'file-text', icon: FileText, name: 'Document', color: '#3B82F6' },
  { id: 'briefcase', icon: Briefcase, name: 'Travail', color: '#6366F1' },
  { id: 'home', icon: Home, name: 'Maison', color: '#10B981' },
  { id: 'target', icon: Target, name: 'Objectif', color: '#EF4444' },
  { id: 'dumbbell', icon: Dumbbell, name: 'Sport', color: '#F59E0B' },
  { id: 'book-open', icon: BookOpen, name: 'Étude', color: '#8B5CF6' },
  { id: 'shopping-cart', icon: ShoppingCart, name: 'Courses', color: '#EC4899' },
  { id: 'plane', icon: Plane, name: 'Voyage', color: '#06B6D4' },
  { id: 'palette', icon: Palette, name: 'Créatif', color: '#F97316' },
  { id: 'lightbulb', icon: Lightbulb, name: 'Idée', color: '#FBBF24' },
  { id: 'music', icon: Music, name: 'Musique', color: '#A855F7' },
  { id: 'activity', icon: Activity, name: 'Activité', color: '#22C55E' },
  { id: 'heart', icon: Heart, name: 'Santé', color: '#EF4444' },
  { id: 'coffee', icon: Coffee, name: 'Pause', color: '#92400E' },
  { id: 'car', icon: Car, name: 'Transport', color: '#374151' },
  { id: 'smartphone', icon: Smartphone, name: 'Tech', color: '#1F2937' },
  { id: 'calendar', icon: Calendar, name: 'Événement', color: '#7C3AED' },
  { id: 'clock', icon: Clock, name: 'Urgent', color: '#DC2626' },
  { id: 'star', icon: Star, name: 'Important', color: '#FBBF24' },
  { id: 'zap', icon: Zap, name: 'Énergie', color: '#FACC15' }
];

export const getIconById = (id: string) => {
  return iconOptions.find(option => option.id === id) || iconOptions[0];
};