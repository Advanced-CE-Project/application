import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { ScrollView } from 'react-native-gesture-handler';

const AttendanceCheckScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleQrScan = () => {
    // QR 스캔 로직 작성 예정
    alert('QR 스캔 시도');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      {/* <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>출석 체크</Text>
      <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>
        4월 15일 (토) 오전 8시 · 북한산 국립공원
      </Text> */}

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          marginBottom: 24,
        }}
      >
        <Ionicons name="qr-code-outline" size={48} color="#9CA3AF" />
        <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 16, marginBottom: 8 }}>
          QR 코드 스캔
        </Text>
        <Text style={{ color: '#6B7280', fontSize: 14, textAlign: 'center', paddingHorizontal: 20 }}>
          모임 주최자가 제공한 QR 코드를 스캔하여 출석 체크를 완료하세요.
        </Text>
      </View>

      
      <Button title="QR 스캔" onPress={handleQrScan}/>
      <Text style={{ textAlign: 'center', color: '#6B7280', fontSize: 14, paddingTop: 3 }}>문제가 있나요?</Text>
    </ScrollView>
  );
};

export default AttendanceCheckScreen;
