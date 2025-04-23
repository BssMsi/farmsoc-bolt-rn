import React from 'react';
import { Tabs } from 'expo-router';
import { COLORS, FONT_WEIGHT } from '@/constants/theme';
import { Chrome as Home, Search, Calendar, ShoppingCart, User } from 'lucide-react-native';
import MessageButton from '@/components/common/MessageButton';

export default function ConsumerTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMedium,
        tabBarLabelStyle: {
          fontFamily: FONT_WEIGHT.medium,
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarStyle: {
          borderTopColor: COLORS.backgroundDark,
          height: 60,
        },
        headerStyle: {
          backgroundColor: COLORS.backgroundLight,
        },
        headerTitleStyle: {
          fontFamily: FONT_WEIGHT.semiBold,
          fontSize: 18,
        },
        headerTitleAlign: 'center',
        headerRight: () => <MessageButton />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => <ShoppingCart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}