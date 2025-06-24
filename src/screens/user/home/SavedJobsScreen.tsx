import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from "../../../context/config";
import TabBar from '../../../component/TabBar';


const SavedJobsScreen = ({ navigation }: any) => {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [jobDetails, setJobDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch saved jobs from AsyncStorage
  const fetchSavedJobs = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }

      const response = await axios.get(`${config.apiUrl}/SavedJob/get/${userId}`);
      const savedJobsData = response.data.savedJobs || [];
      const filteredJobs = savedJobsData.filter((job: any) => job && job.jobId);

      setSavedJobs(filteredJobs);
      if (filteredJobs.length > 0) {
        fetchJobDetails(filteredJobs.map((job: any) => job.jobId)); // Fetch job details by job IDs
      } else {
        setLoading(false); // No saved jobs, stop loading
      }
    } catch (err: any) {
      // Alert.alert('Error', err.message);
      setLoading(false); // In case of error, stop loading
    }
  };

  // Fetch job details based on saved job IDs
  const fetchJobDetails = async (jobIds: string[]) => {
    try {
      const response = await axios.get(`${config.apiUrl}/postedjob/getAll`);
      const allJobs = response.data.data || [];
      const filteredDetails = allJobs.filter((job: any) => jobIds.includes(job.jobId));

      const transformedData = filteredDetails.map((job: any) => ({
        jobId: job.jobId,
        compId: job.organization.compId,
        jobRole: job.jobRole || 'Untitled Job',
        jobLocation: job.jobLocation || 'Unknown Location',
        salary: job.salary || 'Not Disclosed',
        tags: [
          ...(job.jobType ? [job.jobType] : []),
          ...(Array.isArray(job.workPlaceType) ? job.workPlaceType : [job.workPlaceType]),
        ],
        logo: job.organization.logo
          ? `${config.apiUrl}/photo/${job.organization.logo}`
          : 'https://via.placeholder.com/150',
        degName: job.degName || 'Unknown Name',
        secName: job.secName || 'Unknown Sector',
        skills: job.skills || [],
        jobDescription: job.jobDescription || 'Unknown Job Description',
        yearsOfExperience: job.yearsOfExperience,
        requirements: job.requirements || [],
        jobType: job.jobType || 'Unknown Job Type',
        workPlaceType: job.workPlaceType || '',
        organizationName: job.organization.organizationName,
        headOffice: job.organization.address,
        email: job.organization.email,
        phoneNo: job.organization.phoneNo,
        website: job.organization.website,
        about: job.organization.description,
        industry: job.organization.industry,
        since: job.organization.since,
        specialization: job.organization.specialization,
      }));

      setJobDetails(transformedData);
    } catch (error) {
      console.error('Error fetching job details:', error);
      Alert.alert('Error', 'Failed to load job details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
    const interval = setInterval(() => {
      fetchSavedJobs();
    }, 1000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleDeleteAll = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      await axios.delete(`${config.apiUrl}/SavedJob/deleteAll/${userId}`);
      setSavedJobs([]);
      setJobDetails([]);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }

      console.log(`Deleting job with userId: ${userId} and jobId: ${jobId}`);

      setLoading(true);
      await axios.delete(`${config.apiUrl}/SavedJob/delete/${userId}/${jobId}`);

      // Remove job from the local state after successful deletion
      setSavedJobs((prev) => prev.filter((job) => job.jobId !== jobId));
      setJobDetails((prev) => prev.filter((job) => job.jobId !== jobId));
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderJobCard = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => navigation.navigate('ApplyScreen', { jobData: item })}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.logo }} style={styles.logo} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.degName}</Text>
          <Text style={styles.subtitle}>
            {item.organizationName} • {item.jobLocation}
          </Text>
        </View>
        <Pressable onPress={() => handleDeleteJob(item.jobId)}>
          <Image
            source={require('../../../assets/icons/dustbin.png')}
            style={{ height: 24, width: 24 }}
          />
        </Pressable>
      </View>

      <Text style={styles.salary}>{item.salary}/mo</Text>

      <View style={styles.tagsContainer}>
        <Text style={styles.tagText}>{item.jobType}</Text>
        <Text style={styles.tagText}>{item.workPlaceType}</Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Jobs</Text>
        <Pressable onPress={handleDeleteAll}>
          <Text style={styles.deleteAll}>Delete All</Text>
        </Pressable>
      </View>
      {jobDetails.length > 0 ? (
        <FlatList
          data={jobDetails}
          renderItem={renderJobCard}
          keyExtractor={(item, index) => item.jobId || index.toString()}
        />
      ) : (
        <Text style={styles.noJobsText}>No saved jobs found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  deleteAll: {
    fontSize: 14,
    color: '#FF5C5C',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 25, // Makes it a circle
    backgroundColor: '#FFFFFF', // White background
    marginRight: 12,
    justifyContent: 'center', // Center content (optional)
    alignItems: 'center', // Center content (optional)
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 5,
      },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    top:8,
    fontSize: 14,
    color: '#757575',
  },
  
  noJobsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
  },
  salary: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  tag: {
    flexDirection: 'row',
   
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 8,

  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // This will allow wrapping if needed
    marginTop: 20,
  },
  tagText: {
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8, // Adds space between the tags
    marginBottom: 8, // Optional: if you want vertical spacing in a row
    fontSize: 12,
    color: '#555',
  },
  applyButton: {
    marginTop: 16,
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    borderRadius: 4,
  },
  applyText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  }
  
});

export default SavedJobsScreen;
