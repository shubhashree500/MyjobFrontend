import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import apiConfig from '../../../context/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Job {
  id?: number;
  degName: string;
  skills?: string[];
  type?: string;
  location?: string;
  organization: {
    organizationName: string;
    address: string;
  };
}

const JobSearchScreen = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [visibleJobs, setVisibleJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
 const [locationFilter, setLocationFilter] = useState<string>('');
const [typeFilter, setTypeFilter] = useState<string>('');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);


  const PAGE_SIZE = 5;

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiConfig.apiUrl}/postedjob/getAll`);
      const data = response.data.data;
      setJobs(data);
      setVisibleJobs(data.slice(0, PAGE_SIZE));
      setPage(2);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const uniqueLocations = ['All', ...new Set(jobs.map(j => j.organization.address))];
  const uniqueTypes = ['All', ...new Set(jobs.map(j => j.type || 'Unknown'))];

 const getFilteredJobs = () => {
  return jobs.filter(job => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      job.degName?.toLowerCase().includes(query) ||
      job.organization?.organizationName?.toLowerCase().includes(query);

    const matchesLocation =
      locationFilter === '' || job.organization?.address === locationFilter;

    const matchesType =
      typeFilter === '' || job.type === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });
};

  const loadJobs = (reset = false) => {
    const filtered = getFilteredJobs();
    const nextPage = reset ? 1 : page;
    const start = (nextPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    if (reset) {
      setVisibleJobs(filtered.slice(0, PAGE_SIZE));
      setPage(2);
    } else {
      setVisibleJobs(prev => [...prev, ...filtered.slice(start, end)]);
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    loadJobs(true);
  }, [searchQuery, locationFilter, typeFilter, jobs]);

  const handleApply = (job: Job) => {
    Alert.alert('Apply', `Applied for ${job.degName} at ${job.organization.organizationName}`);
  };
  
const toggleSave = async (jobId?: number) => {
  if (!jobId) return;

  const userId = await AsyncStorage.getItem('userId');
  if (!userId) return;

  const isAlreadySaved = savedJobs.includes(jobId);
  const endpoint = `${apiConfig.apiUrl}/savedjob`;

  try {
    if (isAlreadySaved) {
      // Unsave (DELETE)
      await axios.delete(`${endpoint}/delete/${userId}/${jobId}`);
    } else {
      // Save (POST)
      await axios.post(`${endpoint}/create`, {
        jobId,
        userId,
        createdBy: 1, // You can use actual logged-in user ID or role if available
        status: 1
      });
    }

    // Update local savedJobs list
    const updated = isAlreadySaved
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId];

    setSavedJobs(updated);
  } catch (error) {
    console.error('Error saving/unsaving job:', error);
  }
};


useEffect(() => {
  const loadSaved = async () => {
  const userId = await AsyncStorage.getItem('userId');
  console.log('Loading saved jobs for user:', userId); // 👈 Debug log

  if (!userId) return;
  try {
    const res = await axios.get(`${apiConfig.apiUrl}/savedjob/get/${userId}`);
    const ids = res.data.savedJobs.map((job: any) => job.jobId);
    setSavedJobs(ids);
  } catch (error) {
    console.error('Error loading saved jobs:', error); // 🔍 Shows 404
  }
};
  loadSaved();
}, []);


 const renderItem = ({ item }: { item: Job }) => {
  const isSaved = !!item.id && savedJobs.includes(item.id); // ✅ FIXED HERE

  return (
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>{item.degName}</Text>
      <Text style={styles.jobCompany}>{item.organization.organizationName}</Text>
      <Text style={styles.jobDetails}>
        {item.organization.address} • {item.type || 'Type N/A'}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.applyButton} onPress={() => handleApply(item)}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.saveButton,
            isSaved ? styles.saveButtonActive : null, // ✅ FIXED HERE (prevent falsey values like 0)
          ]}
          onPress={() => toggleSave(item.id)}
        >
          <Text style={styles.buttonText}>{isSaved ? 'Saved' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      loadJobs();
      setIsLoadingMore(false);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Search Jobs</Text>

      <TextInput
        placeholder="Search by title or company..."
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filtersContainer}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.filterLabel}>Location</Text>
          <Picker
  selectedValue={locationFilter}
  onValueChange={(value) => setLocationFilter(value)}
  style={styles.picker}
>
   <Picker.Item label="Select Location" value="" enabled={false} />
  {uniqueLocations.map(loc => (
    <Picker.Item key={loc} label={loc} value={loc} />
  ))}
</Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.filterLabel}>Type</Text>
         <Picker
  selectedValue={typeFilter}
  onValueChange={(value) => setTypeFilter(value)}
  style={styles.picker}
>
  <Picker.Item label="Select Type" value="" enabled={false} />
  {uniqueTypes.map(type => (
    <Picker.Item key={type} label={type} value={type} />
  ))}
</Picker>

        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={visibleJobs}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListFooterComponent={
            getFilteredJobs().length > visibleJobs.length ? (
              <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreButton}>
                {isLoadingMore ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <Text style={styles.buttonText}>Load More</Text>
                )}
              </TouchableOpacity>
            ) : null
          }
          ListEmptyComponent={<Text style={styles.emptyText}>No jobs found.</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default JobSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickerWrapper: {
    flex: 1,
    marginRight: 8,
  },
  picker: {
  height: 50, 
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingHorizontal: 10,
  color: '#333',
  fontSize: 16,  
},

  filterLabel: {
    marginBottom: 4,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 16,
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  jobCompany: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  jobDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  saveButtonActive: {
    backgroundColor: '#0D47A1',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadMoreButton: {
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#777',
  },
});
