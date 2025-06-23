import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewStyle } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height: height as any,
          backgroundColor: '#e0e0e0',
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

interface MeetingCardSkeletonProps {
  style?: ViewStyle;
}

export const MeetingCardSkeleton: React.FC<MeetingCardSkeletonProps> = ({ style }) => {
  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        style,
      ]}
    >
      {/* 제목 */}
      <Skeleton height={20} width='70%' style={{ marginBottom: 8 }} />

      {/* 날짜 */}
      <Skeleton height={16} width='50%' style={{ marginBottom: 8 }} />

      {/* 위치 */}
      <Skeleton height={16} width='60%' style={{ marginBottom: 12 }} />

      {/* 태그들 */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Skeleton height={24} width={60} borderRadius={12} />
        <Skeleton height={24} width={80} borderRadius={12} />
      </View>
    </View>
  );
};

interface NotificationCardSkeletonProps {
  style?: ViewStyle;
}

export const NotificationCardSkeleton: React.FC<NotificationCardSkeletonProps> = ({ style }) => {
  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: '#f0f0f0',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* 아이콘 */}
        <Skeleton height={40} width={40} borderRadius={20} style={{ marginRight: 12 }} />

        {/* 알림 내용 */}
        <View style={{ flex: 1 }}>
          {/* 제목 */}
          <Skeleton height={16} width='80%' style={{ marginBottom: 4 }} />

          {/* 내용 */}
          <Skeleton height={14} width='100%' style={{ marginBottom: 2 }} />
          <Skeleton height={14} width='60%' style={{ marginBottom: 8 }} />

          {/* 시간 */}
          <Skeleton height={12} width='40%' />
        </View>
      </View>
    </View>
  );
};
