import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

type Meeting = {
  location: string | null;
  // 필요한 다른 필드도 있으면 추가
};

export function useMeetingInfo(meeting: Meeting) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(meeting.location);

  const handleQuickMessage = (message: string) => {
    Alert.alert('빠른 메시지', `"${message}" 메시지를 보냈습니다.`);
  };

  const handleRecommendPlace = () => {
    router.push('/(modals)/recommend');
  };

  const displayLocation = currentLocation || meeting.location;

  return {
    modalVisible,
    setModalVisible,
    currentLocation,
    setCurrentLocation,
    handleQuickMessage,
    handleRecommendPlace,
    displayLocation,
  };
}
