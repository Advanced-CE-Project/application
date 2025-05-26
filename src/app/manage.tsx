import { View, Text } from 'react-native'
import { useMyGroups } from '@/hooks/useGroup'
import { Spacer } from '@/components/Spacer'
import { FlashList } from '@shopify/flash-list'

export const ManageGroupScreen = () => {
  const { data: groups } = useMyGroups()

  return (
    <View style={{ padding: 16 }}>
      <Text accessibilityLabel="group-manage-title">내가 만든 모임</Text>
      <Spacer height={16} />
      <FlashList
        data={groups}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  )
}
