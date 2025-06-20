import { Feather, AntDesign } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

const RecommendScreen = () => {
  const router = useRouter();
  const { title, date } = useLocalSearchParams();

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('distance');

  const recommendedPlaces = [
    {
      name: '스터디카페 역삼점',
      address: '강남구 역삼동 123-45',
      rating: 4.5,
      distance: 0.3,
    },
    {
      name: '카페드림',
      address: '강남구 역삼동 234-56',
      rating: 4.2,
      distance: 0.5,
    },
    {
      name: '카페드림팀',
      address: '강남구 역삼동 234-57',
      rating: 4.2,
      distance: 0.8,
    },
    {
      name: '구린카페드림',
      address: '강남구 역삼동 234-56',
      rating: 1.2,
      distance: 0.1,
    },
  ];

  const sortedPlaces = [...recommendedPlaces].sort((a, b) => {
    if (sortBy === 'distance') return a.distance - b.distance;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      {/* 헤더 */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
        <Pressable onPress={() => router.back()} style={{ marginRight: 8 }}>
          <Feather name='chevron-left' size={24} color='black' />
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>장소 추천</Text>
      </View>

      {/* 모임 정보 */}
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4 }}>{title}</Text>
      <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>{date}</Text>

      {/* 지도 */}
      <Text style={{ fontWeight: '600', marginBottom: 12 }}>참가자 위치 기반 중간 지점</Text>
      <View
        style={{
          height: 180,
          borderRadius: 12,
          backgroundColor: '#F3F4F6',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#2563EB' }} />
      </View>
      <Text style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 24 }}>
        서울시 강남구 역삼동 부근
      </Text>

      {/* 추천 장소 헤더 + 필터 토글 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          position: 'relative',
        }}
      >
        <Text style={{ fontWeight: '600' }}>추천 장소</Text>
        <Pressable onPress={() => setShowFilterOptions(!showFilterOptions)}>
          <Feather name='filter' size={18} color='#6B7280' />
        </Pressable>

        {/* 필터 옵션 */}
        {showFilterOptions && (
            <View style={{ 
                marginBottom: 16, 
                position: 'absolute', 
                right: 0, 
                top: 30, 
                backgroundColor: 'white', 
                padding: 12, 
                borderRadius: 8, 
                shadowColor: '#000', 
                shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.1, 
                shadowRadius: 4,
                zIndex: 2,
            }}>
            <Pressable onPress={() => setSortBy('distance')} style={{ paddingVertical: 4 }}>
                <Text style={{ color: sortBy === 'distance' ? '#2563EB' : '#374151' }}>
                거리순
                </Text>
            </Pressable>
            <Pressable onPress={() => setSortBy('rating')} style={{ paddingVertical: 4 }}>
                <Text style={{ color: sortBy === 'rating' ? '#2563EB' : '#374151' }}>
                별점 높은 순
                </Text>
            </Pressable>
            <Pressable onPress={() => setSortBy('name')} style={{ paddingVertical: 4 }}>
                <Text style={{ color: sortBy === 'name' ? '#2563EB' : '#374151' }}>
                이름 순
                </Text>
            </Pressable>
            </View>
        )}
      </View>

      {/* 추천 장소 목록 */}
      {sortedPlaces.map((place, index) => (
        <View
          key={index}
          style={{
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '500', marginBottom: 4 }}>{place.name}</Text>
          <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 6 }}>
            {place.address}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name='star' size={14} color='#F59E0B' />
            <Text style={{ marginLeft: 4, marginRight: 12, color: '#374151', fontSize: 13 }}>
              {place.rating.toFixed(1)}
            </Text>
            <Text style={{ color: '#374151', fontSize: 13 }}>{place.distance}km</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default RecommendScreen;