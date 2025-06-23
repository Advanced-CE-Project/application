import axios from 'axios';

import config from '@/config';
import { getAccessToken } from '@/lib/auth';

const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  // 메모리 최적화를 위한 설정
  maxContentLength: 50 * 1024 * 1024, // 50MB
  maxBodyLength: 50 * 1024 * 1024, // 50MB
});

apiClient.interceptors.request.use(async (request) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    console.log(`accessToken: "${accessToken}"`);
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

export default apiClient;
