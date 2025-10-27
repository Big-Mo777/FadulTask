import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fadultask.app',
  appName: 'FadulTask',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
