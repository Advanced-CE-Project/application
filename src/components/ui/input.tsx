import React from 'react';
import { Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({ label, containerStyle, style, ...props }) => (
  <View style={containerStyle}>
    {label && (
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#333',
          marginBottom: 8,
        }}
      >
        {label}
      </Text>
    )}
    <TextInput
      style={[
        {
          borderWidth: 1,
          borderColor: '#e0e0e0',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          backgroundColor: '#fff',
        },
        style,
      ]}
      {...props}
    />
  </View>
);

