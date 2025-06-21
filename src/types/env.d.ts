declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';

      // API Configuration
      API_BASE_URL: string;
      API_TIMEOUT: string;

      // App Configuration
      APP_NAME: string;
      APP_VERSION: string;

      // Debug Settings
      DEBUG_MODE: string;
      LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
    }
  }
}

export {};
