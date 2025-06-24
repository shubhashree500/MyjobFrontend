import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import config  from "../../context/config";
import translations from '../../utils/profile';
import { useLanguageContext } from '../../context/LanguageContext';
import { Root, Popup } from 'popup-ui';

const OrganizationProfile = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    organizationName:'',
    email:'',
    phoneNo: '',
    address: '',
    description: '',
    website: '',
    socialMediaLink: '',
    industry: '',
    since: '',
    specialization: '',
  });

  const { language } = useLanguageContext();
  const t = (key:any) => translations[language][key] || key;


  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('userToken');
      const id = await AsyncStorage.getItem('userId');
      const response = await axios.get(`${config.apiUrl}/organizationDetails/get/${id}`);
      if (response.status === 200) {
        // setUserData(response.data.data);

        if (response.status === 200) {

          const data = response.data;
          setUserData({
            organizationName: data.organizationName || '',
            email: data.email || '',
            phoneNo: data.phoneNo || '',
            address: data.address || '',
            description: data.description || '',
            website: data.website || '',
            socialMediaLink: data.socialMediaLink || '',
            industry: data.industry || '',
            since: data.since || '',
            specialization: data.specialization || '',
            logoUrl: data.logo ? `${config.apiUrl}/photo/${data.logo}` : '',
          });
        }
        
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Alert.alert('Error', 'Failed to load user data.');
      Popup.show({
        type: 'Danger',
                          title: ' Failed',
                          textBody: 'Failed to load user data',
                          button: true,
                          buttonText: 'Ok',
                          callback: () => Popup.hide(),
      });
    }
  };

  // Popup.show({
  //           type: 'Success',
  //           title: 'Login Successful',
  //           textBody: 'You have successfully logged in!',
  //           button: true,
  //           buttonText: 'Ok',
  //           callback: () => {
  //             Popup.hide();
  //             navigation.replace(isJobSeeker ? 'HomeScreen' : 'Organization');
  //           },
  //         });
  //          Popup.show({
  //                   type: 'Danger',
  //                   title: 'Login Failed',
  //                   textBody: message,
  //                   button: true,
  //                   buttonText: 'Ok',
  //                   callback: () => Popup.hide(),
  //                 });


  const handleSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('userToken');
      const id = await AsyncStorage.getItem('userId');
      console.log("iddd",id)
      const response = await axios.put(
        `${config.apiUrl}/organizationDetails/update/${id}`,
        { ...userData, id },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.status === 200) {
        // Alert.alert('Success', 'Profile updated successfully');
        Popup.show({
          type: 'Success',
        title: 'Success',
        textBody: 'Profile updated successfully.',
        button: true,
        buttonText: 'Ok',
        callback: () => {
                            Popup.hide();
                            navigation.replace('OrganizationProfile');
                          },
        })
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      // Alert.alert('Error', 'Failed to update profile.');
      Popup.show({
        title: 'Error',
        content: 'Failed to update profile.',
        button: true,
                buttonText: 'Ok',
                callback: () => Popup.hide(),
      });
    }
  };
  

 


  const renderField = (
    label: string,
    value: string,
    icon: any,
    key: string,
    isEditable: boolean = true
  ) => (
    <View style={styles.fieldContainer}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.fieldContent}>
        <Text style={styles.fieldLabel}>{label}:</Text>
        {isEditing && isEditable ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => setUserData({ ...userData, [key]: text })}
          />
        ) : (
          <Text style={styles.fieldValue}>{value || 'N/A'}</Text>
        )}
      </View>
    </View>
  );
  return (
    
<Root>
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
    {/* Header Section */}
    <View style={styles.header}>
      <Image
        source={require('../../assets/icons/Background.png')}
        style={styles.headerImage}
      />
      <View style={styles.headerOverlay}>
        <Pressable onPress={() => navigation.navigate('Organization')} style={styles.backButton}>
          <Image source={require('../../assets/icons/whiteback.png')} />
        </Pressable>
        <View style={styles.rightButtons}>
         
          <Pressable onPress={() => navigation.navigate('Setting')}>
            <Image source={require('../../assets/icons/Iconsetting.png')} />
          </Pressable>
        </View>
      </View>
    </View>

    {/* Profile Section */}
    <View style={styles.profileContainer}>
      <Image
        source={{ uri: userData?.logoUrl }}
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{userData.organizationName}</Text>
        <Text style={styles.profileEmail}>{userData.email}</Text>
      </View>
      <Pressable
        style={styles.editButton}
        onPress={() => setIsEditing(!isEditing)}
      >
      <Text style={styles.editButtonText}>
          {isEditing ? t('cancel') : t('editprofile')}
        </Text>
      </Pressable>
    </View>

    {/* Form Section */}
    <ScrollView style={styles.formContainer}>
  {renderField(t('phone'), userData.phoneNo, require('../../assets/icons/ph.png'), 'phoneNo')}
  {renderField(t('description'), userData.description, require('../../assets/icons/about.png'), 'description')}
  {renderField(t('address'), userData.address, require('../../assets/icons/loc.png'), 'address')}
  {renderField(t('website'), userData.website, require('../../assets/icons/connections.png'), 'website')}
  {renderField(t('social Media Link'), userData.socialMediaLink, require('../../assets/icons/link.png'), 'socialMediaLink')}
  {renderField(t('industry'), userData.industry, require('../../assets/icons/industry.png'), 'industry')}
  {renderField(t('specialization'), userData.specialization, require('../../assets/icons/specialization.png'), 'specialization')}
  {renderField(t('since'), userData.since, require('../../assets/icons/sience.png'), 'since')}
</ScrollView>

    {/* Save Button */}
    {isEditing && (
     <Pressable style={styles.saveButton}
     onPress={handleSave}
     >
      <Text style={styles.saveButtonText}>{t('savechanges')}</Text>
    </Pressable>
    )}
  </SafeAreaView>
  </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    flex: .9,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    padding: 10,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -70,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: "white",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5, // Elevation for Android shadow
  },
  
  profileInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#777',
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#130160',
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    fontSize: 16,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
  },
  saveButton: {
    backgroundColor: '#130160',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrganizationProfile;

