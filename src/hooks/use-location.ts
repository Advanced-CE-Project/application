import { useMutation, useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import React from 'react';
import { Platform } from 'react-native';

import useMe from '@/hooks/use-me';
import services from '@/services';
import { useLocationStore } from '@/stores/location';

interface UseLocationProps {
  enabled: boolean;
}

export const useLocation = ({ enabled }: UseLocationProps) => {
  const { me, refetchMe } = useMe();
  const { location, error, setLocation, setError } = useLocationStore();

  const getLocation = async () => {
    if (Platform.OS === 'android') {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('위치 권한이 거절되었습니다.');
        return;
      }
    }

    const { coords } = await Location.getCurrentPositionAsync();
    return { coords, timestamp: Date.now() };
  };

  useQuery({
    enabled: enabled,
    queryKey: ['location'],
    queryFn: async () => {
      const response = await getLocation();
      if (response) {
        setLocation(response);
        setError(null);
      }

      return response ?? null;
    },
    refetchInterval: 1000 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const updateMyLocationMutation = useMutation({
    mutationFn: services.users.updateLocation,
    onSuccess: () => {
      refetchMe();
    },
  });

  React.useEffect(() => {
    if (!me || !location || !location.coords || !!error) return;

    updateMyLocationMutation.mutate({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }, [location, me, error]);

  return {
    location,
    error,
  };
};

export default useLocation;
