import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal, TextInput, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DUMMY_FILES = [
  {
    id: '1',
    name: '등산 코스 안내.pdf',
    size: '2.4MB',
    uploader: '김나리',
    icon: 'file-text',
  },
  {
    id: '2',
    name: '준비물 체크리스트.xlsx',
    size: '112KB',
    uploader: '홍길동',
    icon: 'file',
  },
];

// 배열 분할 유틸 함수
const chunkArray = (arr: any[], size: number) => 
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const SharedResourcesScreen = () => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [photoViewPage, setPhotoViewPage] = useState<number | null>(null);
  
  const screenWidth = Dimensions.get('window').width;
  const availableWidth = screenWidth - 40;
  const PHOTO_BOX_SIZE = (availableWidth - 8) / 3;
  const PHOTO_BOX_MARGIN = 8;

  // 사진 더미 데이터 
  const photoDummyArray = Array.from({ length: 6 });
  const photoPages = chunkArray(photoDummyArray, Math.ceil(photoDummyArray.length / 3));

  // 사진 전체 보기 화면
  if (photoViewPage !== null) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 40, paddingHorizontal: 20 }}>
        {/* 헤더 영역 */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
          <Pressable onPress={() => setPhotoViewPage(null)}>
            <Feather name="arrow-left" size={24} color="#4A90E2" />
          </Pressable>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>
            사진 {photoViewPage + 1}/{photoPages.length}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* 사진 그리드 */}
        <View style={{ flex: 1 }}>
          {chunkArray(photoPages[photoViewPage], 3).map((row, rowIdx) => (
            <View 
              key={rowIdx} 
              style={{ 
                flexDirection: 'row', 
                marginBottom: PHOTO_BOX_MARGIN 
              }}
            >
              {row.map((_, idx) => (
                <View
                  key={idx}
                  style={{
                    width: PHOTO_BOX_SIZE,
                    height: PHOTO_BOX_SIZE,
                    borderRadius: 8,
                    backgroundColor: '#e0e0e0',
                    marginRight: PHOTO_BOX_MARGIN,
                  }}
                />
              ))}
            </View>
          ))}
        </View>

        {/* 페이지네이션 컨트롤 */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          marginTop: 20 
        }}>
          <Pressable
            onPress={() => setPhotoViewPage(p => Math.max(0, (p || 0) - 1))}
            style={{
              padding: 12,
              backgroundColor: photoViewPage === 0 ? '#e0e0e0' : '#4A90E2',
              borderRadius: 8,
            }}
            disabled={photoViewPage === 0}
          >
            <Text style={{ color: photoViewPage === 0 ? '#999' : '#fff' }}>이전</Text>
          </Pressable>
          
          <Pressable
            onPress={() => setPhotoViewPage(p => Math.min(photoPages.length - 1, (p || 0) + 1))}
            style={{
              padding: 12,
              backgroundColor: photoViewPage === photoPages.length - 1 ? '#e0e0e0' : '#4A90E2',
              borderRadius: 8,
            }}
            disabled={photoViewPage === photoPages.length - 1}
          >
            <Text style={{ color: photoViewPage === photoPages.length - 1 ? '#999' : '#fff' }}>다음</Text>
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
          paddingHorizontal: 20,
          paddingTop: 0,
          paddingBottom: insets.bottom + 32,
        }}
      >
        {/* 업로드 버튼 */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'flex-end', 
          paddingVertical: 16 
        }}>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={{
              padding: 8,
              borderRadius: 20,
              backgroundColor: '#f0f4fa',
            }}
          >
            <Feather name="upload" size={22} color="#4A90E2" />
          </Pressable>
        </View>

        {/* 사진 섹션 */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            marginBottom: 16 
          }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>사진</Text>
            <Pressable onPress={() => setPhotoViewPage(0)}>
              <Text style={{ color: '#4A90E2', fontSize: 14 }}>모두 보기</Text>
            </Pressable>
          </View>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {photoDummyArray.slice(0, 6).map((_, idx) => (
              <View
                key={idx}
                style={{
                  width: PHOTO_BOX_SIZE,
                  height: PHOTO_BOX_SIZE,
                  borderRadius: 8,
                  backgroundColor: '#e0e0e0',
                  marginRight: PHOTO_BOX_MARGIN,
                  marginBottom: PHOTO_BOX_MARGIN,
                }}
              />
            ))}
            {photoDummyArray.length > 6 && (
              <View
                style={{
                  width: PHOTO_BOX_SIZE,
                  height: PHOTO_BOX_SIZE,
                  borderRadius: 8,
                  backgroundColor: '#e0e0e0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#666' }}>+{photoDummyArray.length - 6}</Text>
              </View>
            )}
          </View>
        </View>

        {/* 파일 섹션 */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1a1a1a', marginBottom: 12 }}>파일</Text>
          {DUMMY_FILES.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 24 }}>
              <Text style={{ color: '#888', fontSize: 16 }}>공유된 파일이 없습니다.</Text>
            </View>
          ) : (
            DUMMY_FILES.map((file) => (
              <View
                key={file.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#f9f9f9',
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 10,
                }}
              >
                <Feather name={file.icon as any} size={28} color="#4A90E2" style={{ marginRight: 14 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#222' }}>{file.name}</Text>
                  <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                    {file.size} · {file.uploader} 업로드
                  </Text>
                </View>
                <Pressable>
                  <Feather name="download" size={20} color="#4A90E2" />
                </Pressable>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* 자료 업로드 모달 */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 24,
              paddingTop: 32,
              paddingBottom: insets.bottom + 24,
            }}
            onPress={() => {}}
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
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 24, textAlign: 'center' }}>
              자료 업로드
            </Text>

            <TextInput
              placeholder="자료 제목"
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                fontSize: 16,
                backgroundColor: '#f8f9fa',
              }}
            />
            <Pressable
              onPress={() => {
                // 실제 파일 선택 로직 필요 (예: expo-document-picker 등)
                console.log('파일 선택');
              }}
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 24,
                  backgroundColor: '#f8f9fa',
                  flexDirection: 'row',
                }}
              >파일 선택 
              <Feather name="file-plus" size={20} color="#4A90E2" style={{ marginLeft: 3 }} />
            </Pressable>  
                      
            <TextInput
              placeholder="설명 (선택)"
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 8,
                padding: 12,
                marginBottom: 24,
                fontSize: 16,
                backgroundColor: '#f8f9fa',
              }}
              multiline
            />
            <Pressable
              style={{
                backgroundColor: '#4A90E2',
                borderRadius: 8,
                paddingVertical: 14,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>추가하기</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default SharedResourcesScreen;
