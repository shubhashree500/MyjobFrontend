import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const jobData = [
  {
    id: '1',
    title: 'Frontend Developer',
    location: 'Bengaluru',
    postedOn: '10 June 2025',
    applications: 24,
  },
  {
    id: '2',
    title: 'Backend Developer',
    location: 'Pune',
    postedOn: '12 June 2025',
    applications: 18,
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    location: 'Remote',
    postedOn: '15 June 2025',
    applications: 30,
  },
];

const ManageJobsScreen = () => {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.header}>Manage Posted Jobs</Text>

        {jobData.map(job => (
          <View key={job.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.appCount}>{job.applications} Applicants</Text>
            </View>

            <Text style={styles.jobDetail}>📍 {job.location}</Text>
            <Text style={styles.jobDetail}>📅 Posted on: {job.postedOn}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.btn, styles.editBtn]}>
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.viewBtn]}>
                <Text style={styles.btnText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.deleteBtn]}>
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ManageJobsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E6F0FF',
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  appCount: {
    fontSize: 13,
    color: '#3B82F6',
  },
  jobDetail: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
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
});
