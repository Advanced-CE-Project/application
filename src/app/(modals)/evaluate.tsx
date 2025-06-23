import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Spacer } from '@/components/ui/spacer';

const mockParticipants = ['김참여', '이산악'];
const keywordOptions = ['친절함', '적극적', '시간약속', '지식공유'];

const EvaluateMeetingScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<{ [name: string]: string[] }>({});

  const toggleKeyword = (name: string, keyword: string) => {
    setSelectedKeywords((prev) => {
      const current = prev[name] || [];
      const exists = current.includes(keyword);
      return {
        ...prev,
        [name]: exists ? current.filter((k) => k !== keyword) : [...current, keyword],
      };
    });
  };

  const handleSubmit = () => {
    console.log({ rating, feedback, selectedKeywords });
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }} // Floating Button 공간 확보
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 섹션 */}
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
            모임 평가하기
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              lineHeight: 20,
            }}
          >
            모임에 대한 솔직한 의견을 남겨주세요
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          {/* 만족도 평가 카드 */}
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#fff2f2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Feather name='star' size={18} color='#ff6b6b' />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#333',
                }}
              >
                모임 만족도
              </Text>
            </View>

            <Text
              style={{
                fontSize: 14,
                color: '#666',
                marginBottom: 16,
              }}
            >
              이번 모임은 어떠셨나요?
            </Text>

            <Rating
              startingValue={0}
              imageSize={28}
              onFinishRating={(val: number) => setRating(val)}
              style={{ alignSelf: 'flex-start' }}
              tintColor='#fff'
            />
          </View>

          {/* 피드백 카드 */}
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#f0f8ff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Feather name='message-circle' size={18} color='#4A90E2' />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#333',
                }}
              >
                상세 피드백
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#999',
                  marginLeft: 8,
                }}
              >
                (선택사항)
              </Text>
            </View>

            <TextInput
              multiline
              placeholder='모임에 대한 의견을 자유롭게 남겨주세요'
              placeholderTextColor='#ccc'
              value={feedback}
              onChangeText={setFeedback}
              style={{
                borderWidth: 1,
                borderColor: '#f0f0f0',
                borderRadius: 8,
                padding: 12,
                minHeight: 80,
                fontSize: 14,
                color: '#333',
                textAlignVertical: 'top',
                backgroundColor: '#f8f9fa',
              }}
            />
          </View>

          {/* 참가자 평가 카드 */}
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#fff8f0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Feather name='users' size={18} color='#ff9500' />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#333',
                }}
              >
                참가자 평가
              </Text>
            </View>

            <Text
              style={{
                fontSize: 14,
                color: '#666',
                marginBottom: 20,
              }}
            >
              함께한 참가자들에게 태그를 달아주세요
            </Text>

            {mockParticipants.map((name, index) => (
              <View
                key={name}
                style={{
                  marginBottom: index === mockParticipants.length - 1 ? 0 : 20,
                  padding: 16,
                  backgroundColor: '#f8f9fa',
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#f0f0f0',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: '#4A90E2',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 8,
                    }}
                  >
                    <Feather name='user' size={12} color='#fff' />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#333',
                    }}
                  >
                    {name}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {keywordOptions.map((kw) => {
                    const isSelected = selectedKeywords[name]?.includes(kw);
                    return (
                      <Pressable
                        key={kw}
                        onPress={() => toggleKeyword(name, kw)}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 16,
                          backgroundColor: isSelected ? '#4A90E2' : '#fff',
                          borderWidth: 1,
                          borderColor: isSelected ? '#4A90E2' : '#e9ecef',
                          marginRight: 8,
                          marginBottom: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: isSelected ? '#fff' : '#666',
                          }}
                        >
                          {kw}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>

          <Spacer height={32} />
        </View>
      </ScrollView>

      {/* 하단 고정 제출 버튼 */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        }}
      >
        <Pressable
          onPress={handleSubmit}
          style={{
            backgroundColor: rating > 0 ? '#4A90E2' : '#ccc',
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          disabled={rating === 0}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#fff',
            }}
          >
            평가 완료하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EvaluateMeetingScreen;
