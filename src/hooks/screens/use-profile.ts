import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import { useRefetchOnFocus } from '@/hooks/use-refetch-on-focus';
import services from '@/services';
import type { Tag } from '@/types/models/tag';

export const useProfile = () => {
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { me, isMeFetching, refetchMe } = useMe({ enabled: true });

  const [nickname, setNickname] = useState<string>(me?.nickname ?? '');
  const [bio, setBio] = useState<string>(me?.bio ?? '');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useRefetchOnFocus();

  // 사용 가능한 태그 목록 조회
  const { data: availableTags = [] } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: services.clubs.getTags,
    initialData: [],
  });

  // 프로필 업데이트 뮤테이션
  const updateProfileMutation = useMutation({
    mutationFn: services.users.updateMe,
    onSuccess: () => {
      // 사용자 정보 다시 불러오기
      refetchMe();
      queryClient.invalidateQueries({ queryKey: ['users/me'] });

      Alert.alert('성공', '프로필이 성공적으로 저장되었습니다.');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '프로필 저장 중 오류가 발생했습니다.';
      Alert.alert('오류', errorMessage);
    },
  });

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

  const saveProfile = () => {
    if (!nickname.trim()) {
      Alert.alert('오류', '닉네임을 입력해주세요.');
      return;
    }

    // selectedTags는 이미 string 배열이므로 그대로 사용
    const tagNames = selectedTags;

    updateProfileMutation.mutate({
      nickname: nickname.trim(),
      bio: bio.trim(),
      interests: tagNames,
    });
  };

  React.useEffect(() => {
    if (me && !isMeFetching) {
      setNickname(me.nickname ?? '');
      setBio(me.bio ?? '');
      // interests가 Tag 객체 배열인 경우 name만 추출
      const interestNames =
        me.interests?.map((interest: any) =>
          typeof interest === 'string' ? interest : interest.name,
        ) ?? [];
      setSelectedTags(interestNames);
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
    saveProfile,
    isSaving: updateProfileMutation.isPending,
    navigateToSettings,
    navigateToLogin,
  };
};
