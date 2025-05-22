import { Tabs } from "expo-router";
import { COLORS } from "../theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.accent,
        tabBarStyle: { backgroundColor: COLORS.background, borderTopColor: COLORS.border },
        headerStyle: { backgroundColor: COLORS.background },
        headerTitleStyle: { color: COLORS.accent },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "홈" }} />
      <Tabs.Screen name="search" options={{ title: "모임검색" }} />
      <Tabs.Screen name="my-clubs" options={{ title: "내모임" }} />
      <Tabs.Screen name="profile" options={{ title: "프로필" }} />
    </Tabs>
  );
}

// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform } from 'react-native';
//
// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
//
// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}
//     >
//       <Tabs.Screen
//         name='index'
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name='house.fill' color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name='explore'
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name='paperplane.fill' color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
