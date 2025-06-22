import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { useMeetingInfo } from '@/hooks/screens/use-info';

type Meeting = {
  title: string;
  date: string;
  location: string | null;
  description: string;
  participants: { current: number; max: number };
};

type InfoTabProps = {
  meeting: Meeting;
};

// 재사용 가능한 정보 섹션 컴포넌트
const InfoRow = ({
  icon,
  color,
  label,
  value,
}: {
  icon: keyof typeof Feather.glyphMap;
  color: string;
  label: string;
  value: string;
}) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
      }}
    >
      <Feather name={icon} size={20} color='#fff' />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 12, color: '#666', marginBottom: 2 }}>{label}</Text>
      <Text style={{ fontSize: 16, color: '#1a1a1a', fontWeight: '500' }}>{value}</Text>
    </View>
  </View>
);

const InfoTab: React.FC<InfoTabProps> = ({ meeting }) => {
  const {
    modalVisible,
    setModalVisible,
    currentLocation,
    setCurrentLocation,
    handleQuickMessage,
    handleRecommendPlace,
    displayLocation,
  } = useMeetingInfo(meeting);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 기본 정보 카드 */}
      <View
        style={{
          backgroundColor: '#f8f9fa',
          borderRadius: 16,
          marginBottom: 24,
        }}
      >
        {/* 날짜 */}
        <InfoRow icon='calendar' color='#4A90E2' label='일시' value={meeting.date} />

        {/* 장소 */}
        <InfoRow
          icon='map-pin'
          color='#34c759'
          label='장소'
          value={displayLocation || '장소 미정'}
        />

        {/* 참여 인원 */}
        <InfoRow
          icon='users'
          color='#ff9500'
          label='참여 인원'
          value={`${meeting.participants.current}/${meeting.participants.max}명 참여 중`}
        />
      </View>

      {/* 지도 대체 박스 */}
      <View
        style={{
          height: 180,
          backgroundColor: '#f0f0f0',
          borderRadius: 16,
          marginBottom: 24,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#e0e0e0',
        }}
      >
        <Feather name='map' size={32} color='#999' />
        <Text style={{ color: '#999', marginTop: 8, fontSize: 14 }}>
          {displayLocation ? (
            displayLocation
          ) : (
            <Pressable onPress={handleRecommendPlace}>
              <Text style={{ color: '#4A90E2', fontWeight: '600' }}>장소 추천 받기</Text>
            </Pressable>
          )}
        </Text>
      </View>

      {/* 모임 설명 */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 12, color: '#1a1a1a' }}>
          모임 설명
        </Text>
        <Text
          style={{
            color: '#555',
            lineHeight: 24,
            fontSize: 16,
            backgroundColor: '#f8f9fa',
            padding: 16,
            borderRadius: 12,
          }}
        >
          {meeting.description}
        </Text>
      </View>

      {/* 참가자 목록 */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16, color: '#1a1a1a' }}>
          참가자
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {Array.from({ length: meeting.participants.current }).map((_, index) => (
            <Pressable
              key={index}
              onPress={() => setModalVisible(true)}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#e0e0e0',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#4A90E2',
                marginRight: 12,
                marginBottom: 12,
              }}
            >
              <Feather name='user' size={22} color='#4A90E2' />
            </Pressable>
          ))}
        </View>
      </View>

      {/* 메시지 모달 */}
      <Modal visible={modalVisible} transparent animationType='slide'>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            onPress={() => {}}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 24,
              paddingTop: 32,
              paddingBottom: 24,
            }}
          >
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: '#ccc',
                borderRadius: 2,
                alignSelf: 'center',
                marginBottom: 24,
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#374151', marginBottom: 18 }}>
              간편 메시지 보내기
            </Text>
            <View style={{ marginBottom: 32 }}>
              {['어디세요?', '도착했어요!', '조금 늦을 것 같아요'].map((msg, index) => (
                <View key={index} style={{ marginBottom: 12, paddingBottom: 3 }}>
                  <Button title={msg} onPress={() => handleQuickMessage(msg)} />
                </View>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default InfoTab;
