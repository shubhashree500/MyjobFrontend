// UserDashboardScreen
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type DrawerParamList = {
  DashboardTabs: undefined;
  Profile: undefined;
  Settings: undefined;
  UserHome: undefined;
};

const { width } = Dimensions.get('window');
const imageRatio = 9 / 4;
const imageHeight = width / imageRatio;

const bannerImages = [
  {
    image: require('../../../assets/Banner/1.jpg'),
    title: 'Explore Jobs',
    subtitle: 'Best matched jobs for you',
  },
  {
    image: require('../../../assets/Banner/2.png'),
    title: 'Upgrade Your Skills',
    subtitle: 'Find skill-based roles',
  },
  {
    image: require('../../../assets/Banner/3.png'),
    title: 'Ace Interviews',
    subtitle: 'Prepare with confidence',
  },
];

const UserDashboardScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bannerImages.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderBannerItem = ({ item }: { item: any }) => (
    <View style={styles.bannerItem}>
      <Image source={item.image} style={styles.bannerImage} />
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => {
            const parent = navigation.getParent() as DrawerNavigationProp<DrawerParamList>;
            if (parent?.toggleDrawer) {
              parent.toggleDrawer();
            }
          }}
        >
          <Image
            source={require('../../../assets/icons/menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>User Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.bannerContainer}>
          <FlatList
            ref={flatListRef}
            data={bannerImages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderBannerItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>

        <Text style={styles.sectionTitle}>Find Your Jobs</Text>
        <View style={styles.statsGrid}>
          {[
            ['Remote', '#E5F5FF', require('../../../assets/user-home/remote.png')],
            ['Full Time', '#F0E8FF', require('../../../assets/user-home/full-time.png')],
            ['Part Time', '#FFE8D9', require('../../../assets/user-home/part-time.png')],
            ['Internship', '#D9F3C9', require('../../../assets/user-home/internship.png')],
          ].map(([label, bgColor, icon], index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: bgColor }]}>
              <Image source={icon} style={styles.cardIcon} />
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Specializations</Text>
        <View style={styles.cardRow}>
          <View style={styles.blueCard}>
            <Image source={require('../../../assets/icons/Design.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>UI/UX</Text>
            <Text style={styles.cardSubtitle}>Design based jobs</Text>
          </View>
          <View style={styles.blueCard}>
            <Image source={require('../../../assets/icons/connections.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Development</Text>
            <Text style={styles.cardSubtitle}>Frontend & Backend</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Job List</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>• React Native Developer at XYZ</Text>
          <Text style={styles.activityText}>• UI/UX Designer at ABC</Text>
          <Text style={styles.activityText}>• Backend Engineer at DEF</Text>
        </View>

        <Text style={styles.sectionTitle}>Upcoming Interviews</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>📅 19 June – 11:00 AM with TechCorp</Text>
          <Text style={styles.activityText}>📅 21 June – 2:00 PM with CreativeSoft</Text>
        </View>

        <Text style={styles.sectionTitle}>Announcements</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>📢 Resume Tips Webinar on June 25th</Text>
        </View>

        <Text style={styles.sectionTitle}>Application Stats</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={{ color: '#999' }}>📊 Chart Coming Soon...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FBFF',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'sans-serif-medium',
  },
  content: {
    padding: 20,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  bannerItem: {
    width,
    alignItems: 'center',
  },
  bannerImage: {
    width: width - 30,
    height: imageHeight,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  bannerTextContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#003366',
    fontFamily: 'sans-serif-medium',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'sans-serif',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginVertical: 12,
    fontFamily: 'sans-serif-medium',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '47%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
    fontFamily: 'sans-serif',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  blueCard: {
    backgroundColor: '#DCEEFF',
    borderRadius: 12,
    width: '47%',
    padding: 15,
    alignItems: 'center',
    elevation: 2,
  },
  cardIcon: {
    width: 36,
    height: 36,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  chartPlaceholder: {
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
});






// src/navigation/OrgDrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OrgBottomNavigator from './OrgBottomNavigator';
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





// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {ProfileProvider} from './src/context/ProfileContext';
import {AuthProvider} from './src/context/AuthContext';
import {LanguageProvider} from './src/context/LanguageContext'; 
import SplashScreen from './src/screens/common/Splash';
import LoginScreen from './src/screens/login/Login';
import Register from './src/screens/login/Register';
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
import OnboardingScreen from './src/screens/common/OnboardingScreen';
import OrgBottomNavigator from './src/component/OrgBottomNavigator';
import OrgDrawerNavigator from './src/component/OrgDrawerNavigator';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <LanguageProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{ headerShown: false }}
            >
              {/* All screens together in a single navigator */}
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={Register} />
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
                <Stack.Screen name="OrganizationTabs" component={OrgBottomNavigator} />
                 <Stack.Screen name="OrgDrawerNavigator" component={OrgDrawerNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </LanguageProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;  



// SearchJobScreen for user 
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const jobData = [
  {
    id: '1',
    title: 'React Native Developer',
    description: 'Build cross-platform mobile apps with React Native.',
    location: 'Bangalore, India',
    salary: '₹8 - ₹12 LPA',
    experience: '2+ years',
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    description: 'Design elegant user interfaces for mobile platforms.',
    location: 'Mumbai, India',
    salary: '₹6 - ₹10 LPA',
    experience: '1-3 years',
  },
  {
    id: '3',
    title: 'Backend Engineer',
    description: 'Develop scalable backend services with Node.js.',
    location: 'Remote',
    salary: '₹10 - ₹15 LPA',
    experience: '3+ years',
  },
];

const SearchJobScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const navigation = useNavigation();

  const handleSave = (id: string) => {
    if (savedJobs.includes(id)) {
      Alert.alert('Already Saved', 'This job is already in your saved list.');
    } else {
      setSavedJobs([...savedJobs, id]);
      Alert.alert('Saved', 'Job added to your saved list.');
    }
  };

  const filteredJobs = jobData.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }: any) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 150}
      duration={600}
      style={styles.card}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.detail}>📍 {item.location}</Text>
      <Text style={styles.detail}>💰 {item.salary}</Text>
      <Text style={styles.detail}>🎓 {item.experience}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.applyBtn]}>
          <Text style={styles.buttonText}>Apply Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveBtn]}
          onPress={() => handleSave(item.id)}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🔍 Search Jobs</Text>
      <TextInput
        style={styles.input}
        placeholder="Search job title..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredJobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity
        style={styles.savedButton}
        onPress={() =>
          navigation.navigate('SavedJobs' as never, { savedJobIds: savedJobs } as never)
        }
      >
        <Text style={styles.savedButtonText}>📌 View Saved Jobs</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SearchJobScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  detail: {
    fontSize: 13,
    color: '#777',
    marginBottom: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyBtn: {
    backgroundColor: '#4A90E2',
    marginRight: 8,
  },
  saveBtn: {
    backgroundColor: '#FFA500',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  savedButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  savedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});



// SavedJobsScreen for user 
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const jobData = [
  {
    id: '1',
    title: 'React Native Developer',
    description: 'Build cross-platform mobile apps with React Native.',
    location: 'Bangalore, India',
    salary: '₹8 - ₹12 LPA',
    experience: '2+ years',
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    description: 'Design elegant user interfaces for mobile platforms.',
    location: 'Mumbai, India',
    salary: '₹6 - ₹10 LPA',
    experience: '1-3 years',
  },
  {
    id: '3',
    title: 'Backend Engineer',
    description: 'Develop scalable backend services with Node.js.',
    location: 'Remote',
    salary: '₹10 - ₹15 LPA',
    experience: '3+ years',
  },
];

const SavedJobsScreen = ({ route }: any) => {
  const { savedJobIds } = route.params;

  const savedJobs = jobData.filter((job) => savedJobIds.includes(job.id));

  const renderItem = ({ item, index }: any) => (
    <Animatable.View
      animation="fadeInRight"
      delay={index * 150}
      duration={600}
      style={styles.card}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.detail}>📍 {item.location}</Text>
      <Text style={styles.detail}>💰 {item.salary}</Text>
      <Text style={styles.detail}>🎓 {item.experience}</Text>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>💾 Saved Jobs</Text>
      <FlatList
        data={savedJobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default SavedJobsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  detail: {
    fontSize: 13,
    color: '#777',
    marginBottom: 2,
  },
});
