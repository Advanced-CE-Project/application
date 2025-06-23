import { LocationObject } from 'expo-location';
import { create } from 'zustand';

interface LocationStore {
  location: LocationObject | null;
  error: string | null;
  setLocation: (location: LocationObject) => void;
  setError: (error: string | null) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  error: null,
  setLocation: (location) => set({ location }),
  setError: (error) => set({ error }),
}));
