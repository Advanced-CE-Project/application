import { useQuery } from '@tanstack/react-query'
import { api } from '@/app/lib/api'
import type { SharedFile } from '@/types/index'

export const useSharedFiles = () =>
  useQuery<SharedFile[]>({
    queryKey: ['sharedFiles'],
    queryFn: () => api.get('/sharing').then((res) => res.data),
  })

  export const useUploadFile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: SharingUploadSchema) => {
      const form = new FormData()

      form.append('title', data.title)
      form.append('type', data.type)

      const file = {
        uri: data.file.uri,
        type: data.file.mimeType ?? 'application/octet-stream',
        name: data.file.name ?? 'file',
      }

      form.append('file', file as any)

      return api.post('/sharing', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sharedFiles'] }),
  })
}