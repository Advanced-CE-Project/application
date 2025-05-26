import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/app/lib/api'
import type { Group, GroupCreateSchema, Place } from '@/types/index'

export const useGroups = () => useQuery({ queryKey: ['groups'], queryFn: () => api.get('/groups').then(res => res.data) })

export const useMyGroups = () => useQuery({ queryKey: ['myGroups'], queryFn: () => api.get('/groups/my').then(res => res.data) })

export const useSearchGroups = (q: string) =>
  useQuery({
    queryKey: ['searchGroups', q],
    queryFn: () => api.get(`/groups/search?q=${q}`).then(res => res.data),
    enabled: q.length > 1,
  })

export const useGroupDetail = (id?: string) =>
  useQuery({
    queryKey: ['group', id],
    queryFn: () => api.get(`/groups/${id}`).then(res => res.data),
    enabled: !!id,
  })

export const useCreateGroup = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: GroupCreateSchema) => api.post('/groups', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groups'] }),
  })
}

export const useRecommendedPlaces = () =>
  useQuery<Place[]>({
    queryKey: ['recommendedPlaces'],
    queryFn: () => api.get('/groups/places').then(res => res.data),
  })
