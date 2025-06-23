import config from '@/config';

import apiClient from './apiClient';

// 모임 관련 타입 정의
export interface CreateClubRequest {
  name: string;
  description?: string;
  imageUrl?: string | null;
  maxParticipants?: number;
  locationId?: string | null;
  startDateTime: string;
  endDateTime?: string;
}

export interface UpdateClubRequest {
  name?: string;
  description?: string;
  imageUrl?: string;
  maxParticipants?: string;
  locationId?: string;
  startDateTime?: string;
  endDateTime?: string;
}

export interface ApproveParticipantRequest {
  participantId?: string;
  action?: 'accept' | 'reject';
}

// 모임 API 함수들
export const getClubs = async () => {
  const response = await apiClient.get('/clubs');
  return response.data;
};

export const getMyClubs = async () => {
  const response = await apiClient.get('/clubs/my');
  return response.data;
};

export const getClubById = async (id: string) => {
  const response = await apiClient.get(`/clubs/${id}`);
  return response.data;
};

export const createClub = async (data: CreateClubRequest): Promise<{ message: string; clubId: string }> => {
  const response = await apiClient.post('/clubs', data);
  return response.data;
};

export const updateClub = async (id: string, data: UpdateClubRequest) => {
  const response = await apiClient.put(`/clubs/${id}`, data);
  return response.data;
};

export const deleteClub = async (id: string) => {
  const response = await apiClient.delete(`/clubs/${id}`);
  return response.data;
};

export const joinClub = async (id: string) => {
  const response = await apiClient.post(`/clubs/${id}/join`);
  return response.data;
};

export const approveParticipant = async (id: string, data: ApproveParticipantRequest) => {
  const response = await apiClient.post(`/clubs/${id}/approve`, data);
  return response.data;
};
