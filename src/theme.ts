// Central palette and spacing so screens stay visually consistent.

export const colors = {
  primary: '#5B3A8C', // liturgical purple
  primaryDark: '#3E2766',
  accent: '#C9A227', // muted gold
  background: '#F6F3EF',
  card: '#FFFFFF',
  text: '#2B2535',
  textMuted: '#6E6781',
  border: '#E7E1D8',
  white: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
};

// Classic serif (prayer-book style). Names match the loaded EB Garamond weights.
export const fonts = {
  regular: 'EBGaramond_400Regular',
  medium: 'EBGaramond_500Medium',
  semibold: 'EBGaramond_600SemiBold',
  bold: 'EBGaramond_700Bold',
};

// Base font sizes (before the user's font-scale multiplier is applied).
export const baseFontSizes = {
  prayerTitle: 22,
  prayerBody: 21,
  note: 15,
};
