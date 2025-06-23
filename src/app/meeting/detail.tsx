import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import InfoTab from '@/components/screens/detail/info';
import MissionTab from '@/components/screens/detail/mission';
import ResourcesTab from '@/components/screens/detail/resources';
import { Button } from '@/components/ui/button';
import { TABS, useMeetingDetail } from '@/hooks/screens/use-meeting-detail';
import { formatShortKoreanDateTime } from '@/lib/dayjs';

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabButtonSelected: {
    backgroundColor: '#4A90E2',
  },
  tabButtonText: {
    fontSize: 15,
  },
  tabButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  tabButtonTextUnselected: {
    color: '#666',
    fontWeight: '500',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  notFoundText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '500',
  },
  ownerButtonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButtonWrapper: {
    flex: 2,
  },
  secondaryButtonWrapper: {
    flex: 1,
  },
});

// 탭 버튼 컴포넌트
interface TabButtonProps {
  tab: string;
  isSelected: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, isSelected, onPress }) => (
  <Pressable onPress={onPress} style={[styles.tabButton, isSelected && styles.tabButtonSelected]}>
    <Text
      style={[
        styles.tabButtonText,
        isSelected ? styles.tabButtonTextSelected : styles.tabButtonTextUnselected,
      ]}
    >
      {tab}
    </Text>
  </Pressable>
);

// 탭 콘텐츠 컴포넌트
interface TabContentProps {
  selectedTab: string;
  club: any;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab, club }) => {
  // 승인된 멤버만 필터링
  const approvedMembers = club.members?.filter((member: any) => member.status === 'APPROVED') || [];

  switch (selectedTab) {
    case '정보':
      return (
        <InfoTab
          meeting={{
            title: club.name,
            date: formatShortKoreanDateTime(club.startDateTime),
            location: club.location?.name ?? null,
            description: club.description,
            participants: {
              current: approvedMembers.length,
              max: club?.maxParticipants ?? 1,
            },
            members: approvedMembers,
          }}
        />
      );
    case '자료':
      return <ResourcesTab />;
    case '미션':
      return <MissionTab />;
    default:
      return null;
  }
};

// 하단 액션 버튼 컴포넌트
interface ActionButtonProps {
  isOwner: boolean;
  isApproved: boolean;
  isPending: boolean;
  hasAttended: boolean;
  isEnded: boolean;
  isOngoing: boolean;
  isStarted: boolean;
  isJoining: boolean;
  isStarting: boolean;
  isEnding: boolean;
  isEvaluationCompleted: boolean;
  onEvaluation: () => void;
  onAttendanceManage: () => void;
  onAttendanceCheck: () => void;
  onApplication: () => void;
  onStartClub: () => void;
  onManageApplicants: () => void;
  onEndClub: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  isOwner,
  isApproved,
  isPending,
  hasAttended,
  isEnded,
  isOngoing,
  isStarted,
  isJoining,
  isStarting,
  isEnding,
  isEvaluationCompleted,
  onEvaluation,
  onAttendanceManage,
  onAttendanceCheck,
  onApplication,
  onStartClub,
  onManageApplicants,
  onEndClub,
}) => {
  // 모임 소유자
  if (isOwner) {
    if (!isStarted) {
      return (
        <View style={styles.ownerButtonContainer}>
          <View style={styles.primaryButtonWrapper}>
            <Button
              title={isStarting ? '모임 시작 중...' : '모임 시작하기'}
              onPress={onStartClub}
              disabled={isStarting}
              variant='start'
              icon={isStarting ? '⏳' : '🚀'}
            />
          </View>
          <View style={styles.secondaryButtonWrapper}>
            <Button
              title='참가자 관리'
              onPress={() => onManageApplicants()}
              variant='manage'
              icon='👥'
            />
          </View>
        </View>
      );
    }
    if (isStarted && !isEnded) {
      return (
        <View style={styles.ownerButtonContainer}>
          <View style={styles.primaryButtonWrapper}>
            <Button title='출결 관리' onPress={onAttendanceManage} variant='manage' icon='📋' />
          </View>
          <View style={styles.secondaryButtonWrapper}>
            <Button
              title={isEnding ? '종료 중...' : '모임 종료'}
              onPress={onEndClub}
              disabled={isEnding}
              variant='end'
              icon={isEnding ? '⏳' : '🔚'}
            />
          </View>
        </View>
      );
    }
    return <Button title='모임 종료됨' disabled />;
  }

  // 참가 승인된 사용자
  if (isApproved) {
    if (isEnded) {
      if (!hasAttended) {
        return <Button title='모임 종료됨' disabled />;
      }

      if (isEvaluationCompleted) {
        return <Button title='평가 완료됨' disabled icon='✅' />;
      }

      return <Button title='모임 평가하기' onPress={onEvaluation} icon='⭐' />;
    }

    if (isStarted && !isEnded) {
      return hasAttended ? (
        <Button title='출석 완료' disabled />
      ) : (
        <Button title='출석 체크하기' onPress={onAttendanceCheck} icon='📱' />
      );
    }

    return <Button title='모임 대기 중' disabled />;
  }

  // 승인 대기 중
  if (isPending) {
    return <Button title='승인 대기 중' disabled />;
  }

  // 참가하지 않은 사용자
  if (isEnded) {
    return <Button title='모임이 종료되어 신청할 수 없습니다' disabled />;
  }

  if (isStarted) {
    return <Button title='모임이 시작되어 신청할 수 없습니다' disabled />;
  }

  return (
    <Button
      title={isJoining ? '신청 중...' : '참가 신청하기'}
      onPress={onApplication}
      disabled={isJoining}
      icon={isJoining ? '⏳' : '✋'}
    />
  );
};

// 메인 컴포넌트
const MeetingDetailScreen: React.FC = () => {
  const {
    club,
    bottomButtonHeight,
    insets,
    isEnded,
    isOngoing,
    isStarted,
    isOwner,
    isApproved,
    isPending,
    hasAttended,
    isEvaluationCompleted,
    isJoining,
    isStarting,
    isEnding,
    selectedTab,
    setSelectedTab,
    handleEvaluation,
    handleAttendanceManage,
    handleApplication,
    handleAttendanceCheck,
    handleStartClub,
    handleManageApplicants,
    handleEndClub,
  } = useMeetingDetail();

  // 로딩 또는 에러 상태
  if (!club) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>모임 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomButtonHeight + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* 모임 제목 */}
        <Text style={styles.title}>{club.name}</Text>

        {/* 탭 메뉴 */}
        <View style={styles.tabContainer}>
          {TABS.map((tab) => (
            <TabButton
              key={tab}
              tab={tab}
              isSelected={selectedTab === tab}
              onPress={() => setSelectedTab(tab)}
            />
          ))}
        </View>

        {/* 탭 콘텐츠 */}
        <TabContent selectedTab={selectedTab} club={club} />
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <View style={[styles.bottomButtonContainer, { paddingBottom: 16 + insets.bottom }]}>
        <ActionButton
          isOwner={isOwner}
          isApproved={isApproved}
          isPending={isPending}
          hasAttended={hasAttended}
          isEnded={isEnded}
          isOngoing={isOngoing}
          isStarted={isStarted}
          isJoining={isJoining}
          isStarting={isStarting}
          isEnding={isEnding}
          isEvaluationCompleted={isEvaluationCompleted}
          onEvaluation={handleEvaluation}
          onAttendanceManage={handleAttendanceManage}
          onAttendanceCheck={handleAttendanceCheck}
          onApplication={handleApplication}
          onStartClub={handleStartClub}
          onManageApplicants={handleManageApplicants}
          onEndClub={handleEndClub}
        />
      </View>
    </View>
  );
};

export default MeetingDetailScreen;
