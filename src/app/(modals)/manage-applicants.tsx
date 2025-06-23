import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import services from '@/services';
import { ClubApplicantsResponse, ClubMember } from '@/types/models/club';

const ManageApplicantsModal: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'approved'>('pending');

  // 참가 신청자 목록 조회
  const { data, isLoading, error } = useQuery<ClubApplicantsResponse>({
    queryKey: ['club-applicants', id],
    queryFn: () => services.clubs.getApplicants(id!),
    enabled: !!id,
  });

  // 모임 상세 정보 조회 (승인된 멤버 목록을 위해)
  const { data: clubData } = useQuery({
    queryKey: ['meeting', id],
    queryFn: () => services.clubs.getClubById(id!),
    enabled: !!id,
  });

  // 참가 승인/거절 mutation
  const approveParticipantMutation = useMutation({
    mutationFn: ({
      action,
      participantId,
    }: {
      action: 'accept' | 'reject';
      participantId: string;
    }) => services.clubs.approveParticipant(id!, { participantId, action }),
    onSuccess: (_, { action }) => {
      Alert.alert('성공', action === 'accept' ? '참가를 승인했습니다.' : '참가를 거절했습니다.', [
        {
          text: '확인',
          onPress: () => {
            queryClient.invalidateQueries({ queryKey: ['club-applicants', id] });
            queryClient.invalidateQueries({ queryKey: ['meeting', id] });
          },
        },
      ]);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '처리 중 오류가 발생했습니다.';
      Alert.alert('오류', errorMessage);
    },
  });

  const handleApprove = (participantId: string) => {
    Alert.alert('참가 승인', '이 신청자를 승인하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '승인',
        onPress: () => approveParticipantMutation.mutate({ action: 'accept', participantId }),
      },
    ]);
  };

  const handleReject = (participantId: string) => {
    Alert.alert('참가 거절', '이 신청자를 거절하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '거절',
        style: 'destructive',
        onPress: () => approveParticipantMutation.mutate({ action: 'reject', participantId }),
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>참가 신청자 관리</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#4A90E2' />
          <Text style={styles.loadingText}>로딩 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>참가 신청자 관리</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>신청자 목록을 불러올 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.clubInfo}>
          <Text style={styles.clubName}>{data.club.name}</Text>

          {/* 탭 메뉴 */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'pending' && styles.activeTab]}
              onPress={() => setSelectedTab('pending')}
            >
              <Text style={[styles.tabText, selectedTab === 'pending' && styles.activeTabText]}>
                대기 중 ({data.applicants.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'approved' && styles.activeTab]}
              onPress={() => setSelectedTab('approved')}
            >
              <Text style={[styles.tabText, selectedTab === 'approved' && styles.activeTabText]}>
                승인됨 (
                {clubData?.club?.members?.filter((m: ClubMember) => m.status === 'APPROVED')
                  .length || 0}
                )
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.applicantsList} showsVerticalScrollIndicator={false}>
          {selectedTab === 'pending' ? (
            // 대기 중인 신청자
            data.applicants.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>현재 대기 중인 신청자가 없습니다.</Text>
              </View>
            ) : (
              data.applicants.map((applicant) => (
                <View key={applicant.memberId} style={styles.applicantCard}>
                  <View style={styles.applicantInfo}>
                    <View style={styles.profileImage}>
                      <Text style={styles.profileInitial}>
                        {applicant.user.nickname.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.applicantDetails}>
                      <Text style={styles.applicantName}>{applicant.user.nickname}</Text>
                      <Text style={styles.applicantEmail}>{applicant.user.email}</Text>
                      <Text style={styles.appliedDate}>
                        신청일: {new Date(applicant.appliedAt).toLocaleDateString('ko-KR')}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.approveButton]}
                      onPress={() => handleApprove(applicant.userId)}
                      disabled={approveParticipantMutation.isPending}
                    >
                      <Text style={styles.approveButtonText}>승인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.rejectButton]}
                      onPress={() => handleReject(applicant.userId)}
                      disabled={approveParticipantMutation.isPending}
                    >
                      <Text style={styles.rejectButtonText}>거절</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )
          ) : // 승인된 멤버
          !clubData?.club?.members ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>로딩 중...</Text>
            </View>
          ) : (
            clubData.club.members
              .filter((member: ClubMember) => member.status === 'APPROVED')
              .map((member: ClubMember) => (
                <View key={member.userId} style={styles.approvedCard}>
                  <View style={styles.approvedCardContent}>
                    <View style={styles.profileImage}>
                      <Text style={styles.profileInitial}>
                        {member.user.nickname.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.approvedDetails}>
                      <Text style={styles.approvedName}>{member.user.nickname}</Text>
                      <Text style={styles.approvedStatusText}>승인됨</Text>
                    </View>
                    <View style={styles.approvedBadge}>
                      <Text style={styles.approvedBadgeText}>✓</Text>
                    </View>
                  </View>
                </View>
              ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  clubInfo: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  clubName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  applicantCount: {
    fontSize: 14,
    color: '#666',
  },
  applicantsList: {
    flex: 1,
    paddingVertical: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  applicantCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  applicantInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  applicantDetails: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  applicantEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  appliedDate: {
    fontSize: 12,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#4A90E2',
  },
  rejectButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dc3545',
  },
  approveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  rejectButtonText: {
    color: '#dc3545',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginTop: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  approvedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  approvedCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  approvedDetails: {
    flex: 1,
    marginLeft: 12,
  },
  approvedName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 2,
  },
  approvedStatusText: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: '500',
  },
  approvedStatus: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '500',
  },
  approvedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
  },
  approvedBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ManageApplicantsModal;
