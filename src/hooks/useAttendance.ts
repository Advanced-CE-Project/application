import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/app/lib/api'
import type { Attendance } from '@/types/index'

export const useAttendances = () =>
  useQuery<Attendance[]>({
    queryKey: ['attendances'],
    queryFn: () => api.get('/attendance').then(res => res.data),
  })

export const useMarkAttendance = () => {
  const queryClient = useQueryClient()

  const mark = async (code: string) => {
    await api.post('/attendance/mark', { code })
    queryClient.invalidateQueries({ queryKey: ['attendances'] })
  }

  return { mark }
}
