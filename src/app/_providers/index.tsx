import { initializeKakaoSDK } from '@react-native-kakao/core';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MeProvider from './me';
import ReactQueryProvider from './react-query';

initializeKakaoSDK('16c50ffe80a99f9dfdbe776c99c84150');

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
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
