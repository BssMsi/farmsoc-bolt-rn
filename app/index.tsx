import { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const { session, userRole } = useAuth();

  useEffect(() => {
    // Add debug logging
    console.log('Welcome screen - Auth state:', { session, userRole });
    
    // If user is already logged in, redirect to appropriate dashboard
    if (session) {
      console.log('Redirecting based on role:', userRole);
      
      try {
        switch (userRole) {
          case 'consumer':
            console.log('Redirecting to consumer home');
            router.replace('/(consumer)/home');
            break;
          case 'farmer':
            console.log('Redirecting to farmer home');
            router.replace('/(farmer)/home');
            break;
          case 'influencer':
            // Temporarily redirect influencers to consumer route until influencer route exists
            console.warn("Influencer role detected but route doesn't exist yet. Redirecting to consumer route.");
            router.replace('/(consumer)/home');
            break;
          default:
            // If role not set, go to role selection
            console.log('No role set, redirecting to role selection');
            router.replace('/(auth)/select-role');
        }
      } catch (error) {
        console.error('Error during navigation:', error);
      }
    }
  }, [session, userRole, router]);

  const handleLogin = () => {
    try {
      console.log('Navigating to login screen');
      router.push('/(auth)/login');
    } catch (error) {
      console.error('Error navigating to login:', error);
    }
  };

  const handleSignUp = () => {
    try {
      console.log('Navigating to signup screen');
      router.push('/(auth)/signup');
    } catch (error) {
      console.error('Error navigating to signup:', error);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primaryDark]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>FarmSoc</Text>
          <Text style={styles.tagline}>Direct from Farm to Your Home</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>For Farmers</Text>
            <Text style={styles.infoText}>Sell directly to consumers. No middlemen.</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>For Consumers</Text>
            <Text style={styles.infoText}>Get fresh produce directly from farms.</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>For Influencers</Text>
            <Text style={styles.infoText}>Promote local farmers and earn commissions.</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.signupButton]}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: 'white',
    marginBottom: 10,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 40,
  },
  infoItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  infoTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
    marginBottom: 6,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  loginButton: {
    backgroundColor: 'white',
  },
  signupButton: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.primary,
  },
});