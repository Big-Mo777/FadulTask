# Configuration Tauri pour FadulTask

## Installation
```bash
npm install --save-dev @tauri-apps/cli
npm install @tauri-apps/api
```

## Configuration
```bash
# Initialiser Tauri
npx tauri init

# Build l'application
npx tauri build
```

## Avantages Tauri
- Exécutable natif Windows/Mac/Linux
- Taille réduite (~10MB)
- Performance native
- Accès aux APIs système

## Build
- Windows : `.exe` dans `src-tauri/target/release/`
- Android : Avec `tauri android` (expérimental)