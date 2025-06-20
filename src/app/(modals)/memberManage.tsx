import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const currentUserId = 'user123';

const INITIAL_MEETING = {
  title: '주말 등산 모임',
  date: '4월 15일 (토) 오전 8시',
  location: '북한산 국립공원',
  ownerId: 'user123',
  participants: [
    { id: '1', name: '김참여' },
    { id: '2', name: '이산악' },
    { id: '3', name: '박모임' },
  ],
  applicants: [
    { id: '4', name: '신청자A' },
    { id: '5', name: '신청자B' },
    { id: '6', name: '신청자C' },
  ],
};

const MemberManageScreen = () => {
  const [selectedTab, setSelectedTab] = useState<'참가자' | '신청자'>('참가자');

  // 실제 반영된 상태
  const [participants, setParticipants] = useState(INITIAL_MEETING.participants);
  const [applicants, setApplicants] = useState(INITIAL_MEETING.applicants);

  // 수정 중인 임시 상태
  const [draftParticipants, setDraftParticipants] = useState([...participants]);
  const [draftApplicants, setDraftApplicants] = useState([...applicants]);

  const meeting = { ...INITIAL_MEETING, participants, applicants };

  const isModified =
    JSON.stringify(participants) !== JSON.stringify(draftParticipants) ||
    JSON.stringify(applicants) !== JSON.stringify(draftApplicants);

  if (currentUserId !== meeting.ownerId) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>🔒 접근 권한이 없습니다.</Text>
      </View>
    );
  }

  const handleApprove = (id: string) => {
    const approved = draftApplicants.find((a) => a.id === id);
    if (approved) {
      setDraftApplicants((prev) => prev.filter((a) => a.id !== id));
      setDraftParticipants((prev) => [...prev, approved]);
    }
  };

  const handleReject = (id: string, isApplicant: boolean) => {
    if (isApplicant) {
      setDraftApplicants((prev) => prev.filter((a) => a.id !== id));
    } else {
      setDraftParticipants((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleApplyChanges = () => {
    setParticipants(draftParticipants);
    setApplicants(draftApplicants);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      {/* 제목 */}
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>모임 관리</Text>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>{meeting.title}</Text>
      <Text style={{ color: '#666', marginBottom: 20 }}>
        {meeting.date} · {meeting.location}
      </Text>

      {/* 수정/취소 버튼 */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: isModified ? '#4A90E2' : '#eee',
            borderRadius: 8,
            paddingVertical: 12,
            alignItems: 'center',
          }}
          onPress={isModified ? handleApplyChanges : undefined}
        >
          <Text style={{ fontWeight: '500', color: isModified ? '#fff' : '#999' }}>수정</Text>
        </Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: '#eee',
            borderRadius: 8,
            paddingVertical: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '500' }}>취소</Text>
        </Pressable>
      </View>

      {/* 탭 */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        {(['참가자', '신청자'] as const).map((tab) => (
          <Pressable key={tab} onPress={() => setSelectedTab(tab)}>
            <Text
              style={{
                marginRight: 20,
                fontWeight: '600',
                color: selectedTab === tab ? '#2563eb' : '#999',
              }}
            >
              {tab} (
              {tab === '참가자' ? draftParticipants.length : draftApplicants.length})
            </Text>
          </Pressable>
        ))}
      </View>

      {/* 목록 */}
      {(selectedTab === '참가자' ? draftParticipants : draftApplicants).map((user) => (
        <View
          key={user.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#f0f0f0',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#e5e7eb',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}
            >
              <Feather name="user" size={18} color="#9ca3af" />
            </View>
            <View>
              <Text style={{ fontWeight: '500' }}>{user.name}</Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>
                {selectedTab === '참가자' ? '참여 확정' : '승인 대기'}
              </Text>
            </View>
          </View>

          {/* 버튼들 */}
          {selectedTab === '참가자' ? (
            <Pressable
              onPress={() => handleReject(user.id, false)}
              style={{
                paddingVertical: 4,
                paddingHorizontal: 10,
                backgroundColor: '#f87171',
                borderRadius: 6,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12 }}>제외</Text>
            </Pressable>
          ) : (
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable
                onPress={() => handleApprove(user.id)}
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  backgroundColor: '#4A90E2',
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 12 }}>수락</Text>
              </Pressable>
              <Pressable
                onPress={() => handleReject(user.id, true)}
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  backgroundColor: '#f87171',
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 12 }}>거절</Text>
              </Pressable>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default MemberManageScreen;
