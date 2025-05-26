import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'

const mmkv = new MMKV()

type SettingsState = {
  notificationsEnabled: boolean
  darkModeEnabled: boolean
  toggleNotifications: () => void
  toggleDarkMode: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      notificationsEnabled: true,
      darkModeEnabled: false,
      toggleNotifications: () =>
        set({ notificationsEnabled: !get().notificationsEnabled }),
      toggleDarkMode: () => set({ darkModeEnabled: !get().darkModeEnabled }),
    }),
    {
      name: 'settings-storage',
      storage: {
        getItem: (key) => mmkv.getString(key) ?? null,
        setItem: (key, value) => mmkv.set(key, value),
        removeItem: (key) => mmkv.delete(key),
      },
    }
  )
)
