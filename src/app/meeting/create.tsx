import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useCreateMeetingForm } from '@/hooks/screens/use-create-club';

// API 함수 import
import { createClub, getMyClubs } from '@/services/clubs';

const CreateMeetingScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const {
    title,
    setTitle,
    date,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
    participantCount,
    setParticipantCount,
    description,
    setDescription,
    handleDateChange,
    handleTimeChange,
  } = useCreateMeetingForm();

  // 로딩 상태 (필요 시 추가)
  const [loading, setLoading] = useState(false);

  const handleCreateClub = async () => {
    if (!title) {
      Alert.alert('오류', '모임명을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      const startDateTime = date.toISOString();

      const created = await createClub({
        name: title,
        description,
        maxParticipants: participantCount,
        startDateTime,
      });

      Alert.alert('성공', '모임이 성공적으로 생성되었습니다.');

      const myClubs = await getMyClubs();
      console.log('내 모임 목록:', myClubs);

      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '모임 생성 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 40,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 모임명 섹션 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#4A90E2',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Feather name="edit-3" size={16} color="#fff" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>모임명</Text>
          </View>
          <Input
            value={title}
            onChangeText={setTitle}
            placeholder="모임의 이름을 입력하세요"
            style={{
              backgroundColor: '#fff',
              borderColor: '#e0e0e0',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
            }}
            containerStyle={{ marginBottom: 0 }}
          />
        </View>

        {/* 날짜 및 시간 섹션 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#34c759',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Feather name="calendar" size={16} color="#fff" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>날짜 및 시간</Text>
          </View>

          <View style={{ gap: 12 }}>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 16, color: '#1a1a1a' }}>
                {date.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              <Feather name="chevron-down" size={20} color="#666" />
            </Pressable>

            <Pressable
              onPress={() => setShowTimePicker(true)}
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 16, color: '#1a1a1a' }}>
                {date.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </Text>
              <Feather name="chevron-down" size={20} color="#666" />
            </Pressable>
          </View>
        </View>

        {/* 모집 인원 섹션 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#ff9500',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Feather name="users" size={16} color="#fff" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>모집 인원</Text>
          </View>

          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 20,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: '#4A90E2',
                marginBottom: 8,
              }}
            >
              {participantCount}명
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                marginBottom: 16,
              }}
            >
              최대 모집 인원을 설정하세요
            </Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={1}
              maximumValue={15}
              step={1}
              value={participantCount}
              onValueChange={setParticipantCount}
              minimumTrackTintColor="#4A90E2"
              maximumTrackTintColor="#e0e0e0"
              thumbTintColor="#4A90E2"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 12, color: '#999' }}>1명</Text>
              <Text style={{ fontSize: 12, color: '#999' }}>15명</Text>
            </View>
          </View>
        </View>

        {/* 모임 설명 섹션 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            marginBottom: 32,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#8e44ad',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Feather name="file-text" size={16} color="#fff" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>모임 설명</Text>
          </View>
          <Input
            value={description}
            onChangeText={setDescription}
            placeholder={'모임에 대한 설명을 입력하세요\n예: 등산 초보자도 환영합니다!'}
            multiline
            numberOfLines={4}
            style={{
              backgroundColor: '#fff',
              borderColor: '#e0e0e0',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              height: 120,
              textAlignVertical: 'top',
              fontSize: 16,
              lineHeight: 22,
            }}
            containerStyle={{ marginBottom: 0 }}
          />
        </View>

        {/* 모임 생성 버튼 */}
        <Button
          title={loading ? '생성 중...' : '모임 생성하기'}
          disabled={loading}
          onPress={handleCreateClub}
        />
      </ScrollView>

      {/* 날짜 선택기 */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      {/* 시간 선택기 */}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default CreateMeetingScreen;
