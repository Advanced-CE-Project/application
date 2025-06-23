import React from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';

import { Tag } from './tag';

export interface MeetingCardProps {
  title: string;
  date: string;
  location: string;
  tags: string[];
  onPress?: () => void;
  style?: ViewStyle;
  description?: string;
  participants?: {
    current: number;
    max: number;
  };
  isEnded?: boolean;
  isStarted?: boolean;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
  title,
  date,
  location,
  tags,
  onPress,
  style,
  participants,
  isEnded = false,
  isStarted = false,
}) => {
  const getStatusInfo = () => {
    if (isEnded) {
      return {
        text: '종료됨',
        color: '#999',
        backgroundColor: '#f5f5f5',
        icon: '🔚',
      };
    }
    if (isStarted) {
      return {
        text: '진행 중',
        color: '#28a745',
        backgroundColor: '#e8f5e8',
        icon: '🟢',
      };
    }
    return null;
  };

  const statusInfo = getStatusInfo();

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: isEnded ? '#fafafa' : '#fff',
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: isEnded ? '#e0e0e0' : '#f0f0f0',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: isEnded ? 0.05 : 0.1,
          shadowRadius: 4,
          elevation: isEnded ? 1 : 2,
          opacity: isEnded ? 0.8 : 1,
        },
        style,
      ]}
    >
      {/* 상태 배지 */}
      {statusInfo && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            backgroundColor: statusInfo.backgroundColor,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            marginBottom: 8,
          }}
        >
          <Text style={{ fontSize: 12, marginRight: 4 }}>{statusInfo.icon}</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: statusInfo.color,
            }}
          >
            {statusInfo.text}
          </Text>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: isEnded ? '#999' : '#333',
            flex: 1,
          }}
        >
          {title}
        </Text>

        {participants && (
          <Text
            style={{
              fontSize: 14,
              color: isEnded ? '#999' : '#4A90E2',
              fontWeight: '500',
              marginLeft: 8,
            }}
          >
            {participants.current}/{participants.max}명 참여
          </Text>
        )}
      </View>

      <Text
        style={{
          fontSize: 14,
          color: isEnded ? '#bbb' : '#666',
          marginBottom: 4,
        }}
      >
        {date}
      </Text>

      <Text
        style={{
          fontSize: 14,
          color: isEnded ? '#bbb' : '#666',
          marginBottom: 12,
        }}
      >
        {location}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {tags.map((tag, index) => (
          <Tag
            key={index}
            title={tag}
            style={{
              marginRight: 6,
              marginBottom: 0,
            }}
          />
        ))}
      </View>
    </Pressable>
  );
};
