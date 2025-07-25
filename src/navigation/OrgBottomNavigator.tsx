// src/navigation/OrgBottomNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet } from 'react-native';

// Tab Screens
import OrganizationHomeScreen from '../screens/Organization/Dashboard/OrganizationDashboard.tsx';
import ManageJobsScreen from '../screens/Organization/Manage/ManageJobsScreen';
import ApplicationsScreen from '../screens/Organization/ApplicationsScreen';
import PostScreen from '../screens/Organization/Post/PostMainScreen.tsx';
import MessagesScreen from '../screens/Organization/MessagesScreen';

// Extra screen
import CampusDriveDetails from '../screens/Organization/Campus/CampusDriveDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator Component
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#4B0082',
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
            iconSource = require('../assets/icons/dashboard.png');
            break;
          case 'ManageJobs':
            iconSource = require('../assets/icons/manage.png');
            break;
          case 'Post':
            iconSource = require('../assets/icons/apply.png');
            break;
          case 'Applications':
            iconSource = require('../assets/icons/users.png');
            break;
          case 'Messages':
            iconSource = require('../assets/icons/post.png');
            break;
          default:
            iconSource = require('../assets/icons/dashboard.png');
        }

        return (
          <Image
            source={iconSource}
            style={[styles.icon, { tintColor: focused ? '#4B0082' : '#999' }]}
            resizeMode="contain"
          />
        );
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={OrganizationHomeScreen} />
    <Tab.Screen name="ManageJobs" component={ManageJobsScreen} />
    <Tab.Screen name="Post" component={PostScreen} />
    <Tab.Screen name="Applications" component={ApplicationsScreen} />
    <Tab.Screen name="Messages" component={MessagesScreen} />
  </Tab.Navigator>
);

// Exported Navigator: Stack that wraps the Tabs + CampusDriveDetails
const OrgBottomNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="CampusDriveDetails" component={CampusDriveDetails} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    marginBottom: -2,
  },
});

export default OrgBottomNavigator;
