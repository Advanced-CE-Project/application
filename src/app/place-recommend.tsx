import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const places = [
  { id: '1', name: '카페베네 강남점', distance: '2.5km', rating: 4.2 },
  { id: '2', name: '스타벅스 역삼', distance: '2.8km', rating: 4.5 },
];

export default function PlaceRecommendScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>장소 추천</Text>
      <View style={styles.mapBox}>
        <Text>지도 영역</Text>
      </View>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.placeRow}>
            <Text>{item.name}</Text>
            <Text>{item.distance} | ⭐{item.rating}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  mapBox: { height: 120, backgroundColor: '#eee', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  placeRow: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
});
