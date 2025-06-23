import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMe } from '@/hooks';

const AccountInfoScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { me } = useMe();

  const handleProfileImageChange = () => {
    Alert.alert('프로필 사진 변경', '프로필 사진을 변경하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '사진 선택',
        onPress: () => Alert.alert('개발 중', '사진 선택 기능은 개발 중입니다.'),
      },
    ]);
  };

  const renderInfoRow = (label: string, value: string) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 6 }}>{label}</Text>
      <Text style={{ fontSize: 16, color: '#333', fontWeight: '500' }}>{value}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 프로필 섹션 */}
        <View
          style={{
            backgroundColor: '#fff',
            padding: 24,
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Pressable onPress={handleProfileImageChange} style={{ marginBottom: 16 }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#f0f0f0',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 3,
                borderColor: '#4A90E2',
              }}
            >
              {me?.profileImage ? (
                <Image
                  source={{ uri: me?.profileImage }}
                  style={{ width: 94, height: 94, borderRadius: 47 }}
                />
              ) : (
                <Feather name='user' size={40} color='#666' />
              )}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: '#4A90E2',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: '#fff',
                }}
              >
                <Feather name='camera' size={14} color='#fff' />
              </View>
            </View>
          </Pressable>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#333',
              marginBottom: 4,
            }}
          >
            {me?.nickname || ''}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
            }}
          >
            {me?.email || ''}
          </Text>
        </View>

        {/* 기본 정보 */}
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 16,
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#333',
              marginBottom: 20,
            }}
          >
            기본 정보
          </Text>

          {renderInfoRow('닉네임', me?.nickname || '')}
          {renderInfoRow('이메일', me?.email || '')}
          {renderInfoRow('가입일', me?.createdAt || '')}
        </View>

        {/* 계정 관리 */}
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 16,
            borderRadius: 12,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Pressable
            onPress={() => router.push('/password-change')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 16,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#f8f9fa',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}
            >
              <Feather name='lock' size={18} color='#666' />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: '500',
                color: '#333',
              }}
            >
              비밀번호 변경
            </Text>
            <Feather name='chevron-right' size={20} color='#999' />
          </Pressable>

          <View
            style={{
              height: 1,
              backgroundColor: '#f0f0f0',
              marginLeft: 68,
            }}
          />

          <Pressable
            onPress={() =>
              Alert.alert('로그아웃', '정말 로그아웃하시겠습니까?', [
                { text: '취소', style: 'cancel' },
                {
                  text: '로그아웃',
                  style: 'destructive',
                  onPress: () => {
                    router.replace('/auth');
                  },
                },
              ])
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 16,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#fff2f2',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}
            >
              <Feather name='log-out' size={18} color='#e74c3c' />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: '500',
                color: '#e74c3c',
              }}
            >
              로그아웃
            </Text>
            <Feather name='chevron-right' size={20} color='#999' />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountInfoScreen;
