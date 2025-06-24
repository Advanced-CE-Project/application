import { Feather } from '@expo/vector-icons';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import React from 'react';
import { Image, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { useMeetingInfo } from '@/hooks/screens/use-info';

type Meeting = {
  title: string;
  date: string;
  location: string | null;
  description: string;
  participants: { current: number; max: number };
  members: ClubMember[];
};

interface ClubMember {
  userId: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  user: {
    nickname: string;
    profileImage: string | null;
  };
}

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

  // 지도 영역을 위한 기본 좌표 (서울 중심)
  const defaultMapRegion = {
    latitude: 37.5665,
    longitude: 126.978,
  };

  // 모임 장소가 있다면 해당 위치, 없다면 기본 위치
  const mapRegion = meeting.location
    ? {
        // 실제로는 meeting.location에서 좌표를 추출해야 함
        // 여기서는 더미 데이터로 설정
        latitude: 37.5665 + (Math.random() - 0.5) * 0.01,
        longitude: 126.978 + (Math.random() - 0.5) * 0.01,
      }
    : defaultMapRegion;

  // 지도 컴포넌트 렌더링 (플랫폼별 분기)
  const renderMap = () => {
    const cameraPosition = {
      coordinates: mapRegion,
      zoom: 15,
    };

    // 모임 장소가 있다면 마커 표시
    const markers = meeting.location
      ? [
          {
            id: 'meeting-location',
            coordinates: mapRegion,
            title: meeting.location,
            description: '모임 장소',
          },
        ]
      : [];

    try {
      if (Platform.OS === 'ios') {
        return (
          <View style={{ flex: 1 }}>
            <AppleMaps.View
              style={styles.map}
              cameraPosition={cameraPosition}
              markers={markers}
              uiSettings={{
                compassEnabled: false,
              }}
            />
            {/* 터치 비활성화를 위한 투명한 오버레이 */}
            <View style={StyleSheet.absoluteFill} pointerEvents='auto' />
          </View>
        );
      } else if (Platform.OS === 'android') {
        return (
          <GoogleMaps.View
            style={styles.map}
            cameraPosition={cameraPosition}
            markers={markers}
            uiSettings={{
              myLocationButtonEnabled: false,
              zoomControlsEnabled: false,
              mapToolbarEnabled: false,
              compassEnabled: false,
              scrollGesturesEnabled: false,
              zoomGesturesEnabled: false,
            }}
          />
        );
      } else {
        return (
          <View style={styles.mapPlaceholder}>
            <Feather name='map' size={32} color='#999' />
            <Text style={styles.mapPlaceholderText}>
              {displayLocation || '지도는 iOS와 Android에서만 지원됩니다'}
            </Text>
          </View>
        );
      }
    } catch (error) {
      console.error('Map rendering error:', error);
      return (
        <View style={styles.mapPlaceholder}>
          <Feather name='map' size={32} color='#999' />
          <Text style={styles.mapPlaceholderText}>
            지도를 로드할 수 없습니다.{'\n'}
            {displayLocation || 'Google Maps API 키를 확인해주세요.'}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 0 }}>
      {/* 기본 정보 카드 */}
      <View
        style={{
          backgroundColor: '#f8f9fa',
          borderRadius: 16,
          marginBottom: 24,
          padding: 24,
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

      {/* 지도 영역 */}
      <View style={styles.mapContainer}>
        {renderMap()}

        {/* 장소 추천 버튼 (장소가 없을 때만 표시) */}
        {!meeting.location && (
          <Pressable onPress={handleRecommendPlace} style={styles.recommendButton}>
            <Feather name='map-pin' size={16} color='#4A90E2' style={{ marginRight: 8 }} />
            <Text style={{ color: '#4A90E2', fontWeight: '600', fontSize: 14 }}>
              장소 추천 받기
            </Text>
          </Pressable>
        )}

        {/* 현재 위치 버튼 */}
        <Pressable onPress={() => {}} style={styles.currentLocationButton}>
          <Feather name='crosshair' size={18} color='#4A90E2' />
        </Pressable>
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
          참가자 ({meeting.participants.current}명)
        </Text>
        {meeting.members.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {meeting.members.map((member, index) => (
              <Pressable
                key={member.userId}
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
                  overflow: 'hidden',
                }}
              >
                {member.user.profileImage ? (
                  <Image
                    source={{ uri: member.user.profileImage }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode='cover'
                  />
                ) : (
                  <Feather name='user' size={22} color='#4A90E2' />
                )}
              </Pressable>
            ))}
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#f8f9fa',
              padding: 20,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Feather name='users' size={24} color='#999' />
            <Text
              style={{
                color: '#999',
                fontSize: 14,
                marginTop: 8,
                textAlign: 'center',
              }}
            >
              아직 승인된 참가자가 없습니다
            </Text>
          </View>
        )}
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

const styles = StyleSheet.create({
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  recommendButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  currentLocationButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default InfoTab;
