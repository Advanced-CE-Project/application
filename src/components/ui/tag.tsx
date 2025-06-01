import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';

export interface TagProps {
  title: string;
  onPress?: () => void;
  selected?: boolean;
  style?: ViewStyle;
}

export const Tag: React.FC<TagProps> = ({ title, onPress, selected = false, style }) => (
  <Pressable
    onPress={onPress}
    style={[
      {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: selected ? '#007AFF' : '#f0f0f0',
        marginRight: 8,
        marginBottom: 8,
      },
      style,
    ]}
  >
    <Text
      style={{
        fontSize: 14,
        color: selected ? '#fff' : '#333',
        fontWeight: '500',
      }}
    >
      {title}
    </Text>
  </Pressable>
);
