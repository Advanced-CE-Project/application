import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MeetingCard } from '@/components/ui/meeting-card';
import { Spacer } from '@/components/ui/spacer';
import { Tag } from '@/components/ui/tag';

// 카테고리 데이터
const CATEGORIES = ['전체', '운동', '스터디', '친목', '음식', '여행'];

// 검색 결과 더미 데이터
const SEARCH_RESULTS = [
  {
    id: '1',
    title: '테니스 초보 모임',
    date: '4/20 (목)',
    location: '강남 테니스장',
    tags: ['운동'],
    participants: {
      current: 4,
      max: 8,
    },
  },
  {
    id: '2',
    title: '헬스장 같이 가요',
    date: '4/22 (토)',
    location: '사서동 피트니스',
    tags: ['운동'],
    participants: {
      current: 3,
      max: 6,
    },
  },
];

const useSearch = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedLocation, setSelectedLocation] = useState('서울시 강남구');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('이번 주');

  const goBack = () => {
    router.back();
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    // 실제 검색 로직 구현
    console.log('Searching for:', text);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    console.log('Selected category:', category);
  };

  const openLocationFilter = () => {
    console.log('Open location filter');
    // 위치 필터 모달 열기
  };

  const openTimeFilter = () => {
    console.log('Open time filter');
    // 시간 필터 모달 열기
  };

  const navigateToMeetingDetail = (meetingId: string) => {
    console.log('Navigate to meeting detail:', meetingId);
  };

  return {
    insets,
    searchText,
    selectedCategory,
    selectedLocation,
    selectedTimeFilter,
    goBack,
    handleSearch,
    selectCategory,
    openLocationFilter,
    openTimeFilter,
    navigateToMeetingDetail,
  };
};

const SearchScreen = () => {
  const {
    insets,
    searchText,
    selectedCategory,
    selectedLocation,
    selectedTimeFilter,
    goBack,
    handleSearch,
    selectCategory,
    openLocationFilter,
    openTimeFilter,
    navigateToMeetingDetail,
  } = useSearch();

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
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#333',
            }}
          >
            검색
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          {/* 검색 입력창 */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f8f8f8',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginBottom: 20,
            }}
          >
            <Feather name='search' size={20} color='#999' style={{ marginRight: 8 }} />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: '#333',
              }}
              placeholder='모임 검색'
              placeholderTextColor='#999'
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>

          {/* 카테고리 태그들 - 가로 스크롤 */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {CATEGORIES.map((category, index) => (
              <Tag
                key={category}
                title={category}
                selected={selectedCategory === category}
                onPress={() => selectCategory(category)}
                style={{
                  marginRight: 8,
                }}
              />
            ))}
          </ScrollView>

          {/* 위치 및 시간 필터 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Pressable
              onPress={openLocationFilter}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Feather name='map-pin' size={16} color='#4A90E2' style={{ marginRight: 4 }} />
              <Text
                style={{
                  fontSize: 14,
                  color: '#4A90E2',
                }}
              >
                {selectedLocation}
              </Text>
            </Pressable>

            <Pressable
              onPress={openTimeFilter}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Feather name='calendar' size={16} color='#4A90E2' style={{ marginRight: 4 }} />
              <Text
                style={{
                  fontSize: 14,
                  color: '#4A90E2',
                }}
              >
                {selectedTimeFilter}
              </Text>
            </Pressable>
          </View>

          {/* 지도 영역 */}
          <View
            style={{
              height: 200,
              backgroundColor: '#f0f0f0',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#999',
              }}
            >
              지도
            </Text>
          </View>

          {/* 검색 결과 */}
          <View style={{ gap: 16 }}>
            {SEARCH_RESULTS.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                title={meeting.title}
                date={meeting.date}
                location={meeting.location}
                tags={meeting.tags}
                participants={meeting.participants}
                onPress={() => navigateToMeetingDetail(meeting.id)}
              />
            ))}
          </View>

          <Spacer height={32} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
