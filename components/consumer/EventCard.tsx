import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { Calendar, MapPin, Users } from 'lucide-react-native';

interface EventType {
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number; // Assuming attendees is a number
  organizer: {
    avatar: string;
    name: string;
  };
  isFree: boolean;
  price?: number; // Price might be optional if isFree is true
}

interface EventCardProps {
  event: EventType;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: event.image }}
        style={styles.eventImage}
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        
        <View style={styles.infoRow}>
          <Calendar size={16} color={COLORS.textMedium} />
          <Text style={styles.infoText}>{event.date}, {event.time}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MapPin size={16} color={COLORS.textMedium} />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Users size={16} color={COLORS.textMedium} />
          <Text style={styles.infoText}>{event.attendees} attending</Text>
        </View>
        
        <View style={styles.footerRow}>
          <View style={styles.organizerContainer}>
            <Image
              source={{ uri: event.organizer.avatar }}
              style={styles.organizerImage}
            />
            <Text style={styles.organizerName}>By {event.organizer.name}</Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.eventButton,
              event.isFree ? styles.freeButton : styles.paidButton
            ]}
          >
            <Text 
              style={[
                styles.eventButtonText,
                event.isFree ? styles.freeButtonText : styles.paidButtonText
              ]}
            >
              {event.isFree ? 'Register' : `₹${event.price}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.m,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: SPACING.xs,
  },
  organizerName: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textDark,
  },
  eventButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
  },
  freeButton: {
    backgroundColor: COLORS.primaryLight,
  },
  paidButton: {
    backgroundColor: COLORS.primary,
  },
  eventButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
  },
  freeButtonText: {
    color: COLORS.primary,
  },
  paidButtonText: {
    color: 'white',
  },
});