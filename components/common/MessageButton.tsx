import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import { COLORS, SPACING } from '@/constants/theme';

export default function MessageButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <MessageCircle size={24} color={COLORS.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: SPACING.m,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});