import React from 'react';
import { Pressable, Text } from 'react-native';

export interface ButtonProps {
  title?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  title = '',
  onPress = () => {},
  accessibilityLabel,
  disabled = false,
  variant = 'primary',
}) => (
  <Pressable
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
    disabled={disabled}
    style={{
      backgroundColor: disabled ? '#ccc' : variant === 'primary' ? '#4A90E2' : '#f0f0f0',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        color: variant === 'primary' ? '#fff' : '#333',
        fontWeight: '600',
        fontSize: 16,
      }}
    >
      {title}
    </Text>
  </Pressable>
);
