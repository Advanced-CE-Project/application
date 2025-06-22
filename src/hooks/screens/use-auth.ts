import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { login as kakaoLogin } from '@react-native-kakao/user';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import { setAccessToken, setRefreshToken } from '@/lib/auth';
import services from '@/services';

GoogleSignin.configure({
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '472392046415-iim3qp0v1hlipc2f99vounb0o0m7q0ta.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
  // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

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

  const handleKakaoLogin = async () => {
    try {
      const response = await kakaoLogin();
      console.log(`kakaoLogin resposne:`, response);
      Alert.alert(response.accessToken);
    } catch (error) {
      console.log(`error:`, error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;
      Alert.alert(idToken ?? 'no idToken');
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            Alert.alert('sign in already in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert('구글 플레이 서비스 사용 불가');
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            Alert.alert('구글 로그인이 취소되었습니다.');
            break;
          case statusCodes.SIGN_IN_REQUIRED:
            Alert.alert('구글 로그인이 필요합니다.');
            break;
          default:
            Alert.alert('구글 로그인 오류가 발생했습니다.');
        }
      } else {
        Alert.alert('구글 로그인 오류가 발생했습니다.');
      }
    }
  };

  const handleEmailSignup = () => {
    router.back(); // 현재 로그인 모달 닫기
    setTimeout(() => {
      router.push('/(modals)/email-signup'); // 회원가입 모달 열기
    }, 100); // 짧은 지연으로 모달 전환이 자연스럽게 되도록
  };

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
