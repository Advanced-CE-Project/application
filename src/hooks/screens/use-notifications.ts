import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import { useRefetchNotificationsOnFocus } from '@/hooks/use-refetch-on-focus';
import services from '@/services';
import type { NotificationItem } from '@/types/models/notificaiton';

export const useNotifications = () => {
  const { me } = useMe();
  const insets = useSafeAreaInsets();

  // Navigation focus 시 알림 데이터 refetch
  useRefetchNotificationsOnFocus();

  const {
    data: notifications = [],
    isLoading,
    error,
  } = useQuery<NotificationItem[]>({
    enabled: !!me,
    queryKey: ['notifications'],
    queryFn: () => services.users.getMyNotifications(),
  });

  return {
    insets,
    notifications,
    isLoading,
    error,
  };
};
