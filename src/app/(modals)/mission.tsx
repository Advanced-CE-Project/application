import React, { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, TextInput, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

const TAGS = ['운동', '스터디', '네트워킹', '문화생활', '취미'];
const PROOF_METHODS = ['사진 업로드', '체크박스', '텍스트 입력'];

const MissionSettingScreen = () => {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [proofMethod, setProofMethod] = useState('사진 업로드');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const onChangeDate = (_: any, selectedDate?: Date) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(Platform.OS === 'ios');
    setDeadline(currentDate);
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

        {/* 제목 */}
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

        {/* 설명 */}
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

        {/* 태그
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
        </View> */}

        {/* 마감일 */}
        <Text style={{ fontSize: 16, color: '#333', marginBottom: 8 }}>마감일</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 12,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>
            {deadline.toLocaleDateString('ko-KR')}
          </Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode='date'
            display='default'
            onChange={onChangeDate}
          />
        )}

        {/* 인증 방식 */}
        <Text style={{ fontSize: 16, color: '#333', marginBottom: 8 }}>인증 방식</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {PROOF_METHODS.map((method) => {
            const isSelected = proofMethod === method;
            return (
              <Pressable
                key={method}
                onPress={() => setProofMethod(method)}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 16,
                  backgroundColor: isSelected ? '#4A90E2' : '#eee',
                }}
              >
                <Text style={{ color: isSelected ? '#fff' : '#333', fontSize: 14 }}>{method}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* 알림 설정 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
          <Text style={{ fontSize: 16, color: '#333', flex: 1 }}>알림 설정</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor={notificationsEnabled ? '#4A90E2' : '#ccc'}
            trackColor={{ true: '#a8c8f0', false: '#ddd' }}
          />
        </View>

        {/* 미션 생성 버튼 */}
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
