import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spacer } from '@/components/ui/spacer';
import { Tag } from '@/components/ui/tag';

const DUMMY_USER = {
  email: 'bemo@bemo.com',
  name: '김비모',
  nickname: '김비모',
  bio: '안녕하세요! 다양한 모임에 참여하고 싶은 김비모입니다. 독서와 독서를 좋아합니다.',
  interests: ['독서', '영화'],
};

const AVAILABLE_TAGS = [
  '독서',
  '영화',
  '운동',
  '음악',
  '여행',
  '요리',
  '게임',
  '스포츠',
  '미술',
  '사진',
];

const useProfile = () => {
  const insets = useSafeAreaInsets();
  const [nickname, setNickname] = useState(DUMMY_USER.nickname);
  const [bio, setBio] = useState(DUMMY_USER.bio);
  const [selectedTags, setSelectedTags] = useState<string[]>(DUMMY_USER.interests);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const addNewTag = () => {
    Alert.prompt('새 태그 추가', '추가할 태그를 입력하세요', [
      { text: '취소', style: 'cancel' },
      {
        text: '추가',
        onPress: (text) => {
          if (text && text.trim() && !selectedTags.includes(text.trim())) {
            setSelectedTags((prev) => [...prev, text.trim()]);
          }
        },
      },
    ]);
  };

  const navigateToSettings = () => {
    // 설정 화면으로 이동
    console.log('Navigate to settings');
    Alert.alert('설정', '설정 기능이 구현될 예정입니다.');
  };

  return {
    insets,
    user: DUMMY_USER,
    nickname,
    setNickname,
    bio,
    setBio,
    selectedTags,
    toggleTag,
    addNewTag,
    navigateToSettings,
  };
};

const ProfileScreen = () => {
  const {
    insets,
    user,
    nickname,
    setNickname,
    bio,
    setBio,
    selectedTags,
    toggleTag,
    addNewTag,
    navigateToSettings,
  } = useProfile();

  const onSave = () => {
    Alert.alert('저장 완료', '프로필이 성공적으로 저장되었습니다.');
  };

  const onChangeProfileImage = () => {
    Alert.alert('프로필 사진 변경', '프로필 사진을 변경하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '갤러리에서 선택', onPress: () => {} },
      { text: '카메라로 촬영', onPress: () => {} },
    ]);
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
            프로필
          </Text>

          <Pressable
            onPress={navigateToSettings}
            style={{
              padding: 8,
            }}
          >
            <Feather name='settings' size={24} color='#333' />
          </Pressable>
        </View>
      </View>

      {/* 스크롤 가능한 콘텐츠 */}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            padding: 16,
            paddingTop: 24,
          }}
        >
          {/* 프로필 이미지 섹션 */}
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#e0e0e0',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: '#999',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: '#999',
                    marginBottom: 2,
                  }}
                />
                <View
                  style={{
                    width: 24,
                    height: 12,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    backgroundColor: '#999',
                  }}
                />
              </View>
            </View>
          </View>

          {/* 이름 표시 */}
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#333',
              }}
            >
              {user.name}
            </Text>
          </View>

          {/* 닉네임 입력 */}
          <Input
            label='닉네임'
            value={nickname}
            onChangeText={setNickname}
            placeholder='닉네임을 입력하세요'
            containerStyle={{ marginBottom: 24 }}
          />

          {/* 자기소개 입력 */}
          <Input
            label='자기소개'
            value={bio}
            onChangeText={setBio}
            placeholder='자기소개를 입력하세요'
            multiline
            numberOfLines={4}
            style={{
              height: 100,
              textAlignVertical: 'top',
            }}
            containerStyle={{ marginBottom: 24 }}
          />

          {/* 관심 태그 */}
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#333',
                marginBottom: 16,
              }}
            >
              관심 태그
            </Text>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 8,
              }}
            >
              {AVAILABLE_TAGS.map((tag) => (
                <Tag
                  key={tag}
                  title={tag}
                  selected={selectedTags.includes(tag)}
                  onPress={() => toggleTag(tag)}
                />
              ))}

              {/* 추가 버튼 */}
              <Tag
                title='+추가'
                onPress={addNewTag}
                style={{
                  backgroundColor: '#f8f8f8',
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderStyle: 'dashed',
                }}
              />
            </View>

            {/* 선택된 커스텀 태그들 표시 */}
            {selectedTags.filter((tag) => !AVAILABLE_TAGS.includes(tag)).length > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 8,
                }}
              >
                {selectedTags
                  .filter((tag) => !AVAILABLE_TAGS.includes(tag))
                  .map((tag) => (
                    <Tag key={tag} title={tag} selected onPress={() => toggleTag(tag)} />
                  ))}
              </View>
            )}
          </View>

          <Spacer height={100} />
        </View>
      </ScrollView>

      {/* 플로팅 저장 버튼 */}
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
          borderRadius: 25,
        }}
      >
        <Button title='저장' onPress={onSave} accessibilityLabel='save-profile-button' />
      </View>
    </View>
  );
};

export default ProfileScreen;
