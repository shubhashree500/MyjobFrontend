import React, { useEffect, useState, useCallback } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import config from '../../../context/config';

type Job = {
  id: string;
  title: string;
  organization: string;
  location?: string;
  jobType?: string;
  workPlaceType?: string;
  experience?: number;
  skills?: string[];
  description?: string;
  applied_at: string;
  status: 'Pending' | 'Reviewed' | 'Interview' | 'Rejected' | 'Accepted';
};

const AppliedJobsScreen = () => {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<any>();

  const fetchAppliedJobs = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        throw new Error('User not authenticated. Token is missing.');
      }

      const response = await axios.get(`${config.apiUrl}/jobApplication/applied-jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppliedJobs(response.data.applications || []);
    } catch (error: any) {
      console.error('❌ Error fetching applied jobs:', error);
      setError(error.message || 'Failed to fetch applied jobs.');
    } finally {
      setLoading(false);
    }
  };

  const withdrawApplication = async (jobId: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      await axios.delete(`${config.apiUrl}/jobApplication/withdraw/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppliedJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (error: any) {
      console.error('❌ Error withdrawing application:', error.message);
    }
  };

  const confirmWithdraw = (jobId: string) => {
    Alert.alert(
      'Withdraw Application',
      'Are you sure you want to withdraw this application?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Withdraw',
          style: 'destructive',
          onPress: () => withdrawApplication(jobId),
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchAppliedJobs();
    }, [])
  );

  const renderItem = ({ item }: { item: Job }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('JobDetails', { job: item })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.organization}</Text>
      <Text style={styles.location}>{item.location}</Text>

      <View style={styles.row}>
        <Text style={styles.date}>
          Applied: {new Date(item.applied_at).toLocaleDateString()}
        </Text>
        <View style={[styles.statusChip, getStatusStyle(item.status)]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => confirmWithdraw(item.id)}
        style={styles.withdrawButton}
      >
        <Text style={styles.withdrawText}>Withdraw</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const getStatusStyle = (status: Job['status']) => {
    switch (status) {
      case 'Pending':
        return { backgroundColor: '#FFD700' };
      case 'Reviewed':
        return { backgroundColor: '#87CEEB' };
      case 'Interview':
        return { backgroundColor: '#9370DB' };
      case 'Rejected':
        return { backgroundColor: '#FF6B6B' };
      case 'Accepted':
        return { backgroundColor: '#32CD32' };
      default:
        return { backgroundColor: '#ccc' };
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  if (appliedJobs.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>You haven’t applied to any jobs yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Applied Jobs</Text>
      <FlatList
        data={appliedJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      />
    </View>
  );
};

export default AppliedJobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    color: '#333',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  location: {
    fontSize: 15,
    color: '#777',
    marginTop: 2,
  },
  date: {
    fontSize: 13,
    color: '#888',
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusChip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  withdrawButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  withdrawText: {
    color: '#d11a2a',
    fontWeight: '600',
    fontSize: 13,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
