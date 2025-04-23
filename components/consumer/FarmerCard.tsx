import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { MapPin, ShoppingBag, Star, Users } from 'lucide-react-native';

interface Farmer {
  avatar: string;
  name: string;
  location: string;
  rating: number | string; // Assuming rating might be a string like "4.5" or a number
  followers: number | string; // Assuming followers might be formatted string like "1.2k" or a number
  products: number | string; // Assuming product count might be a string or number
}

export default function FarmerCard({ farmer }: { farmer: Farmer }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image 
        source={{ uri: farmer.avatar }}
        style={styles.farmerImage}
      />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.farmerName}>{farmer.name}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={12} color={COLORS.textMedium} />
          <Text style={styles.locationText}>{farmer.location}</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Star size={12} color={COLORS.warning} />
            <Text style={styles.statText}>{farmer.rating}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Users size={12} color={COLORS.textMedium} />
            <Text style={styles.statText}>{farmer.followers}</Text>
          </View>
          
          <View style={styles.statItem}>
            <ShoppingBag size={12} color={COLORS.textMedium} />
            <Text style={styles.statText}>{farmer.products}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.m,
    width: '48%',
    marginBottom: SPACING.m,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  farmerImage: {
    width: '100%',
    height: 120,
  },
  detailsContainer: {
    padding: SPACING.s,
  },
  farmerName: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    marginBottom: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  locationText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMedium,
    marginLeft: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMedium,
    marginLeft: 2,
  },
});