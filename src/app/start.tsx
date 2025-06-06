import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const useStart = () => {
  const [nickname, setNickname] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const handleLogin = () => {
      // 로그인 로직 구현
      console.log('로그인 시도:', nickname);
  };

  const handleSignUp = () => {
    // 회원가입 로직 구현
    console.log('회원가입 시도:', nickname);
  };
 
  return {
    nickname,
    setNickname,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
  };
}

const StartScreen = () => {
    const { nickname, setNickname, password, setPassword, handleLogin, handleSignUp } = useStart();

    return (
      <View style={{ flex: 1, backgroundColor: '#fff', padding: 24, justifyContent: 'center' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#4A90E2' }}>BeMo</Text>
        <Text style={{ fontSize: 16, color: '#666', marginBottom: 40 }}>로그인</Text>
        
        {/* 로그인 */}
        <Input
          value={nickname}
          onChangeText={setNickname}
          placeholder='이메일'
          containerStyle={{ marginBottom: 24 }}
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder='비밀번호'
          containerStyle={{ marginBottom: 24 }}
        />
        <Button
          onPress={handleLogin}
          style={{
            backgroundColor: '#4A90E2',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >로그인</Button>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
            <View style={{ height: 1, backgroundColor: '#f5f5f5', marginHorizontal: -16, marginBottom: 24}}/>
            <Text>또는</Text>
            <View style={{ height: 1, backgroundColor: '#f5f5f5', marginHorizontal: -16, marginBottom: 24}}/>
        </View>

        <Button
          onPress={(handleSignUp)}
          style={{
            backgroundColor: '#f0f0f0',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >카카오로 회원가입</Button>
        <Button
          onPress={(handleSignUp)}
          style={{
            backgroundColor: '#f0f0f0',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >구글로 회원가입</Button>
      </View>
    );
};