import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import InfoTab from '@/app/info';
import { Button } from '@/components/ui/button';

const MEETING_DETAILS = [
  {
    id: '1',
    title: '주말 등산 모임',
    date: '4월 15일 (토) 오전 8시 - 오후 2시',
    // location: '북한산 국립공원 (3호선 구파발역)',
    location: null,
    description:
      '북한산 둘레길을 걸으며 힐링하는 모임입니다. 등산 초보자도 환영하며, 점심은 근처 맛집에서 먹을 예정입니다. 날씨가 좋을 경우 사진도 찍어요!',
    participants: { current: 5, max: 10 },
    isEnded: false,
    isOngoing: true,
  },
];


// const hasPendingApplicants = MEETING_DETAILS.participants.current && MEETING_DETAILS.participants.current > 0;
// const isOwner = currentUserId === meeting.ownerId;
const hasPendingApplicants = true;
const isOwner = true;


// 자료 탭 컴포넌트
const ResourcesTab = () => {
  const screenWidth = Dimensions.get('window').width;
  const availableWidth = screenWidth - 40;
  const PHOTO_BOX_SIZE = (availableWidth - 16) / 3;

  const photoDummyArray = Array.from({ length: 8 });
  const fileDummyArray = [
    { id: '1', name: '등산 코스 안내.pdf', size: '2.4MB', uploader: '김나리' },
    { id: '2', name: '준비물 체크리스트.xlsx', size: '112KB', uploader: '홍길동' },
    { id: '3', name: '안전수칙.docx', size: '456KB', uploader: '박영희' },
  ];

  return (
    <View>
      {/* 사진 섹션 */}
      <View style={{ marginBottom: 32 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a' }}>사진</Text>
          <Pressable>
            <Text style={{ color: '#4A90E2', fontSize: 14, fontWeight: '500' }}>모두 보기</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {photoDummyArray.slice(0, 6).map((_, idx) => (
            <View
              key={idx}
              style={{
                width: PHOTO_BOX_SIZE,
                height: PHOTO_BOX_SIZE,
                borderRadius: 8,
                backgroundColor: '#f0f0f0',
              }}
            />
          ))}
        </View>
      </View>

      {/* 파일 섹션 */}
      <View>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 16 }}>
          파일
        </Text>

        {fileDummyArray.map((file) => (
          <View
            key={file.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: '#f0f0f0',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
              marginBottom: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: '#f0f4fa',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}
            >
              <Feather name='file-text' size={20} color='#4A90E2' />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#1a1a1a', marginBottom: 2 }}>
                {file.name}
              </Text>
              <Text style={{ fontSize: 13, color: '#666' }}>
                {file.size} • {file.uploader}
              </Text>
            </View>

            <Pressable
              style={{
                padding: 8,
                borderRadius: 20,
                backgroundColor: '#f0f4fa',
              }}
            >
              <Feather name='download' size={16} color='#4A90E2' />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

// 미션 탭 컴포넌트
const MissionTab = () => {
  const missions = [
    {
      id: '1',
      title: '매일 10,000보 걷기',
      description: '일주일 동안 하루 만보 걷기',
      status: 'ongoing',
      progress: 70,
    },
    {
      id: '2',
      title: '물 2L 마시기',
      description: '매일 2리터 물 마시기',
      status: 'completed',
      progress: 100,
    },
    {
      id: '3',
      title: '등산 후기 작성하기',
      description: '모임 후 간단한 후기 작성',
      status: 'pending',
      progress: 0,
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ongoing':
        return { backgroundColor: '#e8f0fe', borderColor: '#4A90E2' };
      case 'completed':
        return { backgroundColor: '#e8f5e8', borderColor: '#4caf50' };
      case 'pending':
        return { backgroundColor: '#fff8e1', borderColor: '#ffc107' };
      default:
        return { backgroundColor: '#f9f9f9', borderColor: '#e0e0e0' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ongoing':
        return '진행 중';
      case 'completed':
        return '완료';
      case 'pending':
        return '대기 중';
      default:
        return '알 수 없음';
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 16 }}>
        미션
      </Text>

      {missions.map((mission) => (
        <View
          key={mission.id}
          style={[
            {
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
              marginBottom: 16,
            },
            getStatusStyle(mission.status),
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a' }}>
              {mission.title}
            </Text>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
                backgroundColor:
                  mission.status === 'ongoing'
                    ? '#4A90E2'
                    : mission.status === 'completed'
                      ? '#4caf50'
                      : '#ffc107',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '500' }}>
                {getStatusText(mission.status)}
              </Text>
            </View>
          </View>

          <Text style={{ color: '#666', marginBottom: 12, lineHeight: 20 }}>
            {mission.description}
          </Text>

          {/* 진행률 바 */}
          <View style={{ marginTop: 8 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}
            >
              <Text style={{ fontSize: 12, color: '#666' }}>진행률</Text>
              <Text style={{ fontSize: 12, color: '#666', fontWeight: '500' }}>
                {mission.progress}%
              </Text>
            </View>
            <View
              style={{
                height: 6,
                backgroundColor: '#e0e0e0',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  width: `${mission.progress}%`,
                  backgroundColor:
                    mission.status === 'ongoing'
                      ? '#4A90E2'
                      : mission.status === 'completed'
                        ? '#4caf50'
                        : '#ffc107',
                  borderRadius: 3,
                }}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const commonStyle = {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 16,
  borderWidth: 1,
  borderColor: '#f0f0f0',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  marginBottom: 6,
};

const TABS = ['정보', '자료', '미션'];

const MeetingDetailScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [selectedTab, setSelectedTab] = useState<'정보' | '자료' | '미션'>('정보');

  // 하단 버튼 영역 높이 계산
  const bottomButtonHeight = 16 + 52 + insets.bottom + 16; // paddingTop + 버튼높이 + safeArea + paddingBottom

  const handleEvaluation = () => {
    router.push('/(modals)/evaluate');
  };

  const handleAttendance = () => {
    router.push('/(modals)/attendance-manage');
  };

  const handleApplication = () => {
    console.log('참가 신청받기');
    // 추후 알고리즘 추가
  };

  const { id } = useLocalSearchParams<{ id: string }>();
  const meeting = MEETING_DETAILS.find((m) => m.id === (id ?? '1'));
  if (!meeting)
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
          {meeting.title}
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
        {selectedTab === '정보' && <InfoTab meeting={meeting} />}
        {/* 자료 탭 내용 */}
        {selectedTab === '자료' && <ResourcesTab />}
        {/* 미션 탭 내용 */}
        {selectedTab === '미션' && <MissionTab />}
      </ScrollView>

      {true && true && (
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
        <Pressable onPress={() => router.push('/(modals)/memberManage')}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>신청자 승인하기</Text>
        </Pressable>
      </View>
      )}


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
        {meeting.isEnded ? (
          <Button title='모임 평가하기' onPress={handleEvaluation} />
        ) : meeting.isOngoing ? (
          <Button title='출석 체크하기' onPress={handleAttendance} />
        ) : (
          <Button title='참가 신청하기' onPress={handleApplication} />
        )}
      </View>
    </View>
  );
};

export default MeetingDetailScreen;
