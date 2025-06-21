import config from '@/config';

import apiClient from './apiClient';

// 알림 관련 API 클라이언트
const notificationsClient = apiClient.create({
  baseURL: `${config.API_BASE_URL}/notifications`,
});

// 알림 관련 타입 정의
export interface PushNotificationRequest {
  latitude: number;
  longitude: number;
  radius: number;
  title: string;
  content: string;
  type?: 'GROUP_INVITATION' | 'GROUP_CHANGE' | 'REMINDER' | 'MESSAGE';
  relatedId?: string;
  excludeCurrentUser?: boolean;
}

// 알림 API 함수들
export const sendPushNotification = async (data: PushNotificationRequest) => {
  const response = await notificationsClient.post('/push', data);
  return response.data;
};
