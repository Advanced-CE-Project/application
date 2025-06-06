import { View } from 'react-native';

export interface SpacerProps {
  height?: number;
  width?: number;
}

export const Spacer: React.FC<SpacerProps> = ({ height = 0, width = 0 }) => (
  <View style={{ height, width }} />
);
