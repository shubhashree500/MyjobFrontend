import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
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

const upcomingInterviews = [
  {
    date: '2025-07-05T11:00:00',
    company: 'TechCorp',
    status: 'Scheduled',
  },
  {
    date: '2025-07-07T14:00:00',
    company: 'CreativeSoft',
    status: 'Pending',
  },
];

const UserDashboardScreen = () => {
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
        <Text style={styles.screenTitle}>User Dashboard</Text>
      </View>

      {/* ✅ FIXED: wrap all in ScrollView */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
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
            ['Remote', '#E5F5FF', require('../../../assets/icons/remote.png')],
            ['Full Time', '#F0E8FF', require('../../../assets/icons/fulltime.png')],
            ['Part Time', '#FFE8D9', require('../../../assets/icons/parttime.png')],
            ['Internship', '#D9F3C9', require('../../../assets/icons/internship.png')],
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
            <Image source={require('../../../assets/icons/graphics.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>UI/UX</Text>
            <Text style={styles.cardSubtitle}>Design based jobs</Text>
          </View>
          <View style={styles.blueCard}>
            <Image source={require('../../../assets/icons/connections.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Development</Text>
            <Text style={styles.cardSubtitle}>Frontend & Backend</Text>
          </View>
        </View>



<Text style={styles.sectionTitle}>Popular Companies</Text>
<FlatList
  data={[
    { name: 'TechCorp', logo: require('../../../assets/icons/TechCorp.png') },
    { name: 'Designify', logo: require('../../../assets/icons/Designify.png') },
    { name: 'CodeCraft', logo: require('../../../assets/icons/CodeCraft.png') },
    { name: 'SoftSolutions', logo: require('../../../assets/icons/SoftSolutions.png') },
  ]}
  horizontal
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item, index) => index.toString()}
  contentContainerStyle={{ paddingVertical: 10 }}
  renderItem={({ item }) => (
    <View style={styles.companyCard}>
      <Image source={item.logo} style={styles.companyLogo} />
      <Text style={styles.companyName}>{item.name}</Text>
      <TouchableOpacity style={styles.followBtn}>
        <Text style={styles.followBtnText}>+ Follow</Text>
      </TouchableOpacity>
    </View>
  )}
/>

        <Text style={styles.sectionTitle}>Recent Job List</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>• React Native Developer at XYZ</Text>
          <Text style={styles.activityText}>• UI/UX Designer at ABC</Text>
          <Text style={styles.activityText}>• Backend Engineer at DEF</Text>
        </View>

      <Text style={styles.sectionTitle}>Upcoming Interviews</Text>
{upcomingInterviews.map((interview, index) => {
  const timeLeft = moment(interview.date).fromNow(); // ⏱ Countdown

  return (
    <View key={index} style={styles.interviewItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.activityText}>
          📅 {moment(interview.date).format('D MMM YYYY, h:mm A')} with {interview.company}
        </Text>
        <Text style={styles.countdownText}>Starts {timeLeft}</Text>
      </View>
      <View style={[styles.chip, { backgroundColor: interview.status === 'Scheduled' ? '#4CAF50' : '#FFC107' }]}>
        <Text style={styles.chipText}>{interview.status}</Text>
      </View>
    </View>
  );
})}


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
  container: { flex: 1, backgroundColor: '#F7FBFF' },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'sans-serif-medium',
  },
  content: { padding: 20 },
  bannerContainer: { marginBottom: 20 },
  bannerItem: { width, alignItems: 'center' },
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
  },followBtn: {
  marginTop: 6,
  backgroundColor: '#007AFF',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 6,
},
followBtnText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: '500',
},

interviewItem: {
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  elevation: 2,
},
chip: {
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
  alignSelf: 'flex-start',
},
chipText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: '600',
},
countdownText: {
  fontSize: 13,
  color: '#666',
  marginTop: 4,
  fontStyle: 'italic',
},

  companyCard: {
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 10,
  alignItems: 'center',
  marginRight: 12,
  elevation: 2,
  width: 100,
},
companyLogo: {
  width: 50,
  height: 50,
  marginBottom: 6,
  resizeMode: 'contain',
},
companyName: {
  fontSize: 13,
  color: '#333',
  textAlign: 'center',
  fontFamily: 'sans-serif',
},

interviewRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
},

badge: {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: '#F44336',
  marginLeft: 10,
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

