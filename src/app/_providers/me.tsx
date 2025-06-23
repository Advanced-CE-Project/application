import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import { useLocation } from '@/hooks';
import { useMe } from '@/hooks/use-me';

interface MeProviderProps {
  children: React.ReactNode;
}

const MeProvider = ({ children }: MeProviderProps) => {
  useMe({ enabled: true });
  useLocation({ enabled: true });

  return <>{children}</>;
};

export default MeProvider;
