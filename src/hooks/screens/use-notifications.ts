import { useQuery } from '@tanstack/react-query';

import useMe from '@/hooks/use-me';
import services from '@/services';
import type { NotificationItem } from '@/types/models/notificaiton';

export const useNotifications = () => {
  const { me } = useMe();

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

  // 읽지 않은 알림 개수
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  // 알림을 읽음 상태로 표시하는 함수 (향후 구현 예정)
  const markAsRead = (notificationId: string) => {
    // TODO: API 연동 시 구현
    console.log('Marking notification as read:', notificationId);
  };

  // 모든 알림을 읽음으로 표시하는 함수 (향후 구현 예정)
  const markAllAsRead = () => {
    // TODO: API 연동 시 구현
    console.log('Marking all notifications as read');
  };

  return {
    notifications,
    isLoading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
};
