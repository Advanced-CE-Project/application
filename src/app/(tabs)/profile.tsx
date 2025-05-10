// screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native';
import { COLORS } from "./theme";

export default function ProfileScreen() {
  const [nickname, setNickname] = useState('홍길동');
  const [bio, setBio] = useState('자기소개를 입력하세요.');

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://placehold.co/100x100' }} style={styles.avatar} />
      <TextInput style={styles.input} value={nickname} onChangeText={setNickname} />
      <TextInput style={styles.input} value={bio} onChangeText={setBio} multiline />
      <Button title="설정" onPress={() => { /* 설정 화면 이동 */ }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  input: { width: '80%', borderBottomWidth: 1, marginBottom: 12, fontSize: 16 },
});
