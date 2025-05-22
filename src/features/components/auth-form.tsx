import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { TextInput } from '@/shared/components/text-input'
import { Spacer } from '@/shared/components/spacer'
import { Button } from '@/shared/components/button'

type Props<T> = {
  control: any
  onSubmit: () => void
  isSubmitting: boolean
  fields: Array<{ name: keyof T; placeholder: string; secure?: boolean }>
  submitLabel: string
}

export const AuthForm = <T extends Record<string, any>>({
  control,
  onSubmit,
  isSubmitting,
  fields,
  submitLabel,
}: Props<T>) => (
  <View>
    {fields.map(({ name, placeholder, secure }) => (
      <Controller
        key={String(name)}
        control={control}
        name={String(name)}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              secureTextEntry={secure}
              accessibilityLabel={`${name}-input`}
              error={error?.message}
            />
            <Spacer height={16} />
          </>
        )}
      />
    ))}
    <Button
      label={submitLabel}
      onPress={onSubmit}
      loading={isSubmitting}
      accessibilityLabel="submit-button"
    />
  </View>
)