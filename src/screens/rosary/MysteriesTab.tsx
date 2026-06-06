import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  MYSTERY_SETS,
  MYSTERY_SET_ORDER,
  defaultMysterySetForDay,
} from '../../content/mysteries';
import { MysterySetId, t } from '../../content/types';
import { colors, fonts, radius, spacing } from '../../theme';
import { useSettings } from '../../settings/SettingsContext';

export default function MysteriesTab() {
  const { fontScale } = useSettings();
  // Default to the set traditionally prayed today; user can override.
  const todaysSet = useMemo<MysterySetId>(() => defaultMysterySetForDay(new Date().getDay()), []);
  const [selected, setSelected] = useState<MysterySetId>(todaysSet);

  const set = MYSTERY_SETS[selected];
  const titleSize = 20 * fontScale;
  const meditationSize = 17 * fontScale;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Set selector chips */}
      <View style={styles.chips}>
        {MYSTERY_SET_ORDER.map((id) => {
          const active = id === selected;
          const isToday = id === todaysSet;
          return (
            <Pressable
              key={id}
              onPress={() => setSelected(id)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {t(MYSTERY_SETS[id].name).replace(' Mysteries', '')}
              </Text>
              {isToday && (
                <View style={[styles.todayDot, active && styles.todayDotActive]} />
              )}
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.todayHint}>
        Today’s mysteries: {t(MYSTERY_SETS[todaysSet].name)}
      </Text>

      {/* Selected set header */}
      <View style={styles.setHeader}>
        <Text style={styles.setName}>{t(set.name)}</Text>
        <Text style={styles.setDays}>Traditionally prayed on {t(set.traditionalDays)}</Text>
      </View>

      {/* The five decades */}
      {set.mysteries.map((m) => (
        <View key={m.index} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{m.index}</Text>
            </View>
            <Text style={[styles.mysteryTitle, { fontSize: titleSize }]}>{t(m.title)}</Text>
          </View>
          <Text style={[styles.meditation, { fontSize: meditationSize, lineHeight: meditationSize * 1.45 }]}>
            {t(m.meditation)}
          </Text>
          <View style={styles.sequence}>
            <Text style={styles.sequenceLabel}>Pray for each decade:</Text>
            <Text style={styles.sequenceText}>
              1 Our Father  ·  10 Hail Marys  ·  1 Glory Be  ·  Fatima Prayer
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 14, fontWeight: '600', color: colors.text },
  chipTextActive: { color: colors.white },
  todayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginLeft: spacing.xs,
  },
  todayDotActive: { backgroundColor: colors.white },
  todayHint: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: 'italic',
  },

  setHeader: { marginBottom: spacing.md },
  setName: { fontSize: 24, fontFamily: fonts.bold, color: colors.primaryDark },
  setDays: { fontSize: 13, color: colors.textMuted, marginTop: 2 },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  badgeText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  mysteryTitle: { flex: 1, fontFamily: fonts.bold, color: colors.primaryDark },
  meditation: { fontFamily: fonts.regular, color: colors.text },
  sequence: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sequenceLabel: { fontSize: 12, fontWeight: '700', color: colors.textMuted, marginBottom: 2 },
  sequenceText: { fontSize: 13, color: colors.text },
});
