import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import services from '@/services';
import { type ClubDetail } from '@/types/models/club';

export const TABS = ['정보', '자료', '미션'];

export const useMeetingDetail = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [selectedTab, setSelectedTab] = React.useState<(typeof TABS)[number]>(TABS[0]);

  const { data, isLoading, error } = useQuery<{ club: ClubDetail | null }>({
    queryKey: ['meeting', id],
    queryFn: () => services.clubs.getClubById(id),
    initialData: {
      club: null,
    },
  });

  // 하단 버튼 영역 높이 계산
  const bottomButtonHeight = React.useMemo(() => 16 + 52 + insets.bottom + 16, [insets.bottom]); // paddingTop + 버튼높이 + safeArea + paddingBottom

  const now = new Date();
  const isEnded = data?.club?.endDateTime ? new Date(data.club.endDateTime) < now : false;
  const isOngoing = data?.club?.startDateTime
    ? new Date(data.club.startDateTime) <= now && now <= new Date(data.club.endDateTime)
    : false;

  const handleEvaluation = () => {
    router.push('/(modals)/evaluate');
  };

  const handleAttendance = () => {
    router.push('/(modals)/attendance-manage');
  };

  const handleApplication = () => {
    console.log('참가 신청받기');
    // 추후 알고리즘 추가
  };

  return {
    router,
    insets,
    club: data?.club ?? null,
    isLoading,
    error,
    bottomButtonHeight,
    isEnded,
    isOngoing,
    selectedTab,
    setSelectedTab,
    handleEvaluation,
    handleAttendance,
    handleApplication,
  };
};
