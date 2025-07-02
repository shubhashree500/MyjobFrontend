import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios, { AxiosResponse } from 'axios';
import apiConfig from '../../../context/config';

type Job = {
  id?: number;
  degName: string;
  skills?: string[]; // Optional to prevent runtime crash
  organization: {
    organizationName: string;
    logo: string;
    address: string;
  };
};

const ActiveJobsScreen = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJobs = async () => {
    try {
      const response: AxiosResponse<{ data: Job[] }> = await axios.get(
        `${apiConfig.apiUrl}/postedjob/getAll`
      );

      console.log('Fetched jobs:', response.data.data);
      setJobs(response.data.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching jobs:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderJobItem = ({ item }: { item: Job }) => {
    const skillsDisplay = Array.isArray(item.skills)
      ? item.skills.join(', ')
      : 'N/A';

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          {item.organization.logo ? (
            <Image
              source={{ uri: item.organization.logo }}
              style={styles.logo}
              resizeMode="contain"
            />
          ) : (
            <View style={[styles.logo, { backgroundColor: '#eee' }]} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.jobTitle}>{item.degName}</Text>
            <Text style={styles.orgName}>{item.organization.organizationName}</Text>
            <Text style={styles.address}>{item.organization.address}</Text>
          </View>
        </View>
        <Text style={styles.skillsLabel}>Skills:</Text>
        <Text style={styles.skillsText}>{skillsDisplay}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🟢 Active Jobs</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item, index) =>
            item?.id?.toString?.() || index.toString()
          }
          renderItem={renderJobItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No active jobs available.</Text>
          }
        />
      )}
    </View>
  );
};

export default ActiveJobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F8FB',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2C3E50',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
  },
  orgName: {
    fontSize: 14,
    color: '#555',
  },
  address: {
    fontSize: 12,
    color: '#888',
  },
  skillsLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  skillsText: {
    fontSize: 13,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#777',
  },
});
