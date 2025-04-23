import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { ThumbsUp, Users, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';
import { getMockCropRequests } from '@/services/mockDataService';

// Define the type for a crop request item
interface CropRequest {
  id: string;
  popularity: number;
  isFulfilled: boolean;
  farmerFulfilling?: string; // Optional as it's added later
  cropName: string;
  quantityNeeded: number;
  unit: string;
  consumerCount: number;
  location: string;
  description: string; // Add description based on consumer request card if needed
}

export default function FarmerRequestsScreen() {
  const { session } = useAuth();
  const [requests, setRequests] = useState<CropRequest[]>(getMockCropRequests());
  
  const handleFulfillRequest = (requestId: string) => {
    Alert.alert(
      'Fulfill Request',
      'Are you sure you want to fulfill this crop request?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Fulfill',
          onPress: () => {
            // Update the request status in a real app
            console.log(`Fulfilling request ${requestId}`);
            
            // Update UI optimistically
            setRequests(currentRequests => 
              currentRequests.map(req => 
                req.id === requestId 
                  ? { ...req, isFulfilled: true, farmerFulfilling: 'You' }
                  : req
              )
            );
          },
        },
      ]
    );
  };

  const renderRequestItem = ({ item }: { item: CropRequest }) => (
    <View style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.popularityContainer}>
          <ThumbsUp size={16} color={COLORS.primary} />
          <Text style={styles.popularityText}>{item.popularity} Consumers interested</Text>
        </View>
        
        <View style={[
          styles.statusBadge,
          item.isFulfilled ? styles.fulfilledBadge : styles.pendingBadge
        ]}>
          {item.isFulfilled ? (
            <CheckCircle size={14} color="white" />
          ) : (
            <Clock size={14} color="white" />
          )}
          <Text style={styles.statusText}>
            {item.isFulfilled ? 'Fulfilled' : 'Pending'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.cropName}>{item.cropName}</Text>
      
      <View style={styles.requestDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Quantity Needed:</Text>
          <Text style={styles.detailValue}>{item.quantityNeeded} {item.unit}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Requested By:</Text>
          <Text style={styles.detailValue}>{item.consumerCount} consumers</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{item.location}</Text>
        </View>
        
        {item.isFulfilled && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Farmer Fulfilling:</Text>
            <Text style={styles.fulfillingText}>{item.farmerFulfilling}</Text>
          </View>
        )}
      </View>
      
      {!item.isFulfilled && (
        <TouchableOpacity 
          style={styles.fulfillButton}
          onPress={() => handleFulfillRequest(item.id)}
        >
          <Text style={styles.fulfillButtonText}>Fulfill This Request</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Crop Requests</Text>
        <Text style={styles.subtitle}>
          These are the most requested crops by consumers in your area
        </Text>
      </View>
      
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequestItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundMedium,
  },
  header: {
    padding: SPACING.l,
    backgroundColor: COLORS.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  title: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
  },
  listContainer: {
    padding: SPACING.m,
  },
  requestCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    marginBottom: SPACING.m,
    ...SHADOWS.medium,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
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
    marginBottom: SPACING.m,
  },
  requestDetails: {
    marginBottom: SPACING.m,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: SPACING.s,
  },
  detailLabel: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
    width: 130,
  },
  detailValue: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    flex: 1,
  },
  fulfillingText: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: COLORS.success,
  },
  fulfillButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    alignItems: 'center',
  },
  fulfillButtonText: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: 'white',
  },
});