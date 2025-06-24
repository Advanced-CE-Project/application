import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { AppState, Platform } from 'react-native';

// React Native용 Focus Manager 설정
function onAppStateChange(status: string) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

// Navigation focus를 위한 설정
// Stack 구조에서는 AppState만으로는 부족하므로 각 화면에서 useFocusEffect 사용 필요

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stack Navigation에서는 refetchOnWindowFocus 대신 각 화면에서 useFocusEffect 사용
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      // 캐시 완전 비활성화: 데이터가 즉시 stale 상태가 됨
      staleTime: 0,
      // 캐시 완전 비활성화: 데이터가 즉시 가비지 컬렉션됨
      gcTime: 0,
      // 네트워크 에러 시 재시도 (1회)
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // 네트워크 연결이 다시 되었을 때 refetch
      refetchOnReconnect: true,
    },
    mutations: {
      // 뮤테이션 에러 시 재시도 안함
      retry: false,
    },
  },
});

interface QueryClientProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider: React.FC<QueryClientProviderProps> = ({ children }) => {
  useEffect(() => {
    // AppState 변경 리스너 등록
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => {
      // 컴포넌트 언마운트 시 리스너 제거
      subscription?.remove();
    };
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

// 캐시 관리 유틸리티 함수들
export const queryKeys = {
  // 모임 관련
  clubs: ['clubs'] as const,
  club: (id: string) => ['club', id] as const,
  meeting: (id: string) => ['meeting', id] as const,
  myClubs: ['clubs', 'my'] as const,
  recommendedClubs: ['clubs', 'recommended'] as const,
  recentClubs: ['clubs', 'recent'] as const,

  // 출석 관련
  attendance: (id: string) => ['attendance', id] as const,
  attendances: ['attendances'] as const,

  // 사용자 관련
  me: ['me'] as const,
  profile: ['profile'] as const,
  notifications: ['notifications'] as const,

  // 평가 관련
  evaluations: ['evaluations'] as const,
  evaluation: (id: string) => ['evaluation', id] as const,
} as const;

// 관련 쿼리들을 한번에 무효화하는 헬퍼 함수들
export const invalidateQueries = {
  // 모임 관련 모든 쿼리 무효화
  allClubs: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.clubs });
    queryClient.invalidateQueries({ queryKey: queryKeys.myClubs });
    queryClient.invalidateQueries({ queryKey: queryKeys.recommendedClubs });
    queryClient.invalidateQueries({ queryKey: queryKeys.recentClubs });
  },

  // 특정 모임과 관련된 모든 쿼리 무효화
  clubAndRelated: (id: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.club(id) });
    queryClient.invalidateQueries({ queryKey: queryKeys.meeting(id) });
    queryClient.invalidateQueries({ queryKey: queryKeys.attendance(id) });
    // 모임 목록도 함께 갱신
    invalidateQueries.allClubs();
  },

  // 출석 관련 모든 쿼리 무효화
  allAttendance: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.attendances });
  },

  // 사용자 관련 모든 쿼리 무효화
  userProfile: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.me });
    queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
  },
};

// QueryClient 인스턴스를 외부에서 사용할 수 있도록 export
export { queryClient };

export default ReactQueryProvider;
