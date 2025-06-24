import config from '@/config';

import apiClient from './apiClient';

// User 타입 정의
export interface User {
  id: string;
  email: string;
  nickname: string | null;
  profileImage: string | null;
  bio: string | null;
  role: string;
  createdAt: string;
  interests?: {
    id: string;
    name: string;
    createdAt: string;
  }[];
}

// 사용자 관련 타입 정의
export interface UpdateUserRequest {
  nickname?: string;
  profileImage?: string;
  bio?: string;
  interests?: string[];
}

export interface ResetPasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
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

export interface UpdateUserSettingsRequest {
  notificationEnabled: boolean;
  locationEnabled: boolean;
}

// 사용자 API 함수들
export const getMe = async (): Promise<User> => {
  const response = await apiClient.get('/users/me');
  return response.data;
};

export const updateMe = async (data: UpdateUserRequest) => {
  const response = await apiClient.put('/users/me', data);
  return response.data;
};

export const deleteMe = async () => {
  const response = await apiClient.delete('/users/me');
  return response.data;
};

export const getMyNotifications = async () => {
  const response = await apiClient.get('/users/notifications');
  return response.data;
};

export const getMyPreferences = async () => {
  const response = await apiClient.get('/users/preferences');
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const response = await apiClient.put('/users/password/reset', data);
  return response.data;
};

export const updateLocation = async (data: UpdateLocationRequest) => {
  const response = await apiClient.put('/users/location', data);
  return response.data;
};

export const getUserRatings = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}/ratings`);
  return response.data;
};

export const getUserTrustScore = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}/trust-score`);
  return response.data;
};

export const getUserSettings = async () => {
  const response = await apiClient.get('/users/settings');
  return response.data;
};

export const updateUserSettings = async (data: UpdateUserSettingsRequest) => {
  const response = await apiClient.put('/users/settings', data);
  return response.data;
};

export const deleteAccount = async () => {
  const response = await apiClient.delete('/users/me');
  return response.data;
};
