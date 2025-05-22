import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const tags = ['친절함', '적극적', '시간엄수', '유쾌함'];

export default function EvaluationScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelected(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>모임 평가</Text>
      <Text>별점</Text>
      <View style={styles.stars}>
        {/* 별점 컴포넌트는 별도 구현 */}
        <Text>⭐⭐⭐⭐⭐</Text>
      </View>
      <Text style={styles.subtitle}>참가자 평가</Text>
      <View style={styles.tagRow}>
        {tags.map(tag => (
          <TouchableOpacity key={tag} style={[styles.tag, selected.includes(tag) && styles.selectedTag]} onPress={() => toggleTag(tag)}>
            <Text>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={{ color: '#fff' }}>제출</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  stars: { flexDirection: 'row', marginVertical: 8 },
  subtitle: { marginTop: 20, fontWeight: 'bold' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 10 },
  tag: { padding: 8, backgroundColor: '#eee', borderRadius: 20, marginRight: 8, marginBottom: 8 },
  selectedTag: { backgroundColor: '#aee' },
  submitBtn: { marginTop: 20, backgroundColor: '#007aff', padding: 12, borderRadius: 8, alignItems: 'center' },
});