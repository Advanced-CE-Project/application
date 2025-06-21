/**
 * 애플리케이션 설정
 */
const config = {
  // 환경 정보
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // API 설정
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  API_TIMEOUT: parseInt(process.env.API_TIMEOUT || '10000', 10),

  // 앱 설정
  APP_NAME: process.env.APP_NAME || 'BEMO',
  APP_VERSION: process.env.APP_VERSION || '1.0.0',

  // 디버그 설정
  DEBUG_MODE: process.env.DEBUG_MODE === 'true',
  LOG_LEVEL: (process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info',
} as const;

export default config;
