import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import config  from "../../context/config";
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Root, Popup } from 'popup-ui';

const OrganizationRegn = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const [organizationName, setOrganizationName] = useState('');
  const [password, setPassword] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [socialMediaLink, setSocialMediaLink] = useState('');
  const [industry, setIndustry] = useState('');
  const [since, setSince] = useState(new Date());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [specialization, setSpecialization] = useState('');

  const pickImage = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setLogo(response.assets[0].uri);
      }
    });
  };

  const onYearChange = (event: any, selectedDate: Date | undefined) => {
    setShowYearPicker(false);
    if (selectedDate) {
      setSince(selectedDate);
    }
  };

  const submitData = async () => {
    const formData = new FormData();
    formData.append('organizationName', organizationName);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('phoneNo', phoneNo);
    formData.append('email', email);
    formData.append('website', website);
    formData.append('socialMediaLink', socialMediaLink);
    formData.append('industry', industry);
    formData.append('since', since.getFullYear().toString());
    formData.append('specialization', specialization);
  
    // Append the logo if it exists
    if (logo) {
      const logoData = {
        uri: logo,
        type: 'image/jpeg', // Set the appropriate type based on the image format
        name: 'logo.jpg', // Provide a name for the image
      };
      formData.append('logo', logoData);
    }
  
    try {
      const response = await axios.post(
        (`${config.apiUrl}/organizationDetails/create`),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
          },
        }
      );
  
      if (response.status === 201) {
        // Alert.alert(
        //   'Success',
        //   'Your organization details have been submitted successfully!'
        // );
     Popup.show({
  type: 'Success',
  title: 'Registration Successful',
  textBody: <Text>Your organization details have been submitted successfully!</Text>,
  button: true,
  buttonText: <Text>Ok</Text>,
  callback: () => {
    Popup.hide();
    navigation.navigate('Login');
  },
});
        // navigation.navigate('Login');
      } else {
        throw new Error('Failed to submit data.');
      }
    } catch (error: any) {
      console.error('Error submitting data:', error.response ? error.response.data : error.message);
      // Alert.alert(
      //   'Error',
      //   'An error occurred while submitting your details. Please try again.'
      // );
      Popup.show({
        type: 'Danger',
        title: 'Error',
        textBody: 'An error occurred while submitting your details. Please try again.',
        button: true,
        buttonText: 'Retry',
        callback: () => Popup.hide(),
      });
    }
  };
  

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      submitData();
    }
  };

  const renderInputs = () => {
    switch (step) {
      case 1:
        return (
          <>
             <View style={styles.logoContainer}>
              <Pressable style={styles.logoPicker} onPress={pickImage}>
                {logo ? (
                  <Image source={{ uri: logo }} style={styles.logo} />
                ) : (
                  <Text style={styles.logoPickerText}>Select Logo</Text>
                )}
              </Pressable>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Organization Name"
                placeholderTextColor="#aaa"
                value={organizationName}
                onChangeText={setOrganizationName}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="#aaa"
                value={address}
                onChangeText={setAddress}
                multiline
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#aaa"
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#aaa"
                value={phoneNo}
                onChangeText={setPhoneNo}
                keyboardType="phone-pad"
              />
            </View>
          </>
        );
      case 2:
        return (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Website"
                placeholderTextColor="#aaa"
                value={website}
                onChangeText={setWebsite}
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Social Media Link"
                placeholderTextColor="#aaa"
                value={socialMediaLink}
                onChangeText={setSocialMediaLink}
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Industry"
                placeholderTextColor="#aaa"
                value={industry}
                onChangeText={setIndustry}
              />
            </View>
            <View style={styles.inputContainer}>
              <Pressable onPress={() => setShowYearPicker(true)} style={styles.input}>
                <Text style={styles.yearText}>
                  {since ? since.getFullYear().toString() : 'Select Year'}
                </Text>
              </Pressable>
              {showYearPicker && (
                <DateTimePicker
                  value={since}
                  mode="date"
                  display="spinner"
                  onChange={onYearChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Specialization"
                placeholderTextColor="#aaa"
                value={specialization}
                onChangeText={setSpecialization}
              />
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Root>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${(step / 2) * 100}%` }]} />
        </View>
        <Text style={styles.stepText}>STEP {step}/2</Text>

        <Text style={styles.title}>Tell us Your Organization Details</Text>

        {renderInputs()}

        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {step === 2 ? 'Submit' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
    </Root>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    progressContainer: {
      height: 4,
      width: '100%',
      backgroundColor: '#e0e0e0',
      marginBottom: 8,
    },
    progressBar: {
      height: 4,
      backgroundColor: '#007BFF',
    },
    stepText: {
      fontSize: 14,
      color: '#555',
      textAlign: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 16,
    },
    inputContainer: {
      marginBottom: 12,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
      fontSize: 16,
      color: '#000',
      justifyContent: 'center',
    },
    button: {
      height: 50,
      backgroundColor: '#007BFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 16,
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
    logoContainer: {
      marginBottom: 12,
      alignItems: 'center',
    },
    logoPicker: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderColor: '#ccc',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      overflow: 'hidden',
    },
    logoPickerText: {
      fontSize: 16,
      color: '#555',
    },
    logo: {
      width: '100%',
      height: '100%',
      borderRadius: 60,
    },
    yearText: {
      fontSize: 16,
      color: '#000',
    },
  });
  

export default OrganizationRegn;

