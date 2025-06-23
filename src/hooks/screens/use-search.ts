import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import services from '@/services';
import { useLocationStore } from '@/stores/location';
import type { ClubItem } from '@/types/models/club';
import type { Tag } from '@/types/models/tag';

export const useSearch = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { location } = useLocationStore();

  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.5665, // 서울 시청 좌표
    longitude: 126.978,
  });

  const debouncedSearchText = useDebounce(searchText, 500);

  const tagsQuery = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: services.clubs.getTags,
    initialData: [],
  });

  const clubsQuery = useQuery<ClubItem[]>({
    queryKey: ['clubs', debouncedSearchText, selectedTag, mapRegion],
    queryFn: () =>
      services.clubs.getClubs({
        search: debouncedSearchText,
        tagId: selectedTag === 'ALL' ? null : selectedTag,
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
      }),
    initialData: [],
  });

  const goBack = () => {
    router.back();
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    // 실제 검색 로직 구현
    console.log('Searching for:', text);
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

  useEffect(() => {
    if (location?.coords) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }, [location?.coords]);

  return {
    insets,
    searchText,
    selectedTag,
    isClubFetching: clubsQuery.isFetching,
    isTagFetching: tagsQuery.isFetching,
    tags: tagsQuery.data ? [{ id: 'ALL', name: '전체' }, ...tagsQuery.data] : [],
    clubs: clubsQuery.data ?? [],
    location,
    mapRegion,
    goBack,
    handleSearch,
    setSelectedTag,
    openLocationFilter,
    openTimeFilter,
    navigateToMeetingDetail,
    handleCurrentLocationSearch,
    handleMapClick,
  };
};
