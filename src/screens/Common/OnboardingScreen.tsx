import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';

const OnboardingScreen = ({ navigation }: any) => {
  const slideLeft = useRef(new Animated.Value(-300)).current; // Title from left
  const slideRight = useRef(new Animated.Value(300)).current; // Subtitle from right
  const fadeIn = useRef(new Animated.Value(0)).current;       // Fade-in for button

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideLeft, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideRight, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 1000,
        delay: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icons/onboarding.png')} style={styles.image} />
      
      <Animated.Text style={[styles.title, { transform: [{ translateX: slideLeft }] }]}>
        Find Your Dream Job
      </Animated.Text>

      <Animated.Text style={[styles.subtitle, { transform: [{ translateX: slideRight }] }]}>
        Browse jobs, apply easily, and grow your career
      </Animated.Text>

      <Animated.View style={{ opacity: fadeIn }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, resizeMode: 'contain' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  subtitle: { fontSize: 16, textAlign: 'center', marginVertical: 10, color: '#777' },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
