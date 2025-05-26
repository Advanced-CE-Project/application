import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/app/lib/api'
import type { MissionSchema, Mission } from '@/types/index'

export const useMissions = () =>
  useQuery<Mission[]>({
    queryKey: ['missions'],
    queryFn: () => api.get('/missions').then((res) => res.data),
  })

export const useAddMission = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: MissionSchema) => api.post('/missions', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['missions'] }),
  })
}
