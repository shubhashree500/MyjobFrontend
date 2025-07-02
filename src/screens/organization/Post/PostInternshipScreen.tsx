import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const PostInternshipScreen = () => {
  const [role, setRole] = useState('');
  const [stipend, setStipend] = useState('');
  const [duration, setDuration] = useState('');
  const [details, setDetails] = useState('');

  const handlePostInternship = () => {
    if (!role || !stipend || !duration || !details) {
      Alert.alert('Missing Info', 'Please fill in all fields');
      return;
    }

    Alert.alert('Success', 'Internship Posted Successfully!');
    setRole('');
    setStipend('');
    setDuration('');
    setDetails('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Post an Internship</Text>

      <Text style={styles.label}>Role</Text>
      <TextInput style={styles.input} value={role} onChangeText={setRole} placeholder="e.g. Mobile Developer Intern" />

      <Text style={styles.label}>Stipend</Text>
      <TextInput style={styles.input} value={stipend} onChangeText={setStipend} placeholder="e.g. ₹8,000/month" keyboardType="numeric" />

      <Text style={styles.label}>Duration</Text>
      <TextInput style={styles.input} value={duration} onChangeText={setDuration} placeholder="e.g. 3 months" />

      <Text style={styles.label}>Internship Details</Text>
      <TextInput style={[styles.input, styles.textArea]} multiline value={details} onChangeText={setDetails} placeholder="Responsibilities, Requirements, etc." />

      <TouchableOpacity style={styles.button} onPress={handlePostInternship}>
        <Text style={styles.buttonText}>Post Internship</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostInternshipScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  label: { marginTop: 15, fontSize: 14, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginTop: 5 },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#2563EB', padding: 15, borderRadius: 10, marginTop: 30 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
