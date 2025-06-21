import config from '@/config';

import apiClient from './apiClient';

// 모임 관련 API 클라이언트
const clubsClient = apiClient.create({
  baseURL: `${config.API_BASE_URL}/clubs`,
});

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
  const response = await clubsClient.get('');
  return response.data;
};

export const getMyClubs = async () => {
  const response = await clubsClient.get('/my');
  return response.data;
};

export const getClubById = async (id: string) => {
  const response = await clubsClient.get(`/${id}`);
  return response.data;
};

export const createClub = async (data: CreateClubRequest) => {
  const response = await clubsClient.post('', data);
  return response.data;
};

export const updateClub = async (id: string, data: UpdateClubRequest) => {
  const response = await clubsClient.put(`/${id}`, data);
  return response.data;
};

export const deleteClub = async (id: string) => {
  const response = await clubsClient.delete(`/${id}`);
  return response.data;
};

export const joinClub = async (id: string) => {
  const response = await clubsClient.post(`/${id}/join`);
  return response.data;
};

export const approveParticipant = async (id: string, data: ApproveParticipantRequest) => {
  const response = await clubsClient.post(`/${id}/approve`, data);
  return response.data;
};
