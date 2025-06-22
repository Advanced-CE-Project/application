import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LoginRequiredScreen = ({ onLoginPress }: { onLoginPress: () => void }) => {
  const insets = useSafeAreaInsets();

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
              fontSize: 24,
              fontWeight: '600',
              color: '#333',
            }}
          >
            프로필
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* 로그인 필요 컨텐츠 */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 32,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#f0f0f0',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <Feather name='user' size={40} color='#ccc' />
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#333',
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          로그인이 필요합니다
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            lineHeight: 22,
            marginBottom: 32,
          }}
        >
          프로필을 확인하고 수정하려면{'\n'}로그인을 해주세요
        </Text>

        <Pressable
          onPress={() => {
            console.log('Login button pressed'); // 디버깅용 로그
            onLoginPress();
          }}
          style={{
            backgroundColor: '#4A90E2',
            paddingVertical: 16,
            paddingHorizontal: 48,
            borderRadius: 12,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: 16,
            }}
          >
            로그인하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
