import { useQuery } from '@tanstack/react-query';

import services from '@/services';

interface UseMeProps {
  enabled?: boolean;
}

export const useMe = ({ enabled = true }: UseMeProps = {}) => {
  const meQuery = useQuery({
    enabled,
    queryKey: ['users/me'],
    queryFn: services.users.getMe,
    initialData: null,
  });

  console.log(`meQuery.data:`, {
    enabled,
    data: meQuery.data,
    isFetching: meQuery.isFetching,
    isLoading: meQuery.isLoading,
    isError: meQuery.isError,
    isSuccess: meQuery.isSuccess,
  });

  return {
    isMeFetching: meQuery.isFetching,
    isMeError: meQuery.isError,
    me: meQuery.data,
    refetchMe: meQuery.refetch,
  };
};

export default useMe;
