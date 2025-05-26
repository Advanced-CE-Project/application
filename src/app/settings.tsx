import { View, Text, Switch } from 'react-native'
import { useSettingsStore } from '@/store/settingsStore'
import { Spacer } from '@/components/Spacer'

export const SettingsScreen = () => {
  const { notificationsEnabled, darkModeEnabled, toggleNotifications, toggleDarkMode } =
    useSettingsStore()

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text accessibilityLabel="settings-title">앱 설정</Text>
      <Spacer height={24} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>알림 수신</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>
      <Spacer height={16} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>다크모드</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>
    </View>
  )
}
