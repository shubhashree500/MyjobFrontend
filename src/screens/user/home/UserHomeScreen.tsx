// import React, {useState, useRef, useEffect, useCallback} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ImageBackground,
//   Pressable,
//   FlatList,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import {recentJobs} from '../../../utils/jobs';
// import TabBar from '../../../component/TabBar';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import config from '../../../context/config';
// import {useLanguageContext} from '../../../context/LanguageContext';
// import translations from '../../../utils/orghome';
// import {useFocusEffect} from '@react-navigation/native';
// import {Root, Popup} from 'popup-ui';

// const {width} = Dimensions.get('window');

// const UserHomeScreen = ({navigation}: any) => {
//   const [savedJobs, setSavedJobs] = useState<any[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const {language} = useLanguageContext();
//   const t = (key: any) => translations[language][key] || key;
//   const sliderRef = useRef<FlatList<any>>(null);
//   const [jobData, setJobdata] = useState([]);
//   const [userId, setUserId] = useState(null); // Store userId
//   const [jobCounts, setJobCounts] = useState({
//     remoteJobs: 0,
//     internships: 0,
//     fullTime: 0,
//     partTime: 0,
//   });

//   // console.log('jobData', jobData);
//   const [userData, setUserData] = useState({
//     name: '',
//     coverImage: '',
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const nextIndex = (currentIndex + 1) % images.length;
//       setCurrentIndex(nextIndex);
//       sliderRef.current?.scrollToIndex({index: nextIndex, animated: true});
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   const renderBannerItem = ({item}: {item: any}) => (
//     <View style={styles.bannerItemContainer}>
//       <ImageBackground
//         source={item}
//         style={styles.promoBanner}
//         imageStyle={styles.promoBannerImage}
//       />
//     </View>
//   );

//   useEffect(() => {
//     fetchJobData();
//   }, []);

//   const countJobTypes = (jobs: any[]) => {
//     const counts = {
//       remoteJobs: 0,
//       internships: 0,
//       fullTime: 0,
//       partTime: 0,
//     };

//     jobs.forEach(job => {
//       if (job.workPlaceType === 'Remote') {
//         counts.remoteJobs++;
//       }

//       switch (job.jobType) {
//         case 'Internship':
//           counts.internships++;
//           break;
//         case 'Full-Time':
//           counts.fullTime++;
//           break;
//         case 'Part-Time':
//           counts.partTime++;
//           break;
//       }
//     });

//     return counts;
//   };

//   const fetchJobData = async () => {
//     const apiUrl = `${config.apiUrl}/postedjob/getAll`;
//     try {
//       const response = await axios.get(apiUrl);
//       if (response.status === 200 && response.data.data) {
//         const transformedData = response.data.data.map((job: any) => ({
//           jobId: job.jobId,
//           compId: job.organization.compId,
//           jobRole: job.jobRole || 'Untitled Job',
//           companyName: job.companyName || 'Unknown Company',
//           jobLocation: job.jobLocation || 'Unknown Location',
//           salary: job.salary || 'Not Disclosed',
//           tags: [
//             ...(job.jobType ? [job.jobType] : []),
//             ...(Array.isArray(job.workPlaceType)
//               ? job.workPlaceType
//               : [job.workPlaceType]),
//           ],
//           logo: job.organization.logo
//             ? `${config.apiUrl}/photo/${job.organization.logo}`
//             : 'https://via.placeholder.com/150',
//           degName: job.degName || 'Unknown Name',
//           secName: job.secName || 'Unknown Sector',
//           skills: job.skills || [],
//           jobDescription: job.jobDescription || 'Unknown Job Description',
//           yearsOfExperience: job.yearsOfExperience,
//           requirements: job.requirements || [],
//           jobType: job.jobType || 'Unknown Job Type',
//           workPlaceType: job.workPlaceType || '',
//           organizationName: job.organization.organizationName,
//           headOffice: job.organization.address,
//           email: job.organization.email,
//           phoneNo: job.organization.phoneNo,
//           website: job.organization.website,
//           about: job.organization.description,
//           industry: job.organization.industry,
//           since: job.organization.since,
//           specialization: job.organization.specialization,
//         }));
//         setJobdata(transformedData);
//         const counts = countJobTypes(transformedData);
//         setJobCounts(counts);
//       }
//     } catch (error) {
//       console.log('Error fetching JobPost data:', error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       const fetchSavedJobs = async () => {
//         try {
//           const userId = await AsyncStorage.getItem('userId');
//           if (!userId) {
//             console.warn('User not logged in');
//             return;
//           }

//           const response = await axios.get(
//             `${config.apiUrl}/SavedJob/get/${userId}`,
//           );

//           if (response.status === 200 && response.data.success) {
//             setSavedJobs(response.data.savedJobs || []);
//           } else {
//             setSavedJobs([]);
//           }
//         } catch (error) {
//           console.error('Error fetching saved jobs:', error);
//           setSavedJobs([]);
//         }
//       };

//       fetchSavedJobs();
//     }, []),
//   );

//   const handleRemoveJob = async (jobId: string) => {
//     try {
//       const userId = await AsyncStorage.getItem('userId');
//       if (!userId) {
//         Alert.alert('Error', 'User not logged in');
//         return;
//       }

//       const response = await axios.delete(
//         `${config.apiUrl}/SavedJob/delete/${userId}/${jobId}`,
//       );

//       if (response.status === 200) {
//         setSavedJobs(prevJobs => prevJobs.filter(job => job.jobId !== jobId));
//         Popup.show({
//           type: 'Success',
//           title: 'Job Removed',
//           button: true,
//           textBody:
//             'The job has been successfully removed from your saved list.',
//           buttonText: 'OK',
//           callback: () => Popup.hide(),
//         });
//       } else {
//         Alert.alert('Error', 'Failed to remove job');
//       }
//     } catch (error) {
//       console.error('Error removing job:', error);
//       Alert.alert('Error', 'An error occurred while removing the job');
//     }
//   };

//   const handleSaveJob = async (job: any) => {
//     const isJobSaved = savedJobs.some(savedJob => savedJob.jobId === job.jobId);

//     if (isJobSaved) {
//       await handleRemoveJob(job.jobId);
//     } else {
//       try {
//         const userId = await AsyncStorage.getItem('userId');
//         if (!userId) {
//           Alert.alert('Error', 'User not logged in');
//           return;
//         }

//         const saveData = {
//           jobId: job.jobId,
//           userId: userId,
//           createdBy: 1,
//         };

//         const response = await axios.post(
//           `${config.apiUrl}/SavedJob/create`,
//           saveData,
//         );

//         if (response.status === 200 && response.data.success) {
//           setSavedJobs(prevJobs => [...prevJobs, job]);
//           Popup.show({
//             type: 'Success',
//             title: 'Job Saved',
//             button: true,
//             textBody: 'The job has been successfully saved to your list.',
//             buttonText: 'OK',
//             callback: () => Popup.hide(),
//           });
//         } else {
//           Alert.alert('Error', 'Failed to save job');
//         }
//       } catch (error) {
//         console.error('Error saving job:', error);
//         Alert.alert('Error', 'An error occurred while saving the job');
//       }
//     }
//   };

//   const JobCard = ({item}: {item: any}) => {
//     const isSaved = savedJobs.some(savedJob => savedJob.jobId === item.jobId);

//     const getSaveIcon = () => {
//       return isSaved
//         ? require('../../../assets/icons/logo.png')
//         : require('../../../assets/icons/save.png');
//     };

//     return (
//       <View style={styles.card}>
//         <View style={styles.CardHeader}>
//           <Image
//             source={
//               item?.logo
//                 ? {uri: item.logo}
//                 : require('../../../assets/icons/computer-worker.png')
//             }
//             style={styles.logo}
//             resizeMode="contain"
//           />

//           <View style={styles.titleContainer}>
//             <Text style={styles.title}>{item.degName || 'Role'}</Text>
//             <Text style={styles.subtitle}>
//               {item.organizationName || 'Unknown Company'} •{' '}
//               {item.jobLocation || 'Unknown Location'}
//             </Text>
//           </View>
//           <Pressable onPress={() => handleSaveJob(item)}>
//             <Image source={getSaveIcon()} style={{height: 24, width: 24}} />
//           </Pressable>
//         </View>

//         <Text style={styles.salary}>{item.salary}/mo</Text>

//         <View style={styles.tagsContainer}>
//           {Array.isArray(item.tags) && item.tags.length > 0 ? (
//             item.tags.map((tag: any, index: any) => (
//               <View style={styles.tag} key={index}>
//                 <Text style={styles.tagText}>{tag}</Text>
//               </View>
//             ))
//           ) : (
//             <Text style={{fontSize: 12, color: '#aaa'}}>No tags available</Text>
//           )}

//           <Pressable
//             style={styles.applyButton}
//             onPress={() => navigation.navigate('ApplyScreen', {jobData: item})}>
//             <Text style={styles.applyText}>Apply</Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   };

//   const images = [
//     require('../../../assets/Banner/1.jpg'),
//     require('../../../assets/Banner/2.png'),
//     require('../../../assets/Banner/3.png'),
//     require('../../../assets/Banner/4.png'),
//     require('../../../assets/Banner/5.png'),
//     // require('../../../assets/icons/Banner.png'),
//   ];

//   useEffect(() => {
//     const getUserId = async () => {
//       const storedUserId: any = await AsyncStorage.getItem('userId');
//       if (storedUserId) {
//         setUserId(storedUserId);
//         fetchUserData(storedUserId);
//       }
//     };

//     getUserId();
//   }, []);

//   const fetchUserData = async (userId: any) => {
//     const apiUrl = `${config.apiUrl}/personalDetails/get`;

//     try {
//       const accessToken = await AsyncStorage.getItem('userToken');
//       const id = await AsyncStorage.getItem('userId');
//       const response = await axios.get(
//         `${config.apiUrl}/personalDetails/get/${id}`,
//         {
//           headers: {Authorization: `Bearer ${accessToken}`},
//         },
//       );

//       if (response.status === 200) {
//         const data = response.data.data;
//         setUserData({
//           name: data.fullName || 'User',
//           coverImage: data.coverImage
//             ? `${config.apiUrl}/userlogo/${data.coverImage}`
//             : '',
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       Alert.alert('Error', 'Failed to load user data.');
//     }
//   };

//   return (
//     <Root>
//       <SafeAreaView style={styles.container}>
//         <ScrollView>
//           {/* Header Section */}
//           <View style={styles.header}>
//             <View>
//               <Text style={styles.hello}>{t('hello')}</Text>
//               <Text style={styles.name}>{userData.name}</Text>
//             </View>
//             <Pressable onPress={() => navigation.navigate('MyProfile')}>
//               <Image
//                 source={
//                   userData?.coverImage
//                     ? {uri: userData?.coverImage}
//                     : require('../../../assets/icons/user.png')
//                 }
//                 style={styles.profileImage}
//               />
//             </Pressable>
//           </View>

//           {/* Banner Section */}
//           <FlatList
//             ref={sliderRef}
//             data={images}
//             renderItem={renderBannerItem}
//             keyExtractor={(item, index) => index.toString()}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onMomentumScrollEnd={event => {
//               const newIndex = Math.round(
//                 event.nativeEvent.contentOffset.x / width,
//               );
//               setCurrentIndex(newIndex);
//             }}
//             scrollEnabled={false} // Disable scrolling for FlatList
//           />

//           {/* Find Your Job Section */}
//           <View style={{flex: 0.3}}>
//             <Text style={styles.sectionTitle}>{t('findYourJob')}</Text>
//             <View style={styles.statsContainer}>
//               <Pressable
//                 style={[styles.statsCard, {backgroundColor: '#E5F5FF'}]}
//                 onPress={() => navigation.navigate('JobSearchScreen')}>
//                 <Image
//                   source={require('../../../assets/user-home/remote.png')}
//                   style={styles.statsIcon}
//                 />
//                 <Text style={styles.statsNumber}>{jobCounts.remoteJobs}</Text>
//                 <Text style={styles.statsLabel}>Remote Job</Text>
//               </Pressable>
//               <Pressable
//                 style={[styles.statsCard, {backgroundColor: '#F0E8FF'}]}
//                 onPress={() => navigation.navigate('JobSearchScreen')}>
//                 <Image
//                   source={require('../../../assets/user-home/full-time.png')}
//                   style={styles.statsIcon}
//                 />
//                 <Text style={styles.statsNumber}>{jobCounts.fullTime}</Text>
//                 <Text style={styles.statsLabel}>Full Time</Text>
//               </Pressable>
//               <Pressable
//                 style={[styles.statsCard, {backgroundColor: '#FFE8D9'}]}
//                 onPress={() => navigation.navigate('JobSearchScreen')}>
//                 <Image
//                   source={require('../../../assets/user-home/part-time.png')}
//                   style={styles.statsIcon}
//                 />
//                 <Text style={styles.statsNumber}>{jobCounts.partTime}</Text>
//                 <Text style={styles.statsLabel}>Part Time</Text>
//               </Pressable>
//               <Pressable
//                 style={[styles.statsCard, {backgroundColor: '#D9F3C9'}]}
//                 onPress={() => navigation.navigate('JobSearchScreen')}>
//                 <Image
//                   source={require('../../../assets/user-home/internship.png')}
//                   style={styles.statsIcon}
//                 />
//                 <Text style={styles.statsNumber}>{jobCounts.internships}</Text>
//                 <Text style={styles.statsLabel}>Internship</Text>
//               </Pressable>
//             </View>
//           </View>

//           {/* Recent Job List */}
//           <View style={{flex: 0.3}}>
//             <Text style={styles.sectionTitle}>{t('recentJobList')}</Text>
//             <FlatList
//               data={jobData}
//               keyExtractor={item => item.jobId}
//               renderItem={JobCard}
//               contentContainerStyle={styles.jobListContainer}
//               showsVerticalScrollIndicator={false}
//               scrollEnabled={false} // Disable scrolling for FlatList
//               ListEmptyComponent={
//                 <Text
//                   style={{
//                     textAlign: 'center',
//                     marginTop: 20,
//                     fontSize: 16,
//                     color: '#000',
//                   }}>
//                   No jobs available
//                 </Text>
//               }
//             />
//           </View>
//         </ScrollView>

//         {/* Bottom Navigation */}
//         {/* <TabBar navigation={navigation} /> */}
//       </SafeAreaView>
//     </Root>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   bannerItemContainer: {
//     width: width,
//     paddingHorizontal: 10,
//   },
//   promoBanner: {
//     width: '100%',
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   promoBannerImage: {
//     borderRadius: 12,
//     resizeMode: 'cover',
//   },
//   header: {
//     flexDirection: 'row', // Proper row layout
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//   },
//   hello: {
//     fontSize: 20,
//     color: '#0072ff',
//     fontWeight: 'bold',
//     textShadowColor: '#0056b3',
//     textShadowOffset: {width: 1, height: 1},
//     textShadowRadius: 2,
//     letterSpacing: 1.2,
//     textTransform: 'uppercase',
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     borderWidth: 3,
//     borderColor: '#0072ff',
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.5,
//     shadowRadius: 6,
//     elevation: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 20,
//     marginTop: 12,
//     marginBottom: 12,
//   },
//   jobListContainer: {
//     flexGrow: 1,
//     paddingHorizontal: 20,
//     paddingBottom: 78,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     margin: 18,
//     justifyContent: 'space-between',
//   },
//   statsCard: {
//     width: '48%',
//     aspectRatio: 2, // Keeps the height proportional
//     borderRadius: 10,
//     padding: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   statsIcon: {
//     width: 34,
//     height: 34,
//     marginBottom: 5,
//   },
//   statsNumber: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   statsLabel: {
//     fontSize: 12,
//     color: '#666666',
//   },
//   card: {
//     flexDirection: 'column',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   CardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     marginRight: 12,
//     shadowColor: '#0072ff',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.4,
//     shadowRadius: 4,
//     elevation: 6,
//   },
//   titleContainer: {
//     flex: 1, // Ensures text takes available space
//     marginLeft: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 4,
//   },
//   salary: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#222',
//     paddingVertical: 10,
//   },
//   tagsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   tag: {
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     marginRight: 8,
//     borderWidth: 2, // Border thickness
//     borderColor: '#0072ff', // Border color

//     // Shadow for iOS
//     shadowColor: '#0072ff', // Custom shadow color
//     shadowOffset: {width: 0, height: 4}, // Increased offset for visibility
//     shadowOpacity: 0.5, // Higher opacity for a stronger shadow
//     shadowRadius: 6, // Increased radius for a softer spread

//     // Shadow for Android
//     elevation: 10, // Increased elevation for Android
//   },

//   tagText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   applyButton: {
//     backgroundColor: '#32CD32', // Smooth green fallback
//     padding: 8,
//     paddingHorizontal: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 12, // Slightly more rounded for a modern look
//     // Shadow for iOS
//     shadowColor: '#2E8B57', // Slightly darker green for shadow
//     shadowOffset: {width: 0, height: 6},
//     shadowOpacity: 0.5,
//     shadowRadius: 8,

//     // Shadow for Android
//     elevation: 10,
//   },

//   applyText: {
//     fontSize: 14, // Slightly larger text for emphasis
//     fontWeight: '600', // Semi-bold for better readability
//     color: '#FFFFFF', // White text for contrast
//     textTransform: 'uppercase', // Stylish uppercase text
//     letterSpacing: 1.2, // Subtle letter spacing for a modern feel
//   },

//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: 10,
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#EEEEEE',
//   },
//   navIcon: {
//     width: 24,
//     height: 24,
//   },
//   addButtonContainer: {
//     marginTop: -30,
//   },
//   addButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#1A1150',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   plusIcon: {
//     width: 24,
//     height: 24,
//     tintColor: '#FFFFFF',
//   },
// });

// export default UserHomeScreen;
