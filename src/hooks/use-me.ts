import { useQuery } from '@tanstack/react-query';

import services from '@/services';
import { User } from '@/services/users';

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
    me: meQuery.data as User | null,
    refetchMe: meQuery.refetch,
  };
};

export default useMe;
