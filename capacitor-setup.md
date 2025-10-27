# Configuration Capacitor pour FadulTask

## Installation
```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios
npx cap init FadulTask com.fadultask.app
```

## Configuration
```bash
# Build l'app web
npm run build

# Ajouter les plateformes
npx cap add android
npx cap add ios

# Copier les fichiers web
npx cap copy

# Ouvrir dans Android Studio
npx cap open android
```

## Prérequis Android
- Android Studio installé
- SDK Android configuré
- Device USB ou émulateur

## Build APK
1. Ouvrir Android Studio
2. Build > Generate Signed Bundle/APK
3. Choisir APK
4. Signer avec une clé
5. Installer l'APK sur le téléphone