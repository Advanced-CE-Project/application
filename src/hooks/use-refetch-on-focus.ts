import { useFocusEffect } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

interface UseRefetchOnFocusOptions {
  queryKey?: string[];
  enabled?: boolean;
}

export const useRefetchOnFocus = ({ queryKey, enabled = true }: UseRefetchOnFocusOptions = {}) => {
  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      if (!enabled) return;

      if (queryKey) {
        // 특정 쿼리만 refetch
        queryClient.invalidateQueries({ queryKey });
      } else {
        // 모든 활성 쿼리 refetch
        queryClient.invalidateQueries();
      }
    }, [queryClient, queryKey, enabled]),
  );
};

// 특정 쿼리들을 위한 편의 함수들
export const useRefetchClubsOnFocus = () => {
  useRefetchOnFocus({ queryKey: ['clubs'] });
};

export const useRefetchMeetingOnFocus = (id?: string) => {
  useRefetchOnFocus({
    queryKey: id ? ['meeting', id] : undefined,
    enabled: !!id,
  });
};

export const useRefetchNotificationsOnFocus = () => {
  useRefetchOnFocus({ queryKey: ['notifications'] });
};
