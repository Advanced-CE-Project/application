import { loginSchema, LoginFormData } from '@/features/schema/login-schema'
import { useAuthForm } from '@/hooks/use-auth-form'
import { useAuthStore } from '@/features/store/auth-store'
import { AuthForm } from '@/features/components/auth-form'
import { View } from 'react-native'

export const LoginScreen = () => {
  const { control, handleSubmit, formState } = useAuthForm<LoginFormData>(loginSchema)
  const login = useAuthStore((s) => s.login)

  const onSubmit = (data: LoginFormData) => {
    login(data.email, data.password)
  }

  return (
    <View>
      <AuthForm
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={formState.isSubmitting}
        fields={[
          { name: 'email', placeholder: '이메일' },
          { name: 'password', placeholder: '비밀번호', secure: true },
        ]}
        submitLabel="로그인"
      />
    </View>
  )
}
