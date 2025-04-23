import React from 'react';
import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS, FONT_WEIGHT } from '@/constants/theme';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function FarmerProfileLayout() {
  return (
    <TopTabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMedium,
        tabBarLabelStyle: {
          fontFamily: FONT_WEIGHT.medium,
          fontSize: 14,
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary,
          height: 3,
        },
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.backgroundDark,
        },
      }}
    >
      <TopTabs.Screen
        name="index"
        options={{
          title: 'Profile',
        }}
      />
      <TopTabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
      <TopTabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
        }}
      />
    </TopTabs>
  );
}