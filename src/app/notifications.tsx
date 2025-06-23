import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NotificationCard } from '@/components/ui/notification-card';
import { NotificationCardSkeleton } from '@/components/ui/skeleton';
import { Spacer } from '@/components/ui/spacer';
import { useNotifications } from '@/hooks/screens/use-notifications';

const NotificationsScreen = () => {
  const { insets, notifications, isLoading, error, unreadCount } = useNotifications();

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
          }}
        >
          <Text style={{ fontSize: 16, color: '#999', textAlign: 'center' }}>
            알림을 불러오는 중 오류가 발생했습니다.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 스크롤 가능한 알림 리스트 */}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: insets.bottom + 16,
          }}
        >
          {isLoading ? (
            <View style={{ gap: 12 }}>
              {Array.from({ length: 5 }, (_, index) => (
                <NotificationCardSkeleton key={`skeleton-notification-${index}`} />
              ))}
            </View>
          ) : notifications.length > 0 ? (
            <View style={{ gap: 12 }}>
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onPress={() => handleNotificationPress(notification.id)}
                />
              ))}
            </View>
          ) : (
            // 빈 상태 UI
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 80,
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: '#f5f5f5',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <Feather name='bell' size={28} color='#ccc' />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#999',
                  marginBottom: 8,
                }}
              >
                새로운 알림이 없습니다
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#ccc',
                  textAlign: 'center',
                }}
              >
                새로운 소식이 있으면 여기에 표시됩니다
              </Text>
            </View>
          )}

          <Spacer height={32} />
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
