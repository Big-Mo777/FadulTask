import React, { useMemo } from 'react';
import { CheckCircle2, Circle, Clock, TrendingUp, Sparkles, Download, Smartphone } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';

const motivationalQuotes = [
  "Chaque petite victoire compte. Continue !",
  "La régularité bat le talent quand le talent ne travaille pas.",
  "Un pas à la fois, tu y arriveras.",
  "Aujourd'hui est une nouvelle opportunité.",
  "Le succès, c'est la somme de petits efforts répétés.",
  "Ta seule limite, c'est toi. Dépasse-toi !",
  "Commence là où tu es. Utilise ce que tu as.",
  "Les grands accomplissements commencent par de petites actions.",
  "Crois en toi et tout devient possible.",
  "Fais-le maintenant. Parfois 'plus tard' devient 'jamais'."
];

export default function Dashboard() {
  const { tasks } = useTasks();

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTasks = tasks.filter(task => {
      if (!task.due_date) return false;
      const dueDate = new Date(task.due_date);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    });

    const overdueTasks = tasks.filter(task => {
      if (!task.due_date || task.completed) return false;
      const dueDate = new Date(task.due_date);
      return dueDate < today;
    });

    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending: total - completed,
      today: todayTasks.length,
      overdue: overdueTasks.length,
      progress,
    };
  }, [tasks]);

  const todayQuote = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return motivationalQuotes[dayOfYear % motivationalQuotes.length];
  }, []);

  const handleDownloadAPK = () => {
    // Lien vers l'APK hébergé
    const apkUrl = '/FadulTask.apk'; // Vous devrez héberger l'APK
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = 'FadulTask.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium opacity-90">Citation du jour</span>
        </div>
        <p className="text-lg font-medium leading-relaxed">{todayQuote}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.completed}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Terminées</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Circle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.pending}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">En cours</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.today}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Aujourd'hui</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.overdue}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">En retard</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Progression globale</h3>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
          {stats.completed} sur {stats.total} tâches accomplies
        </p>
      </div>

      {/* Bouton téléchargement APK */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Version Mobile</h3>
              <p className="text-sm opacity-90">Télécharge l'app hors-ligne</p>
            </div>
          </div>
          <button
            onClick={handleDownloadAPK}
            className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            <Download className="w-5 h-5" />
            Télécharger APK
          </button>
        </div>
        <div className="mt-4 text-sm opacity-75">
          <p>• Fonctionne sans internet</p>
          <p>• Installation directe sur Android</p>
          <p>• Toutes les fonctionnalités incluses</p>
        </div>
      </div>
    </div>
  );
}
