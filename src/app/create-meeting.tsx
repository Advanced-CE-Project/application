import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Slider from '@react-native-community/slider';

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
    setDate((prev) =>
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        prev.getHours(),
        prev.getMinutes()
      )
    );
  }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (selectedTime) {
      setDate((prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth(),
          prev.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes()
        )
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

const CreateMeeting = () => {
  const navigation = useNavigation();
  const {
    insets,
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

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 고정 헤더 */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#333' }}>
            모임 생성
          </Text>
        </View>
      </View>

      {/* 스크롤 가능한 콘텐츠 */}
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16, paddingTop: 24 }}>
          {/* 모임명 */}
          <Input
            label="모임명"
            value={title}
            onChangeText={setTitle}
            placeholder="모임의 이름을 입력하세요"
            containerStyle={{ marginBottom: 24 }}
          />

          {/* 날짜 선택 */}
          <Text>날짜 및 시간</Text>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
            }}
          >
            <Text>{date.toLocaleDateString()}</Text>
          </Pressable>
          <Pressable
            onPress={() => setShowTimePicker(true)}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <Text>
              {date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Pressable>

          {/* 인원 수 */}
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 3 }}>
            모집 인원
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 3 }}>{participantCount}명</Text>
          <Slider
            style={{ width: '100%', height: 40, marginBottom: 20 }}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={participantCount}
            onValueChange={(value) => setParticipantCount(value)}
            minimumTrackTintColor="#4a4a4a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#4a4a4a"
          />

          {/* 설명 */}
          <Input
            label="모임 설명"
            value={description}
            onChangeText={setDescription}
            placeholder="모임에 대한 설명을 입력하세요"
            multiline
            numberOfLines={4}
            style={{
              height: 100,
              textAlignVertical: 'top',
            }}
            containerStyle={{ marginBottom: 24 }}
          />

          {/* 생성 완료 버튼 */}
          <Button
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
          >
            생성 완료
          </Button>
        </View>
      </ScrollView>

        {showDatePicker && (
        <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
            if (event.type === 'set' && selectedDate) {
                setDate((prev) =>
                new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    prev.getHours(),
                    prev.getMinutes()
                )
                );
            }
            setShowDatePicker(Platform.OS === 'ios'); // Android일 경우 picker 닫기
            }}
        />
        )}

        {showTimePicker && (
        <DateTimePicker
            value={date}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedTime) => {
            if (event.type === 'set' && selectedTime) {
                setDate((prev) =>
                new Date(
                    prev.getFullYear(),
                    prev.getMonth(),
                    prev.getDate(),
                    selectedTime.getHours(),
                    selectedTime.getMinutes()
                )
                );
            }
            setShowTimePicker(Platform.OS === 'ios');
            }}
        />
        )}

    </View>
  );
};

export default CreateMeeting;
