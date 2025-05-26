import { View, Text } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useAttendances } from '@/hooks/useAttendance'
import { Spacer } from '@/components/Spacer'
import { Button } from '@/components/Button'
import { useRouter } from 'expo-router'

export const AttendanceScreen = () => {
  const { data: records, isLoading } = useAttendances()
  const router = useRouter()

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text accessibilityLabel="attendance-title">출결 현황</Text>
      <Spacer height={16} />
      <FlashList
        data={records}
        estimatedItemSize={60}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.date} - {item.status}</Text>
          </View>
        )}
      />
      <Spacer height={16} />
      <Button
        title="QR 출석"
        onPress={() => router.push('/attendance/qr')}
        accessibilityLabel="qr-scan-button"
      />
    </View>
  )
}
