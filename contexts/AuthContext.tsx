import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  auth, 
  subscribeToAuthChanges, 
  getSession, 
  saveSession 
} from '../services/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';

type UserRole = 'consumer' | 'farmer' | 'influencer' | null;

interface AuthContextData {
  session: User | null;
  loading: boolean;
  userRole: UserRole;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  setRole: (role: UserRole) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    // Check for existing session
    getSession().then((userSession) => {
      if (userSession) {
        setSession(auth.currentUser);
        // Get user role from storage
        AsyncStorage.getItem('userRole').then((role) => {
          setUserRole(role as UserRole);
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const unsubscribe = subscribeToAuthChanges((user) => {
      setSession(user);
      if (!user) {
        setUserRole(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user role from storage after sign in
      const role = await AsyncStorage.getItem('userRole');
      setUserRole(role as UserRole);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Store user role
      await setRole(role);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      
      // Clear user role
      await AsyncStorage.removeItem('userRole');
      setUserRole(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const setRole = async (role: UserRole) => {
    try {
      await AsyncStorage.setItem('userRole', role as string);
      setUserRole(role);
    } catch (error) {
      console.error('Error setting user role:', error);
      throw error;
    }
  };

  const refreshSession = async () => {
    try {
      // With Firebase, we don't need to manually refresh the session
      // as it's handled automatically, but we'll keep this method
      // for API compatibility
      setSession(auth.currentUser);
    } catch (error) {
      console.error('Error refreshing session:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        userRole,
        signIn,
        signUp,
        signOut,
        setRole,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext }