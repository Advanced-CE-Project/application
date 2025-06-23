import { Feather } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import { removeTokens } from '@/lib/auth';
import services from '@/services';

// 설정 섹션 타입 정의
export interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  color?: string;
}

export interface SettingSection {
  title: string;
  items: SettingItem[];
}

export const useSettings = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { me } = useMe();

  // 설정 상태들
  const [pushNotifications, setPushNotifications] = useState(false);
  const [locationServices, setLocationServices] = useState(false);

  const userSettingsQuery = useQuery({
    enabled: !!me,
    queryKey: ['user-settings'],
    queryFn: services.users.getUserSettings,
  });

  const updateUserSettingsMutation = useMutation({
    mutationFn: () =>
      services.users.updateUserSettings({
        notificationEnabled: pushNotifications,
        locationEnabled: locationServices,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-settings'] });
      userSettingsQuery.refetch();
    },
  });

  const handleToggle = (key: 'notificationEnabled' | 'locationEnabled', value: boolean) => {
    if (key === 'notificationEnabled') {
      setPushNotifications(value);
    } else if (key === 'locationEnabled') {
      setLocationServices(value);
    }
    updateUserSettingsMutation.mutate();
  };

  // 네비게이션 액션들
  const navigateToPasswordChange = () => {
    router.push('/password-change');
  };

  const navigateToAccountInfo = () => {
    router.push('/account-info');
  };

  const navigateToPrivacyPolicy = () => {
    router.push('/privacy-policy');
  };

  const navigateToTermsOfService = () => {
    router.push('/terms-of-service');
  };

  const navigateToHelp = () => {
    router.push('/help');
  };

  const showAppInfo = () => {
    Alert.alert('앱 정보', 'BeMo v1.0.0\n© 2024 BeMo Team');
  };

  const logout = () => {
    Alert.alert('로그아웃', '정말 로그아웃하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: () => {
          removeTokens();
          queryClient.clear();
          router.back();
        },
      },
    ]);
  };

  const deleteAccount = () => {
    router.push('/(modals)/delete-account');
  };

  // 설정 섹션 데이터
  const settingSections: SettingSection[] = [
    {
      title: '계정',
      items: [
        {
          id: 'account-info',
          title: '계정 정보',
          subtitle: '이메일, 전화번호 관리',
          icon: 'user',
          type: 'navigation',
          onPress: navigateToAccountInfo,
        },
        {
          id: 'password-change',
          title: '비밀번호 변경',
          icon: 'lock',
          type: 'navigation',
          onPress: navigateToPasswordChange,
        },
      ],
    },
    {
      title: '알림',
      items: [
        {
          id: 'push-notifications',
          title: '푸시 알림',
          subtitle: '새로운 모임, 메시지 알림',
          icon: 'bell',
          type: 'toggle',
          value: pushNotifications,
          onToggle: (value) => handleToggle('notificationEnabled', value),
        },
      ],
    },
    {
      title: '개인정보',
      items: [
        {
          id: 'location-services',
          title: '위치 서비스',
          subtitle: '근처 모임 찾기, 지도 표시',
          icon: 'map-pin',
          type: 'toggle',
          value: locationServices,
          onToggle: (value) => handleToggle('locationEnabled', value),
        },
      ],
    },
    {
      title: '지원 및 정보',
      items: [
        {
          id: 'help',
          title: '도움말',
          icon: 'help-circle',
          type: 'navigation',
          onPress: navigateToHelp,
        },
        {
          id: 'terms',
          title: '서비스 이용약관',
          icon: 'file-text',
          type: 'navigation',
          onPress: navigateToTermsOfService,
        },
        {
          id: 'privacy',
          title: '개인정보처리방침',
          icon: 'shield',
          type: 'navigation',
          onPress: navigateToPrivacyPolicy,
        },
        {
          id: 'app-info',
          title: '앱 정보',
          subtitle: 'v1.0.0',
          icon: 'info',
          type: 'navigation',
          onPress: showAppInfo,
        },
      ],
    },
    {
      title: '기타',
      items: [
        {
          id: 'logout',
          title: '로그아웃',
          icon: 'log-out',
          type: 'action',
          onPress: logout,
          color: '#ff6b6b',
        },
        {
          id: 'delete-account',
          title: '계정 삭제',
          icon: 'user-x',
          type: 'action',
          onPress: deleteAccount,
          color: '#e74c3c',
        },
      ],
    },
  ];

  React.useEffect(() => {
    if (userSettingsQuery.data) {
      setPushNotifications(userSettingsQuery.data.notificationEnabled);
      setLocationServices(userSettingsQuery.data.locationEnabled);
    }
  }, [userSettingsQuery.data]);

  return {
    insets,
    settingSections,
  };
};
