import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { groupCreateSchema, type GroupCreateSchema } from '@/types/index'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Spacer } from '@/components/Spacer'
import { useCreateGroup } from '@/hooks/useGroup'

export const CreateGroupScreen = () => {
  const { control, handleSubmit } = useForm<GroupCreateSchema>({
    resolver: zodResolver(groupCreateSchema),
  })

  const { mutate } = useCreateGroup()

  return (
    <View style={{ padding: 16 }}>
      <Input control={control} name="name" label="모임 이름" />
      <Spacer height={16} />
      <Input control={control} name="description" label="설명" />
      <Spacer height={24} />
      <Button
        title="생성"
        onPress={handleSubmit(mutate)}
        accessibilityLabel="submit-create-group"
      />
    </View>
  )
}
