import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import { setAccessToken, setRefreshToken } from '@/lib/auth';
import services from '@/services';

export const useEmailSignup = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { me, refetchMe } = useMe();

  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
  });

  const [agreements, setAgreements] = useState({
    agreeTerms: false,
    agreePrivacy: false,
    agreeLocation: false,
    agreeMarketing: false,
  });

  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateAgreement = (key: string) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const navigateToLogin = () => {
    router.back();
    setTimeout(() => {
      router.push('/(modals)/auth');
    }, 100);
  };

  const registerMutation = useMutation({
    mutationFn: (data: any) => services.auth.register(data),
    onSuccess: async (res) => {
      await setAccessToken(res.accessToken);
      await setRefreshToken(res.refreshToken);
      await refetchMe();
    },
  });

  const allRequiredFieldsFilled =
    formData.nickname &&
    formData.email &&
    formData.password &&
    agreements.agreeTerms &&
    agreements.agreePrivacy &&
    agreements.agreeLocation;

  const handleSubmit = () => {
    const { nickname, email, password } = formData;
    const { agreeTerms, agreePrivacy, agreeLocation } = agreements;

    if (!nickname || !email || !password) {
      Alert.alert('입력 오류', '필수 항목을 모두 입력해주세요.');
      return;
    }

    if (!agreeTerms || !agreePrivacy || !agreeLocation) {
      Alert.alert('동의 필요', '필수 약관에 모두 동의해주세요.');
      return;
    }

    registerMutation.mutate({
      nickname,
      email,
      password,
    });
  };

  useEffect(() => {
    if (me) {
      router.back();
    }
  }, [me]);

  return {
    isLoading: registerMutation.isPending,
    allRequiredFieldsFilled,
    router,
    insets,
    formData,
    agreements,
    updateFormData,
    updateAgreement,
    navigateToLogin,
    handleSubmit,
  };
};
