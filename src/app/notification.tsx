import { View, Text, Pressable } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useNotifications, useMarkAsRead } from '@/hooks/useNotifications'
import { Spacer } from '@/components/Spacer'

export const NotificationScreen = () => {
  const { data: notifications } = useNotifications()
  const { mutate: markAsRead } = useMarkAsRead()

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text accessibilityLabel="notification-title">알림 목록</Text>
      <Spacer height={16} />
      <FlashList
        data={notifications}
        estimatedItemSize={80}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => markAsRead(item.id)}>
            <Text style={{ fontWeight: item.read ? 'normal' : 'bold' }}>
              {item.title}
            </Text>
            <Text>{item.message}</Text>
          </Pressable>
        )}
      />
    </View>
  )
}
