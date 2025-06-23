import config from '@/config';

import apiClient from './apiClient';

// 미팅 관련 타입 정의
export interface MapMeetingsParams {
  northEastLat: number;
  northEastLng: number;
  southWestLat: number;
  southWestLng: number;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface NearbyMeetingsParams {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
  category?: string;
}

export interface CreateRatingRequest {
  receiverId?: string;
  score?: number;
  comment?: string | null;
  tags?: string[] | null;
}

// 미팅 API 함수들
export const getMapMeetings = async (params: MapMeetingsParams) => {
  const response = await apiClient.get('/meetings/map', { params });
  return response.data;
};

export const getNearbyMeetings = async (params: NearbyMeetingsParams) => {
  const response = await apiClient.get('/meetings/nearby', { params });
  return response.data;
};

export const createRating = async (clubId: string, data: CreateRatingRequest) => {
  const response = await apiClient.post(`/meetings/${clubId}/ratings`, data);
  return response.data;
};

export const getClubRatings = async (clubId: string) => {
  const response = await apiClient.get(`/meetings/${clubId}/ratings`);
  return response.data;
};

export const getUserEvaluationStatus = async (clubId: string) => {
  const response = await apiClient.get(`/meetings/${clubId}/evaluation-status`);
  return response.data;
};
