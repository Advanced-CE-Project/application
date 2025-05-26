import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/authStore'
import { api } from '@/app//lib/api'

export const useUser = () => {
  const user = useAuthStore((s) => s.user)
  return { user }
}

export const useLogout = () => {
  const router = useRouter()
  const { clearUser } = useAuthStore()

  const logout = () => {
    clearUser()
    router.replace('/(auth)/login')
  }

  return { logout }
}
