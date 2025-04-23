import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { COLORS, FONT_WEIGHT } from '@/constants/theme';
import { Chrome as Home, Plus, Calendar, FileText, User } from 'lucide-react-native';
import MessageButton from '@/components/common/MessageButton';
import ActionButton from '@/components/common/ActionButton';

export default function FarmerTabLayout() {
  useEffect(() => {
    console.log('FarmerTabLayout mounted');
    return () => {
      console.log('FarmerTabLayout unmounted');
    };
  }, []);

  console.log('FarmerTabLayout rendering');
  
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
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />,
          tabBarButton: (props) => <ActionButton {...props} />,
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
        name="requests"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />,
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