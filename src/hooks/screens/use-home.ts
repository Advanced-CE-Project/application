import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import services from '@/services';
import type { ClubItem } from '@/types/models/club';

export const useHome = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: recommendedClubs, isFetching: isRecommendedClubsLoading } = useQuery<Club[]>({
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

  const navigateToSearch = () => {
    router.push('/search');
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
    navigateToSearch,
    navigateToMeetingDetail,
    viewAllRecent,
    recommendedClubs,
    recentClubs,
  };
};
