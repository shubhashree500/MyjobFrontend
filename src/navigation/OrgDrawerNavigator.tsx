// src/navigation/OrgDrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import OrgBottomNavigator from './OrgBottomNavigator';
import OrganizationProfile from '../screens/Common/ProfileScreen';
import SettingsScreen from '../screens/Common/SettingScreen';
import UserHomeScreen from '../screens/JobSeeker/Dashboard/UserDashboardScreen';

const Drawer = createDrawerNavigator();

const OrgDrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="OrgDashboardTabs"
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen
      name="OrgDashboardTabs"
      component={OrgBottomNavigator}
      options={{ title: 'Org Dashboard' }}
    />
    <Drawer.Screen
      name="UserHome"
      component={UserHomeScreen}
      options={{ title: 'User Dashboard' }}
    />
    <Drawer.Screen
      name="Profile"
      component={OrganizationProfile}
      options={{ title: 'Organization Profile' }}
    />
    <Drawer.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ title: 'Settings' }}
    />
  </Drawer.Navigator>
);

export default OrgDrawerNavigator;
