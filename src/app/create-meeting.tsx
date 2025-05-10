// screens/CreateMeetingScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function CreateMeetingScreen() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>모임명</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="모임명을 입력하세요" />
      <Text style={styles.label}>날짜 및 시간</Text>
      <TouchableOpacity style={styles.input}>
        <Text>날짜 선택</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input}>
        <Text>시간 선택</Text>
      </TouchableOpacity>
      <Text style={styles.label}>모임 설명</Text>
      <TextInput style={styles.input} value={desc} onChangeText={setDesc} placeholder="설명을 입력하세요" multiline />
      <Button title="모임 생성" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { marginTop: 16, marginBottom: 4, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 6, padding: 12, marginBottom: 8 },
});
