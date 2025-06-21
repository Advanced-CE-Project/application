import config from '@/config';

import apiClient from './apiClient';

// 인증 관련 API 클라이언트
const authClient = apiClient.create({
  baseURL: `${config.API_BASE_URL}/auth`,
});

// 인증 관련 타입 정의
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface RegisterResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

// 인증 API 함수들
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await authClient.post('/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await authClient.post('/register', data);
  return response.data;
};

export const forgotPassword = async (
  data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  const response = await authClient.post('/password/forgot', data);
  return response.data;
};

export default authClient;
