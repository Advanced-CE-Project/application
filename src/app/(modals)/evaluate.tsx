import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Rating } from 'react-native-ratings';

import { Button } from '@/components/ui/button';

const mockParticipants = ['김참여', '이산악'];
const keywordOptions = ['친절함', '적극적', '시간약속', '지식공유'];

const EvaluateMeetingScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<{ [name: string]: string[] }>({});

  const toggleKeyword = (name: string, keyword: string) => {
    setSelectedKeywords((prev) => {
      const current = prev[name] || [];
      const exists = current.includes(keyword);
      return {
        ...prev,
        [name]: exists ? current.filter((k) => k !== keyword) : [...current, keyword],
      };
    });
  };

  const handleSubmit = () => {
    console.log({ rating, feedback, selectedKeywords });
    router.back();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 12, paddingHorizontal: 20 }}>
      {/* 별점 */}
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
        모임에 대한 만족도를 남겨주세요!
      </Text>
      <Rating
        startingValue={0}
        imageSize={32}
        onFinishRating={(val: number) => setRating(val)}
        style={{ marginBottom: 12, alignSelf: 'flex-start' }}
      />

      {/* 피드백 */}
      <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 12 }}>
        모임에 대한 피드백 (선택사항)
      </Text>
      <TextInput
        multiline
        placeholder='모임에 대한 의견을 자유롭게 남겨주세요'
        value={feedback}
        onChangeText={setFeedback}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 12,
          minHeight: 100,
          marginBottom: 30,
        }}
      />

      {/* 참가자 평가 */}
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
        모임을 함께한 참가자를 태그로 평가해주세요!
      </Text>

      {mockParticipants.map((name) => (
        <View
          key={name}
          style={{
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            padding: 16,
            backgroundColor: '#F9FAFB',
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '500', marginBottom: 10 }}>{name}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {keywordOptions.map((kw) => {
              const isSelected = selectedKeywords[name]?.includes(kw);
              return (
                <Pressable
                  key={kw}
                  onPress={() => toggleKeyword(name, kw)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    backgroundColor: isSelected ? '#4F46E5' : '#E5E7EB',
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: isSelected ? '#fff' : '#111827' }}>{kw}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}

      {/* 참가자 평가 끝 */}

      {/* 모임 평가 완료 */}

      {/* 제출 버튼 */}
      <Button title='제출하기' onPress={handleSubmit}></Button>
    </ScrollView>
  );
};

export default EvaluateMeetingScreen;
