import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrayerCard from '../../components/PrayerCard';
import { PRAYERS } from '../../content/prayers';
import { colors, spacing } from '../../theme';

// Concluding prayers, in the order they are prayed.
const ORDER = [
  PRAYERS.hailHolyQueen,
  PRAYERS.letUsPrayRosary,
  PRAYERS.fatimaPrayer,
  PRAYERS.litanyOfLoreto,
  PRAYERS.letUsPrayLitany,
  PRAYERS.memorare,
  PRAYERS.intentionsOfHolyFather,
];

export default function ConclusionTab() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.intro}>
        <Text style={styles.introTitle}>Concluding the Rosary</Text>
        <Text style={styles.introText}>
          After the five decades, pray these closing prayers and end with the Sign of the Cross.
        </Text>
      </View>
      {ORDER.map((prayer, i) => (
        <PrayerCard key={prayer.id} prayer={prayer} step={i + 1} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  intro: { marginBottom: spacing.md },
  introTitle: { fontSize: 16, fontWeight: '700', color: colors.primaryDark, marginBottom: spacing.xs },
  introText: { fontSize: 14, lineHeight: 21, color: colors.textMuted },
});
