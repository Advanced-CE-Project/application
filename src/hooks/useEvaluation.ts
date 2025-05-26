import { useQuery, useMutation } from '@tanstack/react-query'
import { api } from '@/app/lib/api'
import type { Member, EvaluationSchema } from '@/types/index'

export const useMembers = () =>
  useQuery<Member[]>({
    queryKey: ['members'],
    queryFn: () => api.get('/members').then((res) => res.data),
  })

export const useSubmitEvaluation = () =>
  useMutation({
    mutationFn: (data: EvaluationSchema) => api.post('/evaluation', data),
  })
