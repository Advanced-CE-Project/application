import { View, Text } from 'react-native'

type Props = {
  title: string
}

export const Header = ({ title }: Props) => (
  <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
  </View>
)
