import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import dayjs, { Dayjs } from '@/lib/dayjs';
import services from '@/services';

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

  const [formData, setFormData] = useState<FormData>({
    name: '',
    date: dayjs(),
    showDatePicker: false,
    showTimePicker: false,
    participantCount: 5,
    description: '',
  });

  const createClubMutation = useMutation({
    mutationFn: services.clubs.createClub,
    onSuccess: () => {
      router.back();
    },
  });

  const handleDateChange = (event: any, selectedDate?: Date | Dayjs) => {
    if (event.type === 'set' && selectedDate) {
      setFormData({
        ...formData,
        date: dayjs(selectedDate),
      });
    }
    if (Platform.OS !== 'ios') {
      setFormData({
        ...formData,
        showDatePicker: false,
      });
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      setFormData({
        ...formData,
        date: dayjs(selectedTime),
      });
    }
    if (Platform.OS !== 'ios') {
      setFormData({
        ...formData,
        showTimePicker: false,
      });
    }
  };

  const handleSubmit = () => {
    console.log(`formData:`, formData);
    router.back();
  };

  return {
    insets,
    formData,
    setFormData,
    handleDateChange,
    handleTimeChange,
    handleSubmit,
  };
};
