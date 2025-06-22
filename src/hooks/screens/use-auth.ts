import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import services from '@/services';

export const useAuth = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const loginMutation = useMutation({
    mutationFn: () => services.auth.login(formData),
    onSuccess: () => {
      router.back();
    },
    onError: (error: any) => {
      Alert.alert('로그인 실패', error?.response?.data?.message || '로그인 실패');
      console.error(error);
    },
  });

  const errorMessage = useMemo(() => {
    if (loginMutation.error instanceof AxiosError) {
      return loginMutation.error.response?.data?.message;
    }
    return null;
  }, [loginMutation.error]);

  const handleLogin = () => {
    loginMutation.mutate();
  };

  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 추가
    console.log('카카오 로그인');
    router.back(); // 모달 닫기
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 로직 추가
    console.log('구글 로그인');
    router.back(); // 모달 닫기
  };

  const handleEmailSignup = () => {
    // 이메일 회원가입으로 이동
    console.log('이메일 회원가입');
    router.push('/(modals)/email-signup');
  };

  return {
    insets,
    formData,
    errorMessage,
    setFormData,
    handleLogin,
    handleKakaoLogin,
    handleGoogleLogin,
    handleEmailSignup,
  };
};
