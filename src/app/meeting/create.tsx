import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const useCreateMeetingForm = () => {
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [participantCount, setParticipantCount] = useState(5);
  const [description, setDescription] = useState('');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(
        (prev) =>
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            prev.getHours(),
            prev.getMinutes(),
          ),
      );
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (selectedTime) {
      setDate(
        (prev) =>
          new Date(
            prev.getFullYear(),
            prev.getMonth(),
            prev.getDate(),
            selectedTime.getHours(),
            selectedTime.getMinutes(),
          ),
      );
    }
    setShowTimePicker(false);
  };

  return {
    insets,
    title,
    setTitle,
    date,
    setDate,
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
  };
};

const CreateMeetingScreen = () => {
  const navigation = useNavigation();
  const {
    insets,
    title,
    setTitle,
    date,
    setDate,
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

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 섹션 */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: 8,
            }}
          >
            새 모임 만들기
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#666',
              lineHeight: 22,
            }}
          >
            멋진 모임을 만들어 사람들과 함께하세요
          </Text>
        </View>

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
              <Feather name='edit-3' size={16} color='#fff' />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>모임명</Text>
          </View>
          <Input
            value={title}
            onChangeText={setTitle}
            placeholder='모임의 이름을 입력하세요'
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
              <Feather name='calendar' size={16} color='#fff' />
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
              <Feather name='chevron-down' size={20} color='#666' />
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
              <Feather name='chevron-down' size={20} color='#666' />
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
              <Feather name='users' size={16} color='#fff' />
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
              maximumValue={100}
              step={1}
              value={participantCount}
              onValueChange={setParticipantCount}
              minimumTrackTintColor='#4A90E2'
              maximumTrackTintColor='#e0e0e0'
              thumbTintColor='#4A90E2'
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
              <Text style={{ fontSize: 12, color: '#999' }}>100명</Text>
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
              <Feather name='file-text' size={16} color='#fff' />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>모임 설명</Text>
          </View>
          <Input
            value={description}
            onChangeText={setDescription}
            placeholder='모임에 대한 설명을 입력하세요&#10;예: 등산 초보자도 환영합니다!'
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

        {/* 생성 완료 버튼 */}
        <Button
          title='모임 생성하기'
          onPress={() => {
            // TODO: DB 연동 로직 추가 예정
            console.log({
              title,
              date,
              participantCount,
              description,
            });
            navigation.goBack();
          }}
        />
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode='date'
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            if (event.type === 'set' && selectedDate) {
              setDate(
                (prev) =>
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    prev.getHours(),
                    prev.getMinutes(),
                  ),
              );
            }
            setShowDatePicker(Platform.OS === 'ios');
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode='time'
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => {
            if (event.type === 'set' && selectedTime) {
              setDate(
                (prev) =>
                  new Date(
                    prev.getFullYear(),
                    prev.getMonth(),
                    prev.getDate(),
                    selectedTime.getHours(),
                    selectedTime.getMinutes(),
                  ),
              );
            }
            setShowTimePicker(Platform.OS === 'ios');
          }}
        />
      )}
    </View>
  );
};

export default CreateMeetingScreen;
