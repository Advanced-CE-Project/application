<<<<<<< HEAD
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { UnistylesRuntime } from 'react-native-unistyles'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClientProvider } from '@tanstack/react-query'

import { lightTheme, darkTheme } from '@/constants/themes'
import { queryClient } from '@/app/lib/queryClient'

// UnistylesRuntime.setThemes({ light: lightTheme, dark: darkTheme })
// UnistylesRuntime.setConfig({ initialTheme: 'light' })

export const Layout = () => {
  const scheme = useColorScheme()
  const [fontsLoaded] = useFonts({
    Inter: require('@/assets/fonts/Inter-Regular.ttf'),
  })

  if (!fontsLoaded) return null
=======
import { Stack } from 'expo-router';

import Providers from '@/app/_providers';
>>>>>>> 49ba8d8cd622b1a84e8ad0b4c823069d4178f287

const Layout = () => {
  return (
<<<<<<< HEAD
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
=======
    <Providers>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        {/* <Stack.Screen name='modal' options={{ presentation: 'modal' }} /> */}
      </Stack>
    </Providers>
  );
};

export default Layout;
>>>>>>> 49ba8d8cd622b1a84e8ad0b4c823069d4178f287
