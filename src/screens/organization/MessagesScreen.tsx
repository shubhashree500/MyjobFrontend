import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const dummyMessages = [
  {
    id: '1',
    name: 'Shubhashree Khilar',
    role: 'Backend Developer',
    message: 'Applied for Backend Developer',
    time: 'Just Now',
    avatar: require('../../assets/icons/user.png'),
  },
  {
    id: '2',
    name: 'Shreya Das',
    role: 'React Developer',
    message: 'Looking forward to the interview.',
    time: 'Yesterday',
    avatar: require('../../assets/icons/user.png'),
  },
  {
    id: '3',
    name: 'Ankit Verma',
    role: 'UI/UX Designer',
    message: 'Thank you for the update.',
    time: '10:30 AM',
    avatar: require('../../assets/icons/user.png'),
  },
];

const MessagesScreen = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.messageInfo}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.role}>{item.role}</Text>
        <Text style={styles.preview}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <FlatList
        data={dummyMessages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'flex-start',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  messageInfo: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  role: {
    fontSize: 13,
    color: '#4B0082',
    marginBottom: 4,
  },
  preview: {
    fontSize: 13,
    color: '#555',
  },
});
