import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { Search, Users, ShoppingBag, Scroll } from 'lucide-react-native';
import { getMockProducts, getMockFarmers } from '@/services/mockDataService';
import ProductCard from '@/components/common/ProductCard';
import FarmerCard from '@/components/consumer/FarmerCard';
import { Product } from '@/contexts/CartContext';

// Define Farmer type based on mock data structure
interface Farmer {
  id: string;
  name: string;
  avatar: string;
  location: string;
  bio: string;
  rating: number;
  followers: number;
  products: number;
}

type SearchCategory = 'farmers' | 'products' | 'fundraisers';

// Helper type guard
function isFarmer(item: Farmer | Product): item is Farmer {
  return (item as Farmer).followers !== undefined; // Assuming 'followers' only exists on Farmer
}

export default function ConsumerSearchScreen() {
  const { session } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('farmers');
  const [searchResults, setSearchResults] = useState<(Farmer | Product)[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has been attempted

  const loadDefaultData = async (category: SearchCategory) => {
    setLoading(true);
    setHasSearched(false); // Reset search status when loading defaults
    try {
      let results: (Farmer | Product)[] = [];
      switch (category) {
        case 'farmers':
          results = await getMockFarmers(); // Load all farmers
          break;
        case 'products':
          results = await getMockProducts(); // Load all products
          break;
        case 'fundraisers':
          results = []; // No default fundraisers yet
          break;
      }
      setSearchResults(results);
    } catch (error) {
      console.error('Error loading default data:', error);
      setSearchResults([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  };

  // Load default farmers on initial mount
  useEffect(() => {
    loadDefaultData('farmers');
  }, []);

  const handleSearch = async () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      // If query is cleared, load default data for the current category
      loadDefaultData(activeCategory);
      return;
    }

    setLoading(true);
    setHasSearched(true); // Mark that a search has been performed
    let results: (Farmer | Product)[] = []; 
    try {
      switch (activeCategory) {
        case 'farmers':
          results = await getMockFarmers(trimmedQuery);
          break;
        case 'products':
          results = await getMockProducts(trimmedQuery);
          break;
        case 'fundraisers':
          // In a real app, this would search fundraisers
          results = []; 
          break;
        default:
          results = [];
      }
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: SearchCategory) => {
    setActiveCategory(category);
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      // If there's a query, perform search in the new category
      handleSearch(); 
    } else {
      // If query is empty, load default data for the new category
      loadDefaultData(category);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      );
    }

    // Show "No results" only if a search was performed and it yielded nothing
    if (hasSearched && searchResults.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
        </View>
      );
    }
    
    // Display fundraisers coming soon message if that category is active and no results (or default view)
    if (activeCategory === 'fundraisers' && searchResults.length === 0) {
       return (
         <View style={styles.emptyContainer}>
           <Text style={styles.emptyText}>Fundraisers coming soon</Text>
         </View>
       );
    }


    // Note: We might still render the wrong list briefly if searchResults isn't empty
    // but contains items from the *previous* category during the loading state of handleCategoryChange.
    // A check based on activeCategory AND item type might be needed for robustness.

    if (activeCategory === 'farmers') {
      // Filter results to ensure only Farmers are passed, using type guard
      const farmerResults = searchResults.filter(isFarmer);
      if (!loading && farmerResults.length === 0 && !hasSearched && activeCategory === 'farmers') {
         // Handle case where default farmer load resulted in empty (e.g., API error)
         return <View style={styles.emptyContainer}><Text style={styles.emptyText}>Could not load farmers.</Text></View>;
      }
      return (
        <FlatList
          data={farmerResults} // Pass the filtered array
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FarmerCard farmer={item} />} // No assertion needed now
          numColumns={2}
          contentContainerStyle={styles.resultsContainer}
        />
      );
    }

    if (activeCategory === 'products') {
       // Filter results to ensure only Products are passed
      const productResults = searchResults.filter((item): item is Product => !isFarmer(item));
       if (!loading && productResults.length === 0 && !hasSearched && activeCategory === 'products') {
          // Handle case where default product load resulted in empty
         return <View style={styles.emptyContainer}><Text style={styles.emptyText}>Could not load products.</Text></View>;
      }
      return (
        <FlatList
          data={productResults} // Pass the filtered array
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />} // No assertion needed now
          numColumns={2}
          contentContainerStyle={styles.resultsContainer}
        />
      );
    }

    // Fallback for Fundraisers (already handled above, but good practice)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Select a category</Text> 
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={COLORS.textMedium} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>
      </View>
      
      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            activeCategory === 'farmers' && styles.activeCategoryButton,
          ]}
          onPress={() => handleCategoryChange('farmers')}
        >
          <Users
            size={16}
            color={activeCategory === 'farmers' ? COLORS.primary : COLORS.textMedium}
          />
          <Text
            style={[
              styles.categoryText,
              activeCategory === 'farmers' && styles.activeCategoryText,
            ]}
          >
            Farmers
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.categoryButton,
            activeCategory === 'products' && styles.activeCategoryButton,
          ]}
          onPress={() => handleCategoryChange('products')}
        >
          <ShoppingBag
            size={16}
            color={activeCategory === 'products' ? COLORS.primary : COLORS.textMedium}
          />
          <Text
            style={[
              styles.categoryText,
              activeCategory === 'products' && styles.activeCategoryText,
            ]}
          >
            Products
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.categoryButton,
            activeCategory === 'fundraisers' && styles.activeCategoryButton,
          ]}
          onPress={() => handleCategoryChange('fundraisers')}
        >
          <Scroll
            size={16}
            color={activeCategory === 'fundraisers' ? COLORS.primary : COLORS.textMedium}
          />
          <Text
            style={[
              styles.categoryText,
              activeCategory === 'fundraisers' && styles.activeCategoryText,
            ]}
          >
            Fundraisers
          </Text>
        </TouchableOpacity>
      </View>
      
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  searchContainer: {
    padding: SPACING.m,
    backgroundColor: COLORS.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundMedium,
    borderRadius: BORDER_RADIUS.m,
    paddingHorizontal: SPACING.m,
    height: 40,
  },
  searchIcon: {
    marginRight: SPACING.s,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.m,
    backgroundColor: COLORS.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
  },
  activeCategoryButton: {
    backgroundColor: COLORS.primaryLight + '20', // 20% opacity
  },
  categoryText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    marginLeft: SPACING.xs,
  },
  activeCategoryText: {
    color: COLORS.primary,
  },
  resultsContainer: {
    padding: SPACING.m,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
    textAlign: 'center',
  },
});