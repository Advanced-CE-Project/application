import { Feather } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoginRequiredScreen } from '@/components/screens/login-required';
import { MeetingCard } from '@/components/ui/meeting-card';
import { MeetingCardSkeleton } from '@/components/ui/skeleton';
import { Spacer } from '@/components/ui/spacer';
import { useClubs } from '@/hooks/screens/use-clubs';
import { formatShortKoreanDateTime } from '@/lib/dayjs';
import services from '@/services';
import type { ClubItem } from '@/types/models/club';

const ClubsScreen = () => {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'created' | 'participated'>('created');

  const { me, navigateToCreateMeeting, navigateToMeetingDetail, navigateToLogin } = useClubs();

  // 내가 만든 모임
  const { data: myClubs, isFetching: isMyClubsLoading } = useQuery<ClubItem[]>({
    queryKey: ['myClubs'],
    queryFn: services.clubs.getMyClubs,
    enabled: !!me,
    initialData: [],
  });

  // 내가 참가한 모임
  const { data: participatedClubs, isFetching: isParticipatedLoading } = useQuery<ClubItem[]>({
    queryKey: ['myParticipatedClubs'],
    queryFn: services.clubs.getMyParticipatedClubs,
    enabled: !!me,
    initialData: [],
  });

  if (!me) {
    return <LoginRequiredScreen onLoginPress={navigateToLogin} />;
  }

  const currentClubs = selectedTab === 'created' ? myClubs : participatedClubs;
  const isLoading = selectedTab === 'created' ? isMyClubsLoading : isParticipatedLoading;

  const TabButton = ({
    title,
    isSelected,
    onPress,
  }: {
    title: string;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: isSelected ? '#4A90E2' : 'transparent',
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: isSelected ? '600' : '400',
          color: isSelected ? '#4A90E2' : '#666',
        }}
      >
        {title}
      </Text>
    </Pressable>
  );

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
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: '#333',
            }}
          >
            클럽
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

        {/* 탭 버튼 */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f8f9fa',
            borderRadius: 8,
            padding: 4,
          }}
        >
          <TabButton
            title='내가 만든 모임'
            isSelected={selectedTab === 'created'}
            onPress={() => setSelectedTab('created')}
          />
          <TabButton
            title='참가한 모임'
            isSelected={selectedTab === 'participated'}
            onPress={() => setSelectedTab('participated')}
          />
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
          {isLoading ? (
            // 로딩 상태 스켈레톤 UI
            <View style={{ gap: 16 }}>
              {Array.from({ length: 3 }, (_, index) => (
                <MeetingCardSkeleton key={`skeleton-club-${index}`} />
              ))}
            </View>
          ) : currentClubs && currentClubs.length > 0 ? (
            <View style={{ gap: 16 }}>
              {currentClubs.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  title={meeting.name}
                  date={formatShortKoreanDateTime(meeting.startDateTime)}
                  location={meeting?.location?.name || '장소 미정'}
                  tags={meeting.tags.map((tag: any) => tag.name)}
                  participants={{
                    current: meeting.currentParticipants,
                    max: meeting.maxParticipants,
                  }}
                  isStarted={meeting.isStarted}
                  isEnded={meeting.isEnded}
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
              <Feather
                name={selectedTab === 'created' ? 'plus-circle' : 'users'}
                size={48}
                color='#ccc'
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#999',
                  marginBottom: 8,
                  marginTop: 16,
                }}
              >
                {selectedTab === 'created' ? '아직 만든 모임이 없습니다' : '참가한 모임이 없습니다'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#ccc',
                }}
              >
                {selectedTab === 'created'
                  ? '새로운 모임을 만들어보세요!'
                  : '새로운 모임에 참가해보세요!'}
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
