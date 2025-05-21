import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '@/features/screens/login-screen'
import { RegisterScreen } from '@/features/screens/register-screen'

const Stack = createNativeStackNavigator()

export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
)