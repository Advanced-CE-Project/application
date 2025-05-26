import { View, TextInput, Text } from 'react-native'
import { useState } from 'react'
import { useSearchGroups } from '@/hooks/useGroup'
import { Spacer } from '@/components/Spacer'
import { FlashList } from '@shopify/flash-list'

export const SearchGroupScreen = () => {
  const [query, setQuery] = useState('')
  const { groups } = useSearchGroups(query)

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="모임 이름으로 검색"
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 8 }}
      />
      <Spacer height={16} />
      <FlashList
        data={groups}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <Text accessibilityLabel={`search-result-${item.name}`}>{item.name}</Text>
        )}
      />
    </View>
  )
}
