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
  participants?: {
    current: number;
    max: number;
  };
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
  title,
  date,
  location,
  tags,
  onPress,
  style,
  participants,
}) => (
  <Pressable
    onPress={onPress}
    style={[
      {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      style,
    ]}
  >
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
          color: '#333',
          flex: 1,
        }}
      >
        {title}
      </Text>

      {participants && (
        <Text
          style={{
            fontSize: 14,
            color: '#4A90E2',
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
        color: '#666',
        marginBottom: 4,
      }}
    >
      {date}
    </Text>

    <Text
      style={{
        fontSize: 14,
        color: '#666',
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
