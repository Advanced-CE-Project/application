import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { usePasswordChange } from '@/hooks/screens/use-password-change';

const PasswordChangeScreen = () => {
  const {
    isFormValid,
    isLoading,
    insets,
    router,
    formData,
    showInput,
    errors,
    setFormData,
    setShowInput,
    handleChangePassword,
  } = usePasswordChange();

  const renderPasswordInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    showPassword: boolean,
    toggleShowPassword: () => void,
    error: string,
  ) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 14, color: '#333', fontWeight: '500', marginBottom: 8 }}>
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: error ? '#e74c3c' : '#e0e0e0',
          borderRadius: 8,
          paddingHorizontal: 16,
          backgroundColor: '#fff',
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor='#999'
          secureTextEntry={!showPassword}
          style={{
            flex: 1,
            fontSize: 16,
            paddingVertical: 14,
            color: '#333',
          }}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <Pressable onPress={toggleShowPassword} style={{ padding: 4 }}>
          <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color='#666' />
        </Pressable>
      </View>
      {error ? <Text style={{ fontSize: 12, color: '#e74c3c', marginTop: 4 }}>{error}</Text> : null}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* 헤더 */}
      <View
        style={{
          paddingTop: insets.top,
          paddingHorizontal: 16,
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
            justifyContent: 'space-between',
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Feather name='arrow-left' size={24} color='#333' />
          </Pressable>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#333',
            }}
          >
            비밀번호 변경
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >
        {/* 안내 메시지 */}
        <View
          style={{
            backgroundColor: '#e8f4fd',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: '#b3d9f7',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Feather
              name='info'
              size={20}
              color='#4A90E2'
              style={{ marginRight: 8, marginTop: 2 }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#2c5aa0',
                  marginBottom: 4,
                }}
              >
                비밀번호 보안 안내
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#2c5aa0',
                  lineHeight: 18,
                }}
              >
                • 최소 6자 이상{'\n'}• 현재 비밀번호와 다른 비밀번호 사용
              </Text>
            </View>
          </View>
        </View>

        {/* 비밀번호 입력 폼 */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          {renderPasswordInput(
            '현재 비밀번호',
            formData.currentPassword,
            (text) => setFormData({ ...formData, currentPassword: text }),
            '현재 비밀번호를 입력하세요',
            showInput.currentPassword,
            () => setShowInput({ ...showInput, currentPassword: !showInput.currentPassword }),
            errors.currentPassword,
          )}

          {renderPasswordInput(
            '새 비밀번호',
            formData.newPassword,
            (text) => setFormData({ ...formData, newPassword: text }),
            '새 비밀번호를 입력하세요',
            showInput.newPassword,
            () => setShowInput({ ...showInput, newPassword: !showInput.newPassword }),
            errors.newPassword,
          )}

          {renderPasswordInput(
            '새 비밀번호 확인',
            formData.confirmNewPassword,
            (text) => setFormData({ ...formData, confirmNewPassword: text }),
            '새 비밀번호를 다시 입력하세요',
            showInput.confirmNewPassword,
            () => setShowInput({ ...showInput, confirmNewPassword: !showInput.confirmNewPassword }),
            errors.confirmNewPassword,
          )}

          {/* 변경 버튼 */}
          <Pressable
            onPress={handleChangePassword}
            disabled={!isFormValid}
            style={{
              backgroundColor: isFormValid ? '#4A90E2' : '#e0e0e0',
              borderRadius: 8,
              paddingVertical: 16,
              alignItems: 'center',
              marginTop: 12,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: isFormValid ? '#fff' : '#999',
              }}
            >
              비밀번호 변경
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default PasswordChangeScreen;
