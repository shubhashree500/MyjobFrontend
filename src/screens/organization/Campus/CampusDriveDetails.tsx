import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CampusDriveDetails = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campus Drive Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>College Name:</Text>
        <Text style={styles.value}>CV Raman Global University</Text>

        <Text style={styles.label}>Date & Time:</Text>
        <Text style={styles.value}>12th July 2025, 10:00 AM</Text>

        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>Bhubaneswar, Odisha</Text>

        <Text style={styles.label}>Eligible Branches:</Text>
        <Text style={styles.value}>CSE, IT, ECE</Text>

        <Text style={styles.label}>Experience Required:</Text>
        <Text style={styles.value}>Fresher / 0-1 Years</Text>

        <Text style={styles.label}>Skills Required:</Text>
        <Text style={styles.value}>JavaScript, React, Node.js</Text>

        <Text style={styles.label}>Job Description:</Text>
        <Text style={styles.value}>
          Looking for energetic and passionate developers to join our backend and frontend teams. Must have strong problem-solving skills and good communication.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CampusDriveDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF3FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    color: '#007BFF',
    marginRight: 10,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
  },
});
