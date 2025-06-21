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
      <Stack.Screen
        name='attendance-check'
        options={{
          title: '출석 체크',
        }}
      />
      <Stack.Screen
        name='attendance-manage'
        options={{
          title: '출석 관리',
        }}
      />
      <Stack.Screen
        name='contact'
        options={{
          title: '빠른 연락보내기',
        }}
      />
      <Stack.Screen
        name='delete-account'
        options={{
          title: '계정 삭제',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='manage-applicants'
        options={{
          title: '신청자 관리',
        }}
      />
    </Stack>
  );
}
