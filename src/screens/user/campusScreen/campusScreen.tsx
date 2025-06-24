import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import config from '../../../context/config';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type Event = {
  eventId: string;
  organization: {
    organizationName: string;
    logo: string;
  };
  degName: string;
  strength: number;
  startingDate: string;
  endingDate: string;
};

type FilterType = 'all' | 'ended' | 'incoming' | 'present';

const CampusScreen = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const navigation = useNavigation();

  const flatListRef = useRef<FlatList<any>>(null);
  const images = [
    require('../../../assets/Banner/1.jpg'),
    require('../../../assets/Banner/2.png'),
    require('../../../assets/Banner/3.png'),
    require('../../../assets/Banner/4.png'),
    require('../../../assets/Banner/5.png'),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents(activeFilter, searchQuery);
  }, [events, activeFilter, searchQuery]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/event/getAll`);
      const result = await response.json();
      if (result.message === "Events and Company details retrieved successfully") {
        setEvents(result.data);
        setFilteredEvents(result.data);
      } else {
        setError("Failed to fetch events");
      }
    } catch (err) {
      setError("An error occurred while fetching events");
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = (filterType: FilterType, query: string) => {
    const currentDate = new Date();
    
    let filtered = [...events];
    
    // Apply status filter
    if (filterType !== 'all') {
      filtered = filtered.filter(item => {
        const endDate = new Date(item.endingDate);
        const twoMonthsFromNow = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, currentDate.getDate());
        
        if (filterType === 'ended' && endDate < currentDate) {
          return true;
        } else if (filterType === 'present' && endDate >= currentDate && endDate <= twoMonthsFromNow) {
          return true;
        } else if (filterType === 'incoming' && endDate > twoMonthsFromNow) {
          return true;
        }
        return false;
      });
    }
    
    // Apply search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(item => 
        item.organization.organizationName.toLowerCase().includes(lowercaseQuery) ||
        item.degName.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    setFilteredEvents(filtered);
  };

  // Auto scroll functionality
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (currentIndex < images.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
        setCurrentIndex(currentIndex + 1);
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
        setCurrentIndex(0);
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [currentIndex]);

  const renderBannerItem = ({ item }: { item: any }) => (
    <Image
      source={item}
      style={styles.bannerImage}
      resizeMode="cover"
    />
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getEventStatus = (endDate: Date) => {
    const currentDate = new Date();
    const twoMonthsFromNow = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, currentDate.getDate());

    if (endDate < currentDate) {
      return { color: '#FF0000', text: 'Ended' }; // Red for expired
    } else if (endDate <= twoMonthsFromNow) {
      return { color: '#00FF00', text: 'Present' }; // Green for within 2 months
    } else {
      return { color: '#f5b041', text: 'Incoming' }; // Yellow for future
    }
  };

  const renderEventCard = ({ item }: { item: Event }) => {
    const endDate = new Date(item.endingDate);
    const status = getEventStatus(endDate);

    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardHeader}>
          <Image
            source={{
              uri: item.organization.logo
                ? `${config.apiUrl}/photo/${item.organization.logo}`
                : undefined,
            }}
            style={styles.companyLogo}
          />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>
              {item.organization.organizationName}
            </Text>
            <Text style={styles.designation}>Designation: {item.degName}</Text>
            <Text style={styles.strength}>Strength: {item.strength}</Text>
            <Text style={styles.dateRange}>
              Date Range: {formatDate(item.startingDate)} -{' '}
              {formatDate(item.endingDate)}
            </Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.statusContainer}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.text}</Text>
            <View style={[styles.statusDot, { backgroundColor: status.color }]} />
          </View>
          <Pressable 
            style={styles.applyButton} 
            onPress={() => navigation.navigate('campusApplyScreen', { events: item })}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    );
  };

  const FilterButton = ({ title, type }: { title: string; type: FilterType }) => (
    <TouchableOpacity
      style={[
        styles.filterOption,
        activeFilter === type && styles.activeFilterOption
      ]}
      onPress={() => setActiveFilter(type)}
    >
      <Text style={[
        styles.filterOptionText,
        activeFilter === type && styles.activeFilterOptionText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../../assets/icons/whiteback.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MY JOB CAMPUS</Text>
        <Image
          source={require('../../../assets/icons/check.png')}
          style={styles.checkIcon}
        />
      </View>
  
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderBannerItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />
      </View>
  
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Image
            source={require('../../../assets/icons/Search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.filterText}>Filters</Text>
          <Image
            source={require('../../../assets/icons/filterw.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      
      {/* Filter Options */}
      {showFilters && (
        <View style={styles.filterOptionsContainer}>
          <FilterButton title="All" type="all" />
          <FilterButton title="Ended" type="ended" />
          <FilterButton title="Present" type="present" />
          <FilterButton title="Incoming" type="incoming" />
        </View>
      )}
  
      {/* Company Cards */}
      <View style={styles.cardsContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Loading events...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : filteredEvents.length === 0 ? (
          <Text style={styles.noResultsText}>No matching events found</Text>
        ) : (
          <FlatList
            data={filteredEvents}
            renderItem={renderEventCard}
            keyExtractor={(item) => item.eventId}
            scrollEnabled={true}
            nestedScrollEnabled={true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#130160',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    position: 'relative',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  checkIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  bannerContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#8A2BE2',
    height: 120,
  },
  bannerImage: {
    width: width - 32, // Accounting for margin
    height: 120,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginRight: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  filterText: {
    marginRight: 8,
    color: '#000',
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  filterOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeFilterOption: {
    backgroundColor: 'white',
  },
  filterOptionText: {
    color: 'white',
    fontWeight: '500',
  },
  activeFilterOptionText: {
    color: '#130160',
  },
  cardsContainer: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  companyLogo: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    marginRight: 12,

    // Shadow for iOS
    shadowColor: '#1E90FF',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 8,

    // Shadow for Android
    elevation: 8,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#130160',
  },
  designation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  strength: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 6,
  },
  statusDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
  },
  applyButton: {
    backgroundColor: '#1E90FF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingText: {
    color: '#130160',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  noResultsText: {
    color: '#130160',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  }
});

export default CampusScreen;