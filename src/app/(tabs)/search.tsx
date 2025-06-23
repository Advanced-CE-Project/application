import { Feather } from '@expo/vector-icons';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import React, { useMemo } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { MeetingCard } from '@/components/ui/meeting-card';
import { MeetingCardSkeleton } from '@/components/ui/skeleton';
import { Spacer } from '@/components/ui/spacer';
import { Tag } from '@/components/ui/tag';
import { useSearch } from '@/hooks/screens/use-search';
import { formatShortKoreanDateTime } from '@/lib/dayjs';

const SearchScreen = () => {
  const {
    insets,
    searchText,
    selectedTag,
    isClubFetching,
    isTagFetching,
    location,
    mapRegion,
    tags,
    clubs,
    handleSearch,
    setSelectedTag,
    navigateToMeetingDetail,
    handleCurrentLocationSearch,
    handleMapClick,
  } = useSearch();

  // 지도 컴포넌트 렌더링 (플랫폼별 분기)
  const renderMap = () => {
    const cameraPosition = {
      coordinates: mapRegion,
      zoom: 13,
    };

    const markers = location
      ? [
          {
            id: 'user-location',
            coordinates: location.coords,
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
            {tags.map((tag, index) => (
              <Tag
                key={tag.id}
                title={tag.name}
                selected={selectedTag === tag.id}
                onPress={() => setSelectedTag(tag.id)}
                style={{
                  marginRight: 8,
                }}
              />
            ))}
          </ScrollView>

          {/* 지도 영역 */}
          <View style={styles.mapContainer}>
            {renderMap()}
            <Pressable onPress={handleCurrentLocationSearch} style={styles.currentLocationButton}>
              <Feather name='crosshair' size={20} color='#4A90E2' />
            </Pressable>
          </View>

          {/* 검색 결과 */}
          <View style={{ gap: 16 }}>
            {isClubFetching ? (
              // 로딩 상태 스켈레톤 UI
              <>
                {Array.from({ length: 3 }, (_, index) => (
                  <MeetingCardSkeleton key={`skeleton-search-${index}`} />
                ))}
              </>
            ) : clubs.length > 0 ? (
              clubs.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  title={meeting.name}
                  date={formatShortKoreanDateTime(meeting.startDateTime)}
                  location={meeting.location?.name ?? ''}
                  tags={meeting.tags.map((tag) => tag.name)}
                  participants={{
                    // current: meeting.participants?.length ?? 0,
                    // max: meeting.maxParticipants ?? 1,
                    current: 0,
                    max: 1,
                  }}
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
