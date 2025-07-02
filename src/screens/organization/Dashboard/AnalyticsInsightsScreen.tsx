import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';

const { width } = Dimensions.get('window');

const jobAnalyticsData = [
  { id: '1', title: 'React Developer', views: 340, applicants: 48 },
  { id: '2', title: 'Node.js Engineer', views: 270, applicants: 30 },
  { id: '3', title: 'UI/UX Designer', views: 190, applicants: 22 },
];

const candidateInsightsData = [
  {
    id: '1',
    jobTitle: 'React Developer',
    profileViews: 120,
    savedByRecruiters: 12,
    engagementScore: 88,
  },
  {
    id: '2',
    jobTitle: 'Node.js Engineer',
    profileViews: 90,
    savedByRecruiters: 8,
    engagementScore: 72,
  },
  {
    id: '3',
    jobTitle: 'UI/UX Designer',
    profileViews: 105,
    savedByRecruiters: 15,
    engagementScore: 91,
  },
];

const AnalyticsAndInsightsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Job Analytics Section */}
      <Text style={styles.header}>📊 Job Analytics Overview</Text>
      <FlatList
        data={jobAnalyticsData}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.label}>Reach: {item.views} views</Text>
            <ProgressBar
              progress={item.views / 500}
              color="#4A90E2"
              style={styles.progressBar}
            />
            <Text style={styles.label}>Applications: {item.applicants}</Text>
            <ProgressBar
              progress={item.applicants / 100}
              color="#50E3C2"
              style={styles.progressBar}
            />
          </View>
        )}
      />

      {/* Candidate Insights Section */}
      <Text style={[styles.header, { marginTop: 30 }]}>🔍 Candidate Insights</Text>
      <FlatList
        data={candidateInsightsData}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.jobTitle}>{item.jobTitle}</Text>
            <Text style={styles.label}>👀 Profile Views: {item.profileViews}</Text>
            <Text style={styles.label}>💾 Saved by Recruiters: {item.savedByRecruiters}</Text>
            <Text style={styles.label}>📈 Engagement Score: {item.engagementScore}%</Text>
            <ProgressBar
              progress={item.engagementScore / 100}
              color="#FFAA00"
              style={styles.progressBar}
            />
          </View>
        )}
      />
    </ScrollView>
  );
};

export default AnalyticsAndInsightsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
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
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#34495E',
  },
  label: {
    fontSize: 13,
    color: '#555',
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    borderRadius: 5,
    marginBottom: 10,
    width: width - 80,
    backgroundColor: '#E0E0E0',
  },
});
