// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/Common/Splash';
import OnboardingScreen from '../screens/Common/OnboardingScreen';
import LoginScreen from '../screens/Auth/Login';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';
import UserRegn from '../screens/Auth/UserRegn';
import OrganizationRegn from '../screens/Auth/OrganizationRegn';
import OrgBottomNavigator from './OrgBottomNavigator';
import OrgDrawerNavigator from './OrgDrawerNavigator';
import UserDashboardScreen from '../screens/JobSeeker/UserDashboardScreen';
import OrganizationDashboard from '../screens/Organization/OrganizationDashboard';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="UserRegn" component={UserRegn} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="OrganizationRegn" component={OrganizationRegn} />
        <Stack.Screen name="OrganizationDashboard" component={OrgBottomNavigator} />
        <Stack.Screen name="OrganizationDrawer" component={OrgDrawerNavigator} />
        <Stack.Screen name="UserDashboard" component={UserDashboardScreen} />
       {/* <Stack.Screen name="OrganizationDashboard" component={OrganizationDashboard} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
