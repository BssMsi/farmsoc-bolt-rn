import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { Heart, MessageCircle, Share2, ShoppingBag } from 'lucide-react-native';
import { getMockFeed } from '@/services/mockDataService';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/contexts/CartContext';
import FeedPostCard from '@/components/consumer/FeedPostCard';

interface FeedPost {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    location: string;
  };
  content: string;
  image: string;
  timestamp: string; // Consider using Date if applicable
  likes: number;
  comments: number;
  shares: number;
  product: Product;
}

export default function ConsumerHomeScreen() {
  const { session } = useAuth();
  const { addToCart } = useCart();
  const [feedData, setFeedData] = useState<FeedPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFeedData();
  }, []);

  const loadFeedData = async () => {
    try {
      // In a real app, this would fetch from your API
      const data = await getMockFeed();
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

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedPostCard 
            post={item} 
            onAddToCart={() => handleAddToCart(item.product)}
          />
        )}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[COLORS.primary]} 
          />
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
});