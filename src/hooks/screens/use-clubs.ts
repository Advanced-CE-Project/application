import { useRouter } from 'expo-router';

import useMe from '@/hooks/use-me';

export const useClubs = () => {
  const { me } = useMe();
  const router = useRouter();

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
    me,
    navigateToCreateMeeting,
    navigateToMeetingDetail,
    navigateToLogin,
  };
};
