import { Feather } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MeetingCard } from '@/components/ui/meeting-card';
import { MeetingCardSkeleton } from '@/components/ui/skeleton';
import { formatShortKoreanDateTime } from '@/lib/dayjs';
import services from '@/services';
import type { ClubItem } from '@/types/models/club';

interface RecentClubsResponse {
  clubs: ClubItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const RecentMeetingsScreen: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [allClubs, setAllClubs] = useState<ClubItem[]>([]);

  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ['recentClubs', page],
    queryFn: () => services.clubs.getRecentClubs(page, 10),
    placeholderData: (previousData: any) => previousData,
  }) as {
    data: RecentClubsResponse | undefined;
    isLoading: boolean;
    isFetching: boolean;
    refetch: () => void;
    error: any;
  };

  // 데이터가 변경될 때마다 allClubs 업데이트
  useEffect(() => {
    if (data) {
      if (page === 1) {
        setAllClubs(data.clubs);
      } else {
        setAllClubs((prev) => [...prev, ...data.clubs]);
      }
    }
  }, [data, page]);

  const navigateToMeetingDetail = (meetingId: string) => {
    router.push(`/meeting/detail?id=${meetingId}`);
  };

  const handleRefresh = () => {
    setPage(1);
    setAllClubs([]);
    refetch();
  };

  const handleLoadMore = () => {
    if (data?.pagination.hasNext && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  const renderMeetingCard = ({ item }: { item: ClubItem }) => (
    <View style={{ marginBottom: 16 }}>
      <MeetingCard
        title={item.name}
        date={formatShortKoreanDateTime(item.startDateTime)}
        location={item?.location?.name || '장소 미정'}
        tags={item.tags.map((tag: any) => tag.name)}
        onPress={() => navigateToMeetingDetail(item.id)}
        participants={{
          current: item.currentParticipants,
          max: item.maxParticipants,
        }}
        isStarted={item.isStarted}
        isEnded={item.isEnded}
      />
    </View>
  );

  const renderFooter = () => {
    if (!data?.pagination.hasNext) return null;

    return (
      <View style={styles.footerContainer}>
        {isFetching ? (
          <ActivityIndicator size='small' color='#4A90E2' />
        ) : (
          <Pressable onPress={handleLoadMore} style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>더 보기</Text>
          </Pressable>
        )}
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (isLoading) {
      return (
        <View>
          {Array.from({ length: 5 }, (_, index) => (
            <View key={`skeleton-${index}`} style={{ marginBottom: 16 }}>
              <MeetingCardSkeleton />
            </View>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Feather name='calendar' size={48} color='#ccc' />
        <Text style={styles.emptyTitle}>최근 모임이 없습니다</Text>
        <Text style={styles.emptyDescription}>새로운 모임을 찾아보거나 직접 만들어보세요!</Text>
      </View>
    );
  };

  if (error) {
    return (
      <>
        <Stack.Screen options={{ title: '최근 모임' }} />
        <View style={styles.errorFullContainer}>
          <Feather name='alert-circle' size={48} color='#ff4444' />
          <Text style={styles.errorTitle}>모임을 불러올 수 없습니다</Text>
          <Text style={styles.errorMessage}>
            {error?.message || '네트워크 오류가 발생했습니다'}
          </Text>
          <Pressable onPress={handleRefresh} style={styles.retryButton}>
            <Text style={styles.retryText}>다시 시도</Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: '최근 모임' }} />
      <View style={styles.container}>
        <FlatList
          data={allClubs}
          renderItem={renderMeetingCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={isLoading && page === 1} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadMoreButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  errorFullContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default RecentMeetingsScreen;
