import { View, Text } from 'react-native'
import { Spacer } from './Spacer'

type Props = {
  message: string
}

export const EmptyState = ({ message }: Props) => (
  <View style={{ alignItems: 'center', padding: 32 }}>
    <Text style={{ fontSize: 16, color: '#999' }}>{message}</Text>
    <Spacer height={8} />
  </View>
)
