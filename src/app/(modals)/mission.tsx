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

const MissionProgress = ({ progress = 0, status }: { progress: number; status: string }) => (
  <View style={{ marginTop: 8 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
      <Text style={{ fontSize: 12, color: '#666' }}>진행률</Text>
      <Text style={{ fontSize: 12, color: '#666', fontWeight: '500' }}>{progress}%</Text>
    </View>
    <View
      style={{
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor:
            status === 'ongoing'
              ? '#4A90E2'
              : status === 'completed'
              ? '#4caf50'
              : '#ffc107',
          borderRadius: 3,
        }}
      />
    </View>
  </View>
);

const getStatusText = (status: string) => {
  switch (status) {
    case 'ongoing':
      return '진행 중';
    case 'completed':
      return '완료';
    case 'pending':
      return '대기 중';
    default:
      return '알 수 없음';
  }
};

const MissionTab = () => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [proofMethod, setProofMethod] = useState('사진 업로드');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

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
          paddingHorizontal: 20,
          paddingTop: 0,
          paddingBottom: insets.bottom + 32,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 16 }}>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={{ backgroundColor: '#f0f4fa', borderRadius: 20, padding: 8 }}
          >
            <Feather name='plus' size={22} color='#4A90E2' />
          </Pressable>
        </View>

        {/* 진행 예정 */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>진행 예정</Text>
          {pendingMissions.length === 0 ? (
            <Text style={{ color: '#bbb' }}>진행 예정인 미션이 없습니다.</Text>
          ) : (
            pendingMissions.map((mission) => (
              <View
                key={mission.id}
                style={{
                  backgroundColor: '#fff8e1',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  borderLeftWidth: 4,
                  borderLeftColor: '#ffc107',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#333' }}>
                    {mission.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#666' }}>{getStatusText(mission.status)}</Text>
                </View>
                <Text style={{ color: '#777', marginBottom: 6 }}>{mission.description}</Text>
                <MissionProgress progress={mission.progress} status={mission.status} />
              </View>
            ))
          )}
        </View>

        {/* 진행 중 */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>진행 중</Text>
          {ongoingMissions.length === 0 ? (
            <Text style={{ color: '#888' }}>현재 진행 중인 미션이 없습니다.</Text>
          ) : (
            ongoingMissions.map((mission) => (
              <View
                key={mission.id}
                style={{
                  backgroundColor: '#e8f0fe',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#1a1a1a' }}>
                    {mission.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#4A90E2' }}>{getStatusText(mission.status)}</Text>
                </View>
                <Text style={{ color: '#555', marginBottom: 6 }}>{mission.description}</Text>
                <MissionProgress progress={mission.progress} status={mission.status} />
              </View>
            ))
          )}
        </View>

        {/* 완료 */}
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>완료</Text>
          {completedMissions.length === 0 ? (
            <Text style={{ color: '#aaa' }}>아직 완료된 미션이 없습니다.</Text>
          ) : (
            completedMissions.map((mission) => (
              <View
                key={mission.id}
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  borderLeftWidth: 4,
                  borderLeftColor: '#4caf50',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#333' }}>
                    {mission.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#4caf50' }}>{getStatusText(mission.status)}</Text>
                </View>
                <Text style={{ color: '#777', marginBottom: 6 }}>{mission.description}</Text>
                <MissionProgress progress={mission.progress} status={mission.status} />
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* 미션 추가 모달 */}
      <Modal visible={modalVisible} transparent animationType='slide'>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
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
                backgroundColor: '#ccc',
                borderRadius: 2,
                alignSelf: 'center',
                marginBottom: 24,
              }}
            />
            <Text
              style={{ fontSize: 18, fontWeight: '700', marginBottom: 24, textAlign: 'center' }}
            >
              미션 생성하기
            </Text>

            {/* 미션 제목 */}
            <TextInput
              placeholder='미션 제목'
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                fontSize: 16,
                backgroundColor: '#f8f9fa',
              }}
            />

            {/* 미션 설명 */}
            <TextInput
              placeholder='미션 설명'
              multiline
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 8,
                padding: 12,
                marginBottom: 24,
                fontSize: 16,
                backgroundColor: '#f8f9fa',
              }}
            />

            {/* 마감일 선택 */}
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 8,
                padding: 12,
                marginBottom: 24,
                backgroundColor: '#f8f9fa',
              }}
            >
              <Text style={{ fontSize: 16 }}>
                {/* {deadline.toLocaleDateString('ko-KR')} */}
                마감일 {deadline.toLocaleDateString('ko-KR')}
              </Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={deadline}
                mode='date'
                display='default'
                onChange={onChangeDate}
              />
            )}

            {/* 인증 방식 선택 */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {PROOF_METHODS.map((method) => {
                const isSelected = proofMethod === method;
                return (
                  <Pressable
                    key={method}
                    onPress={() => setProofMethod(method)}
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 16,
                      backgroundColor: isSelected ? '#4A90E2' : '#f0f4fa',
                    }}
                  >
                    <Text style={{ color: isSelected ? '#fff' : '#333', fontSize: 14 }}>
                      {method}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* 알림 설정 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
              <Text style={{ fontSize: 16, color: '#333', flex: 1 }}>알림 설정</Text>
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
                borderRadius: 8,
                paddingVertical: 14,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>추가하기</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default MissionTab;
