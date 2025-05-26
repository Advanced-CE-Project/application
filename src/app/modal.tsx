import { Text, View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { Spacer } from '../components/Spacer'
import { useStyles } from 'react-native-unistyles'

export const ModalScreen = () => {
  const router = useRouter()
  const { styles } = useStyles()

  return (
    <View style={styles.container}>
      <Text accessibilityLabel="modal-title">This is a modal</Text>
      <Spacer height={24} />
      <Pressable
        onPress={router.back}
        accessibilityLabel="close-modal-button"
        style={styles.closeButton}
      >
        <Text>Close</Text>
      </Pressable>
    </View>
  )
}
