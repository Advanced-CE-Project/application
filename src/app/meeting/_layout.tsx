import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function MeetingLayout() {
  const router = useRouter();

  const BackButton = () => (
    <Pressable
      onPress={() => router.back()}
      style={{
        padding: 8,
        marginLeft: -8,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Feather name='chevron-left' size={24} color='#4A90E2' />
    </Pressable>
  );

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#4A90E2',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name='create'
        options={{
          title: '새 모임 만들기',
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name='detail'
        options={{
          title: '미팅 상세',
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name='recent'
        options={{
          title: '최근 모임',
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
