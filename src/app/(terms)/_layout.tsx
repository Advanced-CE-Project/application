import { Stack } from 'expo-router';

export default function TermsLayout() {
  return (
    <Stack>
      <Stack.Screen name='terms-of-service' options={{ headerShown: true, title: '이용약관' }} />
      <Stack.Screen
        name='privacy-policy'
        options={{ headerShown: true, title: '개인정보처리방침' }}
      />
    </Stack>
  );
}
