import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiConfig from '../../../context/config';

const OrganizationHomeScreen = () => {
  const navigation = useNavigation<any>(); 
 const [jobCount, setJobCount] = useState<number>(0);
  const [loadingJobs, setLoadingJobs] = useState<boolean>(true);
useEffect(() => {
    const fetchJobCount = async () => {
      console.log('🔄 Fetching job count...');
      try {
        const compId = await AsyncStorage.getItem('compId');

        if (!compId) {
          console.warn('⚠️ Company ID not found in AsyncStorage.');
          setJobCount(0);
          setLoadingJobs(false);
          return;
        }

        const res = await axios.get(
          `${apiConfig.apiUrl}/postedjob/organization/${compId}/jobs`
        );

        console.log('✅ Response received:', res.data);

        if (Array.isArray(res.data?.data)) {
          setJobCount(res.data.data.length);
          console.log('📊 Job count:', res.data.data.length);
        } else {
          console.warn('⚠️ Unexpected response format:', res.data);
          setJobCount(0);
        }
      } catch (error: any) {
        console.error('❌ Failed to fetch job count:', error?.message || error);
        setJobCount(0); // fallback to zero
        Alert.alert('Error', 'Failed to fetch job count.');
      } finally {
        setLoadingJobs(false);
      }
    };
  fetchJobCount();
}, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require('../../../assets/icons/menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Organization Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Alert Banner */}
        <View style={styles.alertBanner}>
          <Image source={require('../../../assets/icons/alert.png')} style={styles.alertIcon} />
          <Text style={styles.alertText}>Scheduled Maintenance on 22nd June from 1 AM - 3 AM</Text>
        </View>

        {/* Achievement Banner */}
        <View style={styles.banner}>
          <Image source={require('../../../assets/icons/award.png')} style={styles.bannerIcon} />
          <View>
            <Text style={styles.bannerTitle}>Awesome Progress!</Text>
            <Text style={styles.bannerSubtitle}>500+ Candidates Reached</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('ActiveJobs')}>
            {loadingJobs ? (
                          <ActivityIndicator size="small" color="#007BFF" />
                        ) : (
                          <Text style={styles.statValue}>{jobCount}</Text>
                        )}
                        <Text style={styles.statLabel}>Active Jobs</Text>
                      </TouchableOpacity>
          <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('TotalApplicants')}>
            <Text style={styles.statValue}>230</Text>
            <Text style={styles.statLabel}>Total Applications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('TopCandidates')}>
            <Text style={styles.statValue}>35</Text>
            <Text style={styles.statLabel}>Top Candidates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('Announcement')}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Announcement</Text>
          </TouchableOpacity>
        </View>

        {/* Blue Design Cards */}
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.blueCard} onPress={() => navigation.navigate('JobAnalytics')}>
            <Image source={require('../../../assets/icons/stats.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Job Analytics</Text>
            <Text style={styles.cardSubtitle}>View reach and performance</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.blueCard} onPress={() => navigation.navigate('InterviewSchedule')}>
  <Image source={require('../../../assets/icons/calander.png')} style={styles.cardIcon} />
  <Text style={styles.cardTitle}>Interview Schedule</Text>
  <Text style={styles.cardSubtitle}>View upcoming interviews</Text>
</TouchableOpacity>

        </View>
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.blueCard} onPress={() => navigation.navigate('CompanyStats')}>
            <Image source={require('../../../assets/icons/building.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Company Stats</Text>
            <Text style={styles.cardSubtitle}>Growth & posting metrics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blueCard} onPress={() => navigation.navigate('Feedback')}>
            <Image source={require('../../../assets/icons/feedback.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Feedback</Text>
            <Text style={styles.cardSubtitle}>Candidate experience</Text>
          </TouchableOpacity>
        </View>

    
{/* Campus Drives Section */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Campus Drives</Text>

  <TouchableOpacity
    style={styles.activityCard}
    onPress={() => navigation.navigate('CampusDriveDetails')}
  >
    <Text style={styles.activityText}>
      🏫 CV Raman College - B.Tech Drive - 12th July, 10 AM
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.activityCard}
    onPress={() => navigation.navigate('CampusDriveDetails')}
  >
    <Text style={styles.activityText}>
      🏫 KIIT University - MCA Internship - 16th July, 2 PM
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.activityCard}
    onPress={() => navigation.navigate('CampusDriveDetails')}
  >

    <Text style={styles.activityText}>
      🏫 ITER Bhubaneswar - Job Fair - 25th July, 11 AM
    </Text>
  </TouchableOpacity>
</View>
       
{/* Upcoming Interviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Interviews</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>📅 Mon, 17th June – 10:00 AM with Ankit Verma (UI/UX Designer)</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>📅 Tue, 18th June – 3:00 PM with Shreya Das (React Developer)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hiring Performance (Weekly)</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={{ color: '#999' }}>📊 Chart Coming Soon...</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrganizationHomeScreen;

// ---------- Styles ------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  alertBanner: {
    backgroundColor: '#D1ECF1',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  alertIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  alertText: {
    color: '#0C5460',
    fontSize: 13,
    flex: 1,
    flexWrap: 'wrap',
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007BFF',
  },
  statLabel: {
    fontSize: 13,
    color: '#555',
    marginTop: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
  },
  activityText: {
    fontSize: 13,
    color: '#333',
  },
  chartPlaceholder: {
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  blueCard: {
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    width: '47%',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  cardIcon: {
    width: 35,
    height: 35,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});
