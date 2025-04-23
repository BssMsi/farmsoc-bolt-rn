import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { TrendingUp, ShoppingBag, Clock, Users, Package, TrendingDown, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';

export default function FarmerDashboardScreen() {
  // Mock data for a real app, you would fetch this from your API
  const stats = {
    orders: {
      total: 42,
      pending: 8,
      delivered: 34,
      growth: 12.5,
    },
    revenue: {
      current: 25680,
      previous: 22450,
      growth: 14.3,
    },
    followers: 156,
    products: 24,
    popularProducts: [
      { name: 'Organic Tomatoes', sales: 65, inventory: 85 },
      { name: 'Fresh Spinach', sales: 42, inventory: 36 },
      { name: 'Carrots', sales: 38, inventory: 54 },
    ],
    pendingDeliveries: [
      { id: 'ORD-001', customer: 'John Smith', amount: 450, items: 3, date: '2023-09-15' },
      { id: 'ORD-002', customer: 'Emma Watson', amount: 720, items: 5, date: '2023-09-16' },
      { id: 'ORD-003', customer: 'Mike Johnson', amount: 380, items: 2, date: '2023-09-16' },
    ],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <ShoppingBag size={24} color={COLORS.primary} />
          </View>
          <View>
            <Text style={styles.statValue}>{stats.orders.total}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statGrowth}>
            <TrendingUp size={16} color={COLORS.success} />
            <Text style={[styles.statGrowthText, { color: COLORS.success }]}>
              {stats.orders.growth}%
            </Text>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Clock size={24} color={COLORS.warning} />
          </View>
          <View>
            <Text style={styles.statValue}>{stats.orders.pending}</Text>
            <Text style={styles.statLabel}>Pending Orders</Text>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Users size={24} color={COLORS.accent} />
          </View>
          <View>
            <Text style={styles.statValue}>{stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Package size={24} color={COLORS.secondary} />
          </View>
          <View>
            <Text style={styles.statValue}>{stats.products}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Revenue Overview</Text>
          <TouchableOpacity>
            <MoreHorizontal size={20} color={COLORS.textMedium} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.revenueCard}>
          <View style={styles.revenueDetails}>
            <Text style={styles.revenueTitle}>This Month</Text>
            <Text style={styles.revenueAmount}>₹{stats.revenue.current.toLocaleString()}</Text>
            
            <View style={styles.revenueGrowth}>
              <TrendingUp size={16} color="white" />
              <Text style={styles.revenueGrowthText}>
                {stats.revenue.growth}% from last month
              </Text>
            </View>
          </View>
          
          {/* This would be a chart in a real app */}
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>Revenue Chart</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {stats.popularProducts.map((product, index) => (
          <View key={`product-${index}`} style={styles.productItem}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productMetrics}>
                {product.sales} sales · {product.inventory} in stock
              </Text>
            </View>
            
            <View style={styles.productIndicator}>
              <View 
                style={[
                  styles.productIndicatorBar,
                  { 
                    width: `${Math.min(100, (product.sales / 100) * 100)}%`,
                    backgroundColor: 
                      product.inventory < 40 
                        ? COLORS.error
                        : product.inventory < 70
                          ? COLORS.warning
                          : COLORS.success
                  }
                ]}
              />
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pending Deliveries</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {stats.pendingDeliveries.map((order, index) => (
          <View key={`order-${index}`} style={styles.orderItem}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            
            <View style={styles.orderDetails}>
              <Text style={styles.customerName}>{order.customer}</Text>
              <Text style={styles.orderAmount}>₹{order.amount}</Text>
            </View>
            
            <View style={styles.orderFooter}>
              <Text style={styles.orderItems}>{order.items} items</Text>
              
              <TouchableOpacity style={styles.processButton}>
                <Text style={styles.processButtonText}>Process</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundMedium,
  },
  contentContainer: {
    padding: SPACING.m,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.m,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.m,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundMedium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  statValue: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.textDark,
  },
  statLabel: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
  },
  statGrowth: {
    position: 'absolute',
    top: SPACING.m,
    right: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statGrowthText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    marginLeft: 2,
  },
  sectionContainer: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  sectionTitle: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
  },
  viewAllText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.primary,
  },
  revenueCard: {
    flexDirection: 'row',
    padding: SPACING.m,
  },
  revenueDetails: {
    flex: 1,
  },
  revenueTitle: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginBottom: SPACING.xs,
  },
  revenueAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xxl,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  revenueGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    borderRadius: BORDER_RADIUS.s,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    alignSelf: 'flex-start',
  },
  revenueGrowthText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: 'white',
    marginLeft: SPACING.xs,
  },
  chartPlaceholder: {
    width: 120,
    height: 80,
    backgroundColor: COLORS.backgroundMedium,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.s,
  },
  chartPlaceholderText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMedium,
  },
  productItem: {
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  productName: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
  },
  productMetrics: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
  },
  productIndicator: {
    height: 6,
    backgroundColor: COLORS.backgroundMedium,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  productIndicatorBar: {
    height: '100%',
    borderRadius: BORDER_RADIUS.round,
  },
  orderItem: {
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  orderId: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textDark,
  },
  orderDate: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  customerName: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: COLORS.textDark,
  },
  orderAmount: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.m,
    color: COLORS.primary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItems: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
  },
  processButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.s,
  },
  processButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: 'white',
  },
});