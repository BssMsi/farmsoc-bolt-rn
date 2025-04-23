import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, CreditCard as Edit, ExternalLink } from 'lucide-react-native';

export default function FarmerProfileScreen() {
  const { session } = useAuth();
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.coverContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg' }}
          style={styles.coverImage}
        />
        <View style={styles.editCoverButton}>
          <Edit size={16} color="white" />
        </View>
      </View>
      
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1082962/pexels-photo-1082962.jpeg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Edit size={16} color="white" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.farmerName}>Rajesh Kumar</Text>
        <Text style={styles.farmName}>Green Harvest Farms</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={16} color={COLORS.textMedium} />
          <Text style={styles.locationText}>Nashik, Maharashtra</Text>
        </View>
        
        <Text style={styles.bio}>
          Growing organic vegetables and fruits using sustainable farming practices. 
          Family-owned farm since 1980. Specializing in tomatoes, cucumbers, and leafy greens.
        </Text>
        
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.contactItem}>
          <Phone size={20} color={COLORS.textMedium} />
          <Text style={styles.contactText}>+91 98765 43210</Text>
        </View>
        
        <View style={styles.contactItem}>
          <Mail size={20} color={COLORS.textMedium} />
          <Text style={styles.contactText}>rajesh@greenharvest.com</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Media</Text>
        
        <View style={styles.socialMediaContainer}>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#E4405F' }]}>
            <Instagram size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1877F2' }]}>
            <Facebook size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}>
            <Twitter size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farm Certification</Text>
        
        <View style={styles.certificationItem}>
          <View style={styles.certificationBadge}>
            <Text style={styles.certificationBadgeText}>Organic</Text>
          </View>
          <Text style={styles.certificationText}>
            Certified Organic Farm - USDA Organic
          </Text>
        </View>
        
        <View style={styles.certificationItem}>
          <View style={styles.certificationBadge}>
            <Text style={styles.certificationBadgeText}>Sustainable</Text>
          </View>
          <Text style={styles.certificationText}>
            Sustainable Farming Practices - CII Certification
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.viewPublicProfileButton}>
        <Text style={styles.viewPublicProfileText}>View Public Profile</Text>
        <ExternalLink size={18} color={COLORS.primary} />
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
    paddingBottom: SPACING.xl,
  },
  coverContainer: {
    height: 180,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  editCoverButton: {
    position: 'absolute',
    top: SPACING.m,
    right: SPACING.m,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SPACING.l,
    paddingBottom: SPACING.l,
    marginBottom: SPACING.m,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: -60,
    position: 'relative',
    borderWidth: 4,
    borderColor: COLORS.backgroundLight,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.backgroundLight,
  },
  farmerName: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textDark,
    marginTop: SPACING.m,
  },
  farmName: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.l,
    color: COLORS.primary,
    marginBottom: SPACING.s,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  locationText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
    marginLeft: SPACING.xs,
  },
  bio: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.m,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.l,
  },
  editProfileText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.primary,
  },
  section: {
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.l,
    marginHorizontal: SPACING.m,
    marginBottom: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.l,
    color: COLORS.textDark,
    marginBottom: SPACING.m,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  contactText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    marginLeft: SPACING.m,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  certificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  certificationBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    borderRadius: BORDER_RADIUS.s,
    marginRight: SPACING.m,
  },
  certificationBadgeText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
  },
  certificationText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    flex: 1,
  },
  viewPublicProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.m,
    marginHorizontal: SPACING.m,
  },
  viewPublicProfileText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.primary,
    marginRight: SPACING.xs,
  },
});