import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/app/lib/api'
import type { NotificationItem } from '@/types/index'

export const useNotifications = () =>
  useQuery<NotificationItem[]>({
    queryKey: ['notifications'],
    queryFn: () => api.get('/notifications').then((res) => res.data),
  })

export const useMarkAsRead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.patch(`/notifications/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })
}
