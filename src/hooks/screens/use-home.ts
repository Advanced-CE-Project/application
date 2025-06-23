import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import services from '@/services';
import { getClubByInterest, getClubRecentlyJoined } from '@/services/clubs';

export interface Club {
  id: string;
  name: string;
  description: string;
  tags: {
    id: string;
    name: string;
    createdAt: string;
  }[];
  location: {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    placeType: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
  startDateTime: string;
  endDateTime: string;
  maxParticipants: number;
  createdAt: string;
  updatedAt: string;
}

export const useHome = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: recommendedClubs, isFetching: isRecommendedClubsLoading } = useQuery<Club[]>({
    queryKey: ['recommendedClubs'],
    queryFn: () => services.clubs.getClubByInterest(),
    initialData: [],
    refetchOnWindowFocus: true,
  });

  const { data: recentClubs, isFetching: isRecentClubsLoading } = useQuery<Club[]>({
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
