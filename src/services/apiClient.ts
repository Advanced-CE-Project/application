import axios from 'axios';

import config from '@/config';
import { getAccessToken } from '@/lib/auth';

const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  async (request) => {
    console.log(config.API_BASE_URL);

    if (config.DEBUG_MODE) {
      console.log(`[API Request] ${request.method?.toUpperCase()} ${request.url}`, request.data);
    }
    const accessToken = await getAccessToken();
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => {
    if (config.DEBUG_MODE) {
      console.error('[API Request Error]', error);
    }
    throw error;
  },
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    if (config.DEBUG_MODE) {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    if (config.DEBUG_MODE) {
      console.error('[API Response Error]', error.response?.data || error.message);
    }
    throw error;
  },
);

export default apiClient;
