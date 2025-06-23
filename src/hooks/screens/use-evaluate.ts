import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';

import { useMe } from '@/hooks/use-me';
import services from '@/services';

interface ParticipantRating {
  receiverId: string;
  score: number;
  comment?: string;
  tags?: string[];
}

export const useEvaluate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { me } = useMe();

  // 상태 관리
  const [overallRating, setOverallRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [participantRatings, setParticipantRatings] = useState<ParticipantRating[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<{ [userId: string]: string[] }>({});

  // 모임 정보 조회
  const { data: clubData, isLoading } = useQuery({
    queryKey: ['meeting', id],
    queryFn: () => services.clubs.getClubById(id!),
    enabled: !!id,
  });

  // 평가 제출 mutation
  const submitEvaluationMutation = useMutation({
    mutationFn: async (evaluations: ParticipantRating[]) => {
      const promises = evaluations.map((evaluation) =>
        services.meetings.createRating(id!, evaluation),
      );
      return Promise.all(promises);
    },
    onSuccess: () => {
      Alert.alert('평가 완료', '모임 평가가 성공적으로 제출되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            // 관련 쿼리들 무효화
            queryClient.invalidateQueries({ queryKey: ['meeting', id] });
            queryClient.invalidateQueries({ queryKey: ['evaluationStatus', id] }); // 평가 상태 갱신
            queryClient.invalidateQueries({ queryKey: ['clubs'] });
            queryClient.invalidateQueries({ queryKey: ['ratings'] });
            router.back();
          },
        },
      ]);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '평가 제출 중 오류가 발생했습니다.';
      Alert.alert('오류', errorMessage);
    },
  });

  // 키워드 토글 함수
  const toggleKeyword = (userId: string, keyword: string) => {
    setSelectedKeywords((prev) => {
      const current = prev[userId] || [];
      const exists = current.includes(keyword);
      return {
        ...prev,
        [userId]: exists ? current.filter((k) => k !== keyword) : [...current, keyword],
      };
    });
  };

  // 개별 참가자 평점 설정
  const setParticipantRating = (userId: string, rating: number) => {
    setParticipantRatings((prev) => {
      const existingIndex = prev.findIndex((r) => r.receiverId === userId);
      const newRating: ParticipantRating = {
        receiverId: userId,
        score: rating,
        comment: '', // 개별 평가에서는 개별 코멘트 사용
        tags: [], // 나중에 키워드 업데이트
      };

      let updated;
      if (existingIndex >= 0) {
        updated = [...prev];
        updated[existingIndex] = newRating;
      } else {
        updated = [...prev, newRating];
      }

      return updated;
    });
  };

  // 평가 제출 함수
  const handleSubmit = () => {
    if (!id) {
      Alert.alert('오류', '모임 ID를 찾을 수 없습니다.');
      return;
    }

    if (overallRating === 0) {
      Alert.alert('알림', '모임 만족도를 선택해주세요.');
      return;
    }

    // 평점이 입력된 참가자들에 대한 평가만 제출
    const evaluationsToSubmit = participantRatings
      .filter((rating) => rating.score > 0)
      .map((rating) => ({
        receiverId: rating.receiverId,
        score: rating.score,
        comment: feedback || undefined, // 전체 피드백을 각 평가에 포함
        tags: selectedKeywords[rating.receiverId] || [],
      }));

    // 참가자가 있는 경우에만 평가 필요
    if (evaluationTargets.length > 1 && evaluationsToSubmit.length === 0) {
      Alert.alert('알림', '최소 한 명의 참가자를 평가해주세요.');
      return;
    }

    // 참가자가 없는 경우 (혼자 모임) 빈 배열로 제출
    if (evaluationTargets.length <= 1) {
      router.back();
      return;
    }

    submitEvaluationMutation.mutate(evaluationsToSubmit);
  };

  // 승인된 참가자들만 필터링 (평가 대상)
  const evaluationTargets =
    clubData?.club?.members?.filter((member: any) => member.status === 'APPROVED') || [];

  // 평가 대상이 로드되면 모든 참가자에게 기본 5점 평가 설정
  React.useEffect(() => {
    if (evaluationTargets.length > 0) {
      const currentUserFromData = evaluationTargets.find((member: any) => member.userId === me?.id);
      const otherParticipants = evaluationTargets.filter((member: any) => member.userId !== me?.id);

      // 다른 참가자들에게 기본 5점 평가 설정
      otherParticipants.forEach((member: any) => {
        setParticipantRating(member.userId, 5);
      });
    }
  }, [evaluationTargets.length]); // 참가자 수가 변경될 때만 실행

  return {
    // 데이터
    club: clubData?.club,
    evaluationTargets,
    isLoading,

    // 상태
    overallRating,
    feedback,
    selectedKeywords,
    participantRatings,

    // 상태 업데이터
    setOverallRating,
    setFeedback,
    toggleKeyword,
    setParticipantRating,

    // 액션
    handleSubmit,
    isSubmitting: submitEvaluationMutation.isPending,
  };
};
