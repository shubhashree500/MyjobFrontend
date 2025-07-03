// screens/Jobseeker/JobDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JobDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Job Details Screen</Text>
    </View>
  );
};

export default JobDetailsScreen;

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
