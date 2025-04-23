import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { Heart, MessageCircle, Share2, BarChart2, DollarSign } from 'lucide-react-native';

interface User {
  avatar: string;
  name: string;
  location: string;
}

interface Product {
  image: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

interface Post {
  user: User;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  content: string;
  product: Product;
}

interface FarmerFeedPostCardProps {
  post: Post;
}

export default function FarmerFeedPostCard({ post }: FarmerFeedPostCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image 
          source={{ uri: post.user.avatar }} 
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.location}>{post.user.location}</Text>
        </View>
        
        <TouchableOpacity style={styles.promoteButton}>
          <DollarSign size={14} color={COLORS.primary} />
          <Text style={styles.promoteButtonText}>Promote</Text>
        </TouchableOpacity>
      </View>
      
      <Image 
        source={{ uri: post.image }} 
        style={styles.postImage}
      />
      
      <View style={styles.actionsBar}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={20} color={COLORS.textDark} />
            <Text style={styles.actionCount}>{post.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={20} color={COLORS.textDark} />
            <Text style={styles.actionCount}>{post.comments}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={20} color={COLORS.textDark} />
            <Text style={styles.actionCount}>{post.shares}</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.insightsButton}>
          <BarChart2 size={18} color={COLORS.textDark} />
          <Text style={styles.insightsButtonText}>Insights</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{post.content}</Text>
        
        <View style={styles.productTag}>
          <Image
            source={{ uri: post.product.image }}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{post.product.name}</Text>
            <Text style={styles.productPrice}>${post.product.price.toFixed(2)} / {post.product.unit}</Text>
            <Text style={styles.inventory}>Stock: {post.product.quantity} {post.product.unit} left</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundLight,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.m,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.m,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
  },
  location: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
  },
  promoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundMedium,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    borderRadius: BORDER_RADIUS.s,
  },
  promoteButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    marginLeft: 2,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.l,
  },
  actionCount: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textDark,
    marginLeft: SPACING.xs,
  },
  insightsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightsButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textDark,
    marginLeft: SPACING.xs,
  },
  contentContainer: {
    padding: SPACING.m,
  },
  content: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    marginBottom: SPACING.m,
    lineHeight: 22,
  },
  productTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundMedium,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.s,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.s,
    marginRight: SPACING.m,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
  },
  productPrice: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.primary,
  },
  inventory: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMedium,
    marginTop: 2,
  },
});