// src/screens/JobSeeker/JobDetailsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type JobDetailsRouteParams = {
  JobDetails: {
    title: string;
    organization: string;
    location: string;
    jobType: string;
    workPlaceType: string;
    experience: number;
    skills: string[];
    description: string;
    applied_at: string;
  };
};

const JobDetailsScreen = () => {
  const route = useRoute<RouteProp<JobDetailsRouteParams, 'JobDetails'>>();
  const job = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.organization}>Company: {job.organization}</Text>
      <Text style={styles.label}>Location: {job.location}</Text>
      <Text style={styles.label}>Type: {job.jobType} ({job.workPlaceType})</Text>
      <Text style={styles.label}>Experience: {job.experience}+ years</Text>
      <Text style={styles.label}>Skills Required:</Text>
      <Text style={styles.text}>{job.skills?.join(', ')}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.text}>{job.description}</Text>
      <Text style={styles.label}>Applied On: {new Date(job.applied_at).toLocaleDateString()}</Text>
    </ScrollView>
  );
};

export default JobDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  organization: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    color: '#555',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
