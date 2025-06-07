import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MeetingCard } from '@/components/ui/meeting-card';
import { Spacer } from '@/components/ui/spacer';

// 더미 데이터
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
];

const RECOMMENDED_MEETINGS = [
  {
    id: '3',
    title: '주말 테니스 클럽',
    date: '4월 22일 (토) 오후 2시',
    location: '올림픽공원 테니스장',
    tags: ['운동', '테니스'],
  },
  {
    id: '4',
    title: 'IT 개발자 네트워킹',
    date: '4월 20일 (목) 오후 7시',
    location: '강남역 근처',
    tags: ['네트워킹', 'IT'],
  },
];

const useHome = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const navigateToSearch = () => {
    router.push('/search');
  };

  const navigateToMeetingDetail = (meetingId: string) => {
    // 모임 상세 페이지로 이동
    // console.log('Navigate to meeting:', meetingId);
    router.push(`/meeting-detail?id=${meetingId}`);
  };

  const viewAllRecent = () => {
    // 최근 모임 전체 보기
    // console.log('View all recent meetings');
    router.push('/recent-meetings');
  };

  return {
    insets,
    navigateToSearch,
    navigateToMeetingDetail,
    viewAllRecent,
  };
};

const HomeScreen = () => {
  const { insets, navigateToSearch, navigateToMeetingDetail, viewAllRecent } = useHome();

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
              fontSize: 28,
              fontWeight: 'bold',
              color: '#4A90E2',
            }}
          >
            BeMo
          </Text>

          <Pressable
            onPress={navigateToSearch}
            style={{
              padding: 8,
            }}
          >
            <Feather name='search' size={24} color='#333' />
          </Pressable>
        </View>
      </View>

      {/* 스크롤 가능한 콘텐츠 */}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: insets.bottom + 16,
          }}
        >
          {/* 최근 모임 섹션 */}
          <View style={{ marginBottom: 24 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
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

              <Pressable onPress={viewAllRecent}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#4A90E2',
                  }}
                >
                  더보기
                </Text>
              </Pressable>
            </View>

            {/* 최근 모임 카드들 */}
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
              }}
            >
              {RECENT_MEETINGS.map((meeting, index) => (
                <MeetingCard
                  key={meeting.id}
                  title={meeting.title}
                  date={meeting.date}
                  location={meeting.location}
                  tags={meeting.tags}
                  onPress={() => navigateToMeetingDetail(meeting.id)}
                  style={{
                    flex: 1,
                  }}
                />
              ))}
            </View>
          </View>

          {/* 구분선 */}
          <View
            style={{
              height: 8,
              backgroundColor: '#f5f5f5',
              marginHorizontal: -16,
              marginBottom: 24,
            }}
          />

          {/* 추천 모임 섹션 */}
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#333',
                marginBottom: 16,
              }}
            >
              추천 모임
            </Text>

            {/* 추천 모임 카드들 */}
            <View style={{ gap: 16 }}>
              {RECOMMENDED_MEETINGS.map((meeting) => (
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

          <Spacer height={32} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
