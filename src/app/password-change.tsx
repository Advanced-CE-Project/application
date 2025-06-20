import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PasswordChangeScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const validatePasswords = () => {
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    // 현재 비밀번호 확인
    if (!currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
    }

    // 새 비밀번호 유효성 검사
    if (!newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = '비밀번호는 최소 8자 이상이어야 합니다.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      newErrors.newPassword = '대문자, 소문자, 숫자를 포함해야 합니다.';
    }

    // 비밀번호 확인
    if (!confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = '새 비밀번호와 일치하지 않습니다.';
    }

    // 같은 비밀번호 사용 방지
    if (currentPassword && newPassword && currentPassword === newPassword) {
      newErrors.newPassword = '현재 비밀번호와 다른 비밀번호를 사용해주세요.';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleChangePassword = () => {
    if (!validatePasswords()) {
      return;
    }

    Alert.alert('비밀번호 변경', '비밀번호를 변경하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '변경',
        onPress: () => {
          // 실제 API 호출 로직
          Alert.alert('변경 완료', '비밀번호가 성공적으로 변경되었습니다.', [
            { text: '확인', onPress: () => router.back() },
          ]);
        },
      },
    ]);
  };

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

  const isFormValid =
    currentPassword &&
    newPassword &&
    confirmPassword &&
    !Object.values(errors).some((error) => error !== '');

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
                • 최소 8자 이상{'\n'}• 대문자, 소문자, 숫자 포함{'\n'}• 현재 비밀번호와 다른
                비밀번호 사용
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
            currentPassword,
            setCurrentPassword,
            '현재 비밀번호를 입력하세요',
            showCurrentPassword,
            () => setShowCurrentPassword(!showCurrentPassword),
            errors.currentPassword,
          )}

          {renderPasswordInput(
            '새 비밀번호',
            newPassword,
            setNewPassword,
            '새 비밀번호를 입력하세요',
            showNewPassword,
            () => setShowNewPassword(!showNewPassword),
            errors.newPassword,
          )}

          {renderPasswordInput(
            '새 비밀번호 확인',
            confirmPassword,
            setConfirmPassword,
            '새 비밀번호를 다시 입력하세요',
            showConfirmPassword,
            () => setShowConfirmPassword(!showConfirmPassword),
            errors.confirmPassword,
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

        {/* 추가 보안 팁 */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            marginTop: 16,
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
            🔒 보안 팁
          </Text>

          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 8 }}>
              • 정기적으로 비밀번호를 변경해주세요
            </Text>
            <Text style={{ fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 8 }}>
              • 다른 사이트와 같은 비밀번호를 사용하지 마세요
            </Text>
            <Text style={{ fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 8 }}>
              • 개인정보가 포함된 비밀번호는 피해주세요
            </Text>
            <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
              • 비밀번호는 안전한 곳에 보관해주세요
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PasswordChangeScreen;
