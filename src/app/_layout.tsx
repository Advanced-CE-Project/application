import { Stack } from 'expo-router';

import Providers from '@/app/_providers';

const Layout = () => {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='(modals)' options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name='meeting' options={{ headerShown: false }} />
        <Stack.Screen name='contact' options={{ headerShown: false }} />
        <Stack.Screen
          name='settings'
          options={{
            title: '설정',
            headerBackTitle: '뒤로',
            headerTintColor: '#4A90E2',
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
            },
          }}
        />
      </Stack>
    </Providers>
  );
};

export default Layout;
