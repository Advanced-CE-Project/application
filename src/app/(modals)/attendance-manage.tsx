import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Pressable, Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { generateQRCode, getAttendanceRecord, updateAttendance } from '@/services/attendance';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// const mockAttendanceList = [
//   { id: '1', name: '김참여', status: '출석 완료' },
//   { id: '2', name: '이산악', status: '출석 완료' },
//   { id: '3' ,name: '박모임', status: '미출석' },
// ];

const AttendanceManageScreen = () => {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [attendanceList, setAttendanceList] = useState<
    { id: string; name: string; status: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [qrData, attendanceData] = await Promise.all([
          generateQRCode('1'), 
          getAttendanceRecord('1'),
        ]);
        setQrUrl(qrData.qrUrl);
        setAttendanceList(attendanceData.attendanceList);
      } catch (error) {
        console.error('Error fetching data:', error);
        setQrUrl(null);
      } finally {
        setLoading(false);
      } 
    };
    fetchData();
  }, []);

  const handleManualAttendance = async (userId: string) => {
    try {
      await updateAttendance('club-id', userId, { status: '출석 완료' });
      setAttendanceList((prev) =>
        prev.map((item) =>
          item.id === userId ? { ...item, status: '출석 완료' } : item,
        ),
      );
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      <View
        style={{
          height: 180,
          borderRadius: 12,
          backgroundColor: '#F3F4F6',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Text style={{ fontSize: 16, color: '#9CA3AF' }}>QR 코드</Text>
        {loading ? (
          <Text style={{ marginTop: 20, color: '#6B7280' }}>로딩 중...</Text>
        ) : qrUrl ? (
          <Image
            source={{ uri: qrUrl }}
            style={{ width: 120, height: 120, marginTop: 10 }}
          />
        ) : (
          <Text style={{ marginTop: 20, color: '#EF4444' }}>QR 코드 생성 실패</Text>
        )}
      </View>

      <Text style={{ fontWeight: '600', marginBottom: 12 }}>참가자 출석 현황 {attendanceList.length}명</Text>

      {attendanceList.map((item) => (
        <View
          key={item.name}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <Text style={{ fontSize: 15 }}>{item.name}</Text>
          {item.status === '출석 완료' ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#4A90E2', marginRight: 4 }}>출석 완료</Text>
              <Ionicons name="checkmark-circle" size={18} color="#4A90E2" />
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#9CA3AF', marginRight: 8 }}>미출석</Text>
              <Pressable
                onPress={() => handleManualAttendance(item.id)}
                style={{
                  backgroundColor: '#4A90E2',
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: 'white', fontSize: 12 }}>수동 출석</Text>
              </Pressable>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default AttendanceManageScreen;
