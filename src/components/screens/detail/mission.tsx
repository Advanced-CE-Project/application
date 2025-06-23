import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DUMMY_MISSIONS = [
  {
    id: '1',
    title: '매일 10,000보 걷기',
    status: 'ongoing',
    description: '일주일 동안 하루 만보 걷기',
    progress: 40,
  },
  {
    id: '2',
    title: '물 2L 마시기',
    status: 'completed',
    description: '매일 2리터 물 마시기',
    progress: 100,
  },
  {
    id: '3',
    title: '영양제 챙겨 먹기',
    status: 'pending',
    description: '매일 아침 영양제 복용',
    progress: 0,
  },
];

const PROOF_METHODS = ['사진 업로드', '체크박스', '텍스트 입력'];

// 미션 상태별 스타일 설정
const getStatusConfig = (status: string) => {
  switch (status) {
    case 'ongoing':
      return {
        color: '#4A90E2',
        backgroundColor: '#f0f4fa',
        text: '진행 중',
        icon: 'play-circle' as keyof typeof Feather.glyphMap,
      };
    case 'completed':
      return {
        color: '#34c759',
        backgroundColor: '#f0f9f0',
        text: '완료',
        icon: 'check-circle' as keyof typeof Feather.glyphMap,
      };
    case 'pending':
      return {
        color: '#ff9500',
        backgroundColor: '#fff8f0',
        text: '대기 중',
        icon: 'clock' as keyof typeof Feather.glyphMap,
      };
    default:
      return {
        color: '#666',
        backgroundColor: '#f5f5f5',
        text: '알 수 없음',
        icon: 'help-circle' as keyof typeof Feather.glyphMap,
      };
  }
};

const MissionProgress = ({ progress = 0, status }: { progress: number; status: string }) => {
  const config = getStatusConfig(status);

  return (
    <View style={{ marginTop: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ fontSize: 12, color: '#666', fontWeight: '500' }}>진행률</Text>
        <Text style={{ fontSize: 12, color: config.color, fontWeight: '600' }}>{progress}%</Text>
      </View>
      <View
        style={{
          height: 8,
          backgroundColor: '#e0e0e0',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: config.color,
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  );
};

// 미션 카드 컴포넌트
const MissionCard = ({ mission, onPress }: { mission: any; onPress?: () => void }) => {
  const config = getStatusConfig(mission.status);

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: config.backgroundColor,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: config.color + '20',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: config.color,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
          }}
        >
          <Feather name={config.icon} size={20} color='#fff' />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', flex: 1 }}>
              {mission.title}
            </Text>
            <View
              style={{
                backgroundColor: config.color,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
              }}
            >
              <Text style={{ fontSize: 11, color: '#fff', fontWeight: '600' }}>{config.text}</Text>
            </View>
          </View>
          <Text style={{ color: '#666', marginTop: 4, lineHeight: 20 }}>{mission.description}</Text>
        </View>
      </View>
      <MissionProgress progress={mission.progress} status={mission.status} />
    </Pressable>
  );
};

const MissionTab = () => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [proofMethod, setProofMethod] = useState('사진 업로드');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [proofModalVisible, setProofModalVisible] = useState(false);
  const [selectedMission, setSelectedMission] = useState<any>(null);

  const openProofModal = (mission: any) => {
    setSelectedMission(mission);
    setProofModalVisible(true);
  };

  const onChangeDate = (_: any, selectedDate?: Date) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(Platform.OS === 'ios');
    setDeadline(currentDate);
  };

  const pendingMissions = DUMMY_MISSIONS.filter((m) => m.status === 'pending');
  const ongoingMissions = DUMMY_MISSIONS.filter((m) => m.status === 'ongoing');
  const completedMissions = DUMMY_MISSIONS.filter((m) => m.status === 'completed');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 0,
          paddingTop: 0,
          paddingBottom: insets.bottom + 32,
        }}
      >
        {/* 헤더 영역 */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 16 }}>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: '#f0f4fa',
              borderRadius: 20,
              padding: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Feather name='plus' size={20} color='#4A90E2' />
          </Pressable>
        </View>

        {/* 진행 예정 */}
        {pendingMissions.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#1a1a1a' }}>
              진행 예정
            </Text>
            {pendingMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onPress={() => openProofModal(mission)}
              />
            ))}
          </View>
        )}

        {/* 진행 중 */}
        {ongoingMissions.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#1a1a1a' }}>
              진행 중
            </Text>
            {ongoingMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onPress={() => openProofModal(mission)}
              />
            ))}
          </View>
        )}

        {/* 완료 */}
        {completedMissions.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#1a1a1a' }}>
              완료
            </Text>
            {completedMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onPress={() => openProofModal(mission)}
              />
            ))}
          </View>
        )}

        {/* 빈 상태 */}
        {DUMMY_MISSIONS.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#f0f4fa',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <Feather name='target' size={32} color='#4A90E2' />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#666', marginBottom: 8 }}>
              아직 미션이 없어요
            </Text>
            <Text style={{ color: '#999', textAlign: 'center', lineHeight: 20 }}>
              새로운 미션을 만들어 함께 도전해보세요!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* 인증 모달 */}
      <Modal visible={proofModalVisible} transparent animationType='fade'>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setProofModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 24,
              borderRadius: 16,
              width: '85%',
              maxWidth: 320,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16, color: '#1a1a1a' }}>
              인증 내역
            </Text>
            {selectedMission ? (
              <View>
                <Text style={{ fontWeight: '600', marginBottom: 8, color: '#333' }}>
                  {selectedMission.title}
                </Text>
                <Text style={{ color: '#666', lineHeight: 20 }}>
                  이곳에 "{selectedMission.title}" 미션의 인증 내역을 표시합니다.
                </Text>
              </View>
            ) : (
              <Text style={{ color: '#666' }}>선택된 미션이 없습니다.</Text>
            )}
          </View>
        </Pressable>
      </Modal>

      {/* 미션 추가 모달 */}
      <Modal visible={modalVisible} transparent animationType='slide'>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            onPress={() => {}}
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
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 32,
                textAlign: 'center',
                color: '#1a1a1a',
              }}
            >
              미션 생성하기
            </Text>

            {/* 미션 제목 */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                미션 제목
              </Text>
              <TextInput
                placeholder='미션 제목을 입력하세요'
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 16,
                  backgroundColor: '#f8f9fa',
                }}
              />
            </View>

            {/* 미션 설명 */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                미션 설명
              </Text>
              <TextInput
                placeholder='미션에 대한 자세한 설명을 입력하세요'
                multiline
                numberOfLines={3}
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 16,
                  backgroundColor: '#f8f9fa',
                  textAlignVertical: 'top',
                }}
              />
            </View>

            {/* 마감일 선택 */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                마감일
              </Text>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 12,
                  padding: 16,
                  backgroundColor: '#f8f9fa',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Feather name='calendar' size={20} color='#4A90E2' style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 16, color: '#333', flex: 1 }}>
                  {deadline.toLocaleDateString('ko-KR')}
                </Text>
              </Pressable>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={deadline}
                mode='date'
                display='default'
                onChange={onChangeDate}
              />
            )}

            {/* 인증 방식 선택 */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                인증 방식
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {PROOF_METHODS.map((method) => {
                  const isSelected = proofMethod === method;
                  return (
                    <Pressable
                      key={method}
                      onPress={() => setProofMethod(method)}
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        borderRadius: 20,
                        backgroundColor: isSelected ? '#4A90E2' : '#f0f4fa',
                        borderWidth: 1,
                        borderColor: isSelected ? '#4A90E2' : '#e0e0e0',
                      }}
                    >
                      <Text
                        style={{
                          color: isSelected ? '#fff' : '#4A90E2',
                          fontSize: 14,
                          fontWeight: '500',
                        }}
                      >
                        {method}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* 알림 설정 */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 32,
                backgroundColor: '#f8f9fa',
                padding: 16,
                borderRadius: 12,
              }}
            >
              <Feather name='bell' size={20} color='#4A90E2' style={{ marginRight: 12 }} />
              <Text style={{ fontSize: 16, color: '#333', flex: 1, fontWeight: '500' }}>
                알림 설정
              </Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                thumbColor={notificationsEnabled ? '#4A90E2' : '#ccc'}
                trackColor={{ true: '#a8c8f0', false: '#ddd' }}
              />
            </View>

            {/* 추가 버튼 */}
            <Pressable
              onPress={() => {
                // TODO: 미션 저장 처리
                setModalVisible(false);
              }}
              style={{
                backgroundColor: '#4A90E2',
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: 'center',
                shadowColor: '#4A90E2',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>미션 생성하기</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default MissionTab;
