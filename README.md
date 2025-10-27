# FadulTask

## 📋 Description

FadulTask est une application web moderne de gestion de tâches avec timer Pomodoro intégré. Elle combine productivité et simplicité pour t'aider à rester organisé et concentré.

## ✨ Fonctionnalités

### 🎯 Gestion des tâches
- ✅ Création, modification et suppression de tâches
- 🎨 Icônes personnalisables (20+ icônes disponibles)
- 🏷️ Système de priorités (Basse, Moyenne, Haute)
- 📂 Catégories personnalisées
- 📅 Dates d'échéance
- 🔄 Réorganisation par glisser-déposer
- 🔍 Recherche et filtres avancés

### ⏱️ Timer Pomodoro
- 🎯 Sessions de focus personnalisables (5-60 min)
- ☕ Pauses configurables (1-15 min)
- 🔔 Notifications navigateur
- 📊 Interface circulaire animée
- 🎵 Sons de notification

### 📊 Tableau de bord
- 📈 Statistiques en temps réel
- 💬 Citations motivationnelles quotidiennes
- 📋 Vue d'ensemble des tâches
- 🎯 Suivi de progression

### 🔐 Authentification
- 📧 Connexion par email/mot de passe
- 🌐 Connexion Google OAuth
- 🔄 Synchronisation multi-appareils
- 💾 Mode hors-ligne avec localStorage

### 🎨 Interface utilisateur
- 🌙 Mode sombre/clair automatique
- 📱 Design responsive (mobile-first)
- ✨ Animations fluides
- 🇫🇷 Interface en français
- 📲 PWA (installable sur mobile)

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Framework JavaScript
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne
- **Tailwind CSS** - Framework CSS utilitaire
- **Lucide React** - Bibliothèque d'icônes

### Backend
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Base de données
- **Row Level Security** - Sécurité des données

### Outils de développement
- **ESLint** - Linting JavaScript/TypeScript
- **PostCSS** - Traitement CSS
- **Service Worker** - Fonctionnalités PWA

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Supabase (optionnel pour le développement local)

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd FadulTask
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
# Copier le fichier d'environnement
cp .env.example .env

# Éditer le fichier .env avec tes clés Supabase
VITE_SUPABASE_URL=ton_url_supabase
VITE_SUPABASE_ANON_KEY=ta_clé_anonyme_supabase
```

4. **Démarrer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir l'application**
Visite `http://localhost:5173` dans ton navigateur

## 📦 Scripts disponibles

```bash
# Développement
npm run dev          # Démarre le serveur de développement

# Build
npm run build        # Compile l'application pour la production
npm run preview      # Prévisualise le build de production

# Qualité du code
npm run lint         # Vérifie le code avec ESLint
npm run typecheck    # Vérifie les types TypeScript
```

## 🗄️ Structure de la base de données

### Tables principales

#### `tasks`
- Gestion des tâches utilisateur
- Champs : titre, description, priorité, catégorie, icône, couleur, date d'échéance

#### `categories`
- Catégories personnalisées
- Champs : nom, couleur, icône

#### `pomodoro_sessions`
- Sessions de timer Pomodoro
- Champs : durée, tâche associée, timestamps

#### `daily_stats`
- Statistiques quotidiennes
- Champs : tâches créées/terminées, sessions Pomodoro, temps de focus

## 🔧 Configuration Supabase

### 1. Créer un projet Supabase
1. Va sur [supabase.com](https://supabase.com)
2. Crée un nouveau projet
3. Note l'URL et la clé anonyme

### 2. Exécuter les migrations
```sql
-- Exécute le contenu de supabase/migrations/20251025093447_create_fadultask_schema.sql
-- dans l'éditeur SQL de Supabase
```

### 3. Configurer l'authentification (optionnel)
- Activer l'authentification par email
- Configurer Google OAuth si souhaité

## 🌟 Fonctionnalités avancées

### Mode hors-ligne
- L'application fonctionne sans connexion internet
- Les données sont stockées localement
- Synchronisation automatique lors de la reconnexion

### PWA (Progressive Web App)
- Installable sur mobile et desktop
- Fonctionne hors-ligne
- Notifications push (si activées)

### Sécurité
- Row Level Security (RLS) activé
- Données isolées par utilisateur
- Authentification sécurisée via Supabase

## 🎨 Personnalisation

### Ajouter de nouvelles icônes
1. Édite `src/lib/icons.ts`
2. Ajoute tes icônes Lucide React
3. Configure couleur et nom

### Modifier le thème
1. Édite `tailwind.config.js`
2. Personnalise les couleurs dans `src/index.css`

## 📱 Utilisation

### Navigation
- **Accueil** : Tableau de bord et statistiques
- **Tâches** : Gestion complète des tâches
- **Focus** : Timer Pomodoro
- **Stats** : Statistiques détaillées
- **Plus** : Paramètres et authentification

### Conseils d'utilisation
- 🎨 Utilise des icônes pour rendre tes tâches plus visuelles
- 🎯 Priorise tes tâches selon leur importance
- ⏱️ Utilise le mode Pomodoro pour rester concentré
- 📊 Consulte tes statistiques pour suivre ta progression

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Soumettre des pull requests

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [React](https://reactjs.org/) pour le framework
- [Supabase](https://supabase.com/) pour le backend
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [Lucide](https://lucide.dev/) pour les icônes
- [Vite](https://vitejs.dev/) pour l'outillage de développement

---

**Développé avec ❤️ pour améliorer ta productivité !**
