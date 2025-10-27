# Créer un APK Android

## Installation Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init FadulTask com.fadultask.app
```

## Configuration
```bash
# Build l'app
npm run build

# Ajouter Android
npx cap add android

# Copier les fichiers
npx cap copy android

# Ouvrir Android Studio
npx cap open android
```

## Dans Android Studio
1. Build → Generate Signed Bundle/APK
2. Choisir APK
3. Create new keystore
4. Build APK
5. Installer l'APK sur le téléphone

## Prérequis
- Android Studio installé
- SDK Android configuré