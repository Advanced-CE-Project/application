import { Stack } from 'expo-router';

import Providers from '@/app/_providers';

const Layout = () => {
  return (
    <Providers>
      <Stack initialRouteName='(tabs)'>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='(modals)' options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name='(terms)' options={{ headerShown: false }} />
        <Stack.Screen
          name='(terms)/terms-of-service'
          options={{
            title: '서비스 이용약관',
            headerBackTitle: '뒤로',
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name='(terms)/privacy-policy'
          options={{
            title: '개인정보처리방침',
            headerBackTitle: '뒤로',
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name='meeting' options={{ headerShown: false }} />
        <Stack.Screen name='help' options={{ headerShown: false }} />
        <Stack.Screen
          name='account-info'
          options={{
            title: '계정 정보',
            headerBackTitle: '뒤로',
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name='password-change'
          options={{
            title: '비밀번호 변경',
            headerBackTitle: '뒤로',
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name='notifications'
          options={{
            title: '알림',
            headerBackTitle: '뒤로',
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name='settings'
          options={{
            title: '설정',
            headerBackTitle: '뒤로',
            headerTintColor: '#000',
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
