// screens/NotificationScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const notifications = [
  { id: '1', title: '모임 일정 안내', content: '주말 등산 모임 일정이 변경되었습니다.' },
  { id: '2', title: '참가 신청 승인', content: '신청하신 모임에 참가가 승인되었습니다.' },
];

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>알림</Text>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 16, backgroundColor: '#f6f6f6', borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontWeight: 'bold' },
});
