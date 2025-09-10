import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/context/AuthContext';
import { Theme } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields'
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password must be at least 6 characters'
      });
      return;
    }

    setIsLoading(true);
    try {
      await register({ username, email, password });
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Please login with your credentials'
      });
      router.push('/(auth)/login');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.response?.data?.message || 'Something went wrong'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.logo, { backgroundColor: Theme.colors.secondary }]}>
          <ThemedText style={styles.logoText}>+</ThemedText>
        </View>
        <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
        <ThemedText style={styles.subtitle}>Join us today</ThemedText>
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
            placeholder="Email"
            placeholderTextColor={isDark ? Theme.colors.textTertiaryDark : Theme.colors.textTertiary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
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
          onPress={handleRegister}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </ThemedText>
        </TouchableOpacity>
        
        <View style={styles.linkContainer}>
          <ThemedText style={styles.linkText}>Already have an account? </ThemedText>
          <Link href="/(auth)/login">
            <ThemedText style={[styles.linkButton, { color: Theme.colors.primary }]}>Sign In</ThemedText>
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
    backgroundColor: Theme.colors.secondary,
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