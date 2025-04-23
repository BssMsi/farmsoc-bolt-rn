import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '@/constants/theme';
import { ChevronLeft, ShoppingBag, Tractor, Users } from 'lucide-react-native';

export default function SelectRoleScreen() {
  const router = useRouter();
  const { setRole } = useAuth();

  const handleBack = () => {
    router.back();
  };

  const handleRoleSelect = async (role: 'consumer' | 'farmer' | 'influencer') => {
    await setRole(role);
    
    // Redirect based on selected role
    switch (role) {
      case 'consumer':
        router.replace({ pathname: '/(consumer)/home' });
        break;
      case 'farmer':
        router.replace({ pathname: '/(farmer)/home' });
        break;
      // case 'influencer':
      //   router.replace({ pathname: '/(influencer)/home' });
      //   break;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <ChevronLeft color={COLORS.textDark} size={24} />
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.title}>Select Your Role</Text>
        <Text style={styles.subtitle}>Choose how you'll use FarmSoc</Text>
      </View>
      
      <View style={styles.rolesContainer}>
        <TouchableOpacity 
          style={styles.roleCard}
          onPress={() => handleRoleSelect('consumer')}
        >
          <View style={[styles.iconContainer, { backgroundColor: COLORS.accentLight }]}>
            <ShoppingBag color="white" size={32} />
          </View>
          <Text style={styles.roleTitle}>Consumer</Text>
          <Text style={styles.roleDescription}>
            Buy fresh farm products directly from farmers. Get personalized recommendations.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.roleCard}
          onPress={() => handleRoleSelect('farmer')}
        >
          <View style={[styles.iconContainer, { backgroundColor: COLORS.primaryLight }]}>
            <Tractor color="white" size={32} />
          </View>
          <Text style={styles.roleTitle}>Farmer</Text>
          <Text style={styles.roleDescription}>
            Sell your products directly to consumers. No middlemen. Better profits.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.roleCard}
          onPress={() => handleRoleSelect('influencer')}
        >
          <View style={[styles.iconContainer, { backgroundColor: COLORS.secondaryLight }]}>
            <Users color="white" size={32} />
          </View>
          <Text style={styles.roleTitle}>Influencer</Text>
          <Text style={styles.roleDescription}>
            Promote local farmers and their products. Earn commission for conversions.
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          You can change your role later in settings
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  content: {
    padding: SPACING.l,
  },
  backButton: {
    marginTop: SPACING.l,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  title: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xxxl,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
  },
  rolesContainer: {
    marginVertical: SPACING.l,
  },
  roleCard: {
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    marginBottom: SPACING.l,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  roleTitle: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  roleDescription: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
    lineHeight: 22,
  },
  footer: {
    marginTop: SPACING.l,
    marginBottom: SPACING.xxl,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
  },
});