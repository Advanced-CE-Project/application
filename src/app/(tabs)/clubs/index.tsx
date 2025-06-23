import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MeetingCard } from '@/components/ui/meeting-card';
import { Spacer } from '@/components/ui/spacer';
import { getMyClubs } from '@/services/clubs';
import { formatShortKoreanDateTime } from '@/lib/date';

interface Club {
  id: string;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  createdAt: string;
}

const MyClubsScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [myClubs, setMyClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyClubs = async () => {
      setLoading(true);
      try {
        const data = await getMyClubs();
        setMyClubs(data.clubs || []);
      } catch (error) {
        console.error('내 모임 목록 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyClubs();
  }, []);

  const navigateToCreateMeeting = () => {
    router.push('/meeting/create');
  };

  const navigateToMeetingDetail = (clubId: string) => {
    router.push(`/meeting/detail?id=${clubId}&mode=manage`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 헤더 */}
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
            <Feather name="plus" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>

      {/* 모임 리스트 */}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: insets.bottom + 16,
          }}
        >
          {loading ? (
            <Text style={{ textAlign: 'center', marginTop: 40 }}>로딩 중...</Text>
          ) : myClubs.length > 0 ? (
            <View style={{ gap: 16 }}>
              {myClubs.map((club) => (
                <MeetingCard
                  key={club.id}
                  title={club.name}
                  date={formatShortKoreanDateTime(club.startDateTime)}
                  location={'장소 정보 없음'} // API에 위치 정보가 없으므로 임시 텍스트
                  tags={[]} // 태그 정보가 없으므로 빈 배열 전달
                  participants={{ current: 0, max: 0 }} // 참가자 정보도 API에 없으면 0 처리
                  onPress={() => navigateToMeetingDetail(club.id)}
                />
              ))}
            </View>
          ) : (
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

export default MyClubsScreen;
