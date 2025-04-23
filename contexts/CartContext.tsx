import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/hooks/useAuth';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  farmerId: string;
  farmerName: string;
  description: string;
  quantity: number;
  unit: string;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextData {
  items: CartItem[];
  total: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { session } = useAuth();
  
  // Calculate total price of items in cart
  const total = items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  // Load cart from storage on mount
  useEffect(() => {
    const loadCart = async () => {
      if (session) {
        try {
          const storedCart = await AsyncStorage.getItem(`cart_${session.user.id}`);
          if (storedCart) {
            setItems(JSON.parse(storedCart));
          }
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      }
    };
    
    loadCart();
  }, [session]);

  // Save cart to storage when it changes
  useEffect(() => {
    const saveCart = async () => {
      if (session) {
        try {
          await AsyncStorage.setItem(`cart_${session.user.id}`, JSON.stringify(items));
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    };
    
    saveCart();
  }, [items, session]);

  const addToCart = (product: Product, quantity: number) => {
    setItems(currentItems => {
      // Check if item already exists in cart
      const existingItemIndex = currentItems.findIndex(
        item => item.product.id === product.id
      );
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...currentItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => 
      currentItems.filter(item => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(currentItems => {
      return currentItems.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartContext }