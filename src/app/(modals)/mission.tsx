import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAGS = ['운동', '스터디', '네트워킹', '문화생활', '취미'];

const MissionSettingScreen = () => {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
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
          미션 설정
        </Text>

        <Text style={{ fontSize: 16, color: '#333', marginBottom: 8 }}>제목</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder='예: 주말 등산 참여하기'
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 12,
            marginBottom: 20,
          }}
        />

        <Text style={{ fontSize: 16, color: '#333', marginBottom: 8 }}>설명</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder='미션에 대한 설명을 입력하세요.'
          multiline
          numberOfLines={4}
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 12,
            textAlignVertical: 'top',
            marginBottom: 20,
          }}
        />

        <Text style={{ fontSize: 16, color: '#333', marginBottom: 8 }}>관련 태그</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Pressable
                key={tag}
                onPress={() => toggleTag(tag)}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 16,
                  backgroundColor: isSelected ? '#4A90E2' : '#eee',
                }}
              >
                <Text style={{ color: isSelected ? '#fff' : '#333', fontSize: 14 }}>{tag}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() => {
            // TODO: Save mission logic
          }}
          style={{
            backgroundColor: '#4A90E2',
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>미션 생성하기</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default MissionSettingScreen;
