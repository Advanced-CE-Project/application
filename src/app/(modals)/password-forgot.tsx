import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PasswordForgotScreen = () => {
  const [email, setEmail] = useState('');

  const handleSendResetEmail = () => {
    // TODO: 비밀번호 재설정 로직 구현
    console.log('Password reset for:', email);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 섹션 */}
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#333',
              marginBottom: 8,
            }}
          >
            비밀번호 찾기
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              lineHeight: 20,
            }}
          >
            가입했던 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          {/* 이메일 입력 카드 */}
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <Input
              label='이메일'
              placeholder='가입했던 이메일을 입력하세요'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              containerStyle={{ marginBottom: 20 }}
            />

            <Button
              title='재설정 링크 전송'
              onPress={handleSendResetEmail}
              disabled={!email.trim()}
            />
          </View>

          {/* 안내 카드 */}
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#333',
                marginBottom: 12,
              }}
            >
              📧 이메일을 받지 못하셨나요?
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                lineHeight: 22,
              }}
            >
              • 스팸 폴더를 확인해보세요{'\n'}• 이메일 주소가 정확한지 확인해보세요{'\n'}• 몇 분
              후에 다시 시도해보세요
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PasswordForgotScreen;
