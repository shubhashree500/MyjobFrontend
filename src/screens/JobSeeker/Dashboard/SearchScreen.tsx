import React, { useState, useEffect } from 'react';
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

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
}

const allJobs: Job[] = [
  { id: '1', title: 'Frontend Developer', company: 'Techie Corp', location: 'Bangalore', type: 'Full-Time' },
  { id: '2', title: 'Backend Developer', company: 'Codebase Ltd', location: 'Remote', type: 'Part-Time' },
  { id: '3', title: 'UI/UX Designer', company: 'DesignHub', location: 'Mumbai', type: 'Internship' },
  { id: '4', title: 'React Native Developer', company: 'MobileLab', location: 'Chennai', type: 'Full-Time' },
  { id: '5', title: 'Data Analyst', company: 'DataWise', location: 'Remote', type: 'Full-Time' },
  { id: '6', title: 'Project Manager', company: 'BuildFlow', location: 'Delhi', type: 'Full-Time' },
  { id: '7', title: 'DevOps Engineer', company: 'CloudOps', location: 'Remote', type: 'Full-Time' },
  { id: '8', title: 'Android Developer', company: 'AppGuru', location: 'Hyderabad', type: 'Internship' },
  { id: '9', title: 'Tech Support', company: 'HelpDesk', location: 'Bangalore', type: 'Part-Time' },
  { id: '10', title: 'Graphic Designer', company: 'PixelStudios', location: 'Mumbai', type: 'Full-Time' },
  { id: '11', title: 'iOS Developer', company: 'SwiftSoft', location: 'Chennai', type: 'Full-Time' },
  { id: '12', title: 'QA Tester', company: 'BugTrack', location: 'Remote', type: 'Internship' },
  // Add more if needed
];

const PAGE_SIZE = 5;

const JobSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [visibleJobs, setVisibleJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const uniqueLocations = ['All', ...new Set(allJobs.map(job => job.location))];
  const uniqueTypes = ['All', ...new Set(allJobs.map(job => job.type))];

  const getFilteredJobs = () => {
    return allJobs.filter(job => {
      const matchesQuery =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = locationFilter === 'All' || job.location === locationFilter;
      const matchesType = typeFilter === 'All' || job.type === typeFilter;
      return matchesQuery && matchesLocation && matchesType;
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
      const more = filtered.slice(start, end);
      setVisibleJobs(prev => [...prev, ...more]);
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    loadJobs(true);
  }, [searchQuery, locationFilter, typeFilter]);

  const handleApply = (job: Job) => {
    Alert.alert('Apply', `Applied for ${job.title} at ${job.company}`);
  };

  const toggleSave = (jobId: string) => {
    setSavedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const renderItem = ({ item }: { item: Job }) => {
    const isSaved = savedJobs.includes(item.id);
    return (
      <View style={styles.jobCard}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.jobCompany}>{item.company}</Text>
        <Text style={styles.jobDetails}>{item.location} • {item.type}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => handleApply(item)}
          >
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveButton, isSaved && styles.saveButtonActive]}
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
    }, 500); // Simulate loading delay
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
            onValueChange={setLocationFilter}
            style={styles.picker}
          >
            {uniqueLocations.map(loc => (
              <Picker.Item key={loc} label={loc} value={loc} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.filterLabel}>Type</Text>
          <Picker
            selectedValue={typeFilter}
            onValueChange={setTypeFilter}
            style={styles.picker}
          >
            {uniqueTypes.map(type => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>
      </View>

      <FlatList
        data={visibleJobs}
        keyExtractor={item => item.id}
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
      />
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
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
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
});

