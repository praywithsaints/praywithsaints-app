import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

/**
 * Placeholder for drawer sections not yet implemented (Prayers, Way of the
 * Cross, …). Pass the section title via the `title` route param.
 */
export default function ComingSoonScreen({ route }: { route: { params?: { title?: string } } }) {
  const title = route.params?.title ?? 'This section';
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🕊️</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emoji: { fontSize: 48, marginBottom: spacing.md },
  title: { fontSize: 22, fontWeight: '800', color: colors.primaryDark, textAlign: 'center' },
  subtitle: { fontSize: 15, color: colors.textMuted, marginTop: spacing.sm },
});
