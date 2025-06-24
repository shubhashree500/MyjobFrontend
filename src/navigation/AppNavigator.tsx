// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/Common/Splash';
import LoginScreen from '../screens/Auth/Login';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';

import UserHomeScreen from '../screens/user/home/UserHomeScreen';
import ApplyScreen from '../screens/user/jobScreen/ApplyScreen';
import UploadCV from '../screens/user/jobScreen/UploadCV';
import SavedJobsScreen from '../screens/user/home/SavedJobsScreen';
import OrganizationHomeScreen from '../screens/organization/OrganizationHomeScreen';
import JobSearchScreen from '../screens/user/jobScreen/JobSearchScreen';
import Specialization from '../screens/user/jobScreen/Specialization';
import NoSearches from '../screens/user/jobScreen/NoSearches';
import Filter from '../screens/user/jobScreen/Filter';
import MyProfile from '../screens/user/completeProfile/MyProfile';
import Setting from '../screens/user/completeProfile/Setting';
import UserRegn from '../screens/login/UserRegn';
import PasswordScreen from '../screens/user/completeProfile/PasswordScreen';
import AddWorkExperience from '../screens/user/workExperience/AddWorkExperience';
import LanguageScreen from '../screens/language/LanguageScreen';
import AddResume from '../screens/user/resume/AddResume';
import EditWorkExperience from '../screens/user/workExperience/EditWorkExperience';
import AddSkill from '../screens/user/skill/AddSkill';
import SkillListScreen from '../screens/user/skill/SkillListScreen';
import EditSkillScreen from '../screens/user/skill/EditSkill';
import AddEducation from '../screens/user/education/AddEducation';
import AddJobPage from '../screens/organization/JobPost';
import JobPost from '../screens/organization/JobPost';
import JobShare from '../screens/organization/JobShare';
import orgNotifications from '../screens/notification/orgNotifications';
import userNotifications from '../screens/notification/userNotifications';
import EditEducation from '../screens/user/education/EditEducation';
import LanguageSelection from '../screens/user/completeProfile/LanguageSelection';
import OrganizationRegn from '../screens/login/OrganizationRegn';
import OrganizationProfile from '../screens/organization/OrganizationProfile';
import CampusScreen from '../screens/user/campusScreen/campusScreen';
import CampusApplyScreen from '../screens/user/campusScreen/campusApplyScreen';
import CampusUploadCv from '../screens/user/campusScreen/CampusUploadCv';
import TabNavigator from '../component/TabNavigator';
import OnboardingScreen from '../screens/Common/OnboardingScreen';
// import OrgBottomNavigator from './OrgBottomNavigator';
// import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';

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
        <Stack.Screen name="ApplyScreen" component={ApplyScreen} />
        <Stack.Screen name="UploadCV" component={UploadCV} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SavedJobsScreen" component={SavedJobsScreen} />
        <Stack.Screen name="OrganizationHomeScreen" component={OrganizationHomeScreen} />
        <Stack.Screen name="JobSearchScreen" component={JobSearchScreen} />
        <Stack.Screen name="Specialization" component={Specialization} />
        <Stack.Screen name="NoSearches" component={NoSearches} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Filter" component={Filter} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
        <Stack.Screen name="AddResume" component={AddResume} />
        <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
        <Stack.Screen name="EditWorkExperience" component={EditWorkExperience} />
        <Stack.Screen name="EditEducation" component={EditEducation} />
        <Stack.Screen name="AddSkill" component={AddSkill} />
        <Stack.Screen name="SkillList" component={SkillListScreen} />
        <Stack.Screen name="EditSkillScreen" component={EditSkillScreen} />
        <Stack.Screen name="AddEducation" component={AddEducation} />
        <Stack.Screen name="JobPage" component={AddJobPage} />
        <Stack.Screen name="JobPost" component={JobPost} />
        <Stack.Screen name="JobShare" component={JobShare} />
        <Stack.Screen name="orgNotifications" component={orgNotifications} />
        <Stack.Screen name="userNotifications" component={userNotifications} />
        <Stack.Screen name="OrganizationProfile" component={OrganizationProfile} />
        <Stack.Screen name="CampusScreen" component={CampusScreen} />
        <Stack.Screen name="campusApplyScreen" component={CampusApplyScreen} />
        <Stack.Screen name="CampusUploadCv" component={CampusUploadCv} />
        <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
        <Stack.Screen name="OrganizationRegn" component={OrganizationRegn} />
        {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OrganizationTabs" component={OrgBottomNavigator} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
