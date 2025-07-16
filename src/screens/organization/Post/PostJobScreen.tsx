import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../context/config';

const PostJobScreen = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [secName, setSecName] = useState('');
  const [skills, setSkills] = useState('');
  const [requirements, setRequirements] = useState('');
  const [jobType, setJobType] = useState('');
  const [workPlaceType, setWorkPlaceType] = useState('');
  const [compId, setCompId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompId = async () => {
      try {
        // First try orgId (organization login), fallback to userId (job seeker)
        const orgId = await AsyncStorage.getItem('orgId');
        if (orgId) {
          setCompId(orgId.trim());
        } else {
          const userId = await AsyncStorage.getItem('userId');
          if (userId) {
            setCompId(userId.trim());
          } else {
            Alert.alert('Error', 'Company ID not found. Please login again.');
          }
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to load company ID');
      }
    };
    fetchCompId();
  }, []);

  const handlePostJob = async () => {
    if (
      !title ||
      !desc ||
      !location ||
      !salary ||
      !experience ||
      !compId ||
      !secName ||
      !skills ||
      !requirements ||
      !jobType ||
      !workPlaceType
    ) {
      Alert.alert('Missing Info', 'Please fill in all fields');
      return;
    }

    const jobData = {
      compId: compId, // already trimmed when set in state
      degName: title,
      secName,
      jobLocation: location,
      skills: skills.split(',').map((s) => s.trim()),
      jobDescription: desc,
      yearsOfExperience: parseInt(experience),
      requirements: requirements.split(',').map((r) => r.trim()),
      jobType,
      workPlaceType,
      status: 1,
    };

    console.log('📤 Posting Job Data:', jobData);

    try {
      const response = await axios.post(`${config.apiUrl}/postedjob/create`, jobData);
      console.log('✅ Post Response:', response.data);

      if (response.data.success) {
        Alert.alert('Success', 'Job Posted Successfully!');
        // Clear fields
        setTitle('');
        setDesc('');
        setLocation('');
        setSalary('');
        setExperience('');
        setSecName('');
        setSkills('');
        setRequirements('');
        setJobType('');
        setWorkPlaceType('');
      } else {
        Alert.alert('Error', response.data.message || 'Job post failed');
      }
    } catch (error: any) {
      console.error('❌ Error posting job:', error.message);
      if (error.response) {
        console.log('🔴 Error Response:', error.response.data);
        Alert.alert('Error', error.response.data.message || 'Failed to post job.');
      } else {
        Alert.alert('Error', 'Failed to post job. Please try again.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Post a Job</Text>

      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Developer"
      />

      <Text style={styles.label}>Sector Name</Text>
      <TextInput
        style={styles.input}
        value={secName}
        onChangeText={setSecName}
        placeholder="e.g. IT"
      />

      <Text style={styles.label}>Job Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        value={desc}
        onChangeText={setDesc}
        placeholder="Job details..."
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="e.g. Delhi"
      />

      <Text style={styles.label}>Salary</Text>
      <TextInput
        style={styles.input}
        value={salary}
        onChangeText={setSalary}
        placeholder="e.g. ₹6,00,000"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Experience (Years)</Text>
      <TextInput
        style={styles.input}
        value={experience}
        onChangeText={setExperience}
        placeholder="e.g. 2"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Skills (comma-separated)</Text>
      <TextInput
        style={styles.input}
        value={skills}
        onChangeText={setSkills}
        placeholder="e.g. React Native, Communication"
      />

      <Text style={styles.label}>Requirements (comma-separated)</Text>
      <TextInput
        style={styles.input}
        value={requirements}
        onChangeText={setRequirements}
        placeholder="e.g. Problem Solving, Communication"
      />

      <Text style={styles.label}>Job Type</Text>
      <TextInput
        style={styles.input}
        value={jobType}
        onChangeText={setJobType}
        placeholder="e.g. Full-Time"
      />

      <Text style={styles.label}>Workplace Type</Text>
      <TextInput
        style={styles.input}
        value={workPlaceType}
        onChangeText={setWorkPlaceType}
        placeholder="e.g. Onsite / Remote / Hybrid"
      />

      <TouchableOpacity style={styles.button} onPress={handlePostJob}>
        <Text style={styles.buttonText}>Post Job</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostJobScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  label: { marginTop: 15, fontSize: 14, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginTop: 5 },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#2563EB', padding: 15, borderRadius: 10, marginTop: 30 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
