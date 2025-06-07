import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 설정 섹션 타입 정의
interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  color?: string;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

const useSettings = () => {
  const insets = useSafeAreaInsets();

  // 설정 상태들
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [profilePublic, setProfilePublic] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  // 네비게이션 액션들
  const navigateToPasswordChange = () => {
    Alert.alert('비밀번호 변경', '비밀번호 변경 페이지로 이동합니다.');
    // TODO: 실제 비밀번호 변경 페이지로 이동
  };

  const navigateToAccountInfo = () => {
    Alert.alert('계정 정보', '계정 정보 페이지로 이동합니다.');
  };

  const navigateToPrivacyPolicy = () => {
    Alert.alert('개인정보처리방침', '개인정보처리방침을 확인합니다.');
  };

  const navigateToTermsOfService = () => {
    Alert.alert('서비스 이용약관', '서비스 이용약관을 확인합니다.');
  };

  const navigateToHelp = () => {
    Alert.alert('도움말', '도움말 센터로 이동합니다.');
  };

  const navigateToContact = () => {
    Alert.alert('문의하기', '고객센터에 문의합니다.');
  };

  const showAppInfo = () => {
    Alert.alert('앱 정보', 'BeMo v1.0.0\n© 2024 BeMo Team');
  };

  // 액션들
  const clearCache = () => {
    Alert.alert(
      '캐시 삭제',
      '앱 캐시를 삭제하시겠습니까?\n일부 데이터가 다시 로드될 수 있습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            Alert.alert('완료', '캐시가 삭제되었습니다.');
          },
        },
      ],
    );
  };

  const logout = () => {
    Alert.alert('로그아웃', '정말 로그아웃하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: () => {
          Alert.alert('로그아웃', '로그아웃되었습니다.');
          // TODO: 실제 로그아웃 로직
        },
      },
    ]);
  };

  const deleteAccount = () => {
    Alert.alert(
      '계정 삭제',
      '계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.\n정말 계속하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            Alert.alert('계정 삭제', '계정 삭제 절차를 진행합니다.');
            // TODO: 실제 계정 삭제 로직
          },
        },
      ],
    );
  };

  // 설정 섹션 데이터
  const settingSections: SettingSection[] = [
    {
      title: '계정',
      items: [
        {
          id: 'account-info',
          title: '계정 정보',
          subtitle: '이메일, 전화번호 관리',
          icon: 'user',
          type: 'navigation',
          onPress: navigateToAccountInfo,
        },
        {
          id: 'password-change',
          title: '비밀번호 변경',
          icon: 'lock',
          type: 'navigation',
          onPress: navigateToPasswordChange,
        },
      ],
    },
    {
      title: '알림',
      items: [
        {
          id: 'push-notifications',
          title: '푸시 알림',
          subtitle: '새로운 모임, 메시지 알림',
          icon: 'bell',
          type: 'toggle',
          value: pushNotifications,
          onToggle: setPushNotifications,
        },
        {
          id: 'email-notifications',
          title: '이메일 알림',
          subtitle: '중요한 소식을 이메일로 받기',
          icon: 'mail',
          type: 'toggle',
          value: emailNotifications,
          onToggle: setEmailNotifications,
        },
      ],
    },
    {
      title: '개인정보',
      items: [
        {
          id: 'location-services',
          title: '위치 서비스',
          subtitle: '근처 모임 찾기, 지도 표시',
          icon: 'map-pin',
          type: 'toggle',
          value: locationServices,
          onToggle: setLocationServices,
        },
        {
          id: 'profile-public',
          title: '프로필 공개',
          subtitle: '다른 사용자에게 프로필 표시',
          icon: 'eye',
          type: 'toggle',
          value: profilePublic,
          onToggle: setProfilePublic,
        },
      ],
    },
    {
      title: '앱 설정',
      items: [
        {
          id: 'dark-mode',
          title: '다크 모드',
          subtitle: '어두운 테마 사용',
          icon: 'moon',
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          id: 'auto-backup',
          title: '자동 백업',
          subtitle: '데이터 자동 백업',
          icon: 'upload-cloud',
          type: 'toggle',
          value: autoBackup,
          onToggle: setAutoBackup,
        },
      ],
    },
    {
      title: '지원 및 정보',
      items: [
        {
          id: 'help',
          title: '도움말',
          icon: 'help-circle',
          type: 'navigation',
          onPress: navigateToHelp,
        },
        {
          id: 'contact',
          title: '문의하기',
          icon: 'message-circle',
          type: 'navigation',
          onPress: navigateToContact,
        },
        {
          id: 'terms',
          title: '서비스 이용약관',
          icon: 'file-text',
          type: 'navigation',
          onPress: navigateToTermsOfService,
        },
        {
          id: 'privacy',
          title: '개인정보처리방침',
          icon: 'shield',
          type: 'navigation',
          onPress: navigateToPrivacyPolicy,
        },
        {
          id: 'app-info',
          title: '앱 정보',
          subtitle: 'v1.0.0',
          icon: 'info',
          type: 'navigation',
          onPress: showAppInfo,
        },
      ],
    },
    {
      title: '기타',
      items: [
        {
          id: 'clear-cache',
          title: '캐시 삭제',
          subtitle: '임시 파일 정리',
          icon: 'trash-2',
          type: 'action',
          onPress: clearCache,
        },
        {
          id: 'logout',
          title: '로그아웃',
          icon: 'log-out',
          type: 'action',
          onPress: logout,
          color: '#ff6b6b',
        },
        {
          id: 'delete-account',
          title: '계정 삭제',
          icon: 'user-x',
          type: 'action',
          onPress: deleteAccount,
          color: '#e74c3c',
        },
      ],
    },
  ];

  return {
    insets,
    settingSections,
  };
};

const SettingsScreen = () => {
  const { insets, settingSections } = useSettings();

  const renderSettingItem = (item: SettingItem) => {
    return (
      <Pressable
        key={item.id}
        onPress={item.onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}
      >
        {/* 아이콘 */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: item.color ? `${item.color}15` : '#f8f9fa',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 16,
          }}
        >
          <Feather name={item.icon as any} size={20} color={item.color || '#666'} />
        </View>

        {/* 텍스트 영역 */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: item.color || '#1a1a1a',
              marginBottom: item.subtitle ? 2 : 0,
            }}
          >
            {item.title}
          </Text>
          {item.subtitle && (
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                lineHeight: 18,
              }}
            >
              {item.subtitle}
            </Text>
          )}
        </View>

        {/* 오른쪽 요소 */}
        {item.type === 'toggle' && (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#e0e0e0', true: '#4A90E2' }}
            thumbColor={'#fff'}
            ios_backgroundColor='#e0e0e0'
          />
        )}
        {item.type === 'navigation' && <Feather name='chevron-right' size={20} color='#999' />}
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {settingSections.map((section, sectionIndex) => (
          <View key={section.title} style={{ marginTop: sectionIndex === 0 ? 24 : 32 }}>
            {/* 섹션 제목 */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#666',
                marginBottom: 8,
                marginHorizontal: 20,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {section.title}
            </Text>

            {/* 섹션 아이템들 */}
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                marginHorizontal: 16,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#f0f0f0',
                        marginLeft: 76, // 아이콘 + 여백 크기만큼 들여쓰기
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* 하단 여백 */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
