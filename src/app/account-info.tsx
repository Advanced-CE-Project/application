import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface UserInfo {
  nickname: string;
  email: string;
  phone: string;
  profileImage?: string;
  joinDate: string;
}

const AccountInfoScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // 임시 사용자 데이터
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '김모임',
    email: 'user@bemo.app',
    phone: '010-1234-5678',
    profileImage: undefined,
    joinDate: '2024.01.15',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState(userInfo.nickname);
  const [editedPhone, setEditedPhone] = useState(userInfo.phone);

  const handleSave = () => {
    setUserInfo({
      ...userInfo,
      nickname: editedNickname,
      phone: editedPhone,
    });
    setIsEditing(false);
    Alert.alert('저장 완료', '계정 정보가 성공적으로 업데이트되었습니다.');
  };

  const handleCancel = () => {
    setEditedNickname(userInfo.nickname);
    setEditedPhone(userInfo.phone);
    setIsEditing(false);
  };

  const handleProfileImageChange = () => {
    Alert.alert('프로필 사진 변경', '프로필 사진을 변경하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '사진 선택',
        onPress: () => Alert.alert('개발 중', '사진 선택 기능은 개발 중입니다.'),
      },
    ]);
  };

  const renderInfoRow = (
    label: string,
    value: string,
    editable: boolean = false,
    onChangeText?: (text: string) => void,
  ) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 6 }}>{label}</Text>
      {isEditing && editable ? (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={{
            fontSize: 16,
            color: '#333',
            borderBottomWidth: 1,
            borderBottomColor: '#4A90E2',
            paddingVertical: 8,
            fontWeight: '500',
          }}
          autoCapitalize='none'
          autoCorrect={false}
        />
      ) : (
        <Text style={{ fontSize: 16, color: '#333', fontWeight: '500' }}>{value}</Text>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* 헤더 */}
      <View
        style={{
          paddingTop: insets.top,
          paddingHorizontal: 16,
          paddingBottom: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Feather name='arrow-left' size={24} color='#333' />
          </Pressable>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#333',
            }}
          >
            계정 정보
          </Text>
          <Pressable onPress={isEditing ? handleSave : () => setIsEditing(true)}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#4A90E2',
              }}
            >
              {isEditing ? '저장' : '편집'}
            </Text>
          </Pressable>
        </View>
      </View>

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
              {userInfo.profileImage ? (
                <Image
                  source={{ uri: userInfo.profileImage }}
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
            {userInfo.nickname}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
            }}
          >
            {userInfo.email}
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

          {renderInfoRow('닉네임', editedNickname, true, setEditedNickname)}
          {renderInfoRow('이메일', userInfo.email)}
          {renderInfoRow('전화번호', editedPhone, true, setEditedPhone)}
          {renderInfoRow('가입일', userInfo.joinDate)}

          {isEditing && (
            <Pressable
              onPress={handleCancel}
              style={{
                marginTop: 10,
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ddd',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#666', fontWeight: '500' }}>취소</Text>
            </Pressable>
          )}
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
                  onPress: () => Alert.alert('로그아웃', '로그아웃되었습니다.'),
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
