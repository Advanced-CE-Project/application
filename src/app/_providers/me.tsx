import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import { useMe } from '@/hooks/use-me';

interface MeProviderProps {
  children: React.ReactNode;
}

const MeProvider = ({ children }: MeProviderProps) => {
  const { me } = useMe({ enabled: true });

  return <>{children}</>;
};

export default MeProvider;
