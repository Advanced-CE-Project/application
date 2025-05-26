import { View, Text, Pressable } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import { useGroups } from '@/hooks/useGroup'
import { Button } from '@/components/Button'
import { Spacer } from '@/components/Spacer'

export const HomeScreen = () => {
  const router = useRouter()
  const { groups, isLoading } = useGroups()

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text accessibilityLabel="home-title">모임 목록</Text>
      <Spacer height={16} />
      <FlashList
        data={groups}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/detail?id=${item.id}`)}
            accessibilityLabel={`group-${item.name}`}
          >
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
      <Spacer height={24} />
      <Button
        title="모임 생성"
        onPress={() => router.push('/create')}
        accessibilityLabel="create-group-button"
      />
    </View>
  )
}
