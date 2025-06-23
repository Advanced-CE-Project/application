import React from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';

import { formatShortKoreanDateTime } from '@/lib/dayjs';
import type { NotificationItem } from '@/types/models/notificaiton';

export interface NotificationCardProps {
  notification: NotificationItem;
  onPress?: () => void;
  style?: ViewStyle;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
  style,
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'GROUP_INVITATION':
        return '👥';
      case 'GROUP_CHANGE':
        return '📅';
      case 'REMINDER':
        return '⏰';
      case 'MESSAGE':
        return '💬';
      default:
        return '🔔';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: notification.isRead ? '#fff' : '#f8faff',
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: notification.isRead ? '#f0f0f0' : '#e3f2fd',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        {/* 아이콘 */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: notification.isRead ? '#f5f5f5' : '#e3f2fd',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <Text style={{ fontSize: 18 }}>{getNotificationIcon(notification.type)}</Text>
        </View>

        {/* 알림 내용 */}
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: notification.isRead ? '500' : '600',
                color: notification.isRead ? '#666' : '#333',
                flex: 1,
                marginRight: 8,
              }}
            >
              {notification.title}
            </Text>

            {/* 읽지 않은 표시 */}
            {!notification.isRead && (
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#4A90E2',
                  marginTop: 4,
                }}
              />
            )}
          </View>

          <Text
            style={{
              fontSize: 14,
              color: notification.isRead ? '#999' : '#666',
              lineHeight: 20,
              marginBottom: 8,
            }}
          >
            {notification.content}
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: '#999',
            }}
          >
            {formatShortKoreanDateTime(notification.createdAt)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
