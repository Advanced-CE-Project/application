import React from 'react';
import { Pressable, Text, View } from 'react-native';

export interface ButtonProps {
  title?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'start' | 'end' | 'manage';
  icon?: string;
}

const getButtonStyle = (variant: string, disabled: boolean) => {
  if (disabled) {
    return {
      backgroundColor: '#e0e0e0',
      borderWidth: 0,
      shadowOpacity: 0,
    };
  }

  switch (variant) {
    case 'start':
      return {
        backgroundColor: '#28a745',
        borderWidth: 0,
        shadowColor: '#28a745',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      };
    case 'end':
      return {
        backgroundColor: '#dc3545',
        borderWidth: 0,
        shadowColor: '#dc3545',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      };
    case 'manage':
      return {
        backgroundColor: '#6f42c1',
        borderWidth: 0,
        shadowColor: '#6f42c1',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      };
    case 'secondary':
      return {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#dee2e6',
        shadowOpacity: 0,
      };
    default: // primary
      return {
        backgroundColor: '#4A90E2',
        borderWidth: 0,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      };
  }
};

const getTextStyle = (variant: string, disabled: boolean) => {
  if (disabled) {
    return {
      color: '#999',
      fontWeight: '500' as const,
      fontSize: 16,
    };
  }

  switch (variant) {
    case 'start':
      return {
        color: '#fff',
        fontWeight: '700' as const,
        fontSize: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      };
    case 'end':
      return {
        color: '#fff',
        fontWeight: '700' as const,
        fontSize: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      };
    case 'manage':
      return {
        color: '#fff',
        fontWeight: '600' as const,
        fontSize: 16,
      };
    case 'secondary':
      return {
        color: '#495057',
        fontWeight: '600' as const,
        fontSize: 16,
      };
    default: // primary
      return {
        color: '#fff',
        fontWeight: '600' as const,
        fontSize: 16,
      };
  }
};

export const Button: React.FC<ButtonProps> = ({
  title = '',
  onPress = () => {},
  accessibilityLabel,
  disabled = false,
  variant = 'primary',
  icon,
}) => {
  const buttonStyle = getButtonStyle(variant, disabled);
  const textStyle = getTextStyle(variant, disabled);

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      style={[
        {
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderRadius: 12,
          alignItems: 'center',
        },
        buttonStyle,
      ]}
    >
      {icon ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={[textStyle, { fontSize: 18 }]}>{icon}</Text>
          <Text style={textStyle}>{title}</Text>
        </View>
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </Pressable>
  );
};
