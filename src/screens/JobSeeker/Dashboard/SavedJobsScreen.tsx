import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import apiConfig from '../../../context/config';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useFocusEffect } from '@react-navigation/native'; // ✅ Add this

interface Job {
  id?: number;
  degName: string;
  jobType?: string;
  savedDate?: string;
  organization: {
    organizationName: string;
    address: string;
  };
}

const SavedJobsScreen = () => {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) return;

    try {
      setLoading(true);
      const res = await axios.get(`${apiConfig.apiUrl}/savedjob/get/${userId}`);
      const saved = res.data.savedJobs.map((entry: any) => ({
        id: entry.jobId,
        degName: entry.jobDetails?.degName || 'N/A',
        jobType: entry.jobDetails?.jobType || 'N/A',
        savedDate: entry.createdAt || '',
        organization: {
          organizationName: entry.jobDetails?.organization?.organizationName || 'Unknown Org',
          address: entry.jobDetails?.jobLocation || 'No address',
        },
      }));
      setAllJobs(saved);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Refetch every time screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchSavedJobs();
    }, [])
  );

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleUnsave = async (jobId?: number) => {
    const userId = await AsyncStorage.getItem('userId');
    if (!jobId || !userId) return;

    try {
      await axios.delete(`${apiConfig.apiUrl}/savedjob/delete/${userId}/${jobId}`);
      setAllJobs(prev => prev.filter(job => job.id !== jobId));
    } catch (error) {
      Alert.alert('Error', 'Failed to unsave job.');
    }
  };

  const renderRightActions = (jobId?: number) => (
    <TouchableOpacity
      style={styles.unsaveButton}
      onPress={() => handleUnsave(jobId)}
    >
      <Text style={styles.unsaveText}>Unsave</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Job }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.degName}</Text>
        <Text>{item.organization.organizationName}</Text>
        <Text>{item.organization.address} • {item.jobType}</Text>
        {item.savedDate && (
          <Text style={styles.dateText}>📅 Saved on {formatDate(item.savedDate)}</Text>
        )}
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>❤️ Saved Jobs</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : allJobs.length > 0 ? (
        <FlatList
          data={allJobs}
          keyExtractor={item => item.id?.toString() || ''}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.empty}>No saved jobs found.</Text>
      )}
    </View>
  );
};

export default SavedJobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateText: {
    marginTop: 6,
    fontSize: 13,
    color: '#666',
  },
  unsaveButton: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 10,
    marginVertical: 4,
  },
  unsaveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#888',
  },
});
