import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Meeting = {
  id: string;
  title: string;
  date: string;
  location: string;
  // 필요에 따라 추가 필드 선언
};

type ContactScreenProps = {
  meeting: Meeting;
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

const ContactScreen: React.FC<ContactScreenProps> = ({ meeting }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleEvaluate = () => {
    router.push('/(modals)/evaluate');
  };

  const handleQuickMessage = (message: string) => {
    // 실제 메시지 전송 로직 대신 알림창 띄우기 예시
    Alert.alert('빠른 메시지', `"${message}" 메시지를 보냈습니다.`);
  };

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
      <View style={{ marginBottom: 24, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>
          {meeting.title}
        </Text>
        <Text style={{ fontSize: 14, color: '#6B7280' }}>
          {meeting.date} · {meeting.location}
        </Text>
      </View>

      {/* 빠른 메시지 보내기 */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#374151', marginBottom: 12 }}>
          빠른 메시지 보내기
        </Text>
        <View style={{ marginBottom: 32 }}>
          {['어디세요?', '도착했어요!', '조금 늦을 것 같아요'].map((msg) => (
            <Pressable
              key={msg}
              style={commonStyle}
              onPress={() => handleQuickMessage(msg)}
            >
              <Text style={{ fontSize: 14, color: '#1F2937' }}>{msg}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* 평가하기 */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#374151', marginBottom: 12 }}>
          평가하기
        </Text>
        <Pressable onPress={handleEvaluate} style={{ paddingVertical: 12 }}>
          <Text style={{ color: '#4A90E2', fontWeight: '600', fontSize: 16 }}>평가하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ContactScreen;
