import { View } from 'react-native'

type Props = {
  height?: number
  width?: number
}

export const Spacer = ({ height = 0, width = 0 }: Props) => (
  <View style={{ height, width }} />
)
