import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Prayer } from '../content/types';
import { t } from '../content/types';
import { baseFontSizes, colors, fonts, radius, spacing } from '../theme';
import { useSettings } from '../settings/SettingsContext';

interface Props {
  prayer: Prayer;
  /** Optional ordinal shown in the badge, e.g. step number in a sequence. */
  step?: number;
}

/** A single prayer rendered as a titled card with its full text. */
export default function PrayerCard({ prayer, step }: Props) {
  const { fontScale } = useSettings();

  const titleSize = baseFontSizes.prayerTitle * fontScale;
  const bodySize = baseFontSizes.prayerBody * fontScale;
  const noteSize = baseFontSizes.note * fontScale;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {step !== undefined && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{step}</Text>
          </View>
        )}
        <View style={styles.titleWrap}>
          <Text style={[styles.title, { fontSize: titleSize }]}>{t(prayer.title)}</Text>
          {prayer.note && (
            <Text style={[styles.note, { fontSize: noteSize }]}>{t(prayer.note)}</Text>
          )}
        </View>
      </View>
      <Text style={[styles.body, { fontSize: bodySize, lineHeight: bodySize * 1.5 }]}>
        {t(prayer.text)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  badgeText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.bold,
    color: colors.primaryDark,
  },
  note: {
    fontFamily: fonts.medium,
    color: colors.accent,
    marginTop: 2,
  },
  body: {
    fontFamily: fonts.regular,
    color: colors.text,
  },
});
