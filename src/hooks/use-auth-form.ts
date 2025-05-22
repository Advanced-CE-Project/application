import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const useAuthForm = <T extends Record<string, any>>(schema: any) =>
  useForm<T>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })
