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

  const { data, isFetching, error } = useQuery<ClubItem[]>({
    enabled: !!me,
    queryKey: ['clubs', me?.id ?? 'unknown'],
    queryFn: services.clubs.getMyClubs,
    refetchOnWindowFocus: true,
    initialData: [],
  });

  const navigateToCreateMeeting = () => {
    router.push('/meeting/create');
  };

  const navigateToMeetingDetail = (meetingId: string) => {
    router.push(`/meeting/detail?id=${meetingId}&mode=manage`);
  };

  const navigateToLogin = () => {
    router.push('/(modals)/auth');
  };

  return {
    isFetching,
    error,
    me,
    insets,
    clubs: data ?? [],
    navigateToCreateMeeting,
    navigateToMeetingDetail,
    navigateToLogin,
  };
};
