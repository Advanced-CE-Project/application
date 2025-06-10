import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Meeting = {
  title: string;
  date: string;
  location: string;
  description: string;
  participants: { current: number; max: number };
};

type InfoTabProps = {
  meeting: Meeting;
};

const InfoTab: React.FC<InfoTabProps> = ({ meeting }) => {
  return (
    <>
      {/* 기본 정보 카드 */}
      <View
        style={{
          backgroundColor: '#f8f9fa',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}
      >
        {/* 날짜 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#4A90E2',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}
          >
            <Feather name="calendar" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 2 }}>일시</Text>
            <Text style={{ fontSize: 16, color: '#1a1a1a', fontWeight: '500' }}>
              {meeting.date}
            </Text>
          </View>
        </View>

        {/* 장소 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#34c759',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}
          >
            <Feather name="map-pin" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 2 }}>장소</Text>
            <Text style={{ fontSize: 16, color: '#1a1a1a', fontWeight: '500' }}>
              {meeting.location}
            </Text>
          </View>
        </View>

        {/* 인원 */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#ff9500',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}
          >
            <Feather name="users" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 2 }}>참여 인원</Text>
            <Text style={{ fontSize: 16, color: '#1a1a1a', fontWeight: '500' }}>
              {meeting.participants.current}/{meeting.participants.max}명 참여 중
            </Text>
          </View>
        </View>
      </View>

      {/* 지도 (예시: 실제 지도 연동 X, 아이콘 및 텍스트만) */}
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
        <Feather name="map" size={32} color="#999" />
        <Text style={{ color: '#999', marginTop: 8, fontSize: 14 }}>지도 위치</Text>
      </View>

      {/* 설명 */}
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

      {/* 참가자 */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16, color: '#1a1a1a' }}>
          참가자 ({meeting.participants.current}/{meeting.participants.max}명)
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {Array.from({ length: meeting.participants.current }).map((_, index) => (
            <Pressable
              key={index}
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
              // onPress 등은 필요시 props로 전달해서 연결
            >
              <Feather name="user" size={22} color="#4A90E2" />
            </Pressable>
          ))}
        </View>
      </View>
    </>
  );
};

export default InfoTab;
