import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import apiConfig from '../../../context/config';

type Job = {
  id: string;
  degName: string;
  jobLocation: string;
  createdAt: string;
  yearsOfExperience: number;
};

const ManageJobsScreen = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJobs = async () => {
    console.log('🔄 Fetching jobs...');
    try {
      const response = await axios.get(`${apiConfig.apiUrl}/postedjob/getAll`);
      const data: Job[] = response.data.data;
      console.log('✅ Fetched jobs:', data);
      setJobs(data);
    } catch (error: any) {
      // If there are simply no jobs, the backend returns 404 → treat as empty list
      if (error.response?.status === 404) {
        console.log('⚠️ No jobs found—showing empty list');
        setJobs([]);
      } else {
        console.error('❌ Fetch Jobs Error:', error.message || error);
        Alert.alert('Error', 'Failed to fetch jobs.');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this job?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          console.log(`🗑️ Deleting job with ID: ${id}`);
          try {
            await axios.delete(`${apiConfig.apiUrl}/postedjob/delete/${id}`);
            console.log('✅ Job deleted successfully');
            fetchJobs(); // Refresh after delete
          } catch (error: any) {
            console.error('❌ Delete Job Error:', error.message || error);
            Alert.alert('Error', 'Failed to delete job.');
          }
        },
      },
    ]);
  };

  const renderJobItem = ({ item }: { item: Job }) => (
    <View style={styles.card}>
      <Text style={styles.titleText}>{item.degName}</Text>
      <Text style={styles.subText}>📍 {item.jobLocation}</Text>
      <Text style={styles.subText}>
        📅 Posted on: {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.subText}>
        🕒 Experience: {item.yearsOfExperience} yrs
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.btn, styles.editBtn]}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.viewBtn]}>
          <Text style={styles.btnText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.deleteBtn]}
          onPress={() => deleteJob(item.id)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>🛠️ Manage Posted Jobs</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={renderJobItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No jobs posted yet.</Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default ManageJobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F8FB',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1E40AF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subText: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  btn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  editBtn: {
    backgroundColor: '#2563EB',
  },
  viewBtn: {
    backgroundColor: '#10B981',
  },
  deleteBtn: {
    backgroundColor: '#EF4444',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
    color: '#777',
  },
});
