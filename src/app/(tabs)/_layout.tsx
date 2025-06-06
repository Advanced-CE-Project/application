<<<<<<< HEAD
import { Tabs } from 'expo-router'
import { TabBarIcon } from '@/components/TabBarIcon'

export const Layout = () => (
  <Tabs screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="home" options={{ tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} /> }} />
    <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} /> }} />
  </Tabs>
)
=======
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const Icon = ({ name, color }: { name: string; color: string }) => {
  switch (name) {
    case 'home':
      return <Feather name='home' size={24} color={color} />;
    case 'user':
      return <Feather name='user' size={24} color={color} />;
    case 'search':
      return <Feather name='search' size={24} color={color} />;
    case 'clubs':
      return <Feather name='users' size={24} color={color} />;
    default:
      return null;
  }
};

const TabLayout = () => (
  <Tabs
    screenOptions={{
      headerShown: false,
      tabBarLabelStyle: {
        marginTop: 4, // 아이콘과 텍스트 사이 간격 추가
      },
    }}
  >
    <Tabs.Screen
      name='(home)/index'
      options={{
        title: '홈',
        tabBarIcon: ({ color }) => <Icon name='home' color={color} />,
      }}
    />
    <Tabs.Screen
      name='search/index'
      options={{
        title: '검색',
        tabBarIcon: ({ color }) => <Icon name='search' color={color} />,
      }}
    />
    <Tabs.Screen
      name='clubs/index'
      options={{
        title: '클럽',
        tabBarIcon: ({ color }) => <Icon name='clubs' color={color} />,
      }}
    />
    <Tabs.Screen
      name='profile/index'
      options={{
        title: '프로필',
        tabBarIcon: ({ color }) => <Icon name='user' color={color} />,
      }}
    />
  </Tabs>
);

export default TabLayout;
>>>>>>> 49ba8d8cd622b1a84e8ad0b4c823069d4178f287
