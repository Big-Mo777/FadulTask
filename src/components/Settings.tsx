import React, { useState } from 'react';
import { Moon, Sun, Bell, Info, Trash2, Download, User, LogOut, LogIn, Smartphone } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTasks } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import AuthModal from './AuthModal';
import ConfirmModal from './ConfirmModal';
import Toast from './Toast';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { tasks } = useTasks();
  const { user, signOut, loading } = useAuth();
  const { isInstallable, isInstalled, installApp } = usePWAInstall();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showClearDataModal, setShowClearDataModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleInstallApp = async () => {
    const success = await installApp();
    if (success) {
      setToastMessage('Application installée avec succès ! 🎉');
      setShowToast(true);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleExportData = () => {
    const data = {
      tasks,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fadultask-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('Notifications activées !', {
          body: 'Tu recevras des rappels pour tes tâches importantes.',
          icon: '/icon-192x192.png',
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Apparence</h3>
        </div>

        <button
          onClick={toggleTheme}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-600" />
            )}
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Thème</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {theme === 'dark' ? 'Mode sombre' : 'Mode clair'}
              </p>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors ${
            theme === 'dark' ? 'bg-purple-600' : 'bg-gray-300'
          }`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform m-0.5 ${
              theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </div>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Compte</h3>
        </div>

        {loading ? (
          <div className="p-4">
            <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
          </div>
        ) : user ? (
          <>
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Connecté</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full p-4 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div className="text-left">
                <p className="font-medium text-red-600 dark:text-red-400">Se déconnecter</p>
                <p className="text-sm text-red-600/70 dark:text-red-400/70">
                  Tes données seront sauvegardées
                </p>
              </div>
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full p-4 flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <LogIn className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div className="text-left">
              <p className="font-medium text-blue-600 dark:text-blue-400">Se connecter</p>
              <p className="text-sm text-blue-600/70 dark:text-blue-400/70">
                Synchronise tes données sur tous tes appareils
              </p>
            </div>
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Application</h3>
        </div>

        {isInstalled ? (
          <div className="p-4 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700">
            <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div className="text-left">
              <p className="font-medium text-blue-600 dark:text-blue-400">Application installée ✅</p>
              <p className="text-sm text-blue-600/70 dark:text-blue-400/70">
                FadulTask est disponible sur ton écran d'accueil
              </p>
            </div>
          </div>
        ) : isInstallable ? (
          <button
            onClick={handleInstallApp}
            className="w-full p-4 flex items-center gap-3 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors border-b border-gray-100 dark:border-gray-700"
          >
            <Smartphone className="w-5 h-5 text-green-600 dark:text-green-400" />
            <div className="text-left">
              <p className="font-medium text-green-600 dark:text-green-400">Installer l'application</p>
              <p className="text-sm text-green-600/70 dark:text-green-400/70">
                Utilise FadulTask hors-ligne sur ton téléphone
              </p>
            </div>
          </button>
        ) : (
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-3 mb-4">
              <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-2">Installer FadulTask</p>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">📱 Sur iPhone/iPad :</p>
                    <p>1. Appuie sur le bouton Partager (carré avec flèche)</p>
                    <p>2. Sélectionne "Sur l'écran d'accueil"</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">🤖 Sur Android :</p>
                    <p>1. Appuie sur les 3 points (menu)</p>
                    <p>2. Sélectionne "Installer l'application"</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">💻 Sur ordinateur :</p>
                    <p>Cherche l'icône d'installation dans la barre d'adresse</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={requestNotificationPermission}
          className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="text-left">
            <p className="font-medium text-gray-900 dark:text-white">Activer les notifications</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reçois des rappels pour tes tâches
            </p>
          </div>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Données</h3>
        </div>

        <button
          onClick={handleExportData}
          className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700"
        >
          <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
          <div className="text-left">
            <p className="font-medium text-gray-900 dark:text-white">Exporter les données</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Télécharge une sauvegarde de tes tâches
            </p>
          </div>
        </button>

        <button
          onClick={() => setShowClearDataModal(true)}
          className="w-full p-4 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
          <div className="text-left">
            <p className="font-medium text-red-600 dark:text-red-400">Supprimer toutes les données</p>
            <p className="text-sm text-red-600/70 dark:text-red-400/70">
              Cette action est irréversible
            </p>
          </div>
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5" />
          <h3 className="font-semibold">À propos de FadulTask</h3>
        </div>
        <p className="text-sm opacity-90 leading-relaxed mb-3">
          Une application de gestion de tâches intelligente pour t'aider à rester organisé et productif.
        </p>
        <div className="text-sm opacity-75">
          <p>Version 1.0.0</p>
          <p className="mt-1">Créé avec React, TypeScript et Supabase</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Conseils d'utilisation</h3>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex gap-2">
            <span>💡</span>
            <span>Utilise des icônes pour rendre tes tâches plus visuelles</span>
          </li>
          <li className="flex gap-2">
            <span>🎯</span>
            <span>Priorise tes tâches selon leur importance</span>
          </li>
          <li className="flex gap-2">
            <span>⏱️</span>
            <span>Utilise le mode Pomodoro pour rester concentré</span>
          </li>
          <li className="flex gap-2">
            <span>📊</span>
            <span>Consulte tes statistiques pour suivre ta progression</span>
          </li>
        </ul>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      
      <ConfirmModal
        isOpen={showClearDataModal}
        onClose={() => setShowClearDataModal(false)}
        onConfirm={handleClearData}
        title="Supprimer toutes les données"
        message="Es-tu sûr de vouloir supprimer toutes les données ? Cette action supprimera définitivement toutes tes tâches, paramètres et données locales. Cette action est irréversible."
        confirmText="Tout supprimer"
        cancelText="Annuler"
        type="danger"
      />
      
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </div>
  );
}
