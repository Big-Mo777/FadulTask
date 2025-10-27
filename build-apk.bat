@echo off
echo Building FadulTask APK...

echo Step 1: Building web app...
call npm run build

echo Step 2: Copying to Android...
call npx cap copy android

echo Step 3: Opening Android Studio...
echo IMPORTANT: Dans Android Studio:
echo 1. Build > Generate Signed Bundle/APK
echo 2. Choisir APK
echo 3. Create new keystore (premiere fois)
echo 4. Build APK
echo 5. Copier l'APK vers public/FadulTask.apk

call npx cap open android

pause