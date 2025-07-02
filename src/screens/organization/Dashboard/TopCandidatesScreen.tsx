import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ActiveJobsScreen = () => {
  // Replace with API data later
  const jobs = [{ id: '1', title: 'React Developer' }, { id: '2', title: 'Node.js Engineer' }];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Jobs</Text>
      <FlatList
        data={jobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
};

export default ActiveJobsScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});
