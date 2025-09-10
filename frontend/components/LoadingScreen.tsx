import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export function LoadingScreen() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');

  React.useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1);
    scale.value = withRepeat(
      withTiming(1.2, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: interpolate(scale.value, [0.8, 1.2], [0.8, 1.1]) },
    ],
  }));

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[styles.loader, { borderColor: tintColor }, animatedStyle]} />
      <ThemedText style={styles.text}>Loading...</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderTopColor: 'transparent',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    opacity: 0.7,
  },
});