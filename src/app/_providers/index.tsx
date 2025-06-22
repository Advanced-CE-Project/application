import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ReactQueryProvider from './react-query';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Providers;
