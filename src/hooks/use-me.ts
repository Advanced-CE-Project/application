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

  return {
    isMeFetching: meQuery.isFetching,
    isMeError: meQuery.isError,
    me: meQuery.data,
    refetchMe: meQuery.refetch,
  };
};

export default useMe;
