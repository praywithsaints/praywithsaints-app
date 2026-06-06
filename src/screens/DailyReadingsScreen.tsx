import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DailyReadings, fetchDailyReadings } from '../api/daily';
import { baseFontSizes, colors, fonts, radius, spacing } from '../theme';
import { useSettings } from '../settings/SettingsContext';

export default function DailyReadingsScreen() {
  const { fontScale } = useSettings();
  const [data, setData] = useState<DailyReadings | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      setData(await fetchDailyReadings());
    } catch (e: any) {
      setError(e?.message ?? 'Could not load the readings.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.centerText}>Loading today’s readings…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.centerText}>Please check your internet connection.</Text>
        <Pressable style={styles.retry} onPress={() => load()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const bodySize = baseFontSizes.prayerBody * fontScale;
  const titleSize = baseFontSizes.prayerTitle * fontScale;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} />}
    >
      {!!data?.date && <Text style={styles.date}>{data.date}</Text>}
      {!!data?.day && <Text style={styles.day}>{data.day}</Text>}

      {data?.readings.map((r, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.label}>{r.label}</Text>
          {!!r.source && <Text style={styles.source}>{r.source}</Text>}
          {!!r.heading && (
            <Text style={[styles.heading, { fontSize: titleSize * 0.8 }]}>{r.heading}</Text>
          )}
          <Text style={[styles.body, { fontSize: bodySize, lineHeight: bodySize * 1.55 }]}>
            {r.text}
          </Text>
        </View>
      ))}
      <Text style={styles.credit}>Readings from Universalis (universalis.com)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  centerText: { color: colors.textMuted, marginTop: spacing.sm, textAlign: 'center' },
  errorText: { color: colors.primaryDark, fontWeight: '700', textAlign: 'center', fontSize: 16 },
  retry: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  retryText: { color: colors.white, fontWeight: '700' },

  date: { fontSize: 13, color: colors.textMuted },
  day: { fontSize: 16, fontWeight: '700', color: colors.primary, marginBottom: spacing.md },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  source: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  heading: { fontFamily: fonts.semibold, color: colors.primaryDark, marginTop: spacing.sm },
  body: { fontFamily: fonts.regular, color: colors.text, marginTop: spacing.sm },
  credit: { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginTop: spacing.sm },
});
