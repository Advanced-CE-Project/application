import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const recentGroups = [
  { id: '1', name: '스터디 모임', date: '2025-05-10', location: '강남', tags: ['스터디'] },
  // ...더미 데이터
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 상단: 로고와 검색 아이콘 */}
      <View style={styles.header}>
        <Text style={styles.logo}>BeMo</Text>
        {/* 검색 아이콘은 실제로는 TouchableOpacity + Icon 사용 */}
        <TouchableOpacity onPress={() => navigation.navigate('모임검색')}>
          <Text style={styles.search}>🔍</Text>
        </TouchableOpacity>
      </View>
      {/* 중단: 최근 모임 카드 */}
      <FlatList
        data={recentGroups}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('모임상세', { id: item.id })}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text>{item.date} | {item.location}</Text>
            <Text>{item.tags.join(', ')}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  logo: { fontSize: 24, fontWeight: 'bold' },
  search: { fontSize: 24 },
  card: { padding: 16, margin: 8, backgroundColor: '#eee', borderRadius: 8 },
  groupName: { fontSize: 18, fontWeight: 'bold' },
});
