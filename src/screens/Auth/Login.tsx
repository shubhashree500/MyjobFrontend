import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import config from "../../context/config";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguageContext } from '../../context/LanguageContext';
import translations from '../../utils/loginLan';

export default function LoginScreen({ navigation }: any) {
  const { language } = useLanguageContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isJobSeeker, setIsJobSeeker] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  const t = (key: string) => translations[language][key] || key;

  const apiUrl = isJobSeeker
    ? (`${config.apiUrl}/personalDetails/login`)
    : (`${config.apiUrl}/organizationDetails/login`);

  const logoAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(apiUrl, { email, password });

      if (response.status === 200) {
        const { accessToken, data } = response.data;

        await AsyncStorage.setItem('userToken', accessToken);
        if (data.type?.toLowerCase() === 'org') {
          await AsyncStorage.setItem('userId', data.compId);
          await AsyncStorage.setItem('compId', data.compId);
        } else if (data.type?.toLowerCase() === 'user') {
          await AsyncStorage.setItem('userId', data.userId);
        }
        await AsyncStorage.setItem('type', data.type);

        Alert.alert('Login Successful', 'You have successfully logged in!', [
          {
            text: 'Ok',
            onPress: () => {
              navigation.replace(isJobSeeker ? 'JobseekerDashboard' : 'OrganizationDashboard');
            },
          },
        ]);
      }
    } catch (error: any) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]).start();

      console.error('Login error:', error.message);
      if (error.response) {
        const { status, data } = error.response;
        let message = 'An error occurred.';
        if (status === 404) {
          message = 'User not registered.';
        } else if (status === 400) {
          message = data.message || 'Invalid credentials.';
        }

        Alert.alert('Login Failed', message);
      } else {
        Alert.alert('Connection Error', 'Unable to connect to the server.');
      }
    }
  };

  const renderLeftIcon = (icon: any) => (
    <Image source={icon} style={{ width: 20, height: 20, marginRight: 10, marginLeft: 8 }} />
  );

  const renderEyeIcon = () => (
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
      <Image
        source={
          showPassword
            ? require('../../assets/icons/eye.png')
            : require('../../assets/icons/eyeoff.png')
        }
        style={{ width: 22, height: 22, marginTop: 12, marginRight: 10 }}
      />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerWrapper}>
          <View style={styles.upperHalf}>
            <ImageBackground
              source={require('../../assets/icons/loginBG.png')}
              style={styles.backgroundImage}
              resizeMode="cover"
            >
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Animated.Image
                    source={require('../../assets/icons/signin.png')}
                    style={[styles.logo, {
                      opacity: logoAnim,
                      transform: [{ scale: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }]
                    }]}
                  />
                </View>
                <Text style={styles.title}>{t('loginTitle')}</Text>
                <Text style={styles.subtitle}>{t('loginSubtitle')}</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.form}>
            <View style={styles.toggleContainer}>
              <Pressable
                style={[styles.toggleButton, isJobSeeker ? styles.activeToggle : styles.inactiveToggle]}
                onPress={() => setIsJobSeeker(true)}
              >
                <Text style={[styles.toggleText, isJobSeeker ? styles.activeText : styles.inactiveText]}>
                  {t('toggleJobSeeker')}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.toggleButton, !isJobSeeker ? styles.activeToggle : styles.inactiveToggle]}
                onPress={() => setIsJobSeeker(false)}
              >
                <Text style={[styles.toggleText, !isJobSeeker ? styles.activeText : styles.inactiveText]}>
                  {t('toggleOrganization')}
                </Text>
              </Pressable>
            </View>

            <View style={styles.inputContainer}>
              {renderLeftIcon(require('../../assets/icons/mail.png'))}
              <TextInput
                style={styles.input}
                placeholder={t('emailPlaceholder')}
                placeholderTextColor="#000"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
              <View style={styles.inputContainer}>
                {renderLeftIcon(require('../../assets/icons/lock.png'))}
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder={t('passwordPlaceholder')}
                  placeholderTextColor="#000"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                {renderEyeIcon()}
              </View>
            </Animated.View>

            {Platform.OS === 'android' ? (
              <TouchableNativeFeedback onPress={handleLogin} background={TouchableNativeFeedback.Ripple('#fff', false)}>
                <View style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>{t('loginButton')}</Text>
                </View>
              </TouchableNativeFeedback>
            ) : (
              <Pressable
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                onPress={handleLogin}
                style={[styles.loginButton, { transform: [{ scale: isPressed ? 0.96 : 1 }] }]}
              >
                <Text style={styles.loginButtonText}>{t('loginButton')}</Text>
              </Pressable>
            )}

            <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtonsRow}>
              <Pressable style={styles.socialButton}>
                <Image source={require('../../assets/icons/google.png')} style={styles.socialIcon} />
              </Pressable>

              <Pressable style={styles.socialButton}>
                <Image source={require('../../assets/icons/apple.png')} style={styles.socialIcon} />
              </Pressable>
            </View>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>{t('registerPrompt')} </Text>
              <Pressable onPress={() => navigation.navigate('RegistrationScreen')}>
                <Text style={styles.registerLink}>{t('registerLink')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  upperHalf: {
    flex: 0.4,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 300,
    height: 180,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    flex: 0.5,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 5,
    justifyContent: 'center',
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#3B82F6',
  },
  inactiveToggle: {
    backgroundColor: '#fff',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  loginButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordText: {
    color: '#3B82F6',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#666',
  },
  registerLink: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});
