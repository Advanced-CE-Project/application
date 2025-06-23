import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CONFIRM_TEXT, WARNING_ITEMS, useDeleteAccount } from '@/hooks/screens/use-delete-account';

const DeleteAccountModal = () => {
  const {
    isLoading,
    router,
    isConfirmValid,
    insets,
    confirmText,
    setConfirmText,
    handleDeleteAccount,
  } = useDeleteAccount();

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* 헤더 */}
      <View
        style={{
          paddingTop: 16,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#e74c3c',
            }}
          >
            계정 삭제
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={{
              position: 'absolute',
              right: 0,
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ color: '#4A90E2', fontSize: 16, fontWeight: '600' }}>취소</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 경고 메시지 */}
        <View
          style={{
            backgroundColor: '#fff2f2',
            margin: 20,
            padding: 20,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#ffcccb',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Feather name='alert-triangle' size={24} color='#e74c3c' />
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#e74c3c',
                marginLeft: 8,
              }}
            >
              주의사항
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: '#c53030',
              lineHeight: 20,
            }}
          >
            계정을 삭제하면 아래의 모든 데이터가 영구적으로 삭제되며, 복구할 수 없습니다. 신중히
            결정해주시기 바랍니다.
          </Text>
        </View>

        {/* 삭제될 데이터 목록 */}
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 20,
            borderRadius: 12,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#333',
              padding: 20,
              paddingBottom: 12,
            }}
          >
            삭제될 데이터
          </Text>

          {WARNING_ITEMS.map((item, index) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: '#fff2f2',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                  }}
                >
                  <Feather name={item.icon as any} size={18} color='#e74c3c' />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#666',
                      lineHeight: 18,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
              {index < WARNING_ITEMS.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#f0f0f0',
                    marginLeft: 68,
                    marginRight: 20,
                  }}
                />
              )}
            </View>
          ))}
        </View>

        {/* 확인 입력 */}
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 20,
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#333',
              marginBottom: 12,
            }}
          >
            계정 삭제 확인
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#666',
              marginBottom: 12,
              lineHeight: 20,
            }}
          >
            정말로 계정을 삭제하시려면 아래 입력란에{' '}
            <Text style={{ fontWeight: '600', color: '#e74c3c' }}>"{CONFIRM_TEXT}"</Text>를
            입력해주세요.
          </Text>

          <TextInput
            value={confirmText}
            onChangeText={setConfirmText}
            placeholder={`"${CONFIRM_TEXT}"를 입력하세요`}
            placeholderTextColor='#999'
            style={{
              borderWidth: 1,
              borderColor: isConfirmValid ? '#28a745' : '#e0e0e0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              backgroundColor: '#fff',
              color: '#333',
            }}
            autoCapitalize='none'
            autoCorrect={false}
          />

          {isConfirmValid && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Feather name='check-circle' size={16} color='#28a745' />
              <Text style={{ fontSize: 12, color: '#28a745', marginLeft: 4 }}>확인되었습니다</Text>
            </View>
          )}
        </View>

        {/* 삭제 버튼 */}
        <View style={{ paddingHorizontal: 20 }}>
          <Pressable
            onPress={handleDeleteAccount}
            disabled={!isConfirmValid || isLoading}
            style={{
              backgroundColor: isConfirmValid && !isLoading ? '#e74c3c' : '#ccc',
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            {isLoading ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff', marginRight: 8 }}>
                  삭제 중...
                </Text>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderWidth: 2,
                    borderColor: '#fff',
                    borderTopColor: 'transparent',
                    borderRadius: 8,
                  }}
                />
              </View>
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: isConfirmValid && !isLoading ? '#fff' : '#999',
                }}
              >
                계정 영구 삭제
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              취소하고 돌아가기
            </Text>
          </Pressable>
        </View>

        {/* 하단 도움말 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            margin: 20,
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#e9ecef',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#495057',
              marginBottom: 8,
            }}
          >
            💡 계정 삭제가 어려우신가요?
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#6c757d',
              lineHeight: 18,
            }}
          >
            계정 삭제 대신 일시적으로 계정을 비활성화하거나, 고객센터에 문의하실 수 있습니다.
            {'\n'}문의: support@bemo.app
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeleteAccountModal;
