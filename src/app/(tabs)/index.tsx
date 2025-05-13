// index.tsx
import 'react-native-gesture-handler'; // 네비게이션을 위한 필수 import (최상단)
import { registerRootComponent } from 'expo'; // Expo 프로젝트일 경우 필요
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/app/theme';

// 각 화면 import (screens 폴더에 구현)
import HomeScreen from './home.tsx';
import SearchScreen from './search.tsx';
import MyClubsScreen from './my-clubs.tsx';
import ProfileScreen from './profile.tsx';

import CreateMeetingScreen from '../create-meeting.tsx';
import ManageMeetingScreen from '../manage-meeting.tsx';
import AttendanceScreen from '../attendance.tsx';
import ShareScreen from '../share.tsx';
import MissionScreen from '../mission.tsx';
import EvaluationScreen from '../evaluation.tsx';
import NotificationScreen from '../notification.tsx';
import SettingsScreen from '../settings.tsx';
import PlaceRecommendScreen from '../place-recommend.tsx';
import QuickContactScreen from '../quick-contact.tsx';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 하단 탭 네비게이터: 주요 화면
export default function MainTabs() {
  return (
    <View style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen name="홈" component={HomeScreen} />
          <Tab.Screen name="모임검색" component={SearchScreen} />
          <Tab.Screen name="내모임" component={MyClubsScreen} />
          <Tab.Screen name="프로필" component={ProfileScreen} />
        </Tab.Navigator>
    </View>
  );
}

// 전체 앱 네비게이터: 상세 화면 포함
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 탭 네비게이터(메인 화면들) */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* 상세/기능 화면들 */}
        <Stack.Screen name="모임생성" component={CreateMeetingScreen} />
        <Stack.Screen name="모임관리" component={ManageMeetingScreen} />
        <Stack.Screen name="출결관리" component={AttendanceScreen} />
        <Stack.Screen name="자료공유" component={ShareScreen} />
        <Stack.Screen name="미션설정" component={MissionScreen} />
        <Stack.Screen name="평가" component={EvaluationScreen} />
        <Stack.Screen name="알림" component={NotificationScreen} />
        <Stack.Screen name="설정" component={SettingsScreen} />
        <Stack.Screen name="장소추천" component={PlaceRecommendScreen} />
        <Stack.Screen name="빠른연락" component={QuickContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Expo 프로젝트라면 registerRootComponent로 등록
export default registerRootComponent(App);

// 만약 Expo가 아니라면 아래처럼 export default App; 만 해도 됩니다.
// export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: COLORS.accent,
    fontSize: 24,
    fontWeight: "bold",
  },
});