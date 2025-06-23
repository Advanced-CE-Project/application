import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePasswordReset } from '@/hooks/screens/use-password-reset';

const PasswordForgotScreen = () => {
  const insets = useSafeAreaInsets();
  const {
    // State
    email,
    code,
    password,
    confirmPassword,
    currentStep,

    // Setters
    setEmail,
    setCode,
    setPassword,
    setConfirmPassword,

    // Actions
    sendCode,
    verifyCode,
    resetPassword,
    resetForm,
    goToPreviousStep,

    // Loading states
    isSendingCode,
    isVerifyingCode,
    isResettingPassword,

    // Error states
    sendCodeError,
    verifyCodeError,
    resetPasswordError,

    // Validation
    isPasswordValid,
    doPasswordsMatch,
    isFormValid,
  } = usePasswordReset();

  // 에러 처리
  React.useEffect(() => {
    const error = sendCodeError || verifyCodeError || resetPasswordError;
    if (error) {
      Alert.alert('오류', error);
    }
  }, [sendCodeError, verifyCodeError, resetPasswordError]);

  // 1단계: 이메일 입력
  const renderEmailStep = () => (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 20,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#333',
            marginBottom: 8,
          }}
        >
          비밀번호 찾기
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#666',
            lineHeight: 20,
          }}
        >
          가입했던 이메일 주소를 입력하시면 비밀번호 재설정 인증 코드를 보내드립니다.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Input
            label='이메일'
            placeholder='가입했던 이메일을 입력하세요'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            containerStyle={{ marginBottom: 20 }}
          />

          <Button
            title={isSendingCode ? '전송 중...' : '인증 코드 전송'}
            onPress={sendCode}
            disabled={!isFormValid.email || isSendingCode}
          />
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
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
            📧 이메일을 받지 못하셨나요?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              lineHeight: 22,
            }}
          >
            • 스팸 폴더를 확인해보세요{'\n'}• 이메일 주소가 정확한지 확인해보세요{'\n'}• 몇 분 후에
            다시 시도해보세요
          </Text>
        </View>
      </View>
    </>
  );

  // 2단계: 인증 코드 입력
  const renderVerificationStep = () => (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 20,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#333',
            marginBottom: 8,
          }}
        >
          인증 코드 입력
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#666',
            lineHeight: 20,
          }}
        >
          {email}로 전송된 6자리 인증 코드를 입력해주세요.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Input
            label='인증 코드'
            placeholder='6자리 인증 코드를 입력하세요'
            value={code}
            onChangeText={setCode}
            keyboardType='number-pad'
            maxLength={6}
            containerStyle={{ marginBottom: 20 }}
          />

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              title='이전'
              onPress={goToPreviousStep}
              variant='secondary'
              disabled={isVerifyingCode}
            />
            <View style={{ flex: 1 }}>
              <Button
                title={isVerifyingCode ? '확인 중...' : '코드 확인'}
                onPress={verifyCode}
                disabled={!isFormValid.verification || isVerifyingCode}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
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
            🔒 인증 코드를 받지 못하셨나요?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              lineHeight: 22,
              marginBottom: 16,
            }}
          >
            • 인증 코드는 30분간 유효합니다{'\n'}• 스팸 폴더를 확인해보세요{'\n'}• 이전 단계로
            돌아가서 다시 요청해보세요
          </Text>
          <Button
            title='인증 코드 재전송'
            onPress={() => {
              setCode('');
              sendCode();
            }}
            variant='secondary'
            disabled={isSendingCode}
          />
        </View>
      </View>
    </>
  );

  // 3단계: 새 비밀번호 설정
  const renderNewPasswordStep = () => (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 20,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#333',
            marginBottom: 8,
          }}
        >
          새 비밀번호 설정
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#666',
            lineHeight: 20,
          }}
        >
          안전한 새 비밀번호를 설정해주세요.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Input
            label='새 비밀번호'
            placeholder='6자 이상의 비밀번호를 입력하세요'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            containerStyle={{ marginBottom: 16 }}
          />

          <Input
            label='비밀번호 확인'
            placeholder='비밀번호를 다시 입력하세요'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            containerStyle={{ marginBottom: 16 }}
          />

          {/* 비밀번호 검증 상태 표시 */}
          {password.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: isPasswordValid ? '#4CAF50' : '#F44336',
                  marginBottom: 4,
                }}
              >
                {isPasswordValid ? '✓' : '✗'} 6자 이상
              </Text>
              {confirmPassword.length > 0 && (
                <Text
                  style={{
                    fontSize: 12,
                    color: doPasswordsMatch ? '#4CAF50' : '#F44336',
                  }}
                >
                  {doPasswordsMatch ? '✓' : '✗'} 비밀번호 일치
                </Text>
              )}
            </View>
          )}

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              title='이전'
              onPress={goToPreviousStep}
              variant='secondary'
              disabled={isResettingPassword}
            />
            <View style={{ flex: 1 }}>
              <Button
                title={isResettingPassword ? '변경 중...' : '비밀번호 변경'}
                onPress={resetPassword}
                disabled={!isFormValid.newPassword || isResettingPassword}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
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
            🔐 안전한 비밀번호 만들기
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              lineHeight: 22,
            }}
          >
            • 6자 이상으로 설정하세요{'\n'}• 영문, 숫자, 특수문자를 조합하세요{'\n'}• 개인정보와
            관련된 정보는 피하세요
          </Text>
        </View>
      </View>
    </>
  );

  // 4단계: 완료
  const renderSuccessStep = () => (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 20,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#333',
            marginBottom: 8,
          }}
        >
          비밀번호 변경 완료
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#666',
            lineHeight: 20,
          }}
        >
          비밀번호가 성공적으로 변경되었습니다. 새 비밀번호로 로그인해주세요.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 40,
            marginBottom: 16,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 48, marginBottom: 16 }}>✅</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#333',
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            비밀번호 변경 완료!
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              textAlign: 'center',
              lineHeight: 20,
              marginBottom: 24,
            }}
          >
            보안을 위해 모든 기존 로그인 세션이 종료되었습니다.{'\n'}새 비밀번호로 다시
            로그인해주세요.
          </Text>

          <Button
            title='로그인하러 가기'
            onPress={() => {
              resetForm();
              router.replace('/(modals)/auth');
            }}
          />
        </View>
      </View>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 'email' && renderEmailStep()}
        {currentStep === 'verification' && renderVerificationStep()}
        {currentStep === 'newPassword' && renderNewPasswordStep()}
        {currentStep === 'success' && renderSuccessStep()}
      </ScrollView>
    </View>
  );
};

export default PasswordForgotScreen;
