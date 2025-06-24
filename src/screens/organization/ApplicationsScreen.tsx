import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const applications = [
  {
    id: '1',
     name: 'Shubhashree Khilar',
    role: 'Backend Developer',
    experience: '3 yrs',
    location: 'Bhubaneswar',
    appliedOn: '18 June 2025',
    avatar: require('../../assets/icons/user.png'),
  },
  {
    id: '2',
    name: 'Shreya Das',
    role: 'React Developer',
    experience: '2 yrs',
    location: 'Remote',
    appliedOn: '15 June 2025',
    avatar: require('../../assets/icons/user.png'),
  },
  {
    id: '3',
   name: 'Ankit Verma',
    role: 'Frontend Developer',
    experience: '3 yrs',
    location: 'Bengaluru',
    appliedOn: '14 June 2025',
    avatar: require('../../assets/icons/user.png'),
  },
];

const ApplicationsScreen = () => {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.header}>Applications Received</Text>

        {applications.map(app => (
          <View key={app.id} style={styles.card}>
            <View style={styles.row}>
              <Image source={app.avatar} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{app.name}</Text>
                <Text style={styles.detail}>🛠 {app.role}</Text>
                <Text style={styles.detail}>⏳ {app.experience}</Text>
                <Text style={styles.detail}>📍 {app.location}</Text>
                <Text style={styles.detail}>📅 Applied: {app.appliedOn}</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.btn, styles.viewBtn]}>
                <Text style={styles.btnText}>View Resume</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.acceptBtn]}>
                <Text style={styles.btnText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.rejectBtn]}>
                <Text style={styles.btnText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ApplicationsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  detail: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewBtn: {
    backgroundColor: '#3B82F6',
  },
  acceptBtn: {
    backgroundColor: '#10B981',
  },
  rejectBtn: {
    backgroundColor: '#EF4444',
  },
  btnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
