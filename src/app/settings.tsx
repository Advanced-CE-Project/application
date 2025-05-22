import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';

export default function SettingsScreen() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>설정</Text>
      <View style={styles.row}>
        <Text>푸시 알림</Text>
        <Switch value={push} onValueChange={setPush} />
      </View>
      <View style={styles.row}>
        <Text>이메일 알림</Text>
        <Switch value={email} onValueChange={setEmail} />
      </View>
      {/* 기타 설정 항목 추가 */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12 },
});