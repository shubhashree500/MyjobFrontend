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
  ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import config from '../../context/config';

const OrganizationRegn = ({ navigation }: any) => {
  const [step, setStep] = useState<number>(1);
  const [organizationName, setOrganizationName] = useState<string>('');
  const [organizationType, setOrganizationType] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [logo, setLogo] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [socialMediaLink, setSocialMediaLink] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [since, setSince] = useState<Date>(new Date());
  const [showYearPicker, setShowYearPicker] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [tc1, setTc1] = useState<boolean>(false);
  const [tc2, setTc2] = useState<boolean>(false);
  const [tc3, setTc3] = useState<boolean>(false);

  const pickImage = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.assets && response.assets[0].uri) {
        setLogo(response.assets[0].uri);
      }
    });
  };

  const onYearChange = (_event: any, selectedDate?: Date) => {
    setShowYearPicker(false);
    if (selectedDate) {
      setSince(selectedDate);
    }
  };

  const submitData = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.append('organizationName', organizationName);
    formData.append('organizationType', organizationType);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('phoneNo', phoneNo);
    formData.append('email', email);
    formData.append('website', website);
    formData.append('socialMediaLink', socialMediaLink);
    formData.append('industry', industry);
    formData.append('since', since.getFullYear().toString());

    if (logo) {
      formData.append('logo', {
        uri: logo,
        type: 'image/jpeg',
        name: 'logo.jpg',
      } as any);
    }

    try {
      const response = await axios.post(`${config.apiUrl}/organizationDetails/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        Alert.alert(
          'Registration Successful',
          'Your organization details have been submitted successfully!',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      }
    } catch (error: any) {
      console.error('Submission Error:', error.response?.data || error.message);
      Alert.alert(
        'Error',
        'An error occurred while submitting your details. Please try again.',
        [{ text: 'Retry' }]
      );
    }
  };

  const handleNext = () => {
    if (step === 1 && password !== confirmPassword) {
      Alert.alert('Error', 'Password and Confirm Password do not match');
      return;
    }

    if (step === 3 && !termsAccepted) {
      Alert.alert("Error", "Please accept the terms and conditions to proceed.");
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      submitData();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
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
            {[
              { value: organizationName, set: setOrganizationName, placeholder: "Organization Name" },
              { value: organizationType, set: setOrganizationType, placeholder: "Organization Type" },
              { value: password, set: setPassword, placeholder: "Password", secure: true },
              { value: confirmPassword, set: setConfirmPassword, placeholder: "Confirm Password", secure: true },
              { value: address, set: setAddress, placeholder: "Address", multiline: true },
              { value: description, set: setDescription, placeholder: "Description", multiline: true },
              { value: phoneNo, set: setPhoneNo, placeholder: "Phone Number", keyboard: "phone-pad" }
            ].map(({ value, set, placeholder, secure, multiline, keyboard }, index) => (
              <View key={index} style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={placeholder}
                  value={value}
                  onChangeText={set}
                  secureTextEntry={secure}
                  multiline={multiline}
                  keyboardType={keyboard as any}
                  placeholderTextColor="#aaa"
                />
              </View>
            ))}
          </>
        );
      case 2:
        return (
          <>
            {[
              { value: email, set: setEmail, placeholder: "Email", keyboard: "email-address" },
              { value: website, set: setWebsite, placeholder: "Website", keyboard: "url" },
              { value: socialMediaLink, set: setSocialMediaLink, placeholder: "Social Media Link", keyboard: "url" },
              { value: industry, set: setIndustry, placeholder: "Industry" }
            ].map(({ value, set, placeholder, keyboard }, index) => (
              <View key={index} style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={placeholder}
                  value={value}
                  onChangeText={set}
                  keyboardType={keyboard as any}
                  placeholderTextColor="#aaa"
                />
              </View>
            ))}
            <View style={styles.inputContainer}>
              <Pressable onPress={() => setShowYearPicker(true)} style={styles.input}>
                <Text style={styles.yearText}>
                  {since.getFullYear()}
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
          </>
        );
      case 3:
        return (
          <View style={{ marginTop: 16 }}>
            {[
              { label: "We agree to share only authentic and verified company data", state: tc1, set: setTc1 },
              { label: "We comply with data privacy regulations", state: tc2, set: setTc2 },
              { label: "We will not misuse platform resources", state: tc3, set: setTc3 }
            ].map(({ label, state, set }, index) => (
              <Pressable key={index} style={styles.checkboxContainer} onPress={() => set(!state)}>
                <View style={[styles.checkbox, state && styles.checkedBox]} />
                <Text style={styles.checkboxLabel}>{label}</Text>
              </Pressable>
            ))}
            <Pressable style={styles.checkboxContainer} onPress={() => setTermsAccepted(!termsAccepted)}>
              <View style={[styles.checkbox, termsAccepted && styles.checkedBox]} />
              <Text style={[styles.checkboxLabel, { fontWeight: 'bold' }]}>I accept the terms and conditions</Text>
            </Pressable>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${(step / 3) * 100}%` }]} />
        </View>
        <Text style={styles.stepText}>STEP {step}/3</Text>
        <Text style={styles.title}>Tell us Your Organization Details</Text>
        {renderInputs()}
        {step > 1 && (
          <Pressable style={[styles.button, { backgroundColor: '#6c757d', marginTop: 8 }]} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
        )}
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{step === 3 ? 'Submit' : 'Next'}</Text>
        </Pressable>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#fff' },
  progressContainer: { height: 4, backgroundColor: '#e0e0e0', marginBottom: 8 },
  progressBar: { height: 4, backgroundColor: '#007BFF' },
  stepText: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 16 },
  inputContainer: { marginBottom: 12 },
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
  buttonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  logoContainer: { marginBottom: 12, alignItems: 'center' },
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
  logoPickerText: { fontSize: 16, color: '#555' },
  logo: { width: '100%', height: '100%', borderRadius: 60 },
  yearText: { fontSize: 16, color: '#000' },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#888',
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  checkedBox: {
    backgroundColor: '#007BFF',
  },
  checkboxLabel: {
    color: '#000',
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default OrganizationRegn;
