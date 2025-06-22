import { useQuery } from '@tanstack/react-query';

import services from '@/services';

const useMe = () => {
  const meQuery = useQuery({
    queryKey: ['users/me'],
    queryFn: () => services.users.getMe(),
    initialData: [],
  });

  return {
    isMeFetching: meQuery.isFetching,
    isMeError: meQuery.isError,
    me: meQuery.data,
  };
};

export default useMe;
