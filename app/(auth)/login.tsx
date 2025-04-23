import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '@/constants/theme';
import { ChevronLeft, AlertCircle } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, session, userRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (session && !loading) {
      if (userRole === 'consumer') {
        router.replace('/consumer/home' as any);
      } else if (userRole === 'farmer') {
        router.replace('/farmer/home' as any);
      } else if (userRole === 'influencer') {
        console.warn("Influencer role detected but route doesn't exist yet. Redirecting to consumer route.");
        router.replace('/consumer/home' as any);
      } else {
        console.log("User logged in but role not set, redirecting to select-role");
        router.replace('/(auth)/select-role');
      }
    }
  }, [session, userRole, loading, router]);

  // Fade in/out animation for messages
  useEffect(() => {
    if (errorMessage || successMessage) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setErrorMessage('');
        setSuccessMessage('');
      });
    }
  }, [errorMessage, successMessage, fadeAnim]);

  const handleLogin = async () => {
    // Clear previous errors
    setErrorMessage('');
    
    // Validate inputs
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }
    
    if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }
    
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      // If we get here, the sign-in was successful
    } catch (error) {
      // Handle different error types
      if (typeof error === 'object' && error !== null) {
        const errorObj = error as any;
        const errorMessage = errorObj.message || '';
        
        // Check for common authentication error patterns
        if (errorMessage.toLowerCase().includes('invalid login') || 
            errorMessage.toLowerCase().includes('invalid email') || 
            errorMessage.toLowerCase().includes('incorrect password') ||
            errorMessage.toLowerCase().includes('user not found') ||
            errorMessage.toLowerCase().includes('auth/user-not-found') ||
            errorMessage.toLowerCase().includes('auth/wrong-password')) {
          setErrorMessage('Invalid email or password. Please try again.');
        } 
        else if (errorMessage.toLowerCase().includes('network') || 
                 errorMessage.toLowerCase().includes('connection') ||
                 errorMessage.toLowerCase().includes('offline') ||
                 errorMessage.toLowerCase().includes('internet')) {
          setErrorMessage('Network error. Please check your internet connection.');
        } 
        else if (errorMessage.toLowerCase().includes('too many') || 
                 errorMessage.toLowerCase().includes('rate limit') ||
                 errorMessage.toLowerCase().includes('auth/too-many-requests')) {
          setErrorMessage('Too many login attempts. Please try again later.');
        } 
        else if (errorMessage.toLowerCase().includes('not verified') || 
                 errorMessage.toLowerCase().includes('verify') ||
                 errorMessage.toLowerCase().includes('auth/email-not-verified')) {
          setErrorMessage('Email not verified. Please check your inbox to verify your account.');
        }
        else if (errorMessage.toLowerCase().includes('timeout') || 
                 errorMessage.toLowerCase().includes('timed out')) {
          setErrorMessage('Request timed out. Please try again.');
        }
        else if (errorMessage.toLowerCase().includes('auth/invalid-email')) {
          setErrorMessage('Invalid email format. Please check your email.');
        }
        else if (errorMessage.toLowerCase().includes('server') || 
                 errorMessage.toLowerCase().includes('500')) {
          setErrorMessage('Server error. Please try again later.');
        }
        else {
          // Generic error message for other cases
          setErrorMessage('An error occurred during sign in. Please try again later.');
          console.error('Unhandled login error:', errorMessage);
        }
      } else {
        setErrorMessage('Failed to sign in. Please try again later.');
      }
      
      console.error('Login error:', error);
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const goToSignUp = () => {
    router.push('/signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft color={COLORS.textDark} size={24} />
        </TouchableOpacity>
        
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your FarmSoc account</Text>
        </View>
        
        {/* Error/Success Message Banner */}
        {(errorMessage || successMessage) && (
          <Animated.View 
            style={[
              styles.messageBanner, 
              errorMessage ? styles.errorBanner : styles.successBanner,
              { opacity: fadeAnim }
            ]}
          >
            <View style={styles.messageBannerContent}>
              {errorMessage && <View><AlertCircle color="white" size={20} /></View>}
              <Text style={styles.messageBannerText}>
                {errorMessage || successMessage}
              </Text>
            </View>
          </Animated.View>
        )}
        
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: SPACING.l,
  },
  backButton: {
    marginTop: SPACING.l,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  title: {
    fontFamily: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.xxxl,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
  },
  form: {
    marginBottom: SPACING.xl,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  errorText: {
    color: '#D32F2F',
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
  },
  inputContainer: {
    marginBottom: SPACING.l,
  },
  label: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
    borderRadius: BORDER_RADIUS.m,
    paddingHorizontal: SPACING.m,
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.l,
  },
  forgotPasswordText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.primary,
  },
  button: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryLight,
  },
  buttonText: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  footerText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.m,
    color: COLORS.textMedium,
    marginRight: SPACING.xs,
  },
  signupText: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: COLORS.primary,
  },
  messageBanner: {
    marginBottom: SPACING.m,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
  },
  errorBanner: {
    backgroundColor: '#FF3B30', // iOS-style error red
  },
  successBanner: {
    backgroundColor: '#34C759', // iOS-style success green
  },
  messageBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageBannerText: {
    color: 'white',
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    marginLeft: SPACING.xs,
  },
});