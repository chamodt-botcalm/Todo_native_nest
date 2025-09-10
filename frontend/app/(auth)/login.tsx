import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Toast from 'react-native-toast-message';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/context/AuthContext';
import { Theme } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields'
      });
      return;
    }

    setIsLoading(true);
    try {
      await login({ username, password });
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!'
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'Invalid credentials'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.logo, { backgroundColor: Theme.colors.primary }]}>
          <ThemedText style={styles.logoText}>✓</ThemedText>
        </View>
        <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
        <ThemedText style={styles.subtitle}>Sign in to continue</ThemedText>
      </View>
      
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? Theme.colors.backgroundSecondaryDark : Theme.colors.backgroundSecondary,
              borderColor: isDark ? Theme.colors.borderDark : Theme.colors.border,
              color: isDark ? Theme.colors.textDark : Theme.colors.text
            }]}
            placeholder="Username"
            placeholderTextColor={isDark ? Theme.colors.textTertiaryDark : Theme.colors.textTertiary}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? Theme.colors.backgroundSecondaryDark : Theme.colors.backgroundSecondary,
              borderColor: isDark ? Theme.colors.borderDark : Theme.colors.border,
              color: isDark ? Theme.colors.textDark : Theme.colors.text
            }]}
            placeholder="Password"
            placeholderTextColor={isDark ? Theme.colors.textTertiaryDark : Theme.colors.textTertiary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </ThemedText>
        </TouchableOpacity>
        
        <View style={styles.linkContainer}>
          <ThemedText style={styles.linkText}>Don't have an account? </ThemedText>
          <Link href="/(auth)/register">
            <ThemedText style={[styles.linkButton, { color: Theme.colors.primary }]}>Sign Up</ThemedText>
          </Link>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: Theme.spacing.xxl,
    marginBottom: Theme.spacing.xxl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 16,
  },
  form: {
    gap: Theme.spacing.lg,
  },
  inputContainer: {
    gap: Theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    fontSize: 16,
    ...Theme.shadows.sm,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    ...Theme.shadows.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Theme.spacing.lg,
  },
  linkText: {
    fontSize: 14,
    opacity: 0.7,
  },
  linkButton: {
    fontSize: 14,
    fontWeight: '600',
  },
});