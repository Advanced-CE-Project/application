import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import services from '@/services';
import { ClubItem } from '@/types/models/club';

export const useClubs = () => {
  const { me } = useMe();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data, isLoading, error } = useQuery<{ clubs: ClubItem[] }>({
    enabled: !!me,
    queryKey: ['clubs'],
    queryFn: () => services.clubs.getClubs(),
    refetchOnWindowFocus: true,
    initialData: {
      clubs: [],
    },
  });

  // console.log('data', data);

  const navigateToCreateMeeting = () => {
    // 새 모임 만들기 화면으로 이동
    // console.log('Navigate to create meeting');
    router.push('/meeting/create');
  };

  const navigateToMeetingDetail = (meetingId: string) => {
    // 모임 상세 페이지로 이동 (관리 모드)
    // console.log('Navigate to meeting detail:', meetingId);
    router.push(`/meeting/detail?id=${meetingId}&mode=manage`);
  };

  const navigateToLogin = () => {
    router.push('/(modals)/auth');
  };

  return {
    me,
    insets,
    clubs: data?.clubs ?? [],
    navigateToCreateMeeting,
    navigateToMeetingDetail,
    navigateToLogin,
  };
};
