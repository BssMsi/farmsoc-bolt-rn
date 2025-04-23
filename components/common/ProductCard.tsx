import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { ShoppingBag } from 'lucide-react-native';
import { useCart } from '@/hooks/useCart';
import { Product } from '../../contexts/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };
  
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.farmerName}>by {product.farmerName}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)} / {product.unit}</Text>
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <ShoppingBag size={16} color="white" />
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
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
  productImage: {
    width: '100%',
    height: 130,
  },
  infoContainer: {
    padding: SPACING.s,
  },
  productName: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
  },
  farmerName: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMedium,
    marginVertical: 2,
  },
  price: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.primary,
    marginBottom: SPACING.s,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.s,
    borderTopWidth: 1,
    borderTopColor: COLORS.primaryLight,
  },
  addButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: 'white',
    marginLeft: SPACING.xs,
  },
});