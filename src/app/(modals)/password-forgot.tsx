import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PasswordForgotScreen = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendResetEmail = async () => {
    if (!email.trim()) {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // TODO: API 호출로 비밀번호 재설정 이메일 전송
      // await authService.sendPasswordResetEmail(email);

      // 임시로 성공 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        '이메일 전송 완료',
        '비밀번호 재설정 링크가 이메일로 전송되었습니다.\n이메일을 확인해주세요.',
        [
          {
            text: '확인',
            onPress: () => router.back(),
          },
        ],
      );
    } catch (error) {
      setErrorMessage('이메일 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: 40,
            paddingBottom: insets.bottom + 24,
          }}
        >
          {/* 헤더 */}
          <View style={{ marginBottom: 48 }}>
            <Pressable
              onPress={() => router.back()}
              style={{
                alignSelf: 'flex-start',
                marginBottom: 24,
                padding: 8,
                marginLeft: -8,
              }}
            >
              <Text style={{ fontSize: 16, color: '#4A90E2' }}>← 돌아가기</Text>
            </Pressable>

            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 12,
              }}
            >
              비밀번호 찾기
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#666',
                lineHeight: 24,
              }}
            >
              가입했던 이메일 주소를 입력하시면{'\n'}비밀번호 재설정 링크를 보내드립니다.
            </Text>
          </View>

          {/* 이메일 입력 폼 */}
          <View style={{ marginBottom: 32 }}>
            <Input
              disabled={isLoading}
              label='이메일'
              placeholder='가입했던 이메일을 입력하세요'
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrorMessage('');
              }}
              keyboardType='email-address'
              autoCapitalize='none'
              containerStyle={{ marginBottom: errorMessage ? 12 : 24 }}
            />

            {errorMessage && (
              <Text style={{ color: 'red', fontSize: 14, marginBottom: 16 }}>{errorMessage}</Text>
            )}

            <Button
              title={isLoading ? '전송 중...' : '재설정 링크 전송'}
              onPress={handleSendResetEmail}
              disabled={!email.trim() || isLoading}
            />
          </View>

          {/* 안내 문구 */}
          <View
            style={{
              backgroundColor: '#f8fafe',
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#e8f2ff',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: '#4A90E2',
                fontWeight: '600',
                marginBottom: 8,
              }}
            >
              📧 이메일을 받지 못하셨나요?
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                lineHeight: 20,
              }}
            >
              • 스팸 폴더를 확인해보세요{'\n'}• 이메일 주소가 정확한지 확인해보세요{'\n'}• 몇 분
              후에 다시 시도해보세요
            </Text>
          </View>

          {/* 로그인으로 돌아가기 */}
          <View
            style={{
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
              비밀번호가 기억나셨나요?
            </Text>
            <Pressable onPress={() => router.back()}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#4A90E2',
                  fontWeight: '600',
                }}
              >
                로그인하러 가기
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PasswordForgotScreen;
