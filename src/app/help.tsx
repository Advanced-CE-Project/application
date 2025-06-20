import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const HelpScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'BeMo는 어떤 앱인가요?',
      answer:
        'BeMo는 모임을 쉽게 만들고 관리할 수 있는 앱입니다. 친구들과의 모임부터 동호회, 스터디 그룹까지 다양한 모임을 효율적으로 운영할 수 있습니다.',
    },
    {
      id: '2',
      question: '모임을 어떻게 만드나요?',
      answer:
        '홈 화면에서 "+" 버튼을 눌러 새로운 모임을 만들 수 있습니다. 모임 제목, 일시, 장소, 참여자 등을 설정하면 됩니다.',
    },
    {
      id: '3',
      question: '출석 체크는 어떻게 하나요?',
      answer:
        '모임 상세 페이지에서 출석 체크 버튼을 누르면 됩니다. QR 코드나 위치 기반으로 출석을 확인할 수 있습니다.',
    },
    {
      id: '4',
      question: '참여자를 어떻게 초대하나요?',
      answer:
        '모임 생성 시 또는 모임 상세 페이지에서 초대 링크를 공유하거나 직접 연락처에서 친구를 초대할 수 있습니다.',
    },
    {
      id: '5',
      question: '알림을 받지 못하는 경우',
      answer:
        '설정 > 알림에서 푸시 알림이 켜져 있는지 확인해주세요. 또한 기기의 알림 설정에서 BeMo 앱의 알림 권한을 허용했는지 확인해주세요.',
    },
    {
      id: '6',
      question: '모임 정보를 수정할 수 있나요?',
      answer:
        '모임 생성자는 언제든지 모임 정보를 수정할 수 있습니다. 모임 상세 페이지에서 수정 버튼을 누르면 됩니다.',
    },
    {
      id: '7',
      question: '계정을 삭제하고 싶어요',
      answer:
        '설정 > 기타 > 계정 삭제에서 계정을 삭제할 수 있습니다. 단, 삭제된 데이터는 복구할 수 없으니 신중히 결정해주세요.',
    },
    {
      id: '8',
      question: '문제가 지속적으로 발생해요',
      answer:
        '앱을 최신 버전으로 업데이트하거나 앱을 재시작해보세요. 문제가 계속되면 고객센터로 문의해주세요.',
    },
  ];

  const contactInfo = [
    {
      title: '이메일 문의',
      value: 'support@bemo.app',
      icon: 'mail',
    },
    {
      title: '운영 시간',
      value: '평일 09:00 - 18:00',
      icon: 'clock',
    },
    {
      title: '앱 버전',
      value: 'v1.0.0',
      icon: 'smartphone',
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

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
            도움말
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 소개 섹션 */}
        <View style={{ padding: 20, backgroundColor: '#fff', marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#333',
              marginBottom: 8,
            }}
          >
            BeMo 도움말 센터
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              lineHeight: 20,
            }}
          >
            자주 묻는 질문들을 통해 BeMo를 더 쉽게 이용해보세요.{'\n'}
            원하는 답변을 찾지 못하셨다면 고객센터로 문의해주세요.
          </Text>
        </View>

        {/* FAQ 섹션 */}
        <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#333',
              marginBottom: 12,
              marginLeft: 4,
            }}
          >
            자주 묻는 질문
          </Text>

          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            {faqs.map((faq, index) => (
              <View key={faq.id}>
                <Pressable
                  onPress={() => toggleFAQ(faq.id)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '500',
                        color: '#333',
                        flex: 1,
                        marginRight: 12,
                      }}
                    >
                      {faq.question}
                    </Text>
                    <Feather
                      name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color='#666'
                    />
                  </View>

                  {expandedFAQ === faq.id && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#666',
                        lineHeight: 20,
                        marginTop: 12,
                        paddingRight: 32,
                      }}
                    >
                      {faq.answer}
                    </Text>
                  )}
                </Pressable>

                {index < faqs.length - 1 && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#f0f0f0',
                      marginLeft: 20,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* 연락처 정보 */}
        <View style={{ marginHorizontal: 16 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#333',
              marginBottom: 12,
              marginLeft: 4,
            }}
          >
            고객센터
          </Text>

          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            {contactInfo.map((info, index) => (
              <View key={info.title}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: '#f8f9fa',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 12,
                    }}
                  >
                    <Feather name={info.icon as any} size={18} color='#666' />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#666',
                        marginBottom: 2,
                      }}
                    >
                      {info.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '500',
                        color: '#333',
                      }}
                    >
                      {info.value}
                    </Text>
                  </View>
                </View>

                {index < contactInfo.length - 1 && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#f0f0f0',
                      marginLeft: 68,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpScreen;
