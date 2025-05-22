<<<<<<< HEAD
// screens/ManageMeetingScreen.tsx
=======
>>>>>>> fdd7784 (feat: add auth)
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const meetings = [
  { id: '1', name: '주말 등산 모임', date: '4/15', status: '진행 예정' },
  { id: '2', name: '책 읽기 스터디', date: '4/20', status: '모집 중' },
];

export default function ManageMeetingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>내가 만든 모임</Text>
      <FlatList
        data={meetings}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.date} | {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 16, backgroundColor: '#f6f6f6', borderRadius: 8, marginBottom: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
<<<<<<< HEAD
});
=======
});
>>>>>>> fdd7784 (feat: add auth)
