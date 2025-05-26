import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'
import type { User } from '@/types/index'

const mmkv = new MMKV()

type AuthState = {
  user: User | null
  setUser: (u: User) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (u) => set({ user: u }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (key) => mmkv.getString(key) ?? null,
        setItem: (key, value) => mmkv.set(key, value),
        removeItem: (key) => mmkv.delete(key),
      },
    }
  )
)
