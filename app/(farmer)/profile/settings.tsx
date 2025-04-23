import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { ChevronRight, Bell, ShieldCheck, Users, CreditCard, Lock, LogOut, Mic } from 'lucide-react-native';

// Define specific types for each setting item
type BaseSettingItem = {
  icon: React.ReactElement;
  title: string;
  subtitle: string;
};

type NavigateSettingItem = BaseSettingItem & {
  action: 'navigate';
  value?: string; // Optional value for things like language display
};

type SwitchSettingItem = BaseSettingItem & {
  action: 'switch';
  value: boolean;
  onToggle: Dispatch<SetStateAction<boolean>>;
};

type InputSettingItem = BaseSettingItem & {
  action: 'input';
  inputValue: string;
  onInputChange: Dispatch<SetStateAction<string>>;
  placeholder: string;
};

// Union type for all possible setting items
type SettingItem = NavigateSettingItem | SwitchSettingItem | InputSettingItem;

// Define the structure for a section
type SettingsSection = {
  title: string;
  items: SettingItem[];
};

export default function FarmerSettingsScreen() {
  const { signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [bankAccount, setBankAccount] = useState('');
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const settingsSections: SettingsSection[] = [
    {
      title: 'Personal Information',
      items: [
        {
          icon: <Users size={20} color={COLORS.textMedium} />,
          title: 'Edit Profile',
          subtitle: 'Update your name, bio, and other details',
          action: 'navigate',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: <Bell size={20} color={COLORS.textMedium} />,
          title: 'Push Notifications',
          subtitle: 'Receive alerts about orders and messages',
          action: 'switch',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
      ],
    },
    {
      title: 'Payment Information',
      items: [
        {
          icon: <CreditCard size={20} color={COLORS.textMedium} />,
          title: 'Bank Account Details',
          subtitle: 'Add or update your bank account for payments',
          action: 'input',
          inputValue: bankAccount,
          onInputChange: setBankAccount,
          placeholder: 'Enter UPI ID or Bank Account',
        },
      ],
    },
    {
      title: 'Account Security',
      items: [
        {
          icon: <Lock size={20} color={COLORS.textMedium} />,
          title: 'Change Password',
          subtitle: 'Update your account password',
          action: 'navigate',
        },
        {
          icon: <ShieldCheck size={20} color={COLORS.textMedium} />,
          title: 'Privacy Settings',
          subtitle: 'Control who can see your information',
          action: 'navigate',
        },
      ],
    },
    {
      title: 'Language & Accessibility',
      items: [
        {
          icon: <Mic size={20} color={COLORS.textMedium} />,
          title: 'Voice Assistant Language',
          subtitle: 'Change the language of the voice assistant',
          action: 'navigate',
          value: 'Hindi',
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {settingsSections.map((section, sectionIndex) => (
        <View key={`section-${sectionIndex}`} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          
          {section.items.map((item, itemIndex) => (
            <View 
              key={`item-${sectionIndex}-${itemIndex}`} 
              style={[
                styles.settingItem,
                itemIndex === section.items.length - 1 && styles.lastSettingItem,
              ]}
            >
              <View style={styles.settingInfo}>
                {item.icon}
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              
              {item.action === 'navigate' && (
                <View style={styles.settingAction}>
                  {item.value && (
                    <Text style={styles.settingValue}>{item.value}</Text>
                  )}
                  <ChevronRight size={20} color={COLORS.textMedium} />
                </View>
              )}
              
              {item.action === 'switch' && (
                <Switch
                  value={item.value}
                  onValueChange={item.onToggle}
                  trackColor={{ false: COLORS.backgroundDark, true: COLORS.primaryLight }}
                  thumbColor={item.value ? COLORS.primary : COLORS.backgroundLight}
                />
              )}
              
              {item.action === 'input' && (
                <TextInput
                  style={styles.settingInput}
                  placeholder={item.placeholder}
                  value={item.inputValue}
                  onChangeText={item.onInputChange}
                />
              )}
            </View>
          ))}
        </View>
      ))}
      
      <TouchableOpacity 
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <LogOut size={20} color={COLORS.error} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundMedium,
  },
  contentContainer: {
    padding: SPACING.m,
    paddingBottom: SPACING.xxl,
  },
  section: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: SPACING.m,
    flex: 1,
  },
  settingTitle: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
  },
  settingSubtitle: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
  },
  settingAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginRight: SPACING.s,
  },
  settingInput: {
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
    borderRadius: BORDER_RADIUS.s,
    padding: SPACING.s,
    fontSize: FONT_SIZE.s,
    minWidth: 150,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    marginTop: SPACING.m,
    ...SHADOWS.small,
  },
  signOutText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.error,
    marginLeft: SPACING.s,
  },
});