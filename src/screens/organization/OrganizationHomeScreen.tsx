import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  Pressable,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import {recentJobs} from '../../utils/jobs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config  from "../../context/config";
import translations from '../../utils/orghome';
import { useLanguageContext } from '../../context/LanguageContext';
import { Root, Popup } from 'popup-ui';

const OrganizationHomeScreen = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const { language } = useLanguageContext();
  const t = (key:any) => translations[language][key] || key;
  const [userData, setUserData] = useState<{organizationName: string} | null>(
    null,
  );

  console.log("response",userData);

  const getAllAsyncStorageData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);

        stores.forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
        
        return stores; // Returns an array of key-value pairs
    } catch (error) {
        console.error('Error fetching AsyncStorage data:', error);
    }
};

  useEffect(() => {
    fetchUserData();
    getAllAsyncStorageData();
  }, []);

  const fetchUserData = async () => {
    try {
      // const accessToken = await AsyncStorage.getItem('userToken');
      const id = await AsyncStorage.getItem('userId');
      const response = await axios.get(
        `${config.apiUrl}/organizationDetails/get/${id}`,
      );
     // Log the full response to inspect it
  
      if (response.status === 200 && response.data) {
        const data = response.data; // Directly assign the response object to `data`
        setUserData({
          organizationName: data.organizationName || '',
          logoUrl: data.logo
            ? `${config.apiUrl}/photo/${data.logo}`
            : '',
        });
      } else {
        console.error('No valid data available');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Popup.show({
        type: 'Danger',
        title: 'Error',
        textBody: 'Failed to load user data.',
        button: true,
        buttonText: 'Ok',
        callback: () => Popup.hide(),
      });
    }
  };
  

  const specializationData = [
    {image: require('../../assets/icons/Group3.png'), title: 'Design', jobs: 120},
    {
      image: require('../../assets/icons/Group2.png'),
      title: 'Finance',
      jobs: 250,
    },
    {
      image: require('../../assets/icons/Group4.png'),
      title: 'Education',
      jobs: 120,
    },
    {
      image: require('../../assets/icons/Group5.png'),
      title: 'Restaurant',
      jobs: 85,
    },
    {image: require('../../assets/icons/Group1.png'), title: 'Health', jobs: 235},
    {
      image: require('../../assets/icons/Group6.png'),
      title: 'Programmer',
      jobs: 412,
    },
  ];

  const renderJobCard = ({item}: {item: any}) => (
    <Pressable style={styles.jobCard}>
      <Image source={item.logo} style={styles.companyLogo} />
      <View style={styles.jobInfo}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text
          style={
            styles.companyLocation
          }>{`${item.company} - ${item.location}`}</Text>
        <View style={styles.tags}>
          {item.tags.map((tag: any, index: any) => (
            <View key={`tag-${item.id}-${index}`} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <Pressable style={styles.bookmarkButton}>
        <Image
          source={require('../../assets/icons/save.png')}
          style={styles.icon}
        />
      </Pressable>
    </Pressable>
  );

  const renderContent = ({item}: {item: any}) => {
    if (item.key === 'header') {
      return (
        <ImageBackground
          source={require('../../assets/icons/BGG.png')}
          style={styles.headerBackground}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>{t('hello')}</Text>
              <Text style={styles.name}>{userData?.organizationName}</Text>
            </View>
            <View style={styles.rightSection}>
              <Pressable
                onPress={() => navigation.navigate('OrganizationProfile')}>
                <View style={styles.profileImageWrapper}>
                  <Image
                    source={{uri: userData?.logoUrl}}
                    style={styles.profileImage}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchContainer}>
              <Image
                source={require('../../assets/icons/Search.png')}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search"
                style={styles.input}
                placeholderTextColor="#000"
              />
            </View>
            <Pressable style={styles.filterButton}>
              <Image
                source={require('../../assets/icons/filter.png')}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </ImageBackground>
      );
    } else if (item.key === 'specialization') {
      return (
        <View style={styles.specializationContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('attr1')}</Text>
            <Pressable>
              <Text style={styles.viewAll}>{t('attr2')}</Text>
            </Pressable>
          </View>
          <View style={styles.specializationGrid}>
            {specializationData.map((item, index: any) => (
              <Pressable
                key={`specialization-${index}`}
                style={[
                  styles.specializationItem,
                  selectedSpecialization === index &&
                    styles.selectedSpecializationItem,
                ]}
                onPress={() => setSelectedSpecialization(index)}>
                <View
                  style={[
                    styles.iconContainer,
                    selectedSpecialization === index &&
                      styles.selectedIconContainer,
                  ]}>
                  <Image
                    source={item.image}
                    style={styles.specializationIcon}
                  />
                </View>
                <Text
                  style={[
                    styles.specializationTitle,
                    selectedSpecialization === index &&
                      styles.selectedSpecializationTitle,
                  ]}>
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.jobCount,
                    selectedSpecialization === index && styles.selectedJobCount,
                  ]}>
                  {item.jobs} Jobs
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      );
    } else if (item.key === 'jobRecommendation') {
      return (
        <View style={styles.jobRecommendationContainer}>
          <Text style={styles.sectionTitle}>{t('attr3')}</Text>
          {recentJobs.map(job => (
            <React.Fragment key={`job-${job.id}`}>
              {renderJobCard({item: job})}
            </React.Fragment>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <Root>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[
          {key: 'header'},
          {key: 'specialization'},
          {key: 'jobRecommendation'},
        ]}
        renderItem={renderContent}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        style={styles.scrollContent}
      />
      <View style={styles.bottomNav}>
        <Pressable>
          <Image
            source={require('../../assets/icons/home.png')}
            style={styles.navIcon}
          />
        </Pressable>
        <Pressable>
          <Image
            source={require('../../assets/icons/connect.png')}
            style={styles.navIcon}
          />
        </Pressable>
        <View style={styles.addButtonContainer}>
          <Pressable
            style={styles.addButton}
            onPress={() => setIsModalVisible(true)}>
            <Image
              source={require('../../assets/icons/plus.png')}
              style={styles.plusIcon}
            />
          </Pressable>
        </View>
        <Pressable >
        {/* onPress={() => navigation.navigate('orgNotifications')} */}
          <Image
            source={require('../../assets/icons/chart.png')}
            style={styles.navIcon}
          />
        </Pressable>
        <Pressable>
          <Image
            source={require('../../assets/icons/save.png')}
            style={styles.navIcon}
          />
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>What would you like to add?</Text>
            <Text style={styles.modalDescription}>
              Would you like to post your tips and experiences or create a job?
            </Text>
            <Pressable
              style={styles.postButton}
              onPress={() => {
                setIsModalVisible(false);
                // Add your POST action here
              }}>
              <Text style={styles.postButtonText}>POST</Text>
            </Pressable>
            <Pressable
              style={styles.makeJobButton}
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate('JobPost');
              }}>
              <Text style={styles.makeJobButtonText}>MAKE A JOB</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerBackground: {
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greeting: {
    color: '#fff',
    fontSize: 16,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  notificationButton: {
    padding: 8,
  },
  profileImageWrapper: {
    width: 50, // Outer circle size
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff', // Circle background color
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Use a darker shadow color for better visibility
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Slightly transparent shadow
    shadowRadius: 4, // Less blur radius for a subtle shadow
    elevation: 5, // Lower elevation for Android shadow
  },

  profileImage: {
    width: 40, // Inner image size
    height: 40,
    borderRadius: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#FF6B2C',
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  specializationContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  viewAll: {
    color: '#666',
  },
  specializationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  specializationItem: {
    width: '30%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedSpecializationItem: {
    backgroundColor: '#FFF0E6',
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#FF6B2C',
  },
  selectedIconContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  specializationIcon: {
    width: 24,
    height: 24,
  },
  specializationTitle: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
  },
  selectedSpecializationTitle: {
    color: '#FF6B2C',
  },
  jobCount: {
    fontSize: 12,
    color: '#666',
  },
  selectedJobCount: {
    color: '#FF6B2C',
  },
  jobRecommendationContainer: {
    padding: 20,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  bookmarkButton: {
    padding: 8,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  navTab: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  addIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  addButtonContainer: {
    marginTop: -30,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A1150',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  postButton: {
    backgroundColor: '#4B0082',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  postButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  makeJobButton: {
    backgroundColor: '#E6E6FA',
    width: '100%',
    padding: 15,
    borderRadius: 8,
  },
  makeJobButtonText: {
    color: '#4B0082',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrganizationHomeScreen;
