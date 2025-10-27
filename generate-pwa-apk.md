# Générer APK PWA automatiquement

## Méthode 1: PWABuilder (Microsoft)
1. Aller sur https://www.pwabuilder.com/
2. Entrer votre URL: https://fastidious-fairy-f52ff9.netlify.app
3. Cliquer "Start" → "Package For Stores"
4. Choisir "Android" → "Generate"
5. Télécharger l'APK généré

## Méthode 2: Bubblewrap (Google)
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://fastidious-fairy-f52ff9.netlify.app/manifest.json
bubblewrap build
```

## Méthode 3: APK en ligne
- https://appmaker.xyz/pwa-to-apk
- https://pwa2apk.com
- Entrer votre URL PWA
- Télécharger l'APK