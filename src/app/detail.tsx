import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useGroupDetail } from '@/hooks/useGroup'

export const GroupDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { group } = useGroupDetail(id)

  if (!group) return null

  return (
    <View style={{ padding: 16 }}>
      <Text accessibilityLabel="group-name">{group.name}</Text>
      <Text accessibilityLabel="group-desc">{group.description}</Text>
    </View>
  )
}
