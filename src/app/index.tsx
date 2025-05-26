import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { UnistylesRuntime } from 'react-native-unistyles'
import { useFonts } from 'expo-font'
import { QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { queryClient } from '@/app/lib/queryClient'
import { lightTheme, darkTheme } from '@/constants/themes'

// UnistylesRuntime.setThemes({ light: lightTheme, dark: darkTheme })
// UnistylesRuntime.setConfig({ initialTheme: 'light' })

export const Layout = () => {
  const scheme = useColorScheme()
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
  })

  if (!fontsLoaded) return null

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
