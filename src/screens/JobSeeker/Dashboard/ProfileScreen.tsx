import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const user = {
    name: 'Shree Patel',
    email: 'shree.jobseeker@email.com',
    phone: '+91 9876543210',
    location: 'Mumbai, India',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    dob: '1998-06-21',
    gender: 'Male',
    nationality: 'Indian',
    education: 'Bachelor of Engineering in Computer Science',
    experience: '2 years as Frontend Developer at CodeCraft Ltd',
    skills: 'React Native, JavaScript, TypeScript, UI/UX, Git',
    languages: 'English, Hindi, Gujarati',
    resume: 'Uploaded',
    github: 'https://github.com/shreepatel',
    linkedin: 'https://linkedin.com/in/shreepatel',
    portfolio: 'https://shreepatel.dev',
    expectedSalary: '₹8 LPA',
    jobType: 'Full-Time',
    relocate: 'Yes',
  };

  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: user.profileImage }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
        <Text style={styles.location}>{user.location}</Text>

        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Details</Text>
          <Text style={styles.sectionContent}>Date of Birth: {user.dob}</Text>
          <Text style={styles.sectionContent}>Gender: {user.gender}</Text>
          <Text style={styles.sectionContent}>Nationality: {user.nationality}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <Text style={styles.sectionContent}>{user.education}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <Text style={styles.sectionContent}>{user.experience}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.sectionContent}>{user.skills}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text style={styles.sectionContent}>{user.languages}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resume</Text>
          <Text style={styles.sectionContent}>{user.resume}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Links</Text>
          <Text style={styles.sectionContent}>GitHub: {user.github}</Text>
          <Text style={styles.sectionContent}>LinkedIn: {user.linkedin}</Text>
          <Text style={styles.sectionContent}>Portfolio: {user.portfolio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Preferences</Text>
          <Text style={styles.sectionContent}>Type: {user.jobType}</Text>
          <Text style={styles.sectionContent}>Expected Salary: {user.expectedSalary}</Text>
          <Text style={styles.sectionContent}>Open to Relocate: {user.relocate}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  phone: {
    fontSize: 16,
    color: '#555',
    marginTop: 2,
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginTop: 2,
  },
  editButton: {
    marginTop: 16,
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  sectionContent: {
    fontSize: 15,
    color: '#333',
  },
});
