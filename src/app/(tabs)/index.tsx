import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useWindowDimensions } from 'react-native';

import { MeetingCard } from '@/components/ui/meeting-card';
import { MeetingCardSkeleton } from '@/components/ui/skeleton';
import { Spacer } from '@/components/ui/spacer';
import { useHome } from '@/hooks/screens/use-home';
import { formatShortKoreanDateTime } from '@/lib/dayjs';

const HomeScreen = () => {
  const dimensions = useWindowDimensions();
  const {
    isLoading,
    isRecentClubsLoading,
    isRecommendedClubsLoading,
    insets,
    navigateToSearch,
    navigateToMeetingDetail,
    viewAllRecent,
    recommendedClubs,
    recentClubs,
  } = useHome();

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

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
              style={{ marginHorizontal: -16, paddingHorizontal: 16 }}
            >
              {isRecentClubsLoading
                ? Array.from({ length: 3 }, (_, index) => (
                    <MeetingCardSkeleton
                      key={`skeleton-recent-${index}`}
                      style={{ width: dimensions.width * 0.6 }}
                    />
                  ))
                : recentClubs.map((meeting) => (
                    <MeetingCard
                      key={meeting.id}
                      title={meeting.name}
                      date={formatShortKoreanDateTime(meeting.startDateTime)}
                      location={meeting.location.name}
                      tags={meeting.tags.map((tag) => tag.name)}
                      onPress={() => navigateToMeetingDetail(meeting.id)}
                      style={{ width: dimensions.width * 0.6 }}
                    />
                  ))}
            </ScrollView>
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
              {isRecommendedClubsLoading
                ? Array.from({ length: 3 }, (_, index) => (
                    <MeetingCardSkeleton key={`skeleton-recommended-${index}`} />
                  ))
                : recommendedClubs?.map((meeting) => (
                    <MeetingCard
                      key={meeting.id}
                      title={meeting.name}
                      date={formatShortKoreanDateTime(meeting.startDateTime)}
                      location={meeting.location.name}
                      tags={meeting.tags.map((tag: any) => tag.name)}
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
