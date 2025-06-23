import config from '@/config';

import apiClient from './apiClient';

export interface GetClubsRequest {
  search?: string;
  tagId?: string | null;
  latitude?: number;
  longitude?: number;
}

// 모임 관련 타입 정의
export interface CreateClubRequest {
  name: string;
  description?: string;
  imageUrl?: string | null;
  maxParticipants?: number;
  locationId?: string | null;
  startDateTime: string;
  endDateTime?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  tags?: string[];
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
export const getClubs = async ({ search, tagId, latitude, longitude }: GetClubsRequest) => {
  const response = await apiClient.get('/clubs', {
    params: { search, tagId, latitude, longitude },
  });
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

export const getClubByInterest = async () => {
  const response = await apiClient.get('/clubs/by-interests');
  return response.data;
};

export const getClubRecentlyJoined = async () => {
  const response = await apiClient.get('/clubs/recent-joined');
  return response.data;
};

export const createClub = async (data: CreateClubRequest) => {
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

export const startClub = async (id: string) => {
  const response = await apiClient.post(`/clubs/${id}/start`);
  return response.data;
};

export const endClub = async (id: string) => {
  const response = await apiClient.put(`/clubs/${id}/end`);
  return response.data;
};

export const getApplicants = async (id: string) => {
  const response = await apiClient.get(`/clubs/${id}/applicants`);
  return response.data;
};

export const approveParticipant = async (id: string, data: ApproveParticipantRequest) => {
  const response = await apiClient.post(`/clubs/${id}/approve`, data);
  return response.data;
};

export const getTags = async () => {
  const response = await apiClient.get('/clubs/tags');
  return response.data;
};
