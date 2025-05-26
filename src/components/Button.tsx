import { Pressable, Text } from 'react-native'

type Props = {
  title: string
  onPress: () => void
  accessibilityLabel: string
  disabled?: boolean
}

export const Button = ({ title, onPress, accessibilityLabel, disabled = false }: Props) => (
  <Pressable
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
    disabled={disabled}
    style={{
      backgroundColor: disabled ? '#ccc' : '#007AFF',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
    }}
  >
    <Text style={{ color: '#fff', fontWeight: '600' }}>{title}</Text>
  </Pressable>
)
