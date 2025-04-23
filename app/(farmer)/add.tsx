import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { ShoppingBag, Image as ImageIcon, Users, Mic, FileEdit, FilePlus } from 'lucide-react-native';

export default function FarmerAddScreen() {
  const router = useRouter();
  
  const addOptions = [
    {
      id: 'product',
      title: 'Add Product',
      description: 'List new farm products for sale',
      icon: <ShoppingBag size={32} color="white" />,
      route: '/(farmer)/add-product',
    },
    {
      id: 'post',
      title: 'Create Post',
      description: 'Share updates about your farm',
      icon: <FileEdit size={32} color="white" />,
      route: '/(farmer)/add-post',
    },
    {
      id: 'requirement',
      title: 'List Requirement',
      description: 'Share what supplies you need',
      icon: <FilePlus size={32} color="white" />,
      route: '/(farmer)/add-requirement',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>What would you like to add?</Text>
        <TouchableOpacity style={styles.voiceAssistButton}>
          <Mic size={20} color="white" />
          <Text style={styles.voiceAssistText}>Voice Assist</Text>
        </TouchableOpacity>
      </View>
      
      {addOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionCard}
          onPress={() => {
            router.push(option.route as any);
          }}
        >
          <View style={styles.optionIcon}>{option.icon}</View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{option.title}</Text>
            <Text style={styles.optionDescription}>{option.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
      
      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>Need Help?</Text>
        <Text style={styles.helpText}>
          Tap the Voice Assist button to speak with our AI assistant in your language.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundMedium,
  },
  contentContainer: {
    padding: SPACING.l,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  title: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textDark,
    flex: 1,
  },
  voiceAssistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
  },
  voiceAssistText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: 'white',
    marginLeft: SPACING.xs,
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    marginBottom: SPACING.m,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  optionIcon: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.m,
    ...SHADOWS.small,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.l,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  optionDescription: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
  },
  helpSection: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    marginTop: SPACING.m,
    ...SHADOWS.small,
  },
  helpTitle: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.l,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  helpText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
    lineHeight: 22,
  },
});