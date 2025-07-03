// screens/Jobseeker/SavedJobsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SavedJobsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saved Jobs Screen</Text>
    </View>
  );
};

export default SavedJobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
