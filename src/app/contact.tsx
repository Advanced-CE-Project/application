import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

const CURRENT_MEETINGS = [
  {
    id: '1',
    title: '주말 등산 모임',
    date: '4월 15일 (토) 오전 8시',
    location: '북한산 국립공원',
    tags: ['등산'],
  },
];

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
    marginBottom: 6
};

const ContactScreen = () => {
  const insets = useSafeAreaInsets();
    
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
              fontSize: 20,
              fontWeight: '600',
              color: '#333',
            }}
          >
            빠른 연락
          </Text>
        </View>
      </View>

      {/* 모임 정보 */}
      <View style={{ marginBottom: 24 }}>
        {CURRENT_MEETINGS.map((meeting) => (
            <View key={meeting.id} style={{ marginTop: 8, padding: 12 }}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 12 }}>{meeting.title}</Text>
                <Text style={{ fontSize: 12, color: '#6B7280' }}>{meeting.date} · {meeting.location}</Text>
            </View>
        ))}
      </View>

      {/* 빠른 메시지 보내기 */}
      <View style={{ padding: 12}}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#374151', marginBottom: 12 }}>빠른 메시지 보내기</Text>
        <View style={{ gap: 8, marginBottom: 32 }}>
            <Pressable style={{ ...commonStyle }}>
                <Text style={{ fontSize: 14, color: '#1F2937' }}>어디세요?</Text>
            </Pressable>
            <Pressable style={{ ...commonStyle }}>
                <Text style={{ fontSize: 14, color: '#1F2937' }}>도착했어요!</Text>
            </Pressable>
            <Pressable style={{ ...commonStyle }}>
                <Text style={{ fontSize: 14, color: '#1F2937' }}>조금 늦을 것 같아요</Text>
            </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ContactScreen;
