import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import services from '@/services';

export const usePasswordChange = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showInput, setShowInput] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const passwordChangeMutation = useMutation({
    mutationFn: () => services.users.resetPassword(formData),
    onSuccess: () => {
      Alert.alert('비밀번호 변경 완료', '비밀번호가 성공적으로 변경되었습니다.');
      router.back();
    },
    onError: () => {
      Alert.alert('비밀번호 변경 실패', '비밀번호 변경에 실패했습니다.');
    },
  });

  const isFormValid =
    formData.currentPassword &&
    formData.newPassword &&
    formData.confirmNewPassword &&
    !passwordChangeMutation.isPending &&
    !Object.values(errors).some((error) => error !== '');

  const validatePasswords = () => {
    if (!formData.currentPassword && !formData.newPassword && !formData.confirmNewPassword) {
      return false;
    }

    const newErrors: Record<string, string> = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };

    // 현재 비밀번호 확인
    if (!formData.currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
    }

    // 새 비밀번호 유효성 검사
    if (!formData.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    // 비밀번호 확인
    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = '새 비밀번호와 일치하지 않습니다.';
    }

    // 같은 비밀번호 사용 방지
    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      newErrors.newPassword = '현재 비밀번호와 다른 비밀번호를 사용해주세요.';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleChangePassword = () => {
    if (!validatePasswords()) {
      return;
    }

    Alert.alert('비밀번호 변경', '비밀번호를 변경하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '변경',
        onPress: () => {
          passwordChangeMutation.mutate();
        },
        style: 'destructive',
      },
    ]);
  };

  useEffect(() => {
    validatePasswords();
  }, [formData.currentPassword, formData.newPassword, formData.confirmNewPassword]);

  return {
    isFormValid,
    isLoading: passwordChangeMutation.isPending,
    insets,
    router,
    formData,
    showInput,
    errors,
    setFormData,
    setShowInput,
    handleChangePassword,
  };
};
