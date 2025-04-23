import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { Calendar, Users, CircleAlert as AlertCircle, Plus, DollarSign } from 'lucide-react-native';
import { getMockFarmerEvents } from '@/services/mockDataService';
import FarmerEventCard from '@/components/farmer/FarmerEventCard';

export default function FarmerEventsScreen() {
  const [activeTab, setActiveTab] = useState('events'); // 'events' or 'fundraising'
  const [events, setEvents] = useState(getMockFarmerEvents());
  
  const renderFundraisingForm = () => (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.formTitle}>Start a Fundraiser</Text>
      <Text style={styles.formDescription}>
        Raise funds for expanding your farm or other agricultural needs
      </Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Fundraiser Title</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., Expand Organic Vegetable Farm"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Target Amount (₹)</Text>
        <View style={styles.amountInput}>
          <DollarSign size={20} color={COLORS.textMedium} style={styles.amountIcon} />
          <TextInput
            style={styles.amountTextInput}
            placeholder="Amount"
            keyboardType="numeric"
          />
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe what you're raising funds for..."
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>End Date</Text>
        <TouchableOpacity style={styles.dateButton}>
          <Calendar size={20} color={COLORS.textMedium} />
          <Text style={styles.dateButtonText}>Select End Date</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Fundraiser</Text>
      </TouchableOpacity>
      
      <View style={styles.helpNote}>
        <AlertCircle size={20} color={COLORS.textMedium} />
        <Text style={styles.helpNoteText}>
          Need assistance? Use the voice assistant to create a fundraiser in your language.
        </Text>
      </View>
    </ScrollView>
  );
  
  const renderEvents = () => (
    <View style={styles.eventsContainer}>
      <TouchableOpacity style={styles.createEventButton}>
        <Plus size={20} color="white" />
        <Text style={styles.createEventButtonText}>Create New Event</Text>
      </TouchableOpacity>
      
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FarmerEventCard event={item} />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You haven't created any events yet</Text>
          </View>
        }
      />
    </View>
  );

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
            Organize Events
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'fundraising' && styles.activeTab]}
          onPress={() => setActiveTab('fundraising')}
        >
          <DollarSign
            size={16}
            color={activeTab === 'fundraising' ? COLORS.primary : COLORS.textMedium}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'fundraising' && styles.activeTabText,
            ]}
          >
            Fundraising
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'events' ? renderEvents() : renderFundraisingForm()}
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
  eventsContainer: {
    flex: 1,
  },
  createEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: SPACING.m,
    margin: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
  },
  createEventButtonText: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: 'white',
    marginLeft: SPACING.xs,
  },
  listContainer: {
    padding: SPACING.m,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    padding: SPACING.m,
  },
  formTitle: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  formDescription: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
    marginBottom: SPACING.l,
  },
  inputContainer: {
    marginBottom: SPACING.l,
  },
  inputLabel: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.backgroundLight,
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
  },
  textArea: {
    height: 120,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
    borderRadius: BORDER_RADIUS.m,
    paddingHorizontal: SPACING.m,
  },
  amountIcon: {
    marginRight: SPACING.s,
  },
  amountTextInput: {
    flex: 1,
    padding: SPACING.m,
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
  },
  dateButtonText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
    marginLeft: SPACING.s,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    alignItems: 'center',
    marginTop: SPACING.m,
    marginBottom: SPACING.l,
  },
  createButtonText: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: 'white',
  },
  helpNote: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    marginBottom: SPACING.xl,
  },
  helpNoteText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginLeft: SPACING.s,
    flex: 1,
  },
});