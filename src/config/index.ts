import Constants, { ExecutionEnvironment } from 'expo-constants';

const IS_EXPO_GO = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

/**
 * 애플리케이션 설정
 */
const config = {
  IS_EXPO_GO,
  // 환경 정보
  NODE_ENV: (Constants.expoConfig?.extra?.NODE_ENV || process.env.NODE_ENV || 'development') as
    | 'development'
    | 'production'
    | 'test',
  isDevelopment: (Constants.expoConfig?.extra?.NODE_ENV || process.env.NODE_ENV) === 'development',
  isProduction: (Constants.expoConfig?.extra?.NODE_ENV || process.env.NODE_ENV) === 'production',

  // API 설정
  API_BASE_URL:
    Constants.expoConfig?.extra?.API_BASE_URL ||
    process.env.API_BASE_URL ||
    'http://localhost:3000/api',
  API_TIMEOUT:
    Constants.expoConfig?.extra?.API_TIMEOUT || parseInt(process.env.API_TIMEOUT || '10000', 10),

  // 앱 설정
  APP_NAME: Constants.expoConfig?.extra?.APP_NAME || process.env.APP_NAME || 'BEMO',
  APP_VERSION: Constants.expoConfig?.extra?.APP_VERSION || process.env.APP_VERSION || '1.0.0',

  // 디버그 설정
  DEBUG_MODE: Constants.expoConfig?.extra?.DEBUG_MODE || process.env.DEBUG_MODE === 'true',
  LOG_LEVEL: (Constants.expoConfig?.extra?.LOG_LEVEL || process.env.LOG_LEVEL || 'info') as
    | 'debug'
    | 'info'
    | 'warn'
    | 'error',
} as const;

export default config;
