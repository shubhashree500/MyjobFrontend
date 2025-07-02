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

const PostCampusScreen = () => {
  const [eventName, setEventName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [requirements, setRequirements] = useState('');

  const handlePostCampus = () => {
    if (!eventName || !collegeName || !eventDate || !requirements) {
      Alert.alert('Missing Info', 'Please fill in all fields');
      return;
    }

    Alert.alert('Success', 'Campus Drive Posted Successfully!');
    setEventName('');
    setCollegeName('');
    setEventDate('');
    setRequirements('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Post a Campus Drive</Text>

      <Text style={styles.label}>Event Name</Text>
      <TextInput style={styles.input} value={eventName} onChangeText={setEventName} placeholder="e.g. Tech Drive" />

      <Text style={styles.label}>College Name</Text>
      <TextInput style={styles.input} value={collegeName} onChangeText={setCollegeName} placeholder="e.g. IIT Delhi" />

      <Text style={styles.label}>Event Date</Text>
      <TextInput style={styles.input} value={eventDate} onChangeText={setEventDate} placeholder="e.g. 01-08-2025" />

      <Text style={styles.label}>Requirements</Text>
      <TextInput style={[styles.input, styles.textArea]} multiline value={requirements} onChangeText={setRequirements} placeholder="e.g. BE/BTech, CSE, etc." />

      <TouchableOpacity style={styles.button} onPress={handlePostCampus}>
        <Text style={styles.buttonText}>Post Campus Drive</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostCampusScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  label: { marginTop: 15, fontSize: 14, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginTop: 5 },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#2563EB', padding: 15, borderRadius: 10, marginTop: 30 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
