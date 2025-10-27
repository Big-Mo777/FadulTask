import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react';

type TimerMode = 'focus' | 'break';

export default function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    playNotificationSound();

    if (mode === 'focus') {
      setMode('break');
      setTimeLeft(breakDuration * 60);
      showNotification('Temps de pause!', 'Prends une pause bien méritée 😊');
    } else {
      setMode('focus');
      setTimeLeft(focusDuration * 60);
      showNotification('Pause terminée!', 'Prêt pour une nouvelle session de focus 💪');
    }
  };

  const playNotificationSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKnn77RgGwU7k9n0yXQpBS5+zPLaizsIHGu+8OSaTQwMUKfj8LdjHQY8lNn0yHMnBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGgU6kdj0ynMoBSx8y/DajDwIHm3A8eSYTAwLT6bi7rFeGg==');
      audio.play().catch(() => {});
    } catch (error) {
      console.log('Could not play notification sound');
    }
  };

  const showNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/icon-192x192.png' });
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? focusDuration * 60 : breakDuration * 60);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'focus' ? focusDuration * 60 : breakDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus'
    ? ((focusDuration * 60 - timeLeft) / (focusDuration * 60)) * 100
    : ((breakDuration * 60 - timeLeft) / (breakDuration * 60)) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => switchMode('focus')}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              mode === 'focus'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Focus
            </div>
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              mode === 'break'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4" />
              Pause
            </div>
          </button>
        </div>

        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="white"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-bold mb-2">{formatTime(timeLeft)}</div>
            <div className="text-sm opacity-90">
              {mode === 'focus' ? 'Mode Focus' : 'Temps de Pause'}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className="p-4 bg-white text-purple-600 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isRunning ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </button>
          <button
            onClick={resetTimer}
            className="p-4 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all"
          >
            <RotateCcw className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Paramètres</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Durée Focus (minutes)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={focusDuration}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setFocusDuration(value);
                if (mode === 'focus' && !isRunning) {
                  setTimeLeft(value * 60);
                }
              }}
              className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
              {focusDuration}m
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Durée Pause (minutes)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={breakDuration}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setBreakDuration(value);
                if (mode === 'break' && !isRunning) {
                  setTimeLeft(value * 60);
                }
              }}
              className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
              {breakDuration}m
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
          🎯 Technique Pomodoro
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
          Travaille avec concentration pendant {focusDuration} minutes, puis accorde-toi {breakDuration} minutes de pause.
          Cette méthode améliore ta productivité et réduit la fatigue mentale.
        </p>
      </div>
    </div>
  );
}
