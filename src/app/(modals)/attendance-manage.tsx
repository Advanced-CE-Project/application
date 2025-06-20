import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const mockAttendanceList = [
  { name: '김참여', status: '출석 완료' },
  { name: '이산악', status: '출석 완료' },
  { name: '박모임', status: '미출석' },
];

const AttendanceManageScreen = () => {
  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      {/* <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>주말 등산 모임</Text>
      <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>
        4월 15일 (토) 오전 8시 · 북한산 국립공원
      </Text> */}

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
        {/* 추후 QR 코드 컴포넌트 추가 예정 */}
      </View>

      <Text style={{ fontWeight: '600', marginBottom: 12 }}>
        참가자 출석 현황 (3명)
      </Text>

      <FlatList
        data={mockAttendanceList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View
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
              <Text style={{ color: '#9CA3AF' }}>미출석</Text>
            )}
          </View>
        )}
      />
    </ScrollView>
  );
};

export default AttendanceManageScreen;