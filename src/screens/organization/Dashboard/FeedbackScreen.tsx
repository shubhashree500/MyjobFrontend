import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

type FeedbackItem = {
  id: string;
  candidateName: string;
  jobTitle: string;
  feedback: string;
  rating: number;
};

const FeedbackScreen = () => {
  const feedbackList: FeedbackItem[] = [
    {
      id: '1',
      candidateName: 'Ankit Sharma',
      jobTitle: 'Frontend Developer',
      feedback: 'The interview process was smooth and professional.',
      rating: 4,
    },
    {
      id: '2',
      candidateName: 'Priya Singh',
      jobTitle: 'UI/UX Designer',
      feedback: 'Appreciated the timely communication throughout.',
      rating: 5,
    },
    {
      id: '3',
      candidateName: 'Ravi Mehta',
      jobTitle: 'Backend Developer',
      feedback: 'Interviewers were knowledgeable and helpful.',
      rating: 4,
    },
  ];

  const renderStars = (count: number) => {
    return '⭐'.repeat(count);
  };

  const renderItem = ({ item }: { item: FeedbackItem }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/icons/user.png')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.candidateName}>{item.candidateName}</Text>
          <Text style={styles.jobTitle}>{item.jobTitle}</Text>
        </View>
      </View>
      <Text style={styles.feedbackText}>“{item.feedback}”</Text>
      <Text style={styles.rating}>{renderStars(item.rating)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Candidate Feedback</Text>
      <FlatList
        data={feedbackList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 20,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
  },
  jobTitle: {
    fontSize: 13,
    color: '#777',
  },
  feedbackText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  rating: {
    fontSize: 16,
    color: '#FFD700',
  },
});
