import axios from 'axios';
import React, { useState } from 'react';
import config  from "../../context/config";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguageContext } from '../../context/LanguageContext';
import translations from '../../utils/loginLan';
import { Root, Popup } from 'popup-ui';

export default function LoginScreen({ navigation }: any) {
  const { language } = useLanguageContext(); // Get current language from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isJobSeeker, setIsJobSeeker] = useState(true);

  const t = (key: string) => translations[language][key] || key; // Helper for translations

  const apiUrl = isJobSeeker
    ? (`${config.apiUrl}/personalDetails/login`)
    : (`${config.apiUrl}/organizationDetails/login`)

  const handleLogin = async () => {
    if (!email || !password) {
      Popup.show({
        type: 'Warning',
        title: 'Missing Fields',
        textBody: 'Please fill in all fields.',
        button: true,
        buttonText: 'Ok',
        callback: () => Popup.hide(),
      });
      return;
    }

    try {
      const response = await axios.post(apiUrl, { email, password });

      if (response.status === 200) {
        const { accessToken, data } = response.data;

        // Save token and ID to AsyncStorage
        await AsyncStorage.setItem('userToken', accessToken);
        if (data.type?.toLowerCase() === 'org') {
          await AsyncStorage.setItem('userId', data.compId);
        } else if (data.type?.toLowerCase() === 'user') {
          await AsyncStorage.setItem('userId', data.userId);
        }
        await AsyncStorage.setItem('type', data.type);

        Popup.show({
          type: 'Success',
          title: 'Login Successful',
          textBody: 'You have successfully logged in!',
          button: true,
          buttonText: 'Ok',
          callback: () => {
            Popup.hide();
            navigation.replace(isJobSeeker ? 'TabNavigator' : 'OrganizationHomeScreen');
          },
        });
      }
    } catch (error: any) {
      console.error('Login error:', error.message);

      if (error.response) {
        const { status, data } = error.response;
        let message = 'An error occurred.';
        if (status === 404) {
          message = 'User not registered.';
        } else if (status === 400) {
          message = data.message || 'Invalid credentials.';
        }

        Popup.show({
          type: 'Danger',
          title: 'Login Failed',
          textBody: message,
          button: true,
          buttonText: 'Ok',
          callback: () => Popup.hide(),
        });
      } else {
        Popup.show({
          type: 'Danger',
          title: 'Connection Error',
          textBody: 'Unable to connect to the server.',
          button: true,
          buttonText: 'Ok',
          callback: () => Popup.hide(),
        });
      }
    }
  };

  return (
    <Root>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/icons/loginBG.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/icons/Logo2.png')}
                style={styles.logo}
              />
            </View>
            <Text style={styles.title}>{t('loginTitle')}</Text>
            <Text style={styles.subtitle}>{t('loginSubtitle')}</Text>
          </View>
        </ImageBackground>

        <View style={styles.form}>
          <View style={styles.toggleContainer}>
            <Pressable
              style={[
                styles.toggleButton,
                isJobSeeker ? styles.activeToggle : styles.inactiveToggle,
              ]}
              onPress={() => setIsJobSeeker(true)}
            >
              <Text
                style={[
                  styles.toggleText,
                  isJobSeeker ? styles.activeText : styles.inactiveText,
                ]}
              >
                {t('toggleJobSeeker')}
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.toggleButton,
                !isJobSeeker ? styles.activeToggle : styles.inactiveToggle,
              ]}
              onPress={() => setIsJobSeeker(false)}
            >
              <Text
                style={[
                  styles.toggleText,
                  !isJobSeeker ? styles.activeText : styles.inactiveText,
                ]}
              >
                {t('toggleOrganization')}
              </Text>
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={require('../../assets/icons/mail.png')}
              style={styles.inputIcon}
            />
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

          <View style={styles.inputContainer}>
            <Image
              source={require('../../assets/icons/lock.png')}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder={t('passwordPlaceholder')}
              placeholderTextColor="#000"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Image
                source={require('../../assets/icons/eye.png')}
                style={styles.inputIcon}
              />
            </Pressable>
          </View>

          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{t('loginButton')}</Text>
          </Pressable>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>{t('registerPrompt')} </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>{t('registerLink')}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 0.5,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 100,
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
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
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
