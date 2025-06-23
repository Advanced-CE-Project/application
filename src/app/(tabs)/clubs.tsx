import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { LoginRequiredScreen } from '@/components/screens/login-required';
import { MeetingCard } from '@/components/ui/meeting-card';
import { MeetingCardSkeleton } from '@/components/ui/skeleton';
import { Spacer } from '@/components/ui/spacer';
import { useClubs } from '@/hooks/screens/use-clubs';
import { formatShortKoreanDateTime } from '@/lib/dayjs';

const ClubsScreen = () => {
  const {
    isFetching,
    error,
    me,
    insets,
    clubs,
    navigateToCreateMeeting,
    navigateToMeetingDetail,
    navigateToLogin,
  } = useClubs();

  if (!me) {
    return <LoginRequiredScreen onLoginPress={navigateToLogin} />;
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
          {isFetching ? (
            // 로딩 상태 스켈레톤 UI
            <View style={{ gap: 16 }}>
              {Array.from({ length: 3 }, (_, index) => (
                <MeetingCardSkeleton key={`skeleton-club-${index}`} />
              ))}
            </View>
          ) : clubs.length > 0 ? (
            <View style={{ gap: 16 }}>
              {clubs.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  title={meeting.name}
                  date={formatShortKoreanDateTime(meeting.startDateTime)}
                  location={meeting.location.name}
                  tags={meeting.tags.map((tag: any) => tag.name)}
                  // participants={meeting.participants}
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
