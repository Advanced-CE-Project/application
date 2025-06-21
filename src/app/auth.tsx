import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';

const AuthScreen = () => {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.push('/');
  };

    const handleKakaoLogin = () => {
        // 카카오 로그인 로직 추가
        console.log('카카오 로그인');
    };

    const handleGoogleLogin = () => {
        // 구글 로그인 로직 추가
        console.log('구글 로그인');
    };

    const handleEmailLogin = () => {
        // 이메일 로그인 로직 추가
        console.log('이메일 로그인');
    };
    
  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#fff' }}>
      {/* 로고 */}
      <View
        style={{
          height: 180,
          backgroundColor: '#f0f0f0',
          borderRadius: 16,
          marginBottom: 24,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#e0e0e0',
        }}
      />

      {/* 로그인 폼 */}
      <TextInput
        placeholder="이메일"
        value={id}
        onChangeText={setId}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          fontSize: 16,
        }}
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          fontSize: 16,
        }}
      />
      <Pressable
        onPress={handleLogin}
        style={{
          backgroundColor: '#4A90E2',
          paddingVertical: 14,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>로그인</Text>
      </Pressable>

      {/* 구분선 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
        <Text style={{ marginHorizontal: 12, color: '#aaa' }}>또는</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
      </View>

      {/* 소셜 로그인 */}
      <Pressable
        onPress={() => {handleKakaoLogin()}}
        style={{
          backgroundColor: '#fee500',
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text style={{ color: '#000', fontWeight: '600' }}>카카오로 계속하기</Text>
      </Pressable>
      <Pressable
        onPress={() => {handleGoogleLogin()}}
        style={{
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#ddd',
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text style={{ color: '#000', fontWeight: '600' }}>Google로 계속하기</Text>
      </Pressable>
      <Pressable
        onPress={() => {handleEmailLogin()}}
        style={{
          backgroundColor: '#f0f4fa',
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#4A90E2', fontWeight: '600' }}>이메일로 회원가입</Text>
      </Pressable>
    </View>
  );
};

export default AuthScreen;
