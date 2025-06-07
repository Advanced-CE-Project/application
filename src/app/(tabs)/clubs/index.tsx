import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MeetingCard } from '@/components/ui/meeting-card';
import { Spacer } from '@/components/ui/spacer';

// 더미 데이터 - 내가 만든 모임들
const MY_MEETINGS = [
  {
    id: '1',
    title: '주말 등산 모임',
    date: '4/15 (토)',
    location: '북한산 국립공원',
    tags: ['등산'],
    participants: {
      current: 8,
      max: 10,
    },
  },
  {
    id: '2',
    title: '영어 스터디',
    date: '4/18 (화)',
    location: '강남 스터디카페',
    tags: ['스터디'],
    participants: {
      current: 5,
      max: 8,
    },
  },
  {
    id: '3',
    title: '맛집 탐방',
    date: '5/20 (토)',
    location: '이태원 일대',
    tags: ['음식'],
    participants: {
      current: 3,
      max: 6,
    },
  },
];

const useClubs = () => {
  const insets = useSafeAreaInsets();

  const navigateToCreateMeeting = () => {
    // 새 모임 만들기 화면으로 이동
    // console.log('Navigate to create meeting');
    router.push('/meeting/create');
  };

  const navigateToMeetingDetail = (meetingId: string) => {
    // 모임 상세 페이지로 이동 (관리 모드)
    // console.log('Navigate to meeting detail:', meetingId);
    router.push(`/meeting/detail?id=${meetingId}&mode=manage`);
  };

  return {
    insets,
    navigateToCreateMeeting,
    navigateToMeetingDetail,
  };
};

const ClubsScreen = () => {
  const { insets, navigateToCreateMeeting, navigateToMeetingDetail } = useClubs();

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
              fontSize: 24,
              fontWeight: '600',
              color: '#333',
            }}
          >
            내가 만든 모임
          </Text>

          <Pressable
            onPress={navigateToCreateMeeting}
            style={{
              padding: 8,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#4A90E2',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name='plus' size={20} color='#fff' />
          </Pressable>
        </View>
      </View>

      {/* 스크롤 가능한 모임 리스트 */}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: insets.bottom + 16,
          }}
        >
          {MY_MEETINGS.length > 0 ? (
            <View style={{ gap: 16 }}>
              {MY_MEETINGS.map((meeting) => (
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
          ) : (
            // 빈 상태 UI
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 80,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: '#999',
                  marginBottom: 8,
                }}
              >
                아직 만든 모임이 없습니다
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#ccc',
                }}
              >
                새로운 모임을 만들어보세요!
              </Text>
            </View>
          )}

          <Spacer height={32} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ClubsScreen;
