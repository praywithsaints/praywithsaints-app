import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StartTab from './rosary/StartTab';
import MysteriesTab from './rosary/MysteriesTab';
import ConclusionTab from './rosary/ConclusionTab';
import { colors } from '../theme';

const Tab = createMaterialTopTabNavigator();

/** The Rosary section: three top tabs — Start, Mysteries, Conclusion. */
export default function RosaryScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontWeight: '700', fontSize: 13, textTransform: 'none' },
        tabBarStyle: { backgroundColor: colors.white },
        tabBarIndicatorStyle: { backgroundColor: colors.primary, height: 3 },
      }}
    >
      <Tab.Screen name="Start" component={StartTab} />
      <Tab.Screen name="Mysteries" component={MysteriesTab} />
      <Tab.Screen name="Conclusion" component={ConclusionTab} />
    </Tab.Navigator>
  );
}
