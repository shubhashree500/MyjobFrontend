import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const PostScreen = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');

  const handlePostJob = () => {
    if (!title || !desc || !location || !salary || !experience) {
      Alert.alert('Missing Info', 'Please fill in all fields');
      return;
    }

    Alert.alert('Success', 'Job Posted Successfully!');
    // Reset the form
    setTitle('');
    setDesc('');
    setLocation('');
    setSalary('');
    setExperience('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Post a New Job</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Job Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Frontend Developer"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Job Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the job responsibilities..."
            value={desc}
            onChangeText={setDesc}
            placeholderTextColor="#888"
            multiline
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Bengaluru"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Salary (Annual)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. ₹6,00,000"
            value={salary}
            onChangeText={setSalary}
            placeholderTextColor="#888"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Experience Required</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 2-4 years"
            value={experience}
            onChangeText={setExperience}
            placeholderTextColor="#888"
          />

          <TouchableOpacity style={styles.button} onPress={handlePostJob}>
            <Text style={styles.buttonText}>Post Job</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E6F0FF',
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderColor: '#CBD5E0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#111827',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
