import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import config from '../../context/config';
import { Root, Popup } from 'popup-ui';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const UserRegn = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [pin, setPin] = useState('');
  const [bio, setBio] = useState('');
  const [primaryJobPreference, setPrimaryJobPreference] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      setDob(formatted);
    }
  };

  const submitData = async () => {
    try {
      if (!dob || dob.trim() === '') {
        Popup.show({
          type: 'Danger',
          title: 'Validation Error',
          textBody: 'Date of Birth is required.',
          button: true,
          buttonText: 'Ok',
          callback: () => Popup.hide(),
        });
        return;
      }

      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('firstName', firstName);
      formData.append('middleName', middleName);
      formData.append('lastName', lastName);
      formData.append('phone', phone);
      formData.append('gender', gender);
      formData.append('dob', dob); // already formatted as YYYY-MM-DD
      formData.append('maritalStatus', maritalStatus);
      formData.append('permanentAddress', permanentAddress);
      formData.append('pin', pin);
      formData.append('primaryJobPreference', primaryJobPreference);
      formData.append('bio', bio);

      if (logo) {
        formData.append('logo', {
          uri: logo,
          type: 'image/jpeg',
          name: 'logo.jpg',
        } as any);
      }

      const response = await axios.post(
        `${config.apiUrl}/personalDetails/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        Popup.show({
          type: 'Success',
          title: 'Successful',
          textBody: 'Your details have been submitted successfully!',
          button: true,
          buttonText: 'Ok',
          callback: () => {
            Popup.hide();
            navigation.replace('Login');
          },
        });
      } else {
        throw new Error('Failed to submit data.');
      }
    } catch (error: any) {
      console.error(
        'Error submitting data:',
        error.response ? error.response.data : error.message
      );
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
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Email ID"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your First Name"
                placeholderTextColor="#aaa"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your Middle Name"
                placeholderTextColor="#aaa"
                value={middleName}
                onChangeText={setMiddleName}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your Last Name"
                placeholderTextColor="#aaa"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Phone no."
                placeholderTextColor="#aaa"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.genderContainer}>
              {['Male', 'Female', 'Others'].map(option => (
                <Pressable
                  key={option}
                  style={[
                    styles.genderButton,
                    gender === option && styles.genderButtonSelected,
                  ]}
                  onPress={() => setGender(option)}>
                  <Text style={styles.genderText}>{option}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.inputContainer}>
              <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
                <Text style={{ color: dob ? '#000' : '#aaa', fontSize: 16 }}>
                  {dob || 'Select Date of Birth'}
                </Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={dob ? new Date(dob) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>
            <View style={styles.maritalContainer}>
              {['Married', 'Unmarried'].map(option => (
                <Pressable
                  key={option}
                  style={[
                    styles.maritalOption,
                    maritalStatus === option && styles.maritalOptionSelected,
                  ]}
                  onPress={() => setMaritalStatus(option)}>
                  <Text style={styles.maritalText}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </>
        );
      case 2:
        return (
          <>
            <View style={styles.imageContainer}>
              <Pressable style={styles.imagePicker} onPress={pickImage}>
                {logo ? (
                  <Image source={{ uri: logo }} style={styles.coverImage} />
                ) : (
                  <Text style={styles.imagePickerText}>Select Cover Image</Text>
                )}
              </Pressable>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Permanent Address"
                placeholderTextColor="#aaa"
                value={permanentAddress}
                onChangeText={setPermanentAddress}
                multiline
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="PIN"
                placeholderTextColor="#aaa"
                value={pin}
                onChangeText={setPin}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Bio"
                placeholderTextColor="#aaa"
                value={bio}
                onChangeText={setBio}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Primary Job Preference"
                placeholderTextColor="#aaa"
                value={primaryJobPreference}
                onChangeText={setPrimaryJobPreference}
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
          <Text style={styles.title}>Tell us Your Details</Text>
          {renderInputs()}
          <Pressable style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>{step === 2 ? 'Submit' : 'Next'}</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  progressContainer: { height: 4, width: '100%', backgroundColor: '#e0e0e0', marginBottom: 8 },
  progressBar: { height: 4, backgroundColor: '#007BFF' },
  stepText: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 16 },
  inputContainer: { marginBottom: 12 },
  input: {
    height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8,
    paddingHorizontal: 16, backgroundColor: '#fff', fontSize: 16, justifyContent: 'center',
  },
  genderContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  genderButton: {
    flex: 1, height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, backgroundColor: '#fff',
  },
  genderButtonSelected: { backgroundColor: '#007BFF' },
  genderText: { fontSize: 16, color: '#555' },
  maritalContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 16 },
  maritalOption: {
    flex: 1, height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, backgroundColor: '#fff',
  },
  maritalOptionSelected: { backgroundColor: '#007BFF' },
  maritalText: { fontSize: 16, color: '#555' },
  button: {
    height: 50, backgroundColor: '#007BFF', justifyContent: 'center',
    alignItems: 'center', borderRadius: 8, marginTop: 16,
  },
  buttonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  imageContainer: { marginBottom: 12, alignItems: 'center' },
  imagePicker: {
    height: 200, width: 200, borderColor: '#ddd', borderWidth: 2, borderRadius: 100,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#fefefe',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 3, marginBottom: 12,
  },
  coverImage: { height: 200, width: 200, borderRadius: 100, resizeMode: 'cover' },
  imagePickerText: { fontSize: 16, color: '#777', textAlign: 'center' },
});

export default UserRegn;
