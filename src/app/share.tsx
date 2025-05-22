import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const files = [
  { id: '1', name: '등산 코스 안내.pdf' },
  { id: '2', name: '준비물 체크리스트.xlsx' },
];

export default function ShareScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>자료 공유</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>사진</Text>
        <View style={styles.photoRow}>
          <View style={styles.photoBox} />
          <View style={styles.photoBox} />
          <TouchableOpacity style={styles.photoBox}><Text>+3</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>파일</Text>
        <FlatList
          data={files}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.fileRow}>
              <Text>{item.name}</Text>
              <TouchableOpacity><Text>다운로드</Text></TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 6 },
  photoRow: { flexDirection: 'row', gap: 8 },
  photoBox: { width: 60, height: 60, backgroundColor: '#eee', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  fileRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
});
