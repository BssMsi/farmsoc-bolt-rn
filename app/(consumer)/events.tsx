import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Users, ThumbsUp, Send, Clock } from 'lucide-react-native';
import { getMockEvents, getMockCropRequests } from '@/services/mockDataService';
import EventCard from '@/components/consumer/EventCard';
import CropRequestCard from '@/components/consumer/CropRequestCard';

export default function ConsumerEventsScreen() {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState('events'); // 'events' or 'requests'
  
  const renderEvents = () => {
    const events = getMockEvents();
    
    return (
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  
  const renderCropRequests = () => {
    const cropRequests = getMockCropRequests();
    
    return (
      <View style={styles.requestsContainer}>
        <FlatList
          data={cropRequests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CropRequestCard request={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.createRequestContainer}>
              <Text style={styles.createRequestTitle}>Can't find what you're looking for?</Text>
              <TouchableOpacity style={styles.createRequestButton}>
                <Text style={styles.createRequestButtonText}>Create Crop Request</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Calendar
            size={16}
            color={activeTab === 'events' ? COLORS.primary : COLORS.textMedium}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'events' && styles.activeTabText,
            ]}
          >
            Upcoming Events
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Send
            size={16}
            color={activeTab === 'requests' ? COLORS.primary : COLORS.textMedium}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'requests' && styles.activeTabText,
            ]}
          >
            Crop Requests
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'events' ? renderEvents() : renderCropRequests()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundMedium,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    paddingVertical: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.m,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginLeft: SPACING.xs,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  listContainer: {
    padding: SPACING.m,
  },
  requestsContainer: {
    flex: 1,
  },
  createRequestContainer: {
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  createRequestTitle: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  createRequestButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    alignItems: 'center',
  },
  createRequestButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: 'white',
  },
});