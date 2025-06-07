import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
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
    router.push(`/meeting/detail?id=${meetingId}`);
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
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: 8,
            }}
          >
            최근 모임
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#666',
              lineHeight: 22,
            }}
          >
            참여했던 모임들을 확인해보세요
          </Text>
        </View>

        {/* 최근 모임 리스트 */}
        {RECENT_MEETINGS.length > 0 ? (
          <View style={{ gap: 16 }}>
            {RECENT_MEETINGS.map((meeting, index) => (
              <View
                key={meeting.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  elevation: 4,
                  borderWidth: 1,
                  borderColor: '#f0f0f0',
                }}
              >
                <MeetingCard
                  title={meeting.title}
                  date={meeting.date}
                  location={meeting.location}
                  tags={meeting.tags}
                  onPress={() => navigateToMeetingDetail(meeting.id)}
                  style={{
                    shadowColor: 'transparent',
                    elevation: 0,
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                    padding: 0,
                    margin: 0,
                  }}
                />
              </View>
            ))}
          </View>
        ) : (
          // 빈 상태 UI
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 80,
              backgroundColor: '#f8f9fa',
              borderRadius: 16,
              marginTop: 40,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#e0e0e0',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Feather name='calendar' size={36} color='#999' />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: 8,
              }}
            >
              최근 모임이 없습니다
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
                paddingHorizontal: 20,
              }}
            >
              새로운 모임에 참여해보세요
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default RecentMeetingsScreen;
