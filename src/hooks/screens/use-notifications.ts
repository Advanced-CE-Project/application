import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import services from '@/services';
import type { NotificationItem } from '@/types/models/notificaiton';

export const useNotifications = () => {
  const { me } = useMe();
  const insets = useSafeAreaInsets();

  const {
    data: notifications = [],
    isLoading,
    error,
  } = useQuery<NotificationItem[]>({
    enabled: !!me,
    queryKey: ['notifications'],
    queryFn: () => services.users.getMyNotifications(),
    refetchOnWindowFocus: true,
  });

  return {
    insets,
    notifications,
    isLoading,
    error,
  };
};
