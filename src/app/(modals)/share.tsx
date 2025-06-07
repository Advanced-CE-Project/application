import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SHARED_ITEMS = [
  {
    id: '1',
    title: '스터디 자료 정리본',
    description: '4월 1주차 스터디 자료 PDF',
    // image: require('@/assets/sample-pdf.png'),
  },
  {
    id: '2',
    title: '등산 사진 모음.zip',
    description: '북한산 등산 모임 사진 압축본',
    // image: require('@/assets/sample-zip.png'),
  },
  {
    id: '3',
    title: 'IT 네트워킹 발표자료',
    description: '발표 자료 PPTX',
    // image: require('@/assets/sample-ppt.png'),
  },
];

const SharedResourcesScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: insets.bottom + 32,
      }}
    >
      {SHARED_ITEMS.map((item) => (
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            padding: 12,
            backgroundColor: '#f9f9f9',
            borderRadius: 12,
          }}
        >
          {/* 이미지가 필요하면 아래 주석 해제
          <Image
            source={item.image}
            style={{
              width: 48,
              height: 48,
              marginRight: 16,
              borderRadius: 8,
            }}
            resizeMode="contain"
          /> */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>{item.title}</Text>
            <Text style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{item.description}</Text>
          </View>
          <Feather name='download' size={20} color='#4A90E2' />
        </View>
      ))}
    </ScrollView>
  );
};

export default SharedResourcesScreen;
