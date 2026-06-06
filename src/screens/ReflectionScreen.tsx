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
import { fetchReflection, Reflection } from '../api/daily';
import { baseFontSizes, colors, fonts, radius, spacing } from '../theme';
import { useSettings } from '../settings/SettingsContext';

export default function ReflectionScreen() {
  const { fontScale } = useSettings();
  const [data, setData] = useState<Reflection | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      setData(await fetchReflection());
    } catch (e: any) {
      setError(e?.message ?? 'Could not load the reflection.');
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
        <Text style={styles.centerText}>Loading today’s reflection…</Text>
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
      {!!data?.dateDisplayed && <Text style={styles.date}>{data.dateDisplayed}</Text>}
      {!!data?.liturgicTitle && <Text style={styles.liturgic}>{data.liturgicTitle}</Text>}

      <View style={styles.card}>
        <Text style={[styles.title, { fontSize: titleSize }]}>{data?.title}</Text>
        <Text style={[styles.body, { fontSize: bodySize, lineHeight: bodySize * 1.55 }]}>
          {data?.text}
        </Text>
        {!!data?.author && <Text style={styles.author}>— {data.author}</Text>}
        {!!data?.source && <Text style={styles.source}>{data.source}</Text>}
      </View>
      <Text style={styles.credit}>Reflection courtesy of Evangelizo.org</Text>
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
  liturgic: { fontSize: 15, fontWeight: '700', color: colors.primary, marginBottom: spacing.md },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { fontFamily: fonts.bold, color: colors.primaryDark, marginBottom: spacing.sm },
  body: { fontFamily: fonts.regular, color: colors.text },
  author: { fontFamily: fonts.medium, color: colors.textMuted, marginTop: spacing.sm, textAlign: 'right' },
  source: { fontFamily: fonts.regular, fontStyle: 'italic', fontSize: 12, color: colors.textMuted, textAlign: 'right', marginTop: 2 },
  credit: { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginTop: spacing.md },
});
