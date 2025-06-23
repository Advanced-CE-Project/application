import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import services from '@/services';
import type { ClubItem } from '@/types/models/club';

export const useHome = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { me } = useMe();

  const { data: recommendedClubs, isFetching: isRecommendedClubsLoading } = useQuery<ClubItem[]>({
    queryKey: ['recommendedClubs'],
    queryFn: () => services.clubs.getClubByInterest(),
    initialData: [],
    refetchOnWindowFocus: true,
  });

  const { data: recentClubs, isFetching: isRecentClubsLoading } = useQuery<ClubItem[]>({
    queryKey: ['recentClubs'],
    queryFn: () => services.clubs.getClubRecentlyJoined(),
    initialData: [],
    refetchOnWindowFocus: true,
  });

  const navigateToNotification = () => {
    if (!!me) {
      router.push('/notifications');
    } else {
      router.push('/(modals)/auth');
    }
  };

  const navigateToMeetingDetail = (meetingId: string) => {
    router.push(`/meeting/detail?id=${meetingId}`);
  };

  const viewAllRecent = () => {
    router.push('/meeting/recent');
  };

  return {
    isRecommendedClubsLoading,
    isRecentClubsLoading,
    isLoading: isRecommendedClubsLoading || isRecentClubsLoading,
    insets,
    navigateToNotification,
    navigateToMeetingDetail,
    viewAllRecent,
    recommendedClubs,
    recentClubs,
  };
};
