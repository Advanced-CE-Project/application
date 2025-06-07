import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EVALUATION_TAGS = [
  '분위기 메이커였다',
  '시간 약속을 잘 지켰다',
  '다시 만나고 싶다',
  '배려심이 있다',
  '활발하고 긍정적이다',
  '조용하고 성실하다',
];

const EvaluationScreen = () => {
  const insets = useSafeAreaInsets();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 32,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#333' }}>
          참가자 평가
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 12, color: '#333' }}>
          해당 참가자는 어떤 사람이었나요?
        </Text>

        <View style={{ gap: 12, marginBottom: 32 }}>
          {EVALUATION_TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Pressable
                key={tag}
                onPress={() => toggleTag(tag)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  backgroundColor: isSelected ? '#4A90E2' : '#f0f0f0',
                }}
              >
                <Text style={{ color: isSelected ? '#fff' : '#333', fontSize: 15 }}>
                  {tag}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() => {
            // TODO: 평가 저장 로직
          }}
          style={{
            backgroundColor: '#4A90E2',
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>평가 제출하기</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EvaluationScreen;
