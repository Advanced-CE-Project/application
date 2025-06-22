import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label: string;
  required?: boolean;
}

function CustomCheckbox({ checked, onPress, label, required = false }: CheckboxProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingVertical: 4,
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: checked ? '#4A90E2' : '#ddd',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: checked ? '#4A90E2' : 'transparent',
          marginRight: 12,
        }}
      >
        {checked && <Feather name='check' size={12} color='#fff' />}
      </View>
      <Text
        style={{
          fontSize: 14,
          color: '#333',
          flex: 1,
          lineHeight: 20,
        }}
      >
        <Text style={{ color: required ? '#ff4444' : '#666' }}>
          {required ? '[필수]' : '[선택]'}
        </Text>{' '}
        {label}
      </Text>
    </Pressable>
  );
}

export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    detailAddress: '',
  });

  const [agreements, setAgreements] = useState({
    agreeTerms: false,
    agreePrivacy: false,
    agreeLocation: false,
    agreeMarketing: false,
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAgreement = (field: string) => {
    setAgreements((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleSubmit = () => {
    const { nickname, email, password, detailAddress } = formData;
    const { agreeTerms, agreePrivacy, agreeLocation } = agreements;

    if (!nickname || !email || !password || !detailAddress) {
      Alert.alert('입력 오류', '필수 항목을 모두 입력해주세요.');
      return;
    }

    if (!agreeTerms || !agreePrivacy || !agreeLocation) {
      Alert.alert('동의 필요', '필수 약관에 모두 동의해주세요.');
      return;
    }

    // 회원가입 처리 로직
    Alert.alert('회원가입 완료', '환영합니다!', [
      {
        text: '확인',
        onPress: () => router.back(),
      },
    ]);
  };

  const allRequiredFieldsFilled =
    formData.nickname &&
    formData.email &&
    formData.password &&
    formData.detailAddress &&
    agreements.agreeTerms &&
    agreements.agreePrivacy &&
    agreements.agreeLocation;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: 40,
            paddingBottom: insets.bottom + 24,
          }}
        >
          {/* 헤더 섹션 */}
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: '#f8fafe',
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
                borderWidth: 2,
                borderColor: '#e8f2ff',
              }}
            >
              <Feather name='user-plus' size={32} color='#4A90E2' />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 8,
              }}
            >
              회원가입
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
                lineHeight: 20,
              }}
            >
              BeMo와 함께 새로운 모임을 시작해보세요
            </Text>
          </View>

          {/* 입력 폼 */}
          <View style={{ marginBottom: 32 }}>
            <Input
              label='닉네임'
              placeholder='닉네임을 입력하세요'
              value={formData.nickname}
              onChangeText={(text) => updateFormData('nickname', text)}
              containerStyle={{ marginBottom: 16 }}
            />

            <Input
              label='이메일'
              placeholder='example@email.com'
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              keyboardType='email-address'
              autoCapitalize='none'
              containerStyle={{ marginBottom: 16 }}
            />

            <Input
              label='비밀번호'
              placeholder='비밀번호를 입력하세요'
              value={formData.password}
              onChangeText={(text) => updateFormData('password', text)}
              secureTextEntry
              containerStyle={{ marginBottom: 16 }}
            />

            <Input
              label='주소'
              placeholder='상세 주소를 입력하세요'
              value={formData.detailAddress}
              onChangeText={(text) => updateFormData('detailAddress', text)}
              containerStyle={{ marginBottom: 24 }}
            />
          </View>

          {/* 약관 동의 섹션 */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#333',
                marginBottom: 16,
              }}
            >
              약관 동의
            </Text>

            <View
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <CustomCheckbox
                checked={agreements.agreeTerms}
                onPress={() => updateAgreement('agreeTerms')}
                label='서비스 이용약관 동의'
                required
              />

              <CustomCheckbox
                checked={agreements.agreePrivacy}
                onPress={() => updateAgreement('agreePrivacy')}
                label='개인정보 처리방침 동의'
                required
              />

              <CustomCheckbox
                checked={agreements.agreeLocation}
                onPress={() => updateAgreement('agreeLocation')}
                label='위치정보 활용 동의'
                required
              />

              <CustomCheckbox
                checked={agreements.agreeMarketing}
                onPress={() => updateAgreement('agreeMarketing')}
                label='마케팅 정보 수신 동의'
              />
            </View>

            <Text
              style={{
                fontSize: 12,
                color: '#999',
                lineHeight: 16,
              }}
            >
              위치정보 활용에 동의하지 않으면 서비스 이용에 제한이 있을 수 있습니다.
            </Text>
          </View>

          {/* 회원가입 버튼 */}
          <View style={{ marginTop: 'auto' }}>
            <Button title='가입하기' onPress={handleSubmit} disabled={!allRequiredFieldsFilled} />

            {/* 로그인 링크 */}
            <View
              style={{
                alignItems: 'center',
                marginTop: 16,
              }}
            >
              <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                이미 계정이 있으신가요?
              </Text>
              <Pressable onPress={() => router.back()}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#4A90E2',
                    fontWeight: '600',
                  }}
                >
                  로그인하기
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
