import { Stack } from 'expo-router';

import Providers from '@/app/_providers';

const Layout = () => {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name='start' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        {/* <Stack.Screen name='modal' options={{ presentation: 'modal' }} /> */}
      </Stack>
    </Providers>
  );
};

export default Layout;
