import { useState } from 'react';
import { Platform } from 'react-native';

export const useCreateMeetingForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [participantCount, setParticipantCount] = useState(5);
  const [description, setDescription] = useState('');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(
        (prev) =>
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            prev.getHours(),
            prev.getMinutes(),
          ),
      );
    }
    if (Platform.OS !== 'ios') {
      setShowDatePicker(false);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      setDate(
        (prev) =>
          new Date(
            prev.getFullYear(),
            prev.getMonth(),
            prev.getDate(),
            selectedTime.getHours(),
            selectedTime.getMinutes(),
          ),
      );
    }
    if (Platform.OS !== 'ios') {
      setShowTimePicker(false);
    }
  };

  return {
    title,
    setTitle,
    date,
    setDate,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
    participantCount,
    setParticipantCount,
    description,
    setDescription,
    handleDateChange,
    handleTimeChange,
  };
};
