import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { User, MapPin, Users, Settings, LogOut, CreditCard as Edit, Plus } from 'lucide-react-native';

export default function ConsumerProfileScreen() {
  const { session, signOut } = useAuth();
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState(true);
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Edit size={16} color="white" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.userName}>Sara Johnson</Text>
        <View style={styles.locationContainer}>
          <MapPin size={16} color={COLORS.textMedium} />
          <Text style={styles.locationText}>San Francisco, CA</Text>
        </View>
        
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Family Members</Text>
        <Text style={styles.sectionDescription}>
          Add your family members to get personalized recommendations
        </Text>
        
        <View style={styles.familyMembersContainer}>
          <View style={styles.familyMember}>
            <View style={styles.familyMemberImageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
                style={styles.familyMemberImage}
              />
            </View>
            <Text style={styles.familyMemberName}>John (Spouse)</Text>
          </View>
          
          <View style={styles.familyMember}>
            <View style={styles.familyMemberImageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }}
                style={styles.familyMemberImage}
              />
            </View>
            <Text style={styles.familyMemberName}>Emma (Child)</Text>
          </View>
          
          <TouchableOpacity style={styles.addFamilyMember}>
            <View style={styles.addFamilyMemberIcon}>
              <Plus size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.addFamilyMemberText}>Add Member</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.preferenceItem}>
          <View>
            <Text style={styles.preferenceTitle}>Personalized Recommendations</Text>
            <Text style={styles.preferenceDescription}>
              Get recommendations based on your family's dietary needs
            </Text>
          </View>
          <Switch
            value={personalizedRecommendations}
            onValueChange={setPersonalizedRecommendations}
            trackColor={{ false: COLORS.backgroundDark, true: COLORS.primaryLight }}
            thumbColor={personalizedRecommendations ? COLORS.primary : COLORS.backgroundLight}
          />
        </View>
        
        <View style={styles.preferenceItem}>
          <View>
            <Text style={styles.preferenceTitle}>Dietary Preferences</Text>
            <Text style={styles.preferenceDescription}>
              Set dietary restrictions and preferences
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.preferenceItem}>
          <View>
            <Text style={styles.preferenceTitle}>Notification Settings</Text>
            <Text style={styles.preferenceDescription}>
              Control how and when you receive notifications
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
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
  },
  profileHeader: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    alignItems: 'center',
    ...SHADOWS.small,
    marginBottom: SPACING.l,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: SPACING.m,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.backgroundLight,
  },
  userName: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  locationText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginLeft: SPACING.xs,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
  },
  editProfileText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.primary,
  },
  sectionContainer: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    ...SHADOWS.small,
    marginBottom: SPACING.l,
  },
  sectionTitle: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.l,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  sectionDescription: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginBottom: SPACING.m,
  },
  familyMembersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  familyMember: {
    width: '30%',
    alignItems: 'center',
    marginRight: '5%',
    marginBottom: SPACING.m,
  },
  familyMemberImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  familyMemberImage: {
    width: '100%',
    height: '100%',
  },
  familyMemberName: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textDark,
    textAlign: 'center',
  },
  addFamilyMember: {
    width: '30%',
    alignItems: 'center',
  },
  addFamilyMemberIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  addFamilyMemberText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.primary,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  preferenceTitle: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  preferenceDescription: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    maxWidth: '80%',
  },
  editButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    borderRadius: BORDER_RADIUS.s,
    backgroundColor: COLORS.backgroundMedium,
  },
  editButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textDark,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.m,
    marginTop: SPACING.m,
    marginBottom: SPACING.xl,
  },
  signOutText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.error,
    marginLeft: SPACING.xs,
  },
});