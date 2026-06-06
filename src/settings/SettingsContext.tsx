import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// User preferences shared across the app. Currently just font size, persisted
// so the choice survives app restarts.

export interface FontScaleOption {
  id: string;
  label: string;
  /** Multiplier applied to base font sizes. */
  value: number;
}

// "Default" matches the large, prayer-book sizing requested as the baseline.
export const FONT_SCALE_OPTIONS: FontScaleOption[] = [
  { id: 'small', label: 'Small', value: 0.85 },
  { id: 'default', label: 'Default', value: 1 },
  { id: 'large', label: 'Large', value: 1.2 },
  { id: 'xlarge', label: 'Extra Large', value: 1.45 },
];

const DEFAULT_ID = 'large';
const STORAGE_KEY = '@pws/fontScaleId';

interface SettingsValue {
  fontScaleId: string;
  /** Resolved multiplier for the selected option. */
  fontScale: number;
  setFontScaleId: (id: string) => void;
}

const SettingsContext = createContext<SettingsValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [fontScaleId, setId] = useState<string>(DEFAULT_ID);

  // Restore the saved choice on launch.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved && FONT_SCALE_OPTIONS.some((o) => o.id === saved)) setId(saved);
      })
      .catch(() => {});
  }, []);

  const setFontScaleId = (id: string) => {
    setId(id);
    AsyncStorage.setItem(STORAGE_KEY, id).catch(() => {});
  };

  const fontScale =
    (FONT_SCALE_OPTIONS.find((o) => o.id === fontScaleId) ?? FONT_SCALE_OPTIONS[1]).value;

  return (
    <SettingsContext.Provider value={{ fontScaleId, fontScale, setFontScaleId }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
}
