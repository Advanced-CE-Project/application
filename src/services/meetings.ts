import config from '@/config';

import apiClient from './apiClient';

// 미팅 관련 API 클라이언트
const meetingsClient = apiClient.create({
  baseURL: `${config.API_BASE_URL}/meetings`,
});

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
  const response = await meetingsClient.get('/map', { params });
  return response.data;
};

export const getNearbyMeetings = async (params: NearbyMeetingsParams) => {
  const response = await meetingsClient.get('/nearby', { params });
  return response.data;
};

export const createRating = async (clubId: string, data: CreateRatingRequest) => {
  const response = await meetingsClient.post(`/${clubId}/ratings`, data);
  return response.data;
};

export const getClubRatings = async (clubId: string) => {
  const response = await meetingsClient.get(`/${clubId}/ratings`);
  return response.data;
};
