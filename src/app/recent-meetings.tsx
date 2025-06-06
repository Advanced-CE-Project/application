import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MeetingCard } from '@/components/ui/meeting-card';

const RECENT_MEETINGS = [
  {
    id: '1',
    title: '주말 등산 모임',
    date: '4월 15일 (토) 오전 8시',
    location: '북한산 국립공원',
    tags: ['등산'],
  },
  {
    id: '2',
    title: '영어 스터디',
    date: '4월 18일 (화) 오후 7시',
    location: '강남 스터디카페',
    tags: ['스터디'],
  },
  {
    id: '5',
    title: '맛집 탐방 번개',
    date: '4월 20일 (목) 오후 6시',
    location: '홍대입구역 근처',
    tags: ['식사', '친목'],
  },
];

const useRecentMeetings = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const navigateToMeetingDetail = (meetingId: string) => {
    // 모임 상세 페이지로 이동
    console.log('Navigate to meeting:', meetingId);
  };

  return {
    insets,
    navigateToMeetingDetail,
  };
};

const RecentMeetingsScreen = () => {
  const { insets, navigateToMeetingDetail } = useRecentMeetings();

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
            최근 모임
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: insets.bottom + 16,
          }}
        >
          <View style={{ gap: 16, width: '100%' }}>
            {RECENT_MEETINGS.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                title={meeting.title}
                date={meeting.date}
                location={meeting.location}
                tags={meeting.tags}
                onPress={() => navigateToMeetingDetail(meeting.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RecentMeetingsScreen;