import { View, Text } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useRecommendedPlaces } from '@/hooks/useGroup'

export const GroupPlaceScreen = () => {
  const { places } = useRecommendedPlaces()

  return (
    <View style={{ padding: 16 }}>
      <Text accessibilityLabel="recommended-title">추천 장소</Text>
      <FlashList
        data={places}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - {item.distance}m</Text>
          </View>
        )}
      />
    </View>
  )
}
