import { View, Text } from 'react-native'
import { useUser, useLogout } from '@/hooks/useAuth'
import { Button } from '@/components/Button'
import { Spacer } from '@/components/Spacer'

export const ProfileScreen = () => {
  const { user } = useUser()
  const { logout } = useLogout()

  return (
    <View style={{ padding: 16 }}>
      <Text accessibilityLabel="profile-name">이름: {user?.name}</Text>
      <Spacer height={12} />
      <Text accessibilityLabel="profile-email">이메일: {user?.email}</Text>
      <Spacer height={24} />
      <Button title="로그아웃" onPress={logout} accessibilityLabel="logout-button" />
    </View>
  )
}
