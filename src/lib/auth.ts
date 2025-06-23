import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  return token;
};

export const getRefreshToken = async () => {
  const token = await AsyncStorage.getItem('refreshToken');
  return token;
};

export const setAccessToken = async (token: string) => {
  await AsyncStorage.setItem('accessToken', token);
};

export const setRefreshToken = async (token: string) => {
  await AsyncStorage.setItem('refreshToken', token);
};

export const removeTokens = async () => {
  await AsyncStorage.clear();
};
