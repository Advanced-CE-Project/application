import config from '@/config';

import apiClient from './apiClient';

// 위치 관련 API 클라이언트
const locationsClient = apiClient.create({
  baseURL: `${config.API_BASE_URL}/locations`,
});

// 위치 관련 타입 정의
export interface LocationPoint {
  latitude: number;
  longitude: number;
  weight?: number;
}

export interface MidpointRequest {
  locations: LocationPoint[];
  algorithm?: 'centroid' | 'weighted_centroid' | 'geometric_median';
}

export interface RecommendParams {
  latitude: number;
  longitude: number;
  radius?: number;
  category?: string;
  limit?: number;
  minRating?: number;
  sortBy?: 'distance' | 'rating' | 'name';
  excludeIds?: string[];
}

// 위치 API 함수들
export const calculateMidpoint = async (data: MidpointRequest) => {
  const response = await locationsClient.post('/midpoint', data);
  return response.data;
};

export const getRecommendations = async (params: RecommendParams) => {
  const response = await locationsClient.get('/recommend', { params });
  return response.data;
};
