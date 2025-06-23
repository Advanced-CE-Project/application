import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useMe from '@/hooks/use-me';
import dayjs, { Dayjs } from '@/lib/dayjs';
import { CreateClubRequest, createClub } from '@/services/clubs';

interface FormData {
  name: string;
  date: Dayjs;
  showDatePicker: boolean;
  showTimePicker: boolean;
  participantCount: number;
  description: string;
}

export const useMeetingCreate = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { me } = useMe();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    date: dayjs().add(1, 'day').hour(14).minute(0).second(0).millisecond(0), // 내일 오후 2시로 기본 설정
    showDatePicker: false,
    showTimePicker: false,
    participantCount: 5,
    description: '',
  });

  const createClubMutation = useMutation({
    mutationFn: createClub,
    onSuccess: (data) => {
      // 관련된 쿼리들을 invalidate하여 최신 데이터 불러오기
      queryClient.invalidateQueries({
        queryKey: ['clubs', me?.id ?? 'unknown'], // 내가 만든 모임 목록
      });
      queryClient.invalidateQueries({
        queryKey: ['recommendedClubs'], // 홈 - 추천 모임
      });
      queryClient.invalidateQueries({
        queryKey: ['recentClubs'], // 홈 - 최근 모임
      });
      queryClient.invalidateQueries({
        queryKey: ['clubs'], // 검색 - 모든 모임 (queryKey가 'clubs'로 시작하는 모든 쿼리)
      });
      queryClient.invalidateQueries({
        queryKey: ['tags'], // 검색 - 태그 목록
      });

      Alert.alert('성공', '모임이 성공적으로 생성되었습니다.', [
        {
          text: '확인',
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error: any) => {
      Alert.alert('오류', error?.message || '모임 생성 중 오류가 발생했습니다.');
    },
  });

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      // 선택된 날짜를 기존 시간과 결합
      const newDate = dayjs(selectedDate)
        .set('hour', formData.date.hour())
        .set('minute', formData.date.minute())
        .set('second', 0)
        .set('millisecond', 0);

      setFormData({
        ...formData,
        date: newDate,
        showDatePicker: Platform.OS === 'ios' ? formData.showDatePicker : false,
      });
    } else if (event.type === 'dismissed') {
      setFormData({
        ...formData,
        showDatePicker: false,
      });
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      // 선택된 시간을 기존 날짜와 결합
      const timeObj = dayjs(selectedTime);
      const newDate = formData.date
        .set('hour', timeObj.hour())
        .set('minute', timeObj.minute())
        .set('second', 0)
        .set('millisecond', 0);

      setFormData({
        ...formData,
        date: newDate,
        showTimePicker: Platform.OS === 'ios' ? formData.showTimePicker : false,
      });
    } else if (event.type === 'dismissed') {
      setFormData({
        ...formData,
        showTimePicker: false,
      });
    }
  };

  // 폼 유효성 검증
  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return '모임명을 입력해주세요.';
    }
    if (formData.name.trim().length < 2) {
      return '모임명은 2자 이상 입력해주세요.';
    }
    if (formData.date.isBefore(dayjs())) {
      return '모임 날짜는 현재 시간 이후로 설정해주세요.';
    }
    if (formData.participantCount < 1) {
      return '모집 인원은 1명 이상이어야 합니다.';
    }
    if (formData.description.trim().length > 0 && formData.description.trim().length < 5) {
      return '모임 설명은 5자 이상 입력해주세요.';
    }
    return null;
  };

  const handleSubmit = () => {
    // 폼 유효성 검증
    const validationError = validateForm();
    if (validationError) {
      Alert.alert('입력 오류', validationError);
      return;
    }

    // API 요청 데이터 구성
    const requestData: CreateClubRequest = {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      maxParticipants: formData.participantCount,
      startDateTime: formData.date.toISOString(),
      // endDateTime은 UI에 없으므로 생략 (선택사항)
      // locationId는 나중에 장소 선택 기능 추가 시 사용
      // imageUrl은 나중에 이미지 업로드 기능 추가 시 사용
    };

    createClubMutation.mutate(requestData);
  };

  // 폼 유효성 검증 상태
  const isFormValid = formData.name.trim().length >= 2 && formData.date.isAfter(dayjs());

  return {
    insets,
    formData,
    setFormData,
    handleDateChange,
    handleTimeChange,
    handleSubmit,

    // 로딩 및 에러 상태
    isCreating: createClubMutation.isPending,
    createError: createClubMutation.error?.message,

    // 유효성 검증
    isFormValid,
    validateForm,
  };
};
