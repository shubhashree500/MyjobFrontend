// screens/Jobseeker/ApplicationsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ApplicationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Applications Screen</Text>
    </View>
  );
};

export default ApplicationsScreen;

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
