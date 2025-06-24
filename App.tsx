import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {ProfileProvider} from './src/context/ProfileContext';
import {AuthProvider} from './src/context/AuthContext';
import {LanguageProvider} from './src/context/LanguageContext'; // Import LanguageProvider

import SplashScreen from './src/screens/Common/Splash';
import OnboardingScreen from './src/screens/Common/OnboardingScreen';
import LoginScreen from './src/screens/Auth/Login';


import Register from './src/screens/Auth/RegistrationScreen';
import UserHomeScreen from './src/screens/user/home/UserHomeScreen';
import ApplyScreen from './src/screens/user/jobScreen/ApplyScreen';
import UploadCV from './src/screens/user/jobScreen/UploadCV';
import SavedJobsScreen from './src/screens/user/home/SavedJobsScreen';
import OrganizationHomeScreen from './src/screens/organization/OrganizationHomeScreen';
import JobSearchScreen from './src/screens/user/jobScreen/JobSearchScreen';
import Specialization from './src/screens/user/jobScreen/Specialization';
import NoSearches from './src/screens/user/jobScreen/NoSearches';
import Filter from './src/screens/user/jobScreen/Filter';
import MyProfile from './src/screens/user/completeProfile/MyProfile';
import Setting from './src/screens/user/completeProfile/Setting';
import UserRegn from './src/screens/login/UserRegn';
import PasswordScreen from './src/screens/user/completeProfile/PasswordScreen';
import AddWorkExperience from './src/screens/user/workExperience/AddWorkExperience';
import LanguageScreen from './src/screens/language/LanguageScreen';
import AddResume from './src/screens/user/resume/AddResume';
import EditWorkExperience from './src/screens/user/workExperience/EditWorkExperience';
import AddSkill from './src/screens/user/skill/AddSkill';
import SkillListScreen from './src/screens/user/skill/SkillListScreen';
import EditSkillScreen from './src/screens/user/skill/EditSkill';
import AddEducation from './src/screens/user/education/AddEducation';
import AddJobPage from './src/screens/organization/JobPost';
import JobPost from './src/screens/organization/JobPost';
import JobShare from './src/screens/organization/JobShare';
import orgNotifications from './src/screens/notification/orgNotifications';
import userNotifications from './src/screens/notification/userNotifications';
import EditEducation from './src/screens/user/education/EditEducation';
import LanguageSelection from './src/screens/user/completeProfile/LanguageSelection';
import OrganizationRegn from './src/screens/login/OrganizationRegn';
import OrganizationProfile from './src/screens/organization/OrganizationProfile';
import CampusScreen from './src/screens/user/campusScreen/campusScreen';
import CampusApplyScreen from './src/screens/user/campusScreen/campusApplyScreen';
import CampusUploadCv from './src/screens/user/campusScreen/CampusUploadCv';
import TabNavigator from './src/component/TabNavigator';


const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <LanguageProvider>
          {' '}
          {/* Wrap with LanguageProvider */}
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />

              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="UserRegn" component={UserRegn} />
              <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
              <Stack.Screen name="ApplyScreen" component={ApplyScreen} />
              <Stack.Screen name="UploadCV" component={UploadCV} />
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen
                name="SavedJobsScreen"
                component={SavedJobsScreen}
              />
              <Stack.Screen
                name="OrganizationHomeScreen"
                component={OrganizationHomeScreen}
              />
              <Stack.Screen
                name="JobSearchScreen"
                component={JobSearchScreen}
              />
              <Stack.Screen name="Specialization" component={Specialization} />
              <Stack.Screen name="NoSearches" component={NoSearches} />
              <Stack.Screen name="MyProfile" component={MyProfile} />
              <Stack.Screen name="Filter" component={Filter} />
              <Stack.Screen name="Setting" component={Setting} />
              <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
              <Stack.Screen name="AddResume" component={AddResume} />
              <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
              <Stack.Screen
                name="EditWorkExperience"
                component={EditWorkExperience}
              />
              <Stack.Screen name="EditEducation" component={EditEducation} />
              <Stack.Screen name="AddSkill" component={AddSkill} />
              <Stack.Screen name="SkillList" component={SkillListScreen} />
              <Stack.Screen
                name="EditSkillScreen"
                component={EditSkillScreen}
              />
              <Stack.Screen name="AddEducation" component={AddEducation} />
              <Stack.Screen name="JobPage" component={AddJobPage} />
              <Stack.Screen name="JobPost" component={JobPost} />
              <Stack.Screen name="JobShare" component={JobShare} />
              <Stack.Screen
                name="orgNotifications"
                component={orgNotifications}
              />
              <Stack.Screen
                name="userNotifications"
                component={userNotifications}
              />
              <Stack.Screen
                name="OrganizationProfile"
                component={OrganizationProfile}
              />
              <Stack.Screen name="CampusScreen" component={CampusScreen} />
              <Stack.Screen
                name="campusApplyScreen"
                component={CampusApplyScreen}
              />
              <Stack.Screen name="CampusUploadCv" component={CampusUploadCv} />
              <Stack.Screen
                name="LanguageSelection"
                component={LanguageSelection}
              />
              <Stack.Screen
                name="OrganizationRegn"
                component={OrganizationRegn}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </LanguageProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
