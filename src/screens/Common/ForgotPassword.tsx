import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Animated,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const labelAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(labelAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!email) {
      Animated.timing(labelAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSendOTP = () => {
    if (!email) {
      Alert.alert('Input Required', 'Please enter your email address.');
      return;
    }

    // TODO: Send OTP API call here

    Alert.alert('OTP Sent', 'Check your email for the OTP.');
    setOtpSent(true);
  };

  const handleVerifyOTP = () => {
    if (!otp || !newPassword) {
      Alert.alert('Missing Fields', 'Please enter OTP and new password.');
      return;
    }

    // TODO: Verify OTP and reset password via API

    Alert.alert('Success', 'Your password has been reset.');
    setOtpSent(false);
    setEmail('');
    setOtp('');
    setNewPassword('');
  };

  const labelStyle = {
    position: 'absolute' as const,
    left: 12,
    top: labelAnim.interpolate({ inputRange: [0, 1], outputRange: [14, -10] }),
    fontSize: labelAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 12] }),
    color: '#555',
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Forgot Password</Text>

        <View style={styles.inputWrapper}>
          <Animated.Text style={labelStyle}>Email</Animated.Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!otpSent}
          />
        </View>

        {!otpSent ? (
          <Pressable style={styles.button} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </Pressable>
        ) : (
          <>
            <TextInput
              placeholder="Enter OTP"
              style={styles.inputBox}
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
            />
            <TextInput
              placeholder="Enter New Password"
              secureTextEntry
              style={styles.inputBox}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Pressable style={styles.button} onPress={handleVerifyOTP}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: 18,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 45,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ForgotPassword;
