import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MeetingCard } from '@/components/ui/meeting-card';
import { Spacer } from '@/components/ui/spacer';
import { Tag } from '@/components/ui/tag';

// 토스 스타일 색상 팔레트
const colors = {
  primary: '#3182F6',
  gray900: '#191F28',
  gray800: '#333D4B',
  gray700: '#4E5968',
  gray600: '#6B7684',
  gray500: '#8B95A1',
  gray400: '#B0B8C1',
  gray300: '#C9CFD6',
  gray200: '#E5E8EB',
  gray100: '#F2F4F6',
  gray50: '#F9FAFB',
  white: '#FFFFFF',
  background: '#FAFBFC',
};

// 카테고리 데이터
const CATEGORIES = ['전체', '운동', '스터디', '친목', '음식', '여행'];

// 검색 결과 더미 데이터
const SEARCH_RESULTS = [
  {
    id: '1',
    title: '테니스 초보 모임',
    date: '4/20 (목)',
    location: '강남 테니스장',
    tags: ['운동'],
    participants: {
      current: 4,
      max: 8,
    },
  },
  {
    id: '2',
    title: '헬스장 같이 가요',
    date: '4/22 (토)',
    location: '사서동 피트니스',
    tags: ['운동'],
    participants: {
      current: 3,
      max: 6,
    },
  },
];

const useSearch = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedLocation, setSelectedLocation] = useState('서울시 강남구');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('이번 주');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(
    null,
  );
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.5665, // 서울 시청 좌표
    longitude: 126.978,
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한 필요', '위치 서비스를 사용하려면 위치 권한이 필요합니다.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(coords);
      setMapRegion(coords);
    } catch (error) {
      console.error('위치 가져오기 실패:', error);
      Alert.alert('오류', '현재 위치를 가져올 수 없습니다.');
    }
  };

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
    getCurrentLocation();
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
    selectedLocation,
    selectedTimeFilter,
    userLocation,
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

const SearchScreen = () => {
  const {
    insets,
    searchText,
    selectedCategory,
    selectedLocation,
    selectedTimeFilter,
    userLocation,
    mapRegion,
    goBack,
    handleSearch,
    selectCategory,
    openLocationFilter,
    openTimeFilter,
    navigateToMeetingDetail,
    handleCurrentLocationSearch,
    handleMapClick,
  } = useSearch();

  const filteredResults = useMemo(() => {
    if (selectedCategory === '전체') {
      return SEARCH_RESULTS;
    }
    return SEARCH_RESULTS.filter((meeting) => meeting.tags.includes(selectedCategory));
  }, [selectedCategory]);

  // 지도 컴포넌트 렌더링 (플랫폼별 분기)
  const renderMap = () => {
    const cameraPosition = {
      coordinates: mapRegion,
      zoom: 13,
    };

    const markers = userLocation
      ? [
          {
            id: 'user-location',
            coordinates: userLocation,
            title: '내 위치',
          },
        ]
      : [];

    if (Platform.OS === 'ios') {
      return (
        <AppleMaps.View
          style={styles.map}
          cameraPosition={cameraPosition}
          onMapClick={handleMapClick}
          markers={markers}
          uiSettings={{
            compassEnabled: false,
          }}
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <GoogleMaps.View
          style={styles.map}
          cameraPosition={cameraPosition}
          onMapClick={handleMapClick}
          markers={markers}
          uiSettings={{
            myLocationButtonEnabled: false,
            zoomControlsEnabled: false,
            mapToolbarEnabled: false,
            compassEnabled: false,
          }}
        />
      );
    } else {
      return (
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>지도는 iOS와 Android에서만 지원됩니다</Text>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 고정 헤더 */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: '#333',
            }}
          >
            검색
          </Text>

          {/* 높이 통일을 위한 빈 공간 */}
          <View style={{ width: 40, height: 40 }} />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          {/* 검색 입력창 */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f8f8f8',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginBottom: 20,
            }}
          >
            <Feather name='search' size={20} color='#999' style={{ marginRight: 8 }} />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: '#333',
              }}
              placeholder='모임 검색'
              placeholderTextColor='#999'
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>

          {/* 카테고리 태그들 - 가로 스크롤 */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {CATEGORIES.map((category, index) => (
              <Tag
                key={category}
                title={category}
                selected={selectedCategory === category}
                onPress={() => selectCategory(category)}
                style={{
                  marginRight: 8,
                }}
              />
            ))}
          </ScrollView>

          {/* 위치 및 시간 필터 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Pressable
              onPress={openLocationFilter}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Feather name='map-pin' size={16} color='#4A90E2' style={{ marginRight: 4 }} />
              <Text
                style={{
                  fontSize: 14,
                  color: '#4A90E2',
                }}
              >
                {selectedLocation}
              </Text>
            </Pressable>
          </View>

          {/* 지도 영역 */}
          <View style={styles.mapContainer}>
            {renderMap()}
            <Pressable onPress={handleCurrentLocationSearch} style={styles.currentLocationButton}>
              <Feather name='crosshair' size={20} color='#4A90E2' />
            </Pressable>
          </View>

          {/* 검색 결과 */}
          <View style={{ gap: 16 }}>
            {filteredResults.length > 0 ? (
              filteredResults.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  title={meeting.title}
                  date={meeting.date}
                  location={meeting.location}
                  tags={meeting.tags}
                  participants={meeting.participants}
                  onPress={() => navigateToMeetingDetail(meeting.id)}
                />
              ))
            ) : (
              <View style={{ alignItems: 'center', padding: 20 }}>
                <Text style={{ color: '#999', fontSize: 16 }}>검색 결과가 없습니다.</Text>
              </View>
            )}
          </View>

          <Spacer height={32} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#999',
  },
  currentLocationButton: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default SearchScreen;
