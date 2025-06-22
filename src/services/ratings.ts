import config from '@/config';

import apiClient from './apiClient';

// 평가 관련 타입 정의
export interface UpdateRatingRequest {
  score?: number | null;
  comment?: string | null;
  tags?: string[] | null;
}

// 평가 API 함수들
export const updateRating = async (ratingId: string, data: UpdateRatingRequest) => {
  const response = await apiClient.put(`/ratings/${ratingId}`, data);
  return response.data;
};

export const deleteRating = async (ratingId: string) => {
  const response = await apiClient.delete(`/ratings/${ratingId}`);
  return response.data;
};
