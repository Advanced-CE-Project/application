import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import { setAccessToken, setRefreshToken } from '@/lib/auth';
import services from '@/services';

export const useAuth = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { me, refetchMe } = useMe();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const loginMutation = useMutation({
    mutationFn: () => services.auth.login(formData),
    onSuccess: async (response) => {
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      refetchMe();
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

  const handleKakaoLogin = () => {};

  const handleGoogleLogin = () => {};

  const handleEmailSignup = () => {};

  useEffect(() => {
    if (me) {
      router.back();
    }
  }, [me]);

  return {
    isLoading: loginMutation.isPending,
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
