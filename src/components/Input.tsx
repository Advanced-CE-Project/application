import { Controller, Control } from 'react-hook-form'
import { TextInput, Text, View } from 'react-native'

type Props = {
  name: string
  control: Control<any>
  label: string
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'numeric' | 'email-address'
}

export const Input = ({
  name,
  control,
  label,
  secureTextEntry = false,
  keyboardType = 'default',
}: Props) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <View style={{ width: '100%' }}>
        <Text>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={{
            padding: 12,
            borderWidth: 1,
            borderColor: error ? '#ff5252' : '#ccc',
            borderRadius: 8,
            marginTop: 4,
          }}
        />
        {error && (
          <Text style={{ color: '#ff5252', fontSize: 12, marginTop: 4 }}>
            {error.message}
          </Text>
        )}
      </View>
    )}
  />
)
