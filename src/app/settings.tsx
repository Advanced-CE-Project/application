import React from 'react';
import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const commonStyle = {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12
};

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 고정 헤더 */}
        <View
          style={{
          paddingHorizontal: 16,
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#333',
              }}
            >
              설정
            </Text>
          </View>
        </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          {/* 계정 */}
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 16 }}>계정</Text>

          <View style={{ paddingBottom: 24 }}>
            <Pressable onPress={() => {}} style={{ ...commonStyle }}>
                <Text style={{ fontSize: 16, color: '#333' }}>프로필 관리</Text>
            </Pressable>

            <Pressable onPress={() => {}} style={{ ...commonStyle }}>
                <Text style={{ fontSize: 16, color: '#333' }}>개인정보 보호</Text>
            </Pressable>

            <Pressable onPress={() => {}} style={{ ...commonStyle }}>
                <Text style={{ fontSize: 16, color: '#333' }}>보안</Text>
            </Pressable>
          </View>

          {/* 알림 설정 */}
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 16 }}>알림</Text>

          <View style={{ paddingBottom: 24 }}>
            <View style={{ ...commonStyle, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#333' }}>푸시 알림</Text>
                <Switch value={false} onValueChange={() => {}} />
            </View>

            <View style={{ ...commonStyle, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#333' }}>이메일 알림</Text>
                <Switch value={true} onValueChange={() => {}} />
            </View>

            <View style={{ ...commonStyle, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#333' }}>알림 설정</Text>
            </View>
          </View>

          {/* 앱 설정 */}
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 16 }}>앱 설정</Text>

          <View style={{ paddingBottom: 24 }}>
            <View style={{ ...commonStyle, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#333' }}>다크 모드</Text>
                <Switch value={false} onValueChange={() => {}} />
            </View>

            <Pressable onPress={() => {}} style={{ ...commonStyle }}>
                <Text style={{ fontSize: 16, color: '#333' }}>언어</Text>
            </Pressable>

            <Pressable onPress={() => {}} style={{ ...commonStyle }}>
                <Text style={{ fontSize: 16, color: '#333' }}>위치 서비스</Text>
            </Pressable>
          </View>

          {/* 기타 */}
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 16 }}>기타</Text>

          <View style={{ paddingBottom: 24 }}>
            <Pressable onPress={() => {}} style={{ ...commonStyle }}>
                <Text style={{ fontSize: 16, color: '#333' }}>이용약관</Text>
            </Pressable>

            <Pressable onPress={() => {}} style={{ ...commonStyle }}>
                <Text style={{ fontSize: 16, color: '#333' }}>개인정보 처리방침</Text>
            </Pressable>

            <Pressable onPress={() => {}} style={{ ...commonStyle }}>
                <Text style={{ fontSize: 16, color: '#d00' }}>로그아웃</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
      
    </View>
  );
};

export default SettingsScreen;
