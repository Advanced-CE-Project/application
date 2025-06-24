import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DUMMY_FILES = [
  {
    id: '1',
    name: '등산 코스 안내.pdf',
    size: '2.4MB',
    uploader: '김나리',
    icon: 'file-text',
    type: 'pdf',
  },
  {
    id: '2',
    name: '준비물 체크리스트.xlsx',
    size: '112KB',
    uploader: '홍길동',
    icon: 'file',
    type: 'excel',
  },
];

// 배열 분할 유틸 함수
const chunkArray = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

// 파일 타입별 색상 설정
const getFileTypeConfig = (type: string) => {
  switch (type) {
    case 'pdf':
      return { color: '#ff4757', backgroundColor: '#fff0f0', icon: 'file-text' };
    case 'excel':
      return { color: '#2ed573', backgroundColor: '#f0fff0', icon: 'file' };
    case 'image':
      return { color: '#4A90E2', backgroundColor: '#f0f4fa', icon: 'image' };
    default:
      return { color: '#666', backgroundColor: '#f5f5f5', icon: 'file' };
  }
};

// 파일 카드 컴포넌트
const FileCard = ({ file }: { file: any }) => {
  const config = getFileTypeConfig(file.type);

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: config.backgroundColor,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: config.color + '20',
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: config.color,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 16,
        }}
      >
        <Feather name={config.icon as any} size={22} color='#fff' />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 4 }}>
          {file.name}
        </Text>
        <Text style={{ fontSize: 12, color: '#666' }}>
          {file.size} · {file.uploader} 업로드
        </Text>
      </View>
      <Pressable
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#f8f9fa',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Feather name='download' size={18} color='#4A90E2' />
      </Pressable>
    </Pressable>
  );
};

interface SharedResourcesScreenProps {
  isOwner?: boolean;
}

const SharedResourcesScreen: React.FC<SharedResourcesScreenProps> = ({ isOwner = false }) => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [photoViewPage, setPhotoViewPage] = useState<number | null>(null);

  const screenWidth = Dimensions.get('window').width;
  // 사진 컨테이너 패딩 32 (16*2) + gap 16 (8*2) = 총 48
  const PHOTO_BOX_SIZE = (screenWidth - 96) / 3;

  // 사진 더미 데이터
  const photoDummyArray = Array.from({ length: 9 });
  const photoPages = chunkArray(photoDummyArray, 6);

  // 사진 전체 보기 화면
  if (photoViewPage !== null) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* 헤더 영역 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 0,
            paddingTop: insets.top + 16,
            paddingBottom: 16,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          }}
        >
          <Pressable
            onPress={() => setPhotoViewPage(null)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#f0f4fa',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Feather name='arrow-left' size={20} color='#4A90E2' />
          </Pressable>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a' }}>사진 보기</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* 사진 그리드 */}
        <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {photoPages[photoViewPage]?.map((_, idx) => (
              <View
                key={idx}
                style={{
                  width: (screenWidth - 56) / 3,
                  height: (screenWidth - 56) / 3,
                  borderRadius: 12,
                  backgroundColor: '#f0f0f0',
                  marginBottom: 8,
                }}
              />
            ))}
          </View>
        </ScrollView>

        {/* 페이지네이션 컨트롤 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingBottom: insets.bottom + 20,
            paddingTop: 20,
          }}
        >
          <Pressable
            onPress={() => setPhotoViewPage((p) => Math.max(0, (p || 0) - 1))}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 24,
              backgroundColor: photoViewPage === 0 ? '#f0f0f0' : '#4A90E2',
              borderRadius: 12,
            }}
            disabled={photoViewPage === 0}
          >
            <Text
              style={{
                color: photoViewPage === 0 ? '#999' : '#fff',
                fontWeight: '600',
              }}
            >
              이전
            </Text>
          </Pressable>

          <View style={{ justifyContent: 'center' }}>
            <Text style={{ color: '#666', fontWeight: '500' }}>
              {photoViewPage + 1} / {photoPages.length}
            </Text>
          </View>

          <Pressable
            onPress={() => setPhotoViewPage((p) => Math.min(photoPages.length - 1, (p || 0) + 1))}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 24,
              backgroundColor: photoViewPage === photoPages.length - 1 ? '#f0f0f0' : '#4A90E2',
              borderRadius: 12,
            }}
            disabled={photoViewPage === photoPages.length - 1}
          >
            <Text
              style={{
                color: photoViewPage === photoPages.length - 1 ? '#999' : '#fff',
                fontWeight: '600',
              }}
            >
              다음
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // 기본 화면
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 0,
          paddingTop: 0,
          paddingBottom: insets.bottom + 32,
        }}
      >
        {/* 헤더 영역 */}
        {isOwner && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingVertical: 16,
            }}
          >
            <Pressable
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: '#f0f4fa',
                borderRadius: 20,
                padding: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Feather name='upload' size={20} color='#4A90E2' />
            </Pressable>
          </View>
        )}

        {/* 사진 섹션 */}
        <View style={{ marginBottom: 32 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a' }}>사진</Text>
            {photoDummyArray.length > 5 && (
              <Pressable
                onPress={() => setPhotoViewPage(0)}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  backgroundColor: '#f0f4fa',
                  borderRadius: 16,
                }}
              >
                <Text style={{ color: '#4A90E2', fontSize: 14, fontWeight: '500' }}>모두 보기</Text>
              </Pressable>
            )}
          </View>

          {photoDummyArray.length === 0 ? (
            <View
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 16,
                padding: 32,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#f0f4fa',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Feather name='image' size={24} color='#4A90E2' />
              </View>
              <Text style={{ color: '#666', fontSize: 16, fontWeight: '500' }}>
                공유된 사진이 없어요
              </Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}
            >
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {photoDummyArray
                  .slice(0, photoDummyArray.length > 5 ? 5 : photoDummyArray.length)
                  .map((_, idx) => (
                    <View
                      key={idx}
                      style={{
                        width: PHOTO_BOX_SIZE,
                        height: PHOTO_BOX_SIZE,
                        borderRadius: 12,
                        backgroundColor: '#e0e0e0',
                      }}
                    />
                  ))}
                {photoDummyArray.length > 5 && (
                  <Pressable
                    onPress={() => setPhotoViewPage(0)}
                    style={{
                      width: PHOTO_BOX_SIZE,
                      height: PHOTO_BOX_SIZE,
                      borderRadius: 12,
                      backgroundColor: '#4A90E2',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                      +{photoDummyArray.length - 5}
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </View>

        {/* 파일 섹션 */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 16 }}>
            파일
          </Text>
          {DUMMY_FILES.length === 0 ? (
            <View
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 16,
                padding: 32,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#f0f4fa',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Feather name='file' size={24} color='#4A90E2' />
              </View>
              <Text style={{ color: '#666', fontSize: 16, fontWeight: '500' }}>
                공유된 파일이 없어요
              </Text>
            </View>
          ) : (
            DUMMY_FILES.map((file) => <FileCard key={file.id} file={file} />)
          )}
        </View>
      </ScrollView>

      {/* 자료 업로드 모달 */}
      <Modal visible={modalVisible} transparent animationType='fade'>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)} />
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 24,
              paddingTop: 32,
              paddingBottom: insets.bottom + 24,
              maxHeight: '80%',
            }}
          >
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: '#d1d5db',
                borderRadius: 2,
                alignSelf: 'center',
                marginBottom: 24,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 32,
                textAlign: 'center',
                color: '#1a1a1a',
              }}
            >
              자료 업로드
            </Text>

            {/* 자료 제목 */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                자료 제목
              </Text>
              <TextInput
                placeholder='자료 제목을 입력하세요'
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 16,
                  backgroundColor: '#f8f9fa',
                }}
              />
            </View>

            {/* 파일 선택 */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                파일 선택
              </Text>
              <Pressable
                onPress={() => {
                  // 실제 파일 선택 로직 필요 (예: expo-document-picker 등)
                }}
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 12,
                  padding: 16,
                  backgroundColor: '#f8f9fa',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Feather name='file-plus' size={20} color='#4A90E2' style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 16, color: '#666', flex: 1 }}>파일을 선택하세요</Text>
                <Feather name='chevron-right' size={20} color='#999' />
              </Pressable>
            </View>

            {/* 설명 */}
            <View style={{ marginBottom: 32 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                설명 (선택사항)
              </Text>
              <TextInput
                placeholder='자료에 대한 간단한 설명을 입력하세요'
                multiline
                numberOfLines={3}
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 16,
                  backgroundColor: '#f8f9fa',
                  textAlignVertical: 'top',
                }}
              />
            </View>

            {/* 업로드 버튼 */}
            <Pressable
              onPress={() => {
                // TODO: 파일 업로드 처리
                setModalVisible(false);
              }}
              style={{
                backgroundColor: '#4A90E2',
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: 'center',
                shadowColor: '#4A90E2',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>업로드하기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SharedResourcesScreen;
