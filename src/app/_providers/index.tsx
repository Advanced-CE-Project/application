import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ReactQueryProvider from './react-query';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </GestureHandlerRootView>
  );
};

export default Providers;
