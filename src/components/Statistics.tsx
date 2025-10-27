import React, { useMemo } from 'react';
import { TrendingUp, Award, Target, Zap, Calendar } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';

export default function Statistics() {
  const { tasks } = useTasks();

  const stats = useMemo(() => {
    const now = new Date();
    const thisWeekStart = new Date(now);
    thisWeekStart.setDate(now.getDate() - now.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);

    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const thisWeekTasks = tasks.filter(task => {
      const createdDate = new Date(task.created_at);
      return createdDate >= thisWeekStart;
    });

    const thisMonthTasks = tasks.filter(task => {
      const createdDate = new Date(task.created_at);
      return createdDate >= thisMonthStart;
    });

    const completedThisWeek = thisWeekTasks.filter(t => t.completed).length;
    const completedThisMonth = thisMonthTasks.filter(t => t.completed).length;

    const weekCompletionRate = thisWeekTasks.length > 0
      ? Math.round((completedThisWeek / thisWeekTasks.length) * 100)
      : 0;

    const monthCompletionRate = thisMonthTasks.length > 0
      ? Math.round((completedThisMonth / thisMonthTasks.length) * 100)
      : 0;

    const priorityStats = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length,
    };

    const categoryStats = tasks.reduce((acc, task) => {
      if (!task.category) return acc;
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategories = Object.entries(categoryStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      date.setHours(0, 0, 0, 0);
      return date;
    });

    const dailyCompletions = last7Days.map(date => {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      const completed = tasks.filter(task => {
        if (!task.completed) return false;
        const updatedDate = new Date(task.updated_at);
        return updatedDate >= date && updatedDate < nextDay;
      }).length;

      return {
        date: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
        completed,
      };
    });

    const maxCompletions = Math.max(...dailyCompletions.map(d => d.completed), 1);

    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      thisWeek: thisWeekTasks.length,
      thisMonth: thisMonthTasks.length,
      completedThisWeek,
      completedThisMonth,
      weekCompletionRate,
      monthCompletionRate,
      priorityStats,
      topCategories,
      dailyCompletions,
      maxCompletions,
    };
  }, [tasks]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-sm opacity-90">Cette semaine</span>
          </div>
          <p className="text-3xl font-bold mb-1">{stats.weekCompletionRate}%</p>
          <p className="text-sm opacity-90">{stats.completedThisWeek} / {stats.thisWeek} tâches</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm opacity-90">Ce mois</span>
          </div>
          <p className="text-3xl font-bold mb-1">{stats.monthCompletionRate}%</p>
          <p className="text-sm opacity-90">{stats.completedThisMonth} / {stats.thisMonth} tâches</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">7 derniers jours</h3>
        </div>
        <div className="flex items-end justify-between gap-2 h-48">
          {stats.dailyCompletions.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="flex-1 w-full flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-purple-600"
                  style={{
                    height: `${(day.completed / stats.maxCompletions) * 100}%`,
                    minHeight: day.completed > 0 ? '8px' : '0px',
                  }}
                >
                  {day.completed > 0 && (
                    <div className="text-center text-xs font-bold text-white pt-1">
                      {day.completed}
                    </div>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {day.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Par priorité</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Haute</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {stats.priorityStats.high}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(stats.priorityStats.high / stats.total) * 100}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Moyenne</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {stats.priorityStats.medium}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(stats.priorityStats.medium / stats.total) * 100}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Basse</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {stats.priorityStats.low}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(stats.priorityStats.low / stats.total) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {stats.topCategories.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Top catégories</h3>
          </div>
          <div className="space-y-3">
            {stats.topCategories.map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {category}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${(count / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-6 h-6" />
          <h3 className="font-bold text-lg">Score de productivité</h3>
        </div>
        <div className="text-5xl font-bold mb-2">
          {Math.round((stats.completed / Math.max(stats.total, 1)) * 100)}
        </div>
        <p className="text-sm opacity-90">
          {stats.completed} tâches terminées sur {stats.total}
        </p>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm leading-relaxed opacity-90">
            {stats.completed === 0
              ? "Commence par compléter des tâches pour voir ton score s'améliorer !"
              : stats.completed < stats.total / 2
              ? "Bon début ! Continue sur cette lancée 💪"
              : stats.completed < stats.total
              ? "Excellent travail ! Tu es sur la bonne voie 🎯"
              : "Incroyable ! Toutes les tâches sont terminées ! 🎉"}
          </p>
        </div>
      </div>
    </div>
  );
}
