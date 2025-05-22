import { registerSchema, RegisterFormData } from '@/features/schema/register-schema'
import { useAuthForm } from '@/hooks/use-auth-form'
import { useAuthStore } from '@/features/store/auth-store'
import { AuthForm } from '@/features/components/auth-form'
import { View } from 'react-native'

export const RegisterScreen = () => {
  const { control, handleSubmit, formState } = useAuthForm<RegisterFormData>(registerSchema)
  const login = useAuthStore((s) => s.login)

  const onSubmit = (data: RegisterFormData) => {
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
          { name: 'confirmPassword', placeholder: '비밀번호 확인', secure: true },
        ]}
        submitLabel="회원가입"
      />
    </View>
  )
}
