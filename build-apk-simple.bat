@echo off
echo Construction de l'APK FadulTask...

echo Etape 1: Build de l'application...
call npm run build

echo Etape 2: Synchronisation Capacitor...
call npx cap sync android

echo Etape 3: Construction APK...
cd android
call gradlew.bat assembleDebug

echo Etape 4: Copie de l'APK...
copy "app\build\outputs\apk\debug\app-debug.apk" "..\public\FadulTask.apk"

echo APK créé dans public\FadulTask.apk
pause