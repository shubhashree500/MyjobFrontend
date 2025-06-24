import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguageContext } from '../../../context/LanguageContext';
import translations from '../../../utils/orghome';
import config  from "../../../context/config";


const PasswordScreen = ({navigation}:any) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { language } = useLanguageContext();
  const t = (key:any) => translations[language][key] || key;

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match.');
      return;
    }
  
    try {
      const userType = await AsyncStorage.getItem('type');
      let identifier = null;
  
      if (userType === 'Org') {
        identifier = await AsyncStorage.getItem('compId'); // Organization ID
      } else {
        identifier = await AsyncStorage.getItem('userId');
      }
  
      if (!identifier || !userType) {
        Alert.alert('Error', 'User information not found. Please log in again.');
        return;
      }
  
      // API call to update the password
      const endpoint =
        userType === 'Org'
          ? `${config.apiUrl}/organizationDetails/update/${identifier}`
          : `${config.apiUrl}/personalDetails/update/${identifier}`;
  
      const response = await axios.put(
        endpoint,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Use JSON for data transfer
          },
        }
      );
  
      if (response.status === 200) {
        Alert.alert('Success', 'Password successfully updated.');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Setting')}>
          <Image
            source={require('../../../assets/icons/blackBack.png')} // Replace with your back icon
            style={styles.backImage}
          />
        </Pressable>
      </View>

      {/* Title */}
      <Text style={styles.title}>{t('changePassword')}</Text>

      {/* Input Fields */}
      <View style={styles.form}>
        {/* Current Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('currentPassword')}</Text>
          <View style={styles.passwordField}>
            <TextInput
              style={styles.input}
              secureTextEntry={!currentPasswordVisible}
              placeholder="Enter current password"
              placeholderTextColor="#999"
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity
              onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}
            >
              <Image
                source={
                  currentPasswordVisible
                    ? require('../../../assets/icons/openeye.png') // Eye-open icon
                    : require('../../../assets/icons/eye.png') // Eye-closed icon
                }
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('newPassword')}</Text>
          <View style={styles.passwordField}>
            <TextInput
              style={styles.input}
              secureTextEntry={!newPasswordVisible}
              placeholder="Enter new password"
              placeholderTextColor="#999"
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              onPress={() => setNewPasswordVisible(!newPasswordVisible)}
            >
              <Image
                source={
                  newPasswordVisible
                    ? require('../../../assets/icons/openeye.png') // Eye-open icon
                    : require('../../../assets/icons/eye.png') // Eye-closed icon
                }
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('confirmPassword')}</Text>
          <View style={styles.passwordField}>
            <TextInput
              style={styles.input}
              secureTextEntry={!confirmPasswordVisible}
              placeholder="Re-enter new password"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() =>
                setConfirmPasswordVisible(!confirmPasswordVisible)
              }
            >
              <Image
                source={
                  confirmPasswordVisible
                    ? require('../../../assets/icons/openeye.png') // Eye-open icon
                    : require('../../../assets/icons/eye.png') // Eye-closed icon
                }
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t('submit')}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    height: 50,
    justifyContent: 'flex-start',
  },
  backImage: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    // borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
    color: '#333',
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
  button: {
    flex:.2,
    top:'30%',
    backgroundColor: '#130160',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width:'50%',
    marginLeft:'25%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PasswordScreen;
