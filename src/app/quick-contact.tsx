// screens/QuickContactScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const messages = ['어디세요?', '도착했어요!', '곧 도착합니다', '연락주세요'];

export default function QuickContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>빠른 연락</Text>
      {messages.map(msg => (
        <TouchableOpacity key={msg} style={styles.btn}>
          <Text>{msg}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.contactRow}>
        <Text>모임장: 오호석</Text>
        <TouchableOpacity>
          <Text style={{ color: '#007aff' }}>전화</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  btn: { backgroundColor: '#f6f6f6', padding: 14, borderRadius: 8, marginVertical: 6, alignItems: 'center' },
  contactRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
});
