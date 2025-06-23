import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import MissionTab from '@/app/(modals)/mission';
import ResourcesTab from '@/app/(modals)/share';
import InfoTab from '@/app/info';
import { Button } from '@/components/ui/button';
import { TABS, useMeetingDetail } from '@/hooks/screens/use-meeting-detail';
import { formatShortKoreanDateTime } from '@/lib/dayjs';

const MeetingDetailScreen = () => {
  const {
    router,
    insets,
    club,
    isEnded,
    isOngoing,
    isLoading,
    error,
    bottomButtonHeight,
    selectedTab,
    setSelectedTab,
    handleEvaluation,
    handleAttendance,
    handleApplication,
  } = useMeetingDetail();

  if (!club)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: '#1a1a1a', fontSize: 16, fontWeight: '500' }}>
          모임 정보를 찾을 수 없습니다.
        </Text>
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: bottomButtonHeight + 20, // 하단 버튼 공간 + 추가 여백 확보
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 모임 제목 */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#1a1a1a',
          }}
        >
          {club.name}
        </Text>

        {/* 탭 메뉴 */}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 24,
            backgroundColor: '#f8f9fa',
            borderRadius: 12,
            padding: 4,
          }}
        >
          {/* 탭 버튼들 */}
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab as typeof selectedTab)}
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: selectedTab === tab ? '#4A90E2' : 'transparent',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: selectedTab === tab ? '#fff' : '#666',
                  fontWeight: selectedTab === tab ? '600' : '500',
                  fontSize: 15,
                }}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 탭 콘텐츠 */}
        {/* 정보 탭 내용 */}
        {selectedTab === '정보' && (
          <InfoTab
            meeting={{
              title: club.name,
              date: formatShortKoreanDateTime(club.startDateTime),
              location: club.location?.name ?? null,
              description: club.description,
              participants: {
                current: club.members.length,
                max: club.maxParticipants,
              },
              members: club.members,
            }}
          />
        )}
        {/* 자료 탭 내용 */}
        {selectedTab === '자료' && <ResourcesTab />}
        {/* 미션 탭 내용 */}
        {selectedTab === '미션' && <MissionTab />}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: bottomButtonHeight + 12,
          right: 20,
          backgroundColor: '#4A90E2',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <Pressable onPress={() => router.push('/(modals)/manage-applicants')}>
          <Text style={{ color: '#fff', fontWeight: '600' }}></Text>
        </Pressable>
      </View>

      {/* 하단 고정 버튼 */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        {isEnded ? (
          <Button title='모임 평가하기' onPress={handleEvaluation} />
        ) : isOngoing ? (
          <Button title='출석 체크하기' onPress={handleAttendance} />
        ) : (
          <Button title='참가 신청하기' onPress={handleApplication} />
        )}
      </View>
    </View>
  );
};

export default MeetingDetailScreen;
