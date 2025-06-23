import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import services from '@/services';
import { useLocationStore } from '@/stores/location';
import { ClubItem } from '@/types/models/club';

export const useSearch = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { location } = useLocationStore();

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const debouncedSearchText = useDebounce(searchText, 500);

  const clubsQuery = useQuery<ClubItem[]>({
    queryKey: ['clubs', debouncedSearchText],
    queryFn: () => services.clubs.getClubs({ search: debouncedSearchText }),
    initialData: [],
  });

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.5665, // 서울 시청 좌표
    longitude: 126.978,
  });

  const goBack = () => {
    router.back();
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    // 실제 검색 로직 구현
    console.log('Searching for:', text);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    console.log('Selected category:', category);
  };

  const openLocationFilter = () => {
    console.log('Open location filter');
    // 위치 필터 모달 열기
  };

  const openTimeFilter = () => {
    console.log('Open time filter');
    // 시간 필터 모달 열기
  };

  const navigateToMeetingDetail = (meetingId: string) => {
    console.log('Navigate to meeting detail:', meetingId);
  };

  const handleCurrentLocationSearch = () => {
    console.log('Searching for current location');
  };

  const handleMapClick = (event: any) => {
    console.log('Map clicked at:', event.coordinates);
    if (event.coordinates?.latitude && event.coordinates?.longitude) {
      setMapRegion({
        latitude: event.coordinates.latitude,
        longitude: event.coordinates.longitude,
      });
    }
  };

  return {
    insets,
    searchText,
    selectedCategory,
    isFetching: clubsQuery.isFetching,
    clubs: clubsQuery.data ?? [],
    location,
    mapRegion,
    goBack,
    handleSearch,
    selectCategory,
    openLocationFilter,
    openTimeFilter,
    navigateToMeetingDetail,
    handleCurrentLocationSearch,
    handleMapClick,
  };
};
