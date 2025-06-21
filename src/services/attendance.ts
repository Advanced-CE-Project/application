import config from '@/config';

import apiClient from './apiClient';

// 출석 관련 API 클라이언트
const attendanceClient = apiClient.create({
  baseURL: `${config.API_BASE_URL}/attendance`,
});

// 출석 관련 타입 정의
export interface UpdateAttendanceRequest {
  status: string;
}

export interface VerifyQRRequest {
  qrData: string;
}

export interface VerifyQRResponse {
  message: string;
}

// 출석 API 함수들
export const generateQRCode = async (clubId: string) => {
  const response = await attendanceClient.get(`/${clubId}/qrcode`);
  return response.data;
};

export const getAttendanceRecord = async (id: string) => {
  const response = await attendanceClient.get(`/${id}`);
  return response.data;
};

export const updateAttendance = async (
  clubId: string,
  userId: string,
  data: UpdateAttendanceRequest,
) => {
  const response = await attendanceClient.put(`/${clubId}/${userId}`, data);
  return response.data;
};

export const verifyQR = async (data: VerifyQRRequest): Promise<VerifyQRResponse> => {
  const response = await attendanceClient.post('/verify', data);
  return response.data;
};
