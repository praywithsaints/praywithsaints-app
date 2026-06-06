import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Block, DEVOTIONS } from '../content/devotions';
import { baseFontSizes, colors, fonts, radius, spacing } from '../theme';
import { useSettings } from '../settings/SettingsContext';

/**
 * Renders any devotion from DEVOTIONS, chosen via the route param `contentKey`.
 * All drawer devotional sections point here with a different key.
 */
export default function DevotionScreen() {
  const route = useRoute();
  const { fontScale } = useSettings();
  const key = (route.params as { contentKey?: string } | undefined)?.contentKey ?? '';
  const devotion = DEVOTIONS[key];

  if (!devotion) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Content not found.</Text>
      </View>
    );
  }

  const titleSize = baseFontSizes.prayerTitle * fontScale;
  const bodySize = baseFontSizes.prayerBody * fontScale;
  const noteSize = baseFontSizes.note * fontScale;

  const renderBlock = (block: Block, i: number) => {
    switch (block.kind) {
      case 'heading':
        return (
          <Text key={i} style={[styles.heading, { fontSize: bodySize * 0.95 }]}>
            {block.text}
          </Text>
        );
      case 'note':
        return (
          <Text key={i} style={[styles.note, { fontSize: noteSize, lineHeight: noteSize * 1.5 }]}>
            {block.text}
          </Text>
        );
      case 'prayer':
        return (
          <View key={i} style={styles.card}>
            <Text style={[styles.cardTitle, { fontSize: titleSize }]}>{block.title}</Text>
            {block.note && (
              <Text style={[styles.cardNote, { fontSize: noteSize }]}>{block.note}</Text>
            )}
            <Text style={[styles.cardBody, { fontSize: bodySize, lineHeight: bodySize * 1.5 }]}>
              {block.text}
            </Text>
          </View>
        );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {devotion.intro && <Text style={styles.intro}>{devotion.intro}</Text>}
      {devotion.blocks.map(renderBlock)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },

  intro: { fontSize: 14, lineHeight: 21, color: colors.textMuted, marginBottom: spacing.md },

  heading: {
    fontFamily: fonts.semibold,
    color: colors.primary,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  note: {
    fontFamily: fonts.regular,
    fontStyle: 'italic',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontFamily: fonts.bold, color: colors.primaryDark },
  cardNote: { fontFamily: fonts.medium, color: colors.accent, marginTop: 2 },
  cardBody: { fontFamily: fonts.regular, color: colors.text, marginTop: spacing.sm },

  fallback: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  fallbackText: { color: colors.textMuted, fontSize: 16 },
});
