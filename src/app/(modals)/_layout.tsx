import { Stack, useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function ModalsLayout() {
  const router = useRouter();

  const CloseButton = () => (
    <Pressable onPress={() => router.back()}>
      <Text style={{ color: '#4A90E2', fontSize: 16, fontWeight: '600' }}>닫기</Text>
    </Pressable>
  );

  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => null,
        headerRight: () => <CloseButton />,
      }}
    >
      <Stack.Screen
        name='share'
        options={{
          title: '공유하기',
        }}
      />
      <Stack.Screen
        name='mission'
        options={{
          title: '미션',
        }}
      />
      <Stack.Screen
        name='evaluate'
        options={{
          title: '평가하기',
        }}
      />
    </Stack>
  );
}
