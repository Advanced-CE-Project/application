import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import services from '@/services';
import { type ClubDetail } from '@/types/models/club';

// 상수 정의
export const TABS = ['정보', '자료', '미션'] as const;
export const BOTTOM_BUTTON_PADDING = 16;
export const BOTTOM_BUTTON_HEIGHT = 52;

// 타입 정의
type TabType = (typeof TABS)[number];
type MemberStatus = 'APPROVED' | 'PENDING' | 'REJECTED' | null;
type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | null;

interface ClubDetailResponse {
  club: ClubDetail | null;
  memberStatus: MemberStatus;
  attendanceStatus: AttendanceStatus;
}

interface MeetingState {
  isEnded: boolean;
  isOngoing: boolean;
  isStarted: boolean;
  isOwner: boolean;
  isApproved: boolean;
  isPending: boolean;
  hasAttended: boolean;
}

export const useMeetingDetail = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { me } = useMe();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [selectedTab, setSelectedTab] = React.useState<TabType>(TABS[0]);

  // 모임 정보 조회
  const { data, isLoading, error } = useQuery<ClubDetailResponse>({
    queryKey: ['meeting', id],
    queryFn: () => services.clubs.getClubById(id),
    initialData: {
      club: null,
      memberStatus: null,
      attendanceStatus: null,
    },
  });

  // 참가 신청 mutation
  const joinClubMutation = useMutation({
    mutationFn: (clubId: string) => services.clubs.joinClub(clubId),
    onSuccess: () => {
      Alert.alert('성공', '모임 참가 신청이 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({
              queryKey: ['meeting', id],
            });
          },
        },
      ]);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '참가 신청 중 오류가 발생했습니다.';
      Alert.alert('오류', errorMessage);
    },
  });

  // 모임 시작 mutation
  const startClubMutation = useMutation({
    mutationFn: (clubId: string) => services.clubs.startClub(clubId),
    onSuccess: () => {
      Alert.alert('성공', '모임이 시작되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({
              queryKey: ['meeting', id],
            });
          },
        },
      ]);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '모임 시작 중 오류가 발생했습니다.';
      Alert.alert('오류', errorMessage);
    },
  });

  // 모임 종료 mutation
  const endClubMutation = useMutation({
    mutationFn: (clubId: string) => services.clubs.endClub(clubId),
    onSuccess: () => {
      Alert.alert('성공', '모임이 종료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({
              queryKey: ['meeting', id],
            });
          },
        },
      ]);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '모임 종료 중 오류가 발생했습니다.';
      Alert.alert('오류', errorMessage);
    },
  });

  // 상태 계산
  const meetingState = React.useMemo((): MeetingState => {
    const now = new Date();
    const club = data?.club;

    const isEnded = club?.isEnded ?? false;
    const isOngoing =
      club?.startDateTime && club?.endDateTime
        ? new Date(club.startDateTime) <= now && now <= new Date(club.endDateTime)
        : false;
    const isStarted = club?.isStarted ?? false;
    const isOwner = club?.ownerId === me?.id;
    const isApproved = data?.memberStatus === 'APPROVED';
    const isPending = data?.memberStatus === 'PENDING';
    const hasAttended = data?.attendanceStatus === 'PRESENT';

    return {
      isEnded,
      isOngoing,
      isStarted,
      isOwner,
      isApproved,
      isPending,
      hasAttended,
    };
  }, [data?.club, data?.memberStatus, data?.attendanceStatus, me?.id]);

  // 하단 버튼 영역 높이 계산
  const bottomButtonHeight = React.useMemo(
    () => BOTTOM_BUTTON_PADDING + BOTTOM_BUTTON_HEIGHT + insets.bottom + BOTTOM_BUTTON_PADDING,
    [insets.bottom],
  );

  // 이벤트 핸들러들
  const handleEvaluation = React.useCallback(() => {
    router.push('/(modals)/evaluate');
  }, [router]);

  const handleAttendance = React.useCallback(() => {
    router.push('/(modals)/attendance-check');
  }, [router]);

  const handleAttendanceManage = React.useCallback(() => {
    if (meetingState.isOwner && id) {
      router.push(`/(modals)/attendance-manage?id=${id}`);
    }
  }, [meetingState.isOwner, id, router]);

  const handleAttendanceCheck = React.useCallback(() => {
    router.push('/(modals)/qr-scan');
  }, [router]);

  const handleApplication = React.useCallback(() => {
    if (id && !joinClubMutation.isPending) {
      joinClubMutation.mutate(id);
    }
  }, [id, joinClubMutation]);

  const handleStartClub = React.useCallback(() => {
    if (id && !startClubMutation.isPending && meetingState.isOwner) {
      startClubMutation.mutate(id);
    }
  }, [id, startClubMutation, meetingState.isOwner]);

  const handleManageApplicants = React.useCallback(() => {
    if (meetingState.isOwner && id) {
      router.push(`/(modals)/manage-applicants?id=${id}`);
    }
  }, [meetingState.isOwner, id, router]);

  const handleEndClub = React.useCallback(() => {
    if (id && !endClubMutation.isPending && meetingState.isOwner) {
      Alert.alert('모임 종료', '정말로 모임을 종료하시겠습니까?\n종료 후에는 되돌릴 수 없습니다.', [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '종료',
          style: 'destructive',
          onPress: () => endClubMutation.mutate(id),
        },
      ]);
    }
  }, [id, endClubMutation, meetingState.isOwner]);

  // 디버그 로그
  React.useEffect(() => {
    console.log(
      `Meeting Detail - Owner: ${meetingState.isOwner}, Member: ${data?.memberStatus}, Attendance: ${data?.attendanceStatus}`,
      data,
    );
  }, [meetingState.isOwner, data?.memberStatus, data?.attendanceStatus, data]);

  return {
    // 기본 상태
    router,
    insets,
    club: data?.club ?? null,
    isLoading,
    error,
    bottomButtonHeight,

    // 모임 상태
    ...meetingState,
    memberStatus: data?.memberStatus,
    attendanceStatus: data?.attendanceStatus,

    // UI 상태
    selectedTab,
    setSelectedTab,
    isJoining: joinClubMutation.isPending,
    isStarting: startClubMutation.isPending,
    isEnding: endClubMutation.isPending,

    // 이벤트 핸들러
    handleEvaluation,
    handleAttendance,
    handleAttendanceManage,
    handleApplication,
    handleAttendanceCheck,
    handleStartClub,
    handleManageApplicants,
    handleEndClub,
  };
};
