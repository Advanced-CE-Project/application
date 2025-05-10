// screens/MissionScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';

export default function MissionScreen() {
  const [mission, setMission] = useState('');
  const [desc, setDesc] = useState('');
  const [period, setPeriod] = useState('');
  const [enabled, setEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>미션명</Text>
      <TextInput style={styles.input} value={mission} onChangeText={setMission} placeholder="미션명을 입력하세요" />
      <Text style={styles.label}>미션 설명</Text>
      <TextInput style={styles.input} value={desc} onChangeText={setDesc} placeholder="설명을 입력하세요" />
      <Text style={styles.label}>미션 기간</Text>
      <TextInput style={styles.input} value={period} onChangeText={setPeriod} placeholder="예: 4/15~4/21" />
      <View style={styles.row}>
        <Text>복수 인증 허용</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
      <Button title="미션 생성하기" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { marginTop: 16, marginBottom: 4, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 6, padding: 12, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 12 },
});
