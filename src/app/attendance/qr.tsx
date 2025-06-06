import { useEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useMarkAttendance } from '@/hooks/useAttendance'
import { useRouter } from 'expo-router'

export const QRScanScreen = () => {
  const { mark } = useMarkAttendance()
  const router = useRouter()

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('카메라 권한이 필요합니다.')
        router.back()
      }
    }

    getPermission()
  }, [])

  const onScanned = ({ data }: { data: string }) => {
    mark(data)
    router.back()
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        style={{ flex: 1 }}
        onBarCodeScanned={onScanned}
      />
    </View>
  )
}
