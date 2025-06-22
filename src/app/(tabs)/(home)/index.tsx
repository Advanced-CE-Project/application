import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MeetingCard } from '@/components/ui/meeting-card';
import { Spacer } from '@/components/ui/spacer';
import { getClubByInterest, getClubRecentlyJoined } from '@/services/clubs';
import useMe from '@/hooks/use-me';
import { formatShortKoreanDateTime } from '@/lib/date';

interface Club {
  id: string;
  name: string;
  description: string;
  tags: {
    id: string;
    name: string;
    createdAt: string;
  }[];
  location: {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    placeType: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
  startDateTime: string;
  endDateTime: string;
  maxParticipants: number;
  createdAt: string;
  updatedAt: string;
}



const useHome = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [recommendedClubs, setRecommendedClubs] = useState<Club[]>([]);
  const [recentClubs, setRecentClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recommended, recent] = await Promise.all([
          getClubByInterest(),
          getClubRecentlyJoined(),
        ]);
        setRecommendedClubs(recommended.clubs);
        setRecentClubs(recent.clubs);
      } catch (error) {
        console.error('홈 데이터 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToSearch = () => {
    router.push('/search');
  };

  const navigateToMeetingDetail = (meetingId: string) => {
    router.push(`/meeting/detail?id=${meetingId}`);
  };

  const viewAllRecent = () => {
    router.push('/meeting/recent');
  };

  return {
    insets,
    navigateToSearch,
    navigateToMeetingDetail,
    viewAllRecent,
    recommendedClubs,
    recentClubs,
    loading,
  };
};

const HomeScreen = () => {
  const {
    insets,
    navigateToSearch,
    navigateToMeetingDetail,
    viewAllRecent,
    recommendedClubs,
    recentClubs,
    loading,
  } = useHome();

  const { me } = useMe();
  const router = useRouter();
  
  if (!me) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 16 }}>
          로그인하고 BeMo 하세요!
        </Text>
        <Pressable
          onPress={() => router.push('/auth')}
          style={{
            backgroundColor: '#4A90E2',
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>로그인 하기</Text>
        </Pressable>
      </View>
    );
  }

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
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4A90E2' }}>BeMo</Text>

          <Pressable onPress={navigateToSearch} style={{ padding: 8 }}>
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
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#333' }}>최근 모임</Text>
              <Pressable onPress={viewAllRecent}>
                <Text style={{ fontSize: 14, color: '#4A90E2' }}>더보기</Text>
              </Pressable>
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              {recentClubs.slice(0,2).map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  title={meeting.name}
                  date={formatShortKoreanDateTime(meeting.startDateTime)}
                  location={meeting.location.name}
                  tags={meeting.tags.map(tag => tag.name)}
                  onPress={() => navigateToMeetingDetail(meeting.id)}
                  style={{ flex: 1 }}
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
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 16 }}>
              추천 모임
            </Text>

            <View style={{ gap: 16 }}>
              {recommendedClubs.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  title={meeting.name}
                  date={meeting.createdAt}
                  location={meeting.location.name}
                  tags={meeting.tags.map(tag => tag.name)}
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
