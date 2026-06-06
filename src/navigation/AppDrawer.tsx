import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import RosaryScreen from '../screens/RosaryScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DevotionScreen from '../screens/DevotionScreen';
import ReflectionScreen from '../screens/ReflectionScreen';
import DailyReadingsScreen from '../screens/DailyReadingsScreen';
import RosaryIcon from '../components/RosaryIcon';
import SacredHeartIcon from '../components/SacredHeartIcon';
import PerpetualHelpIcon from '../components/PerpetualHelpIcon';
import MaryPrayingIcon from '../components/MaryPrayingIcon';
import Logo from '../components/Logo';
import { colors, spacing } from '../theme';

const Drawer = createDrawerNavigator();

type IconLib = 'mci' | 'ion' | 'fa5' | 'custom';

/** Renders a drawer icon from the chosen icon family ('custom' = our SVG icons). */
function drawerIcon(lib: IconLib, name: string) {
  return ({ color, size }: { color: string; size: number }) => {
    if (lib === 'custom' && name === 'rosary') return <RosaryIcon size={size} color={color} />;
    if (lib === 'custom' && name === 'sacred-heart')
      return <SacredHeartIcon size={size} color={color} />;
    if (lib === 'custom' && name === 'mother-child')
      return <PerpetualHelpIcon size={size} color={color} />;
    if (lib === 'custom' && name === 'mary-praying')
      return <MaryPrayingIcon size={size} color={color} />;
    if (lib === 'ion') return <Ionicons name={name as any} size={size} color={color} />;
    if (lib === 'fa5') return <FontAwesome5 name={name as any} size={size} color={color} />;
    return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
  };
}

// Drawer entries in the order they appear. `component` + `params` drive what
// each route shows; DevotionScreen reads `contentKey` to pick its content.
interface Entry {
  name: string;
  component: React.ComponentType<any>;
  params?: object;
  icon: [IconLib, string];
}

const ENTRIES: Entry[] = [
  { name: 'Rosary', component: RosaryScreen, icon: ['custom', 'rosary'] },
  { name: "Today's Reflection", component: ReflectionScreen, icon: ['mci', 'book-cross'] },
  { name: 'Daily Readings', component: DailyReadingsScreen, icon: ['mci', 'book-open-variant'] },
  {
    name: 'Chaplet of Divine Mercy',
    component: DevotionScreen,
    params: { contentKey: 'divineMercy' },
    icon: ['custom', 'sacred-heart'],
  },
  { name: 'Prayers', component: DevotionScreen, params: { contentKey: 'prayers' }, icon: ['mci', 'hands-pray'] },
  {
    name: 'Prayer Request',
    component: ComingSoonScreen,
    params: { title: 'Prayer Request' },
    icon: ['mci', 'hand-heart-outline'],
  },
  { name: 'Novenas', component: DevotionScreen, params: { contentKey: 'novenas' }, icon: ['mci', 'candle'] },
  {
    name: 'Prayers & Novenas to Mary',
    component: DevotionScreen,
    params: { contentKey: 'marian' },
    icon: ['custom', 'mary-praying'],
  },
  {
    name: 'Mother of Perpetual Succor',
    component: DevotionScreen,
    params: { contentKey: 'perpetualHelp' },
    icon: ['custom', 'mother-child'],
  },
  {
    name: 'Way of the Cross',
    component: DevotionScreen,
    params: { contentKey: 'wayOfTheCross' },
    icon: ['mci', 'cross'],
  },
  {
    name: 'Divine Peace',
    component: DevotionScreen,
    params: { contentKey: 'divinePeace' },
    icon: ['fa5', 'dove'],
  },
  { name: 'Favorites', component: ComingSoonScreen, params: { title: 'Favorites' }, icon: ['ion', 'heart-outline'] },
  { name: 'Notes', component: ComingSoonScreen, params: { title: 'Notes' }, icon: ['mci', 'notebook-edit-outline'] },
  { name: 'Settings', component: SettingsScreen, icon: ['ion', 'settings-outline'] },
];

/** Drawer with a branded header above the navigation items. */
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={[styles.brand, { paddingTop: insets.top + spacing.md }]}>
        <Logo width={210} />
      </View>
      <View style={styles.items}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Rosary"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '700' },
        drawerActiveBackgroundColor: colors.background,
        drawerActiveTintColor: colors.primaryDark,
        drawerInactiveTintColor: colors.text,
        drawerLabelStyle: { fontSize: 15, fontWeight: '600', marginLeft: -spacing.sm },
        drawerItemStyle: { borderRadius: 8 },
      }}
    >
      {ENTRIES.map((e) => (
        <Drawer.Screen
          key={e.name}
          name={e.name}
          component={e.component}
          initialParams={e.params}
          options={{ drawerIcon: drawerIcon(e.icon[0], e.icon[1]) }}
        />
      ))}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: { paddingTop: 0, paddingStart: 0, paddingEnd: 0 },
  brand: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  items: { paddingHorizontal: spacing.sm },
});
