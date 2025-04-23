import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { ThumbsUp, Clock, MapPin, Users, CircleCheck as CheckCircle } from 'lucide-react-native';

interface CropRequest {
  popularity: number;
  isFulfilled: boolean;
  cropName: string;
  description: string;
  quantityNeeded: number;
  unit: string;
  location: string;
  consumerCount: number;
  farmerFulfilling?: string; // Optional: Only present if isFulfilled is true
}

interface CropRequestCardProps {
  request: CropRequest;
}

export default function CropRequestCard({ request }: CropRequestCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.popularityContainer}>
          <ThumbsUp size={16} color={COLORS.primary} />
          <Text style={styles.popularityText}>{request.popularity} interested</Text>
        </View>
        
        <View style={[
          styles.statusBadge,
          request.isFulfilled ? styles.fulfilledBadge : styles.pendingBadge
        ]}>
          {request.isFulfilled ? (
            <CheckCircle size={14} color="white" />
          ) : (
            <Clock size={14} color="white" />
          )}
          <Text style={styles.statusText}>
            {request.isFulfilled ? 'Fulfilled' : 'Pending'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.cropName}>{request.cropName}</Text>
      <Text style={styles.description}>{request.description}</Text>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Quantity:</Text>
          <Text style={styles.detailValue}>{request.quantityNeeded} {request.unit}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MapPin size={16} color={COLORS.textMedium} />
          <Text style={styles.locationText}>{request.location}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Users size={16} color={COLORS.textMedium} />
          <Text style={styles.consumersText}>{request.consumerCount} consumers requested</Text>
        </View>
      </View>
      
      {request.isFulfilled ? (
        <View style={styles.fulfilledContainer}>
          <Text style={styles.fulfilledText}>
            Being fulfilled by <Text style={styles.farmerName}>{request.farmerFulfilling}</Text>
          </Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.interestButton}>
          <Text style={styles.interestButtonText}>Show Interest</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  popularityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularityText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    borderRadius: BORDER_RADIUS.m,
  },
  pendingBadge: {
    backgroundColor: COLORS.warning,
  },
  fulfilledBadge: {
    backgroundColor: COLORS.success,
  },
  statusText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: 'white',
    marginLeft: 4,
  },
  cropName: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.l,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  description: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
    marginBottom: SPACING.m,
  },
  detailsContainer: {
    marginBottom: SPACING.m,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  detailLabel: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    marginRight: SPACING.xs,
  },
  detailValue: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
  },
  locationText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginLeft: SPACING.xs,
  },
  consumersText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginLeft: SPACING.xs,
  },
  interestButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    borderRadius: BORDER_RADIUS.m,
    alignItems: 'center',
  },
  interestButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: 'white',
  },
  fulfilledContainer: {
    paddingVertical: SPACING.s,
    alignItems: 'center',
  },
  fulfilledText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
  },
  farmerName: {
    fontFamily: FONT_WEIGHT.semiBold,
    color: COLORS.success,
  },
});