import config from '@/config';

import apiClient from './apiClient';

// 사용자 관련 API 클라이언트
const usersClient = apiClient.create({
  baseURL: `${config.API_BASE_URL}/users`,
});

// 사용자 관련 타입 정의
export interface UpdateUserRequest {
  nickname?: string;
  profileImage?: string;
  bio?: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface UpdateLocationRequest {
  latitude: number;
  longitude: number;
  address?: string;
}

// 사용자 API 함수들
export const getMe = async () => {
  const response = await usersClient.get('/me');
  return response.data;
};

export const updateMe = async (data: UpdateUserRequest) => {
  const response = await usersClient.put('/me', data);
  return response.data;
};

export const deleteMe = async () => {
  const response = await usersClient.delete('/me');
  return response.data;
};

export const getMyNotifications = async () => {
  const response = await usersClient.get('/notifications');
  return response.data;
};

export const getMyPreferences = async () => {
  const response = await usersClient.get('/preferences');
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const response = await usersClient.put('/password/reset', data);
  return response.data;
};

export const updateLocation = async (data: UpdateLocationRequest) => {
  const response = await usersClient.put('/location', data);
  return response.data;
};

export const getUserRatings = async (userId: string) => {
  const response = await usersClient.get(`/${userId}/ratings`);
  return response.data;
};

export const getUserTrustScore = async (userId: string) => {
  const response = await usersClient.get(`/${userId}/trust-score`);
  return response.data;
};
