import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import services from '@/services';

interface AttendanceRecord {
  id: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  user: {
    id: string;
    nickname: string;
    profileImage: string | null;
  };
}

const AttendanceManageScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // 모임 정보 및 출석 현황 조회
  const { data: clubData, isLoading: clubLoading } = useQuery({
    queryKey: ['meeting', id],
    queryFn: () => services.clubs.getClubById(id!),
    enabled: !!id,
  });

  // QR 코드 생성
  const { data: qrData, isLoading: qrLoading } = useQuery({
    queryKey: ['qr-code', id],
    queryFn: () => services.attendance.generateQRCode(id!),
    enabled: !!id,
  });

  // 출석 현황 조회
  const { data: attendanceData, isLoading: attendanceLoading } = useQuery({
    queryKey: ['attendance', id],
    queryFn: () => services.attendance.getAttendanceRecord(id!),
    enabled: !!id,
  });

  console.log('Attendance manage - Meeting ID:', id);

  if (clubLoading || qrLoading || attendanceLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}
      >
        <ActivityIndicator size='large' color='#4A90E2' />
        <Text style={{ marginTop: 12, fontSize: 16, color: '#666' }}>로딩 중...</Text>
      </View>
    );
  }

  if (!clubData?.club || !qrData || !attendanceData) {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}
      >
        <Text style={{ fontSize: 16, color: '#666' }}>데이터를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 모임 정보 */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 4 }}>
            {clubData.club.name}
          </Text>
          <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
            {new Date(clubData.club.startDateTime).toLocaleDateString('ko-KR', {
              month: 'long',
              day: 'numeric',
              weekday: 'short',
              hour: 'numeric',
              minute: '2-digit',
            })}{' '}
            · {clubData.club.location?.name || '위치 정보 없음'}
          </Text>
        </View>

        {/* QR 코드 영역 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            alignItems: 'center',
            marginBottom: 32,
          }}
        >
          <View
            style={{
              width: 160,
              height: 160,
              backgroundColor: '#fff',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
              padding: 8,
            }}
          >
            {qrData.qrCode ? (
              <Image
                source={{ uri: qrData.qrCode }}
                style={{ width: '100%', height: '100%' }}
                resizeMode='contain'
              />
            ) : (
              <Text style={{ fontSize: 16, color: '#6c757d', fontWeight: '500' }}>QR 코드</Text>
            )}
          </View>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 4 }}>
            참가자 스캔할 QR 코드
          </Text>
          <Text style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>
            30분마다 자동으로 갱신됩니다
          </Text>
        </View>

        {/* 참가자 출석 현황 */}
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 16 }}>
            참가자 출석 현황 ({attendanceData.attendance.length}명)
          </Text>

          {attendanceData.attendance.map((attendance: AttendanceRecord) => {
            const isPresent = attendance.status === 'PRESENT';
            const statusText = isPresent ? '출석 완료' : '미출석';
            const statusColor = isPresent ? '#28a745' : '#6c757d';

            return (
              <View
                key={attendance.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#f8f9fa',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                }}
              >
                {/* 사용자 아이콘 */}
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#e9ecef',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                  }}
                >
                  <Ionicons name='person' size={20} color='#6c757d' />
                </View>

                {/* 이름 */}
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#1a1a1a',
                  }}
                >
                  {attendance.user.nickname}
                </Text>

                {/* 출석 상태 */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: statusColor,
                      marginRight: 6,
                    }}
                  >
                    {statusText}
                  </Text>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: isPresent ? '#28a745' : '#e9ecef',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons
                      name={isPresent ? 'checkmark' : 'close'}
                      size={16}
                      color={isPresent ? '#fff' : '#6c757d'}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default AttendanceManageScreen;
