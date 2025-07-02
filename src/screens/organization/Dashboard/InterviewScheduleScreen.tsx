import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

type Interview = {
  id: string;
  candidate: string;
  role: string;
  date: string;
  time: string;
};

const InterviewScheduleScreen = () => {
  const interviews: Interview[] = [
    {
      id: '1',
      candidate: 'Ankit Verma',
      role: 'UI/UX Designer',
      date: 'June 25, 2025',
      time: '10:00 AM',
    },
    {
      id: '2',
      candidate: 'Shreya Das',
      role: 'React Developer',
      date: 'June 26, 2025',
      time: '3:00 PM',
    },
    {
      id: '3',
      candidate: 'Ravi Patel',
      role: 'Backend Engineer',
      date: 'June 27, 2025',
      time: '11:00 AM',
    },
  ];

  const renderItem = ({ item }: { item: Interview }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Image source={require('../../../assets/icons/calander.png')} style={styles.icon} />
        <Text style={styles.jobTitle}>{item.role}</Text>
      </View>
      <Text style={styles.infoText}>👤 Candidate: {item.candidate}</Text>
      <Text style={styles.infoText}>📅 Date: {item.date}</Text>
      <Text style={styles.infoText}>🕒 Time: {item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Upcoming Interviews</Text>
      <FlatList
        data={interviews}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default InterviewScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
    padding: 20,
  },
  title: {
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});
