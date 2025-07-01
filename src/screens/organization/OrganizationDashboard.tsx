import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type DrawerParamList = {
  DashboardTabs: undefined;
  Profile: undefined;
  Settings: undefined;
};

const OrganizationHomeScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require('../../assets/icons/menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Organization Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Alert Banner */}
        <View style={styles.alertBanner}>
          <Image source={require('../../assets/icons/alert.png')} style={styles.alertIcon} />
          <Text style={styles.alertText}>Scheduled Maintenance on 22nd June from 1 AM - 3 AM</Text>
        </View>

        {/* Achievement Banner */}
        <View style={styles.banner}>
          <Image source={require('../../assets/icons/award.png')} style={styles.bannerIcon} />
          <View>
            <Text style={styles.bannerTitle}>Awesome Progress!</Text>
            <Text style={styles.bannerSubtitle}>500+ Candidates Reached</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Active Jobs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>230</Text>
            <Text style={styles.statLabel}>Total Applications</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>35</Text>
            <Text style={styles.statLabel}>Top Candidates</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>New Messages</Text>
          </View>
        </View>

        {/* Blue Design Cards */}
        <View style={styles.cardRow}>
          <View style={styles.blueCard}>
            <Image source={require('../../assets/icons/stats.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Job Analytics</Text>
            <Text style={styles.cardSubtitle}>View reach and performance</Text>
          </View>
          <View style={styles.blueCard}>
            <Image source={require('../../assets/icons/user.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Candidate Insights</Text>
            <Text style={styles.cardSubtitle}>Profiles and engagement</Text>
          </View>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.blueCard}>
            <Image source={require('../../assets/icons/building.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Company Stats</Text>
            <Text style={styles.cardSubtitle}>Growth & posting metrics</Text>
          </View>
          <View style={styles.blueCard}>
            <Image source={require('../../assets/icons/feedback.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Feedback</Text>
            <Text style={styles.cardSubtitle}>Candidate experience</Text>
          </View>
        </View>

        {/* Activity Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>📥 You received 8 new applications for “Frontend Developer”.</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>💬 2 new messages from candidates today.</Text>
          </View>
        </View>

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
          <Text style={styles.sectionTitle}>Announcements</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>📢 New referral bonus policy will be live from July 1st!</Text>
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
  sectionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
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
