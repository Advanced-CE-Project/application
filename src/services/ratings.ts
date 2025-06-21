import config from '@/config';

import apiClient from './apiClient';

// 평가 관련 API 클라이언트
const ratingsClient = apiClient.create({
  baseURL: `${config.API_BASE_URL}/ratings`,
});

// 평가 관련 타입 정의
export interface UpdateRatingRequest {
  score?: number | null;
  comment?: string | null;
  tags?: string[] | null;
}

// 평가 API 함수들
export const updateRating = async (ratingId: string, data: UpdateRatingRequest) => {
  const response = await ratingsClient.put(`/${ratingId}`, data);
  return response.data;
};

export const deleteRating = async (ratingId: string) => {
  const response = await ratingsClient.delete(`/${ratingId}`);
  return response.data;
};
