import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import config  from "../../context/config";

interface Job {
  jobId: string;
  jobRole: string;
  companyName: string;
  jobLocation: string;
  salary: string;
  logo: string;
  jobDescription: string;
  organizationName: string;
  workPlaceType: string;
  degName: string;
  postedAt: Date;
}

const API_BASE_URL = `${config.apiUrl}`;

const JobShare: React.FC = ({navigation}:any) => {
  const [jobData, setJobData] = useState<Job[]>([]);
  const [recentJob, setRecentJob] = useState<Job | null>(null);

  const fetchJobData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/postedjob/getAll`);

      if (response.status === 200 && response.data.data) {
        const transformedData: Job[] = response.data.data.map((job: any) => ({
          jobId: job.jobId,
          jobRole: job.jobRole || 'Untitled Job',
          companyName: job.companyName || 'Unknown Company',
          jobLocation: job.jobLocation || 'Unknown Location',
          salary: job.salary || 'Not Disclosed',
          logo: job.organization.logo
            ? `${API_BASE_URL}/photo/${job.organization.logo}`
            : 'https://via.placeholder.com/150',
          jobDescription: job.jobDescription || 'Unknown Job Description',
          organizationName: job.organization.organizationName,
          workPlaceType: job.workPlaceType || '',
          degName: job.degName || 'Unknown Name',
          postedAt: new Date(job.createdAt),
        }));

        transformedData.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

        setRecentJob(transformedData[0]);
        setJobData(transformedData);
      }
    } catch (error) {
      console.error('Error fetching JobPost data:', error);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  const renderJobCard = () => {
    if (!recentJob) return <Text>Loading the most recent job...</Text>;

    return (
      <>
        <View style={styles.profileSection}>
          <Image source={{ uri: recentJob.logo }} style={styles.profilePic} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{recentJob.organizationName}</Text>
            <Text style={styles.profileLocation}>{recentJob.jobLocation}</Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {`Hey guys\n\n${recentJob.jobDescription}`}
          </Text>
        </View>

        <View style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <Image source={{ uri: recentJob.logo }} style={styles.companyLogo} />
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{recentJob.degName}</Text>
              <Text style={styles.jobSubtitle}>
                {`Job vacancies from ${recentJob.organizationName}`}
              </Text>
              <Text style={styles.jobLocation}>
                {`${recentJob.jobLocation} · ${recentJob.workPlaceType}`}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.applicationButton}>
            <Text style={styles.applicationButtonText}>Application details</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonContainer}
         onPress={() => navigation.navigate('JobPost')}>
          <Image
            source={require('../../assets/icons/Back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Post</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Shared a Job</Text>
        {renderJobCard()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Image
            source={require('../../assets/icons/Camera.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.iconContainer, styles.galleryIcon]}>
          <Image
            source={require('../../assets/icons/picture.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.hashtagContainer}>
          <Text style={styles.hashtagText}>Add hashtag</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButtonContainer: {
    flex: 1,
  },
  backButton: {
    width: 24,
    height: 24,
  },
  headerText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: '#FF6B00',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: '#666666',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
  jobCard: {
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    padding: 16,
    marginBottom: 24,
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  companyLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  jobSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: '#666666',
  },
  applicationButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applicationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    flex: 0.1,
    alignItems: 'center',
  },
  galleryIcon: {
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  hashtagContainer: {
    flex: 0.9,
    alignItems: 'flex-end',
  },
  hashtagText: {
    color: '#f37321',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default JobShare;

