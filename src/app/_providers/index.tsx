import { initializeKakaoSDK } from '@react-native-kakao/core';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MeProvider from './me';
import ReactQueryProvider from './react-query';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  useEffect(() => {
    const initKakao = async () => {
      try {
        console.log('Initializing Kakao SDK...');
        await initializeKakaoSDK('16c50ffe80a99f9dfdbe776c99c84150');
        console.log('Kakao SDK initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Kakao SDK:', error);
      }
    };

    initKakao();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ReactQueryProvider>
          <MeProvider>{children}</MeProvider>
        </ReactQueryProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Providers;
