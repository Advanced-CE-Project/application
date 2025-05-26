import { View, Text } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMissions, useAddMission } from '@/hooks/useMission'
import { missionSchema, type MissionSchema } from '@/types/index'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Spacer } from '@/components/Spacer'
import { FlashList } from '@shopify/flash-list'

export const MissionScreen = () => {
  const { control, handleSubmit, reset } = useForm<MissionSchema>({
    resolver: zodResolver(missionSchema),
  })
  const { data: missions } = useMissions()
  const { mutate } = useAddMission()

  const onSubmit = (data: MissionSchema) => {
    mutate(data, { onSuccess: () => reset() })
  }

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text accessibilityLabel="mission-title">미션 추가</Text>
      <Spacer height={16} />
      <Input control={control} name="title" label="제목" />
      <Spacer height={12} />
      <Input control={control} name="description" label="설명" />
      <Spacer height={16} />
      <Button title="추가" onPress={handleSubmit(onSubmit)} accessibilityLabel="add-mission" />
      <Spacer height={24} />
      <FlashList
        data={missions}
        estimatedItemSize={80}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text style={{ fontSize: 12, color: '#888' }}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  )
}
