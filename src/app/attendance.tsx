// screens/AttendanceScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const members = [
  { id: '1', name: '김철수', checked: true },
  { id: '2', name: '이안나', checked: false },
];

export default function AttendanceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>출결 관리</Text>
      <View style={styles.qrBox}>
        <Text>QR 코드</Text>
      </View>
      <FlatList
        data={members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberRow}>
            <Text>{item.name}</Text>
            <Text>{item.checked ? '출석 완료' : '미확인'}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  qrBox: { height: 120, backgroundColor: '#eee', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  memberRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
});
