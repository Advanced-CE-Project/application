import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacer } from '@/components/ui/spacer';
import { useEvaluate } from '@/hooks/screens';
import { useMe } from '@/hooks/use-me';

const keywordOptions = ['친절함', '적극적', '시간약속', '지식공유', '매너좋음', '소통잘함'];

const EvaluateMeetingScreen = () => {
  const insets = useSafeAreaInsets();
  const { me } = useMe();

  const {
    club,
    evaluationTargets,
    isLoading,
    overallRating,
    feedback,
    selectedKeywords,
    setOverallRating,
    setFeedback,
    toggleKeyword,
    setParticipantRating,
    handleSubmit,
    isSubmitting,
  } = useEvaluate();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
        }}
      >
        <ActivityIndicator size='large' color='#4A90E2' />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>
          모임 정보를 불러오는 중...
        </Text>
      </View>
    );
  }

  if (!club) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Text style={{ fontSize: 16, color: '#666' }}>모임 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  // 현재 사용자를 제외한 참가자들 (모임 생성자 포함)
  const participantsToEvaluate = evaluationTargets.filter(
    (member: any) => member.userId !== me?.id,
  );

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
            {club.name} 평가하기
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
              startingValue={5}
              imageSize={28}
              onFinishRating={(val: number) => setOverallRating(val)}
              style={{ alignSelf: 'flex-start' }}
              tintColor='#fff'
              ratingBackgroundColor='#f0f0f0'
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

            {participantsToEvaluate.length === 0 ? (
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: '#999' }}>평가할 참가자가 없습니다.</Text>
              </View>
            ) : (
              participantsToEvaluate.map((member: any, index: number) => (
                <View
                  key={member.userId}
                  style={{
                    marginBottom: index === participantsToEvaluate.length - 1 ? 0 : 20,
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
                      {member.user?.nickname || '참가자'}
                    </Text>
                  </View>

                  {/* 개별 평점 */}
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                      이 참가자를 평가해주세요
                    </Text>
                    <Rating
                      startingValue={5}
                      imageSize={20}
                      onFinishRating={(rating: number) => {
                        setParticipantRating(member.userId, rating);
                      }}
                      style={{ alignSelf: 'flex-start' }}
                      tintColor='#f8f9fa'
                      ratingBackgroundColor='#f0f0f0'
                      showRating={false}
                    />
                  </View>

                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {keywordOptions.map((kw) => {
                      const isSelected = selectedKeywords[member.userId]?.includes(kw);
                      return (
                        <Pressable
                          key={kw}
                          onPress={() => toggleKeyword(member.userId, kw)}
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
              ))
            )}
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
            backgroundColor: overallRating > 0 && !isSubmitting ? '#4A90E2' : '#ccc',
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          disabled={overallRating === 0 || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size='small' color='#fff' />
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#fff',
              }}
            >
              평가 완료하기
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default EvaluateMeetingScreen;
