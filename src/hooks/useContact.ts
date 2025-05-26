import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/app/lib/api'

type SendMessageInput = {
  senderId: string
  receiverId: string
  message: string
}

export const useSendQuickMessage = () => {
  const queryClient = useQueryClient()

  const send = async ({ senderId, receiverId, message }: SendMessageInput) => {
    await api.post('/messages', { senderId, receiverId, message })
    await api.post('/notifications', {
      userId: receiverId,
      title: `${senderId}님이 메세지를 보냈어요`,
      message: `'${message}'`,
    })
    queryClient.invalidateQueries({ queryKey: ['notifications'] })
  }

  return { send }
}
