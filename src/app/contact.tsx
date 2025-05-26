import { View, Text, Pressable } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useMembers } from '@/hooks/useEvaluation'
import { useUser } from '@/hooks/useAuth'
import { useSendQuickMessage } from '@/hooks/useContact'
import { Spacer } from '@/components/Spacer'

const quickMessages = ['저 도착했어요', '즐거웠어요', '고마워요']

export const ContactScreen = () => {
  const { user } = useUser()
  const { data: members } = useMembers()
  const { send } = useSendQuickMessage()

  const handleSend = (receiverId: string, message: string) => {
    if (!user?.id) return
    send({ senderId: user.id, receiverId, message })
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text accessibilityLabel="contact-title">참가자 목록</Text>
      <Spacer height={16} />
      <FlashList
        data={members?.filter((m) => m.id !== user?.id) ?? []}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 24 }}>
            <Text>{item.name}</Text>
            <Spacer height={8} />
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              {quickMessages.map((msg) => (
                <Pressable
                  key={msg}
                  accessibilityLabel={`quick-msg-${msg}`}
                  onPress={() => handleSend(item.id, msg)}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    backgroundColor: '#eee',
                    borderRadius: 8,
                  }}
                >
                  <Text>{msg}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  )
}
