import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/screens/use-auth';

const AuthScreen = () => {
  const {
    insets,
    formData,
    errorMessage,
    setFormData,
    handleLogin,
    handleKakaoLogin,
    handleGoogleLogin,
    handleEmailSignup,
    isLoading,
  } = useAuth();

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
          {/* 로고 섹션 */}
          <View style={{ alignItems: 'center', marginBottom: 48 }}>
            <View
              style={{
                width: 120,
                height: 120,
                backgroundColor: '#f8fafe',
                borderRadius: 60,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 24,
                borderWidth: 2,
                borderColor: '#e8f2ff',
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: '#4A90E2',
                }}
              >
                BeMo
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: '#666',
                textAlign: 'center',
                lineHeight: 24,
              }}
            >
              모임을 통해 새로운 경험을{'\n'}만나보세요
            </Text>
          </View>

          {/* 로그인 폼 */}
          <View style={{ marginBottom: 32 }}>
            <Input
              disabled={isLoading}
              label='이메일'
              placeholder='이메일을 입력하세요'
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType='email-address'
              autoCapitalize='none'
              containerStyle={{ marginBottom: 16 }}
            />

            <Input
              disabled={isLoading}
              label='비밀번호'
              placeholder='비밀번호를 입력하세요'
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
              containerStyle={{ marginBottom: errorMessage ? 12 : 24 }}
            />

            {errorMessage && (
              <Text style={{ color: 'red', fontSize: 14, marginBottom: 16 }}>{errorMessage}</Text>
            )}

            <Button
              title={isLoading ? '로그인 중...' : '로그인'}
              onPress={handleLogin}
              disabled={!formData.email || !formData.password || isLoading}
            />

            {/* 비밀번호 찾기 */}
            <Pressable
              style={{
                alignItems: 'center',
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: '#666',
                }}
              >
                비밀번호를 잊으셨나요?
              </Text>
            </Pressable>
          </View>

          {/* 구분선 */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 32,
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: '#f0f0f0' }} />
            <Text
              style={{
                marginHorizontal: 16,
                color: '#999',
                fontSize: 14,
              }}
            >
              또는
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#f0f0f0' }} />
          </View>

          {/* 소셜 로그인 */}
          <View style={{ gap: 12, marginBottom: 32 }}>
            {/* 카카오 로그인 */}
            <Pressable
              onPress={handleKakaoLogin}
              style={{
                backgroundColor: '#FEE500',
                paddingVertical: 16,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Text style={{ color: '#000', fontWeight: '600', fontSize: 16 }}>
                카카오로 계속하기
              </Text>
            </Pressable>

            {/* 구글 로그인 */}
            <Pressable
              onPress={handleGoogleLogin}
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#e0e0e0',
                paddingVertical: 16,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Text style={{ color: '#333', fontWeight: '600', fontSize: 16 }}>
                Google로 계속하기
              </Text>
            </Pressable>
          </View>

          {/* 회원가입 링크 */}
          <View
            style={{
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
              아직 계정이 없으신가요?
            </Text>
            <Pressable onPress={handleEmailSignup}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#4A90E2',
                  fontWeight: '600',
                }}
              >
                이메일로 회원가입
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthScreen;
