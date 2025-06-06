import { Feather } from '@expo/vector-icons'

type Props = {
  name: keyof typeof Feather.glyphMap
  color: string
}

export const TabBarIcon = ({ name, color }: Props) => (
  <Feather name={name} size={20} color={color} />
)
