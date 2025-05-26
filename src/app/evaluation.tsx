import { View, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMembers, useSubmitEvaluation } from '@/hooks/useEvaluation'
import { evaluationSchema, type EvaluationSchema } from '@/types/index'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Spacer } from '@/components/Spacer'
import { FlashList } from '@shopify/flash-list'

export const EvaluationScreen = () => {
  const { data: members } = useMembers()
  const { control, handleSubmit } = useForm<EvaluationSchema>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      scores: [],
    },
  })

  const { mutate } = useSubmitEvaluation()

  const onSubmit = (data: EvaluationSchema) => {
    mutate(data)
  }

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text accessibilityLabel="evaluation-title">멤버 평가</Text>
      <Spacer height={16} />
      <FlashList
        data={members}
        estimatedItemSize={100}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item.name}</Text>
            <Spacer height={8} />
            <Controller
              control={control}
              name={`scores.${index}.score` as const}
              render={({ field }) => (
                <Input {...field} keyboardType="numeric" label="점수 (1~5)" />
              )}
            />
            <Spacer height={8} />
            <Controller
              control={control}
              name={`scores.${index}.comment` as const}
              render={({ field }) => <Input {...field} label="한 줄 피드백" />}
            />
            <Spacer height={16} />
          </View>
        )}
      />
      <Button title="제출" onPress={handleSubmit(onSubmit)} accessibilityLabel="submit-eval" />
    </View>
  )
}
