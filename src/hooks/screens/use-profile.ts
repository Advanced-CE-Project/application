import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';

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

export const useProfile = () => {
  const insets = useSafeAreaInsets();
  const { me, isMeFetching } = useMe({ enabled: true });

  const [nickname, setNickname] = useState<string>(me?.nickname ?? '');
  const [bio, setBio] = useState<string>(me?.bio ?? '');
  const [selectedTags, setSelectedTags] = useState<string[]>(me?.interests ?? []);

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
    router.push('/settings');
  };

  const navigateToLogin = () => {
    router.push('/(modals)/auth');
  };

  React.useEffect(() => {
    if (me && !isMeFetching) {
      setNickname(me.nickname ?? '');
      setBio(me.bio ?? '');
      setSelectedTags(me.interests ?? []);
    }
  }, [me, isMeFetching]);

  return {
    insets,
    user: me,
    isLoggedIn: !!me,
    nickname,
    setNickname,
    bio,
    setBio,
    selectedTags,
    toggleTag,
    addNewTag,
    navigateToSettings,
    navigateToLogin,
  };
};
