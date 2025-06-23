import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import { removeTokens } from '@/lib/auth';
import services from '@/services';

export const CONFIRM_TEXT = '계정 삭제';

export const WARNING_ITEMS = [
  {
    icon: 'user-x',
    title: '계정 정보 삭제',
    description: '프로필, 개인정보 등 모든 계정 데이터가 삭제됩니다.',
  },
  {
    icon: 'calendar',
    title: '모임 기록 삭제',
    description: '참여했던 모든 모임 기록과 활동 내역이 삭제됩니다.',
  },
  {
    icon: 'clock',
    title: '복구 불가능',
    description: '삭제된 데이터는 복구할 수 없습니다.',
  },
];

export const useDeleteAccount = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const [confirmText, setConfirmText] = useState('');
  const isConfirmValid = confirmText === CONFIRM_TEXT;

  const deleteAccountMutation = useMutation({
    mutationFn: services.users.deleteAccount,
    onSuccess: async () => {
      Alert.alert('계정 삭제 완료', '계정이 성공적으로 삭제되었습니다.');
      removeTokens();
      queryClient.clear();
      router.dismissAll();
    },
    onError: () => {
      Alert.alert('계정 삭제 실패', '계정 삭제에 실패했습니다.');
    },
  });

  const handleDeleteAccount = () => {
    if (!isConfirmValid) {
      Alert.alert('확인 필요', `"${CONFIRM_TEXT}"를 정확히 입력해주세요.`);
      return;
    }

    deleteAccountMutation.mutate();
  };

  return {
    isLoading: deleteAccountMutation.isPending,
    isConfirmValid,
    router,
    insets,
    confirmText,
    setConfirmText,
    handleDeleteAccount,
  };
};
