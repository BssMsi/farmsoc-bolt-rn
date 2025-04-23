import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, Trash2, ChevronRight } from 'lucide-react-native';

export default function ConsumerCartScreen() {
  const { session } = useAuth();
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleRemoveItem = (productId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => removeFromCart(productId),
          style: 'destructive',
        },
      ]
    );
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add some products first.');
      return;
    }

    setCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      Alert.alert(
        'Order Placed',
        'Your order has been placed successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              setCheckingOut(false);
            },
          },
        ]
      );
    }, 2000);
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/3962294/pexels-photo-3962294.jpeg' }}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>
        Browse products from farmers and add them to your cart
      </Text>
      <TouchableOpacity style={styles.emptyButton}>
        <Text style={styles.emptyButtonText}>Explore Products</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.product.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image
                  source={{ uri: item.product.image }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.product.name}</Text>
                  <Text style={styles.farmerName}>by {item.product.farmerName}</Text>
                  <Text style={styles.productPrice}>${item.product.price.toFixed(2)} / {item.product.unit}</Text>
                  
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} color={item.quantity <= 1 ? COLORS.textLight : COLORS.textDark} />
                    </TouchableOpacity>
                    
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus size={16} color={COLORS.textDark} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveItem(item.product.id)}
                    >
                      <Trash2 size={16} color={COLORS.error} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <Text style={styles.itemTotal}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>$5.00</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${(total + 5).toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity
              style={[styles.checkoutButton, checkingOut && styles.checkoutButtonDisabled]}
              onPress={handleCheckout}
              disabled={checkingOut}
            >
              <Text style={styles.checkoutButtonText}>
                {checkingOut ? 'Processing...' : 'Checkout'}
              </Text>
              {!checkingOut && <ChevronRight size={20} color="white" />}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundMedium,
  },
  listContainer: {
    padding: SPACING.m,
    paddingBottom: 200, // Space for summary container
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.s,
    marginRight: SPACING.m,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    marginBottom: 2,
  },
  farmerName: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginBottom: 4,
  },
  productPrice: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.s,
    backgroundColor: COLORS.backgroundMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
    marginHorizontal: SPACING.s,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: SPACING.m,
    padding: SPACING.xs,
  },
  itemTotal: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.l,
    borderTopLeftRadius: BORDER_RADIUS.l,
    borderTopRightRadius: BORDER_RADIUS.l,
    ...SHADOWS.large,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s,
  },
  summaryLabel: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
  },
  summaryValue: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
  },
  totalRow: {
    marginTop: SPACING.s,
    paddingTop: SPACING.s,
    borderTopWidth: 1,
    borderTopColor: COLORS.backgroundDark,
  },
  totalLabel: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.l,
    color: COLORS.textDark,
  },
  totalValue: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.l,
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.m,
    marginTop: SPACING.m,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    backgroundColor: COLORS.primaryLight,
  },
  checkoutButtonText: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: 'white',
    marginRight: SPACING.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: SPACING.l,
  },
  emptyTitle: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  emptySubtitle: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
    textAlign: 'center',
    marginBottom: SPACING.l,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.m,
  },
  emptyButtonText: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: 'white',
  },
});