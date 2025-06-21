import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

const AuthScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 처리
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
        placeholder="아이디"
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
