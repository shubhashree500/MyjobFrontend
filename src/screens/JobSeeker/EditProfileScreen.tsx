import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// 🔒 Define all valid field keys as a union
type FieldName =
  | 'name' | 'email' | 'phone' | 'location' | 'dob' | 'gender' | 'nationality'
  | 'skills' | 'languages' | 'linkedin' | 'github' | 'portfolio'
  | 'resume' | 'jobType' | 'expectedSalary' | 'relocate';

// 🔐 Define values type explicitly for Formik
type FormValues = {
  [key in FieldName]: string;
};

const EditProfileScreen = () => {
  const initialValues: FormValues = {
    name: 'Shree Patel',
    email: 'shree.jobseeker@email.com',
    phone: '+91 9876543210',
    location: 'Mumbai, India',
    dob: '1998-06-21',
    gender: 'Male',
    nationality: 'Indian',
    skills: 'React Native, JavaScript',
    languages: 'English, Hindi',
    linkedin: 'https://linkedin.com/in/shreepatel',
    github: 'https://github.com/shreepatel',
    portfolio: 'https://shreepatel.dev',
    resume: 'Uploaded',
    jobType: 'Full-Time',
    expectedSalary: '₹8 LPA',
    relocate: 'Yes',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    location: Yup.string().required('Location is required'),
    dob: Yup.string().required('DOB is required'),
    gender: Yup.string().required('Gender is required'),
    nationality: Yup.string().required('Nationality is required'),
  });

  const fields: { label: string; field: FieldName; keyboardType?: 'default' | 'email-address' | 'phone-pad' }[] = [
    { label: 'Name', field: 'name' },
    { label: 'Email', field: 'email', keyboardType: 'email-address' },
    { label: 'Phone', field: 'phone', keyboardType: 'phone-pad' },
    { label: 'Location', field: 'location' },
    { label: 'Date of Birth', field: 'dob' },
    { label: 'Gender', field: 'gender' },
    { label: 'Nationality', field: 'nationality' },
    { label: 'Skills', field: 'skills' },
    { label: 'Languages', field: 'languages' },
    { label: 'LinkedIn URL', field: 'linkedin' },
    { label: 'GitHub URL', field: 'github' },
    { label: 'Portfolio URL', field: 'portfolio' },
    { label: 'Job Type', field: 'jobType' },
    { label: 'Expected Salary', field: 'expectedSalary' },
    { label: 'Willing to Relocate', field: 'relocate' },
  ];

  const handleResumeUpload = () => {
    Alert.alert('Upload Resume', 'This will open a file picker (mocked).');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out (mock).');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.header}>Edit Profile</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            Alert.alert('Profile Updated', JSON.stringify(values, null, 2));
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              {fields.map(({ label, field, keyboardType }) => (
                <View key={field} style={styles.inputGroup}>
                  <Text style={styles.label}>{label}</Text>
                  <TextInput
                    style={styles.input}
                    value={values[field]}
                    onChangeText={handleChange(field)}
                    onBlur={handleBlur(field)}
                    keyboardType={keyboardType || 'default'}
                  />
                  {touched[field] && errors[field] && (
                    <Text style={styles.error}>{errors[field]}</Text>
                  )}
                </View>
              ))}

              <TouchableOpacity style={styles.uploadButton} onPress={handleResumeUpload}>
                <Text style={styles.uploadText}>Upload Resume</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleSubmit as any}>
                <Text style={styles.saveText}>Save Changes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  formContainer: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 2,
  },
  uploadButton: {
    backgroundColor: '#E0F7FA',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  uploadText: {
    color: '#00796B',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FFCDD2',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#C62828',
    fontWeight: '600',
    fontSize: 16,
  },
});


