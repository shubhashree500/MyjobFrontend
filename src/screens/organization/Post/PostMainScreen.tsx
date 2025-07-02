import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const PostScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Animated Image */}
      <Animatable.Image
        animation="fadeInDown"
        duration={1000}
        source={require('../../../assets/icons/jobpost.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Animated Header */}
      <Animatable.Text animation="fadeInUp" duration={1200} style={styles.header}>
        Post Opportunity
      </Animatable.Text>

      {/* Buttons */}
      <Animatable.View animation="fadeInUp" delay={400}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PostJob' as never)}
        >
          <Text style={styles.buttonText}>Post a Job</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PostCampus' as never)}
        >
          <Text style={styles.buttonText}>Post a Campus</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PostInternship' as never)}
        >
          <Text style={styles.buttonText}>Post an Internship</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 340,
    height: 340,
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E40AF',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: 260,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
