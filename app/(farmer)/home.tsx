import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { Heart, MessageCircle, Share2, ShoppingBag, CircleAlert as AlertCircle } from 'lucide-react-native';
import { getMockFeed } from '@/services/mockDataService';
import FeedPostCard from '@/components/farmer/FarmerFeedPostCard';

// Define types based on getMockFeed data structure
interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
}

interface ProductSummary {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  unit: string;
  farmerId: string;
  farmerName: string;
  category: string;
}

interface FeedPost {
  id: string;
  user: User;
  content: string;
  image: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  product: ProductSummary;
}

export default function FarmerHomeScreen() {
  console.log('FarmerHomeScreen rendering');
  const { session } = useAuth();
  const [feedData, setFeedData] = useState<FeedPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showChatbot, setShowChatbot] = useState(true);

  useEffect(() => {
    console.log('FarmerHomeScreen useEffect running');
    loadFeedData();
  }, []);

  const loadFeedData = async () => {
    console.log('loadFeedData called');
    try {
      // In a real app, this would fetch from your API
      const data = await getMockFeed();
      console.log('Feed data loaded successfully', data.length);
      setFeedData(data);
    } catch (error) {
      console.error('Error loading feed:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeedData();
    setRefreshing(false);
  };

  const dismissChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedPostCard post={item} />
        )}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[COLORS.primary]} 
          />
        }
        ListHeaderComponent={
          showChatbot ? (
            <View style={styles.chatbotContainer}>
              <View style={styles.chatbotHeader}>
                <Text style={styles.chatbotTitle}>AI Assistant</Text>
                <TouchableOpacity onPress={dismissChatbot}>
                  <Text style={styles.dismissText}>Dismiss</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.chatbotMessage}>
                नमस्ते! मैं आपकी मदद कर सकता हूं। अपने उत्पादों को जोड़ने या किसी भी प्रश्न के लिए मुझे टैप करें।
              </Text>
              <Text style={styles.chatbotTranslation}>
                (Hello! I can help you. Tap me to add your products or for any questions.)
              </Text>
              <TouchableOpacity style={styles.chatbotButton}>
                <Text style={styles.chatbotButtonText}>Start Voice Chat</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
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
  chatbotContainer: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.l,
    padding: SPACING.l,
    margin: SPACING.m,
    ...SHADOWS.medium,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  chatbotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  chatbotTitle: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.l,
    color: COLORS.textDark,
  },
  dismissText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
  },
  chatbotMessage: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  chatbotTranslation: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginBottom: SPACING.m,
    fontStyle: 'italic',
  },
  chatbotButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    alignItems: 'center',
  },
  chatbotButtonText: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: 'white',
  },
});