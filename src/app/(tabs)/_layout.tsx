import { Tabs } from 'expo-router'
import { TabBarIcon } from '@/components/TabBarIcon'

export const Layout = () => (
  <Tabs screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="home" options={{ tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} /> }} />
    <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} /> }} />
  </Tabs>
)
