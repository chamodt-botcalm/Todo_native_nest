import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { Theme } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const logoScale = useSharedValue(0);
  const logoRotation = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(50);
  const backgroundOpacity = useSharedValue(1);

  useEffect(() => {
    const sequence = async () => {
      // Logo animation
      logoScale.value = withSequence(
        withTiming(1.2, { duration: 800 }),
        withTiming(1, { duration: 200 })
      );
      
      logoRotation.value = withTiming(360, { duration: 1000 });
      
      // Title animation
      titleOpacity.value = withDelay(500, withTiming(1, { duration: 600 }));
      titleTranslateY.value = withDelay(500, withTiming(0, { duration: 600 }));
      
      // Fade out
      setTimeout(() => {
        backgroundOpacity.value = withTiming(0, { duration: 500 }, () => {
          runOnJS(onFinish)();
        });
      }, 2500);
    };
    
    sequence();
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotation.value}deg` },
    ],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  return (
    <Animated.View style={[
      styles.container,
      {
        backgroundColor: isDark ? Theme.colors.backgroundDark : Theme.colors.background,
      },
      backgroundAnimatedStyle
    ]}>
      <View style={styles.content}>
        <Animated.View style={[
          styles.logoContainer,
          { backgroundColor: Theme.colors.primary },
          logoAnimatedStyle
        ]}>
          <ThemedText style={styles.logoText}>✓</ThemedText>
        </Animated.View>
        
        <Animated.View style={titleAnimatedStyle}>
          <ThemedText style={styles.title}>TodoMaster</ThemedText>
          <ThemedText style={styles.subtitle}>Organize your life</ThemedText>
        </Animated.View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.loadingContainer}>
          <View style={[styles.loadingDot, { backgroundColor: Theme.colors.primary }]} />
          <View style={[styles.loadingDot, { backgroundColor: Theme.colors.primary }]} />
          <View style={[styles.loadingDot, { backgroundColor: Theme.colors.primary }]} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    ...Theme.shadows.lg,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  footer: {
    paddingBottom: Theme.spacing.xxl,
  },
  loadingContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.6,
  },
});