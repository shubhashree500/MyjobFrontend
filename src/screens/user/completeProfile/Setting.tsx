import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Modal,
} from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useLanguageContext } from '../../../context/LanguageContext';
import translations from '../../../utils/orghome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({navigation}:any) => {
  const { clearAuthData }:any = useAuth(); // Use the clearAuthData function from AuthContext
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const { language } = useLanguageContext();
  const t = (key:any) => translations[language][key] || key;
  const toggleModal = () => setModalVisible((prev) => !prev);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('type');
      
      setModalVisible(false); // Close the modal
      
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }, 300); // Delay navigation slightly to allow modal to close
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('OrganizationProfile')}>
          <Image
            source={require('../../../assets/icons/blackBack.png')} // Replace with your back icon
            style={styles.backImage}
          />
        </Pressable>
      </View>

      {/* Title */}
      <Text style={styles.title}>{t('setting')}</Text>

      {/* Settings List */}
      <View style={styles.listcontainer}>
        {/* Notification Section */}
        <View style={styles.imageDiv}>
          <Image
            source={require('../../../assets/icons/notification.png')} // Replace with your image
            style={styles.image}
          />
          <Text style={styles.text}>{t('notification')}</Text>
          <Switch
            trackColor={{ false: '#ccc', true: '#4caf50' }}
            thumbColor={isNotificationOn ? '#fff' : '#fff'}
            onValueChange={() => setIsNotificationOn((prev) => !prev)}
            value={isNotificationOn}
            style={styles.switch}
          />
        </View>

        {/* Dark Mode Section */}
        <View style={styles.imageDiv}>
          <Image
            source={require('../../../assets/icons/darkmode.png')} // Replace with your image
            style={styles.image}
          />
          <Text style={styles.text}>{t('darkmode')}</Text>
          <Switch
            trackColor={{ false: '#ccc', true: '#4caf50' }}
            thumbColor={isDarkModeOn ? '#fff' : '#fff'}
            onValueChange={() => setIsDarkModeOn((prev) => !prev)}
            value={isDarkModeOn}
            style={styles.switch}
          />
        </View>

        {/* Language Section */}
        <Pressable
          style={styles.imageDiv}
          onPress={() => navigation.navigate('LanguageSelection')}>
          <Image
            source={require('../../../assets/icons/languages.png')}
            style={styles.image}
          />
          <Text style={styles.text}>{t('language')}</Text>
          <Image
            source={require('../../../assets/icons/rightarrow.png')}
            style={styles.arrow}
          />
        </Pressable>

        {/* Password Section */}
        <Pressable
          style={styles.imageDiv}
          onPress={() => navigation.navigate('PasswordScreen')}>
          <Image
            source={require('../../../assets/icons/password.png')}
            style={styles.image}
          />
          <Text style={styles.text}>{t('password')} </Text>
          <Image
            source={require('../../../assets/icons/rightarrow.png')}
            style={styles.arrow}
          />
        </Pressable>

        {/* Logout Section */}
        <Pressable onPress={toggleModal} style={styles.imageDiv}>
          <Image
            source={require('../../../assets/icons/logout.png')}
            style={styles.image}
          />
          <Text style={styles.text}> {t('logout')}</Text>
          <Image
            source={require('../../../assets/icons/rightarrow.png')}
            style={styles.arrow}
          />
        </Pressable>
      </View>

      {/* <Pressable
        style={[styles.button, styles.applyButton]}
        onPress={() => navigation.navigate('MyProfile')}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{t('logout')}</Text>
            <Text style={styles.modalTitle}>
           {t('logoutConfirmation')}
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.styleButton, styles.cancelButton]}
                onPress={handleLogout}>
                <Text style={styles.buttonText}>{t('yes')}</Text>
              </Pressable>
              <Pressable
                style={[styles.styleButton, styles.logoutButton]}
                onPress={toggleModal}>
                <Text style={styles.buttonText}>{t('no')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
  },
  listcontainer: {
    flex: 0.8,
    flexDirection: 'column',
    marginTop: 20,
  },
  imageDiv: {
    width: '100%',
    height: 60,
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    flex: 1, // Takes remaining space between image and switch
    marginLeft: 10,
  },
  switch: {
    marginRight: 10,
  },
  arrow: {
    marginRight: 24, // Optional: Adjust the color of the arrow
  },

  button: {
    backgroundColor: '#C0C0C0', // Orange button
    height: '8%',
    top: '10%',
    // marginVertical: 3,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#130160',
    justifyContent: 'center',
    left:'22%',
    top: '10%',
    // paddingVertical:10,
    width: '60%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '50%', // Semi-transparent overlay
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'column', // Arrange buttons vertically
    justifyContent: 'space-between', // Add space between buttons
    width: '100%', // Ensure full width for buttons
    height: 120, // Adjust height to create spacing
  },
  styleButton: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#130160',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
  },
});

export default Setting;
