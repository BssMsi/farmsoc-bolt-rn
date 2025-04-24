import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '@/constants/theme';
import { ChevronLeft, ShoppingBag, Tractor, Users, AlertCircle } from 'lucide-react-native';

export default function SignupScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'consumer' | 'farmer' | 'influencer' | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

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
        
        // Navigate to login if there was a success message
        if (successMessage) {
          router.replace('/login' as any);
        }
      });
    }
  }, [errorMessage, successMessage]);

  const handleSignUp = async () => {
    // Reset any previous error
    setErrorMessage('');
    
    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    if (!userType) {
      setErrorMessage('Please select your user type');
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password, userType);
      setSuccessMessage('Account created successfully! Redirecting to login...');
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const errorObj = error as any;
        const errorMessage = errorObj.message || '';
        const errorCode = errorObj.code || '';
        
        // Firebase specific error codes
        if (errorCode === 'auth/email-already-in-use') {
          setErrorMessage('Email is already in use. Please use a different email or try to login.');
        }
        else if (errorCode === 'auth/invalid-email') {
          setErrorMessage('Invalid email format. Please check your email.');
        }
        else if (errorCode === 'auth/weak-password') {
          setErrorMessage('Password is too weak. Please use a stronger password.');
        }
        else if (errorCode === 'auth/network-request-failed') {
          setErrorMessage('Network error. Please check your internet connection.');
        }
        else if (errorCode === 'auth/operation-not-allowed') {
          setErrorMessage('This sign-up method is not allowed. Please contact support.');
        }
        else if (errorMessage.toLowerCase().includes('network') || 
                errorMessage.toLowerCase().includes('connection')) {
          setErrorMessage('Network error. Please check your internet connection.');
        }
        else if (errorMessage.toLowerCase().includes('timeout')) {
          setErrorMessage('Request timed out. Please try again.');
        }
        else {
          setErrorMessage('Sign up failed. Please try again.');
          console.error('Unhandled signup error:', errorCode, errorMessage);
        }
      } else {
        setErrorMessage('Sign up failed. Please try again with a different email.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const goToLogin = () => {
    router.push('login' as any);
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the farm-to-home revolution</Text>
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
              {errorMessage && <AlertCircle color="white" size={20} />}
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
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>I am a</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity 
                style={[
                  styles.roleButton, 
                  userType === 'consumer' && styles.selectedRoleButton
                ]}
                onPress={() => setUserType('consumer')}
              >
                <ShoppingBag 
                  color={userType === 'consumer' ? 'white' : COLORS.textDark} 
                  size={20} 
                />
                <Text 
                  style={[
                    styles.roleButtonText, 
                    userType === 'consumer' && styles.selectedRoleText
                  ]}
                >
                  Consumer
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.roleButton, 
                  userType === 'farmer' && styles.selectedRoleButton
                ]}
                onPress={() => setUserType('farmer')}
              >
                <Tractor 
                  color={userType === 'farmer' ? 'white' : COLORS.textDark} 
                  size={20} 
                />
                <Text 
                  style={[
                    styles.roleButtonText, 
                    userType === 'farmer' && styles.selectedRoleText
                  ]}
                >
                  Farmer
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.roleButton, 
                  userType === 'influencer' && styles.selectedRoleButton
                ]}
                onPress={() => setUserType('influencer')}
              >
                <Users 
                  color={userType === 'influencer' ? 'white' : COLORS.textDark} 
                  size={20} 
                />
                <Text 
                  style={[
                    styles.roleButtonText, 
                    userType === 'influencer' && styles.selectedRoleText
                  ]}
                >
                  Influencer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By signing up, you agree to our
            <Text style={styles.termsLink}> Terms of Service</Text>
            <Text> and</Text>
            <Text style={styles.termsLink}> Privacy Policy</Text>
          </Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginText}>Login</Text>
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
  form: {
    marginBottom: SPACING.l,
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
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    padding: SPACING.s,
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
    marginHorizontal: 4,
  },
  selectedRoleButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleButtonText: {
    fontFamily: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.s,
    color: COLORS.textDark,
    marginLeft: 6,
  },
  selectedRoleText: {
    color: 'white',
  },
  button: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.m,
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryLight,
  },
  buttonText: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: 'white',
  },
  termsContainer: {
    marginTop: SPACING.l,
  },
  termsText: {
    fontFamily: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.s,
    color: COLORS.textMedium,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    fontFamily: FONT_WEIGHT.semiBold,
    color: COLORS.primary,
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
  loginText: {
    fontFamily: FONT_WEIGHT.semiBold,
    fontSize: FONT_SIZE.m,
    color: COLORS.primary,
  },
});