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
import JobseekerBottomNavigator from './JobseekerBottomNavigator.tsx';
import OrgDrawerNavigator from './OrgDrawerNavigator';
// import UserDashboardScreen from '../screens/JobSeeker/Dashboard/UserDashboardScreen.tsx';
import PostInternshipScreen from '../screens/Organization/Post/PostInternshipScreen';
import PostCampusScreen from '../screens/Organization/Post/PostCampusScreen';
import PostJobScreen from '../screens/Organization/Post/PostJobScreen';
import ActiveJobsScreen from '../screens/Organization/Dashboard/ActiveJobsScreen';
import TotalApplicants from '../screens/Organization/Dashboard/TotalApplicants';
import TopCandidatesScreen from '../screens/Organization/Dashboard/TopCandidatesScreen';
import JobAnalyticsScreen from '../screens/Organization/Dashboard/AnalyticsInsightsScreen';
import AnnouncementScreen from '../screens/Organization/Dashboard/AnnouncementScreen';
import InterviewScheduleScreen from '../screens/Organization/Dashboard/InterviewScheduleScreen';
import CompanyStatsScreen from '../screens/Organization/Dashboard/CompanyStatsScreen';
import FeedbackScreen from '../screens/Organization/Dashboard/FeedbackScreen';
import CampusDriveDetails from '../screens/Organization/Campus/CampusDriveDetails';
import EditProfileScreen from '../screens/JobSeeker/EditProfileScreen';
import JobDetailsScreen from '../screens/JobSeeker/JobDetailsScreen';


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
        <Stack.Screen name="JobseekerDashboard" component={JobseekerBottomNavigator} />
        <Stack.Screen name="OrganizationDrawer" component={OrgDrawerNavigator} />

        {/* Optional old screen */}
        {/* <Stack.Screen name="UserDashboard" component={UserDashboardScreen} /> */}

        <Stack.Screen name="PostJob" component={PostJobScreen} options={{ title: 'Post a Job' }} />
        <Stack.Screen name="PostCampus" component={PostCampusScreen} options={{ title: 'Post a Campus Drive' }} />
        <Stack.Screen name="PostInternship" component={PostInternshipScreen} options={{ title: 'Post an Internship' }} />
        <Stack.Screen name="ActiveJobs" component={ActiveJobsScreen} />
        <Stack.Screen name="TotalApplicants" component={TotalApplicants} />
        <Stack.Screen name="TopCandidates" component={TopCandidatesScreen} />
        <Stack.Screen name="JobAnalytics" component={JobAnalyticsScreen} />
        <Stack.Screen name="InterviewSchedule" component={InterviewScheduleScreen} />
        <Stack.Screen name="Announcement" component={AnnouncementScreen} />
        <Stack.Screen name="CompanyStats" component={CompanyStatsScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="CampusDriveDetails" component={CampusDriveDetails} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
<Stack.Screen name="JobDetails" component={JobDetailsScreen} />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
