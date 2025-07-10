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
  ScrollView,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import config from '../../context/config';
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
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [jobSpec, setJobSpec] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [cv, setCv] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, response => {
      console.log('Image Picker Response:', response);
      if (response?.assets?.[0]?.uri) {
        setLogo(response.assets[0].uri);
      }
    });
  };

  const pickCV = () => {
    launchImageLibrary({ mediaType: 'mixed', includeBase64: false }, response => {
      console.log('CV Picker Response:', response);
      if (response?.assets?.[0]?.uri) {
        setCv(response.assets[0].uri);
      }
    });
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      console.log('DOB selected:', formattedDate);
      setDob(formattedDate);
    }
  };

  const validateFields = () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email.');
      return false;
    }
    if (!pin.match(/^\d{6}$/)) {
      Alert.alert('Invalid PIN', 'Please enter a valid 6-digit PIN.');
      return false;
    }
    return true;
  };

  const submitData = async () => {
    if (!validateFields()) return;

    console.log('Preparing data to submit...');
    console.log({
      email,
      password,
      firstName,
      middleName,
      lastName,
      phone,
      gender,
      dob,
      maritalStatus,
      permanentAddress,
      pin,
      primaryJobPreference,
      bio,
      qualification,
      experience,
      jobSpec,
      logo,
      cv,
    });

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('middleName', middleName);
    formData.append('lastName', lastName);
    formData.append('phone', phone);
    formData.append('gender', gender);
    formData.append('dob', dob);
    formData.append('maritalStatus', maritalStatus);
    formData.append('permanentAddress', permanentAddress);
    formData.append('pin', pin);
    formData.append('primaryJobPreference', primaryJobPreference);
    formData.append('bio', bio);
    formData.append('qualification', qualification);
    formData.append('experience', experience);
    formData.append('jobSpec', jobSpec);
    if (logo) formData.append('logo', { uri: logo, type: 'image/jpeg', name: 'logo.jpg' } as any);
    if (cv) formData.append('cv', { uri: cv, type: 'application/pdf', name: 'cv.pdf' } as any);

    try {
      console.log('Sending request to:', `${config.apiUrl}/personalDetails/create`);
      const res = await axios.post(`${config.apiUrl}/personalDetails/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Response:', res.data);
      if (res.status === 201) {
        Alert.alert('Success', 'Details submitted successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.replace('Login'),
          },
        ]);
      }
    } catch (err: any) {
      console.error('Submission Error:', err.response?.data || err.message);
      Alert.alert('Error', 'Failed to submit. Try again.');
    }
  };

  const renderInputs = () => {
    if (step === 1) {
      return (
        <>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Enter Email ID" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" /></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} /></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Middle Name" value={middleName} onChangeText={setMiddleName} /></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} /></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry /></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Phone No." value={phone} onChangeText={setPhone} keyboardType="phone-pad" /></View>
          <Text style={styles.placeholderLabel}>Select Gender</Text>
          <View style={styles.genderContainer}>
            {['Male', 'Female', 'Others'].map(option => (
              <Pressable key={option} style={[styles.genderButton, gender === option && styles.genderButtonSelected]} onPress={() => setGender(option)}>
                <Text style={styles.genderText}>{option}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.inputContainer}><Pressable style={styles.input} onPress={() => setShowDatePicker(true)}><Text style={{ color: dob ? '#000' : '#aaa' }}>{dob || 'Select Date of Birth'}</Text></Pressable>{showDatePicker && <DateTimePicker value={dob ? new Date(dob) : new Date()} mode="date" display="default" onChange={handleDateChange} maximumDate={new Date()} />}</View>
          <Text style={styles.placeholderLabel}>Select Marital Status</Text>
          <View style={styles.maritalContainer}>
            {['Married', 'Unmarried'].map(option => (
              <Pressable key={option} style={[styles.maritalOption, maritalStatus === option && styles.maritalOptionSelected]} onPress={() => setMaritalStatus(option)}>
                <Text style={styles.maritalText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={styles.imageContainer}><Pressable style={styles.imagePicker} onPress={pickImage}>{logo ? <Image source={{ uri: logo }} style={styles.coverImage} /> : <Text style={styles.imagePickerText}>Select Cover Image</Text>}</Pressable></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Permanent Address" value={permanentAddress} onChangeText={setPermanentAddress} multiline /></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="PIN" value={pin} onChangeText={setPin} keyboardType="numeric" /></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Bio" value={bio} onChangeText={setBio} /></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Primary Job Preference" value={primaryJobPreference} onChangeText={setPrimaryJobPreference} /></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Qualification (Optional)" value={qualification} onChangeText={setQualification} /></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Experience (Optional)" value={experience} onChangeText={setExperience} /></View>
          <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Job Specification (Optional)" value={jobSpec} onChangeText={setJobSpec} /></View>
          <View style={styles.inputContainer}><Pressable style={styles.input} onPress={pickCV}><Text style={{ color: cv ? '#000' : '#aaa' }}>{cv ? 'CV Selected' : 'Upload CV (Optional)'}</Text></Pressable></View>
          <Pressable style={styles.backButton} onPress={() => setStep(1)}><Text style={styles.buttonText}>Back</Text></Pressable>
        </>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.progressContainer}><View style={[styles.progressBar, { width: `${(step / 2) * 100}%` }]} /></View>
        <Text style={styles.stepText}>STEP {step}/2</Text>
        <Text style={styles.title}>Tell us Your Details</Text>
        {renderInputs()}
        <Pressable style={styles.button} onPress={() => step === 2 ? submitData() : setStep(step + 1)}>
          <Text style={styles.buttonText}>{step === 2 ? 'Submit' : 'Next'}</Text>
        </Pressable>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#fff' },
  progressContainer: { height: 4, width: '100%', backgroundColor: '#e0e0e0', marginBottom: 8 },
  progressBar: { height: 4, backgroundColor: '#007BFF' },
  stepText: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 16 },
  inputContainer: { marginBottom: 12 },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, backgroundColor: '#fff', fontSize: 16, justifyContent: 'center' },
  genderContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  genderButton: { flex: 1, height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, backgroundColor: '#fff' },
  genderButtonSelected: { backgroundColor: '#007BFF' },
  genderText: { fontSize: 16, color: '#fff' },
  maritalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  maritalOption: { flex: 1, height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, backgroundColor: '#fff' },
  maritalOptionSelected: { backgroundColor: '#007BFF' },
  maritalText: { fontSize: 16, color: '#fff' },
  placeholderLabel: { fontSize: 14, color: '#555', marginBottom: 4 },
  button: { height: 50, backgroundColor: '#007BFF', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 16 },
  backButton: { height: 50, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 16 },
  buttonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  imageContainer: { marginBottom: 12, alignItems: 'center' },
  imagePicker: { height: 200, width: 200, borderColor: '#ddd', borderWidth: 2, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fefefe', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3, marginBottom: 12 },
  coverImage: { height: 200, width: 200, borderRadius: 100, resizeMode: 'cover' },
  imagePickerText: { fontSize: 16, color: '#777', textAlign: 'center' },
});

export default UserRegn;

