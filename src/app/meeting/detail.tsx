import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';

import InfoTab from '@/app/info';
import ResourcesTab from '@/app/(modals)/share';
import MissionTab from '@/app/(modals)/mission';

const MEETING_DETAILS = [
  {
    id: '1',
    title: '주말 등산 모임',
    date: '4월 15일 (토) 오전 8시 - 오후 2시',
    location: '북한산 국립공원 (3호선 구파발역)',
    description:
      '북한산 둘레길을 걸으며 힐링하는 모임입니다. 등산 초보자도 환영하며, 점심은 근처 맛집에서 먹을 예정입니다. 날씨가 좋을 경우 사진도 찍어요!',
    participants: { current: 5, max: 10 },
  },
];

const TABS = ['정보', '자료', '미션'];

const MeetingDetailScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [selectedTab, setSelectedTab] = useState<'정보' | '자료' | '미션'>('정보');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  // 하단 버튼 영역 높이 계산
  const bottomButtonHeight = 16 + 52 + insets.bottom + 16; // paddingTop + 버튼높이 + safeArea + paddingBottom

  const handleContact = () => {
    router.push('/contact');
  };

  const handleEvaluation = () => {
    router.push('/(modals)/evaluate');
  };

  const handleApplication = () => {
    console.log('참가 신청받기');
    // 추후 알고리즘 추가
  };

  const handleMission = () => {
    router.push('/(modals)/mission');
  };

  const handleSharing = () => {
    router.push('/(modals)/share');
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
        <Button title='참가 신청하기' onPress={handleApplication} />
      </View>

      {/* 참가자 모달 */}
      <Modal visible={selectedUser !== null} transparent animationType='slide'>
        <Pressable
          onPress={() => setSelectedUser(null)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 20,
              paddingTop: 24,
              paddingBottom: insets.bottom + 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            {/* 핸들 바 */}
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: '#d1d5db',
                borderRadius: 2,
                alignSelf: 'center',
                marginBottom: 20,
              }}
            />

            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 24,
                textAlign: 'center',
                color: '#1a1a1a',
              }}
            >
              참가자 행동
            </Text>

            <View style={{ gap: 12 }}>
              <Button title='연락하기' onPress={handleContact} />
              <Button title='평가하기' onPress={handleEvaluation} />
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default MeetingDetailScreen;
