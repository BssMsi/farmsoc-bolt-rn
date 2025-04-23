import React from 'react';
import { TouchableOpacity, StyleSheet, View, Platform, GestureResponderEvent } from 'react-native';
import { COLORS, BORDER_RADIUS } from '@/constants/theme';

// Create a more comprehensive props type
type ActionButtonProps = {
  children: React.ReactNode;
  style?: any;
  onPress?: ((event: GestureResponderEvent) => void);
  [key: string]: any; // To accept any other props passed from Tabs.Screen
};

export default function ActionButton(props: ActionButtonProps) {
  const { children, style, onPress, ...otherProps } = props;
  
  console.log('ActionButton rendered');
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={onPress}
        {...otherProps}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});