import { View, Text, Pressable } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useSharedFiles, useUploadFile } from '@/hooks/useSharing'
import { useUser } from '@/hooks/useAuth'
import { Spacer } from '@/components/Spacer'
import FastImage from 'react-native-fast-image'
import { Linking } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sharingUploadSchema, type SharingUploadSchema } from '@/types/index'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

export const SharingScreen = () => {
  const { files } = useSharedFiles()
  const { user } = useUser()
  const { mutate } = useUploadFile()

  const { control, handleSubmit, setValue, watch } = useForm<SharingUploadSchema>({
    resolver: zodResolver(sharingUploadSchema),
  })

  const selectImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!res.canceled) {
      setValue('file', res.assets[0])
      setValue('type', 'image')
    }
  }

  const selectFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({})
    if (res.assets) {
      setValue('file', res.assets[0])
      setValue('type', 'file')
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text accessibilityLabel="shared-files-title">공유 자료</Text>
      <Spacer height={16} />
      <Input control={control} name="title" label="자료 제목" />
      <Spacer height={8} />
      <Button title="이미지 선택" onPress={selectImage} accessibilityLabel="select-image" />
      <Spacer height={8} />
      <Button title="파일 선택" onPress={selectFile} accessibilityLabel="select-file" />
      <Spacer height={8} />
      <Button
        title="업로드"
        onPress={handleSubmit(mutate)}
        accessibilityLabel="upload-button"
      />
      <Spacer height={24} />
      <FlashList
        data={files}
        estimatedItemSize={120}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Text>{item.title}</Text>
            {item.type === 'image' && (
              <FastImage
                source={{ uri: item.url }}
                style={{ width: '100%', height: 200, borderRadius: 8 }}
              />
            )}
            {item.type === 'file' && (
              <Pressable
                onPress={() => Linking.openURL(item.url)}
                accessibilityLabel={`download-${item.title}`}
              >
                <Text style={{ color: '#007AFF' }}>다운로드</Text>
              </Pressable>
            )}
            {item.ownerId === user?.id && (
              <>
                <Spacer height={8} />
                <Text style={{ fontSize: 12, color: '#888' }}>내가 공유함</Text>
              </>
            )}
          </View>
        )}
      />
    </View>
  )
}
