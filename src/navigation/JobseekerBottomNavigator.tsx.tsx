import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

// Tab Screens
import UserDashboardScreen from '../screens/JobSeeker/Dashboard/UserDashboardScreen';
import SavedJobsScreen from '../screens/JobSeeker/Dashboard/SavedJobsScreen';
// import SavedJobsScreen from '../screens/Jobseeker/SavedJobsScreen';
import ApplicationsScreen from '../screens/JobSeeker/Dashboard/ApplicationsScreen';
import ProfileScreen from '../screens/JobSeeker/Dashboard/ProfileScreen';
import MessagesScreen from '../screens/JobSeeker/Dashboard/MessagesScreen';

const Tab = createBottomTabNavigator();

const JobseekerBottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.3,
          height: 60,
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;

          switch (route.name) {
            case 'Dashboard':
              iconSource = require('../assets/icons/home.png');
              break;
            case 'SavedJobs':
              iconSource = require('../assets/icons/bookmark.png');
              break;
            case 'Applications':
              iconSource = require('../assets/icons/application.png');
              break;
            case 'Messages':
              iconSource = require('../assets/icons/message.png');
              break;
            case 'Profile':
              iconSource = require('../assets/icons/user.png');
              break;
            default:
              iconSource = require('../assets/icons/home.png');
          }

          return (
            <Image
              source={iconSource}
              style={[styles.icon, { tintColor: focused ? '#007AFF' : '#999' }]}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={UserDashboardScreen} />
      <Tab.Screen name="SavedJobs" component={SavedJobsScreen} />
      <Tab.Screen name="Applications" component={ApplicationsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default JobseekerBottomNavigator;

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    marginBottom: -2,
  },
});

