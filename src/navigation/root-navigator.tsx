import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigator } from './auth-navigator'
import { useAuthStore } from '@/features/store/auth-store'
import { Text } from 'react-native'

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Text>TODO: MainNavigator</Text>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  )
}
