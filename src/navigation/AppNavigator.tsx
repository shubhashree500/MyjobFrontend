// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/Common/Splash';
import OnboardingScreen from '../screens/Common/OnboardingScreen';
import LoginScreen from '../screens/Auth/Login';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';
import OrganizationHomeScreen from '../screens/Organization/OrganizationHomeScreen';
import UserHomeScreen from '../screens/user/home/UserHomeScreen';
import UserRegn from '../screens/Auth/UserRegn';
import OrganizationRegn from '../screens/Auth/OrganizationRegn';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="UserRegn" component={UserRegn} />
        <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="OrganizationHome" component={OrganizationHomeScreen} />
        <Stack.Screen name="OrganizationRegn" component={OrganizationRegn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
