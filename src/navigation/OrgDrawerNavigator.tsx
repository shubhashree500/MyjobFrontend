// src/navigation/OrgDrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OrgBottomNavigator from '../navigation/OrgBottomNavigator';
import OrganizationProfile from '../screens/organization/OrganizationProfile';
import SettingsScreen from '../screens/common/SettingsScreen';
import ProfileScreen from '../screens/common/ProfileScreen';
import UserHomeScreen from '../screens/user/home/UserHomeScreen';

const Drawer = createDrawerNavigator();

const OrgDrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="DashboardTabs"
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen
      name="DashboardTabs"
      component={OrgBottomNavigator}
      options={{ title: 'Org Dashboard' }}
    />
    <Drawer.Screen
      name="UserHome"
      component={UserHomeScreen}
      options={{ title: 'User Dashboard' }}
    />
    <Drawer.Screen name="Profile" component={OrganizationProfile} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
  </Drawer.Navigator>
);

export default OrgDrawerNavigator;
