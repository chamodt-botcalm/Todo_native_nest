import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/context/AuthContext';
import { Theme } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              Toast.show({
                type: 'success',
                text1: 'Logged Out',
                text2: 'You have been logged out successfully'
              });
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to logout'
              });
            }
          }
        }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Profile</ThemedText>
        <ThemedText style={styles.subtitle}>Manage your account</ThemedText>
      </View>
      
      <View style={[styles.profileCard, {
        backgroundColor: isDark ? Theme.colors.backgroundSecondaryDark : Theme.colors.backgroundSecondary,
        borderColor: isDark ? Theme.colors.borderDark : Theme.colors.border,
      }]}>
        <View style={[styles.avatar, { backgroundColor: Theme.colors.primary }]}>
          <ThemedText style={styles.avatarText}>
            {user?.username?.charAt(0)?.toUpperCase() || '?'}
          </ThemedText>
        </View>
        
        <View style={styles.userInfo}>
          <ThemedText style={styles.username}>{user?.username}</ThemedText>
          <ThemedText style={styles.email}>{user?.email}</ThemedText>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: Theme.colors.error }]} 
          onPress={handleLogout}
        >
          <ThemedText style={styles.logoutText}>Sign Out</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>TodoMaster v1.0.0</ThemedText>
        <ThemedText style={styles.footerText}>Built with React Native & NestJS</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  header: {
    alignItems: 'center',
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xxl,
  },
  title: {
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 14,
  },
  profileCard: {
    padding: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    marginBottom: Theme.spacing.xxl,
    borderWidth: 1,
    ...Theme.shadows.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  avatarText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  userInfo: {
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  username: {
    fontSize: 22,
    fontWeight: '600',
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
  },
  actions: {
    gap: Theme.spacing.md,
  },
  logoutButton: {
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    ...Theme.shadows.md,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: Theme.spacing.xs,
    paddingBottom: Theme.spacing.xl,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.5,
  },
});