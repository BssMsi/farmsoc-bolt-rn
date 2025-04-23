import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { Calendar, Users, CreditCard as Edit, Trash2 } from 'lucide-react-native';

interface FarmerEventProps {
  image: string;
  isPublished: boolean;
  title: string;
  date: string;
  time: string;
  attendees: number;
  location: string;
  isFree: boolean;
  price?: number; // Optional as it's conditional
}

export default function FarmerEventCard({ event }: { event: FarmerEventProps }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: event.image }}
        style={styles.eventImage}
      />
      
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>
          {event.isPublished ? 'Published' : 'Draft'}
        </Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        
        <View style={styles.infoRow}>
          <Calendar size={16} color={COLORS.textMedium} />
          <Text style={styles.infoText}>{event.date}, {event.time}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Users size={16} color={COLORS.textMedium} />
          <Text style={styles.infoText}>
            {event.attendees} {event.attendees === 1 ? 'person' : 'people'} registered
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{event.location}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fee:</Text>
          <Text style={styles.detailValue}>
            {event.isFree ? 'Free' : `₹${event.price}`}
          </Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit size={16} color={COLORS.textDark} />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
            <Trash2 size={16} color={COLORS.error} />
            <Text style={[styles.actionText, styles.dangerText]}>Delete</Text>
          </TouchableOpacity>
          
          {!event.isPublished && (
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
              <Text style={[styles.actionText, styles.primaryText]}>Publish</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.m,
    overflow: 'hidden',
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  eventImage: {
    width: '100%',
    height: 140,
  },
  statusBadge: {
    position: 'absolute',
    top: SPACING.s,
    right: SPACING.s,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    borderRadius: BORDER_RADIUS.m,
  },
  statusText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: 'white',
  },
  infoContainer: {
    padding: SPACING.m,
  },
  eventTitle: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.l,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  infoText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginLeft: SPACING.xs,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xs,
  },
  detailLabel: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textDark,
    width: 70,
  },
  detailValue: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: SPACING.m,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    marginRight: SPACING.s,
    borderRadius: BORDER_RADIUS.s,
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
  },
  actionText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textDark,
    marginLeft: SPACING.xs,
  },
  dangerButton: {
    borderColor: COLORS.error,
  },
  dangerText: {
    color: COLORS.error,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  primaryText: {
    color: 'white',
  },
});