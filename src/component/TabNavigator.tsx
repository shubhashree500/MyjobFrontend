import * as React from 'react';
import { View, Image, StyleSheet, Pressable, Modal, Text, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import UserHomeScreen from '../screens/user/home/UserHomeScreen';
import JobSearchScreen from '../screens/user/jobScreen/JobSearchScreen';
import UserNotification from '../screens/notification/userNotifications';
import SavedJobsScreen from '../screens/user/home/SavedJobsScreen';
import { useState, useRef, useEffect } from 'react';

// Updated platform names to match tab screen names
const platforms = [
  { name: 'Home', image: require('../assets/icons/home.png') },
  { name: 'Jobs', image: require('../assets/icons/loupe.png') },
  { name: 'Notification', image: require('../assets/icons/chart.png') },
  { name: 'Saved', image: require('../assets/icons/save.png') },
];

// Create Stack Navigator for each tab screen
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
    </Stack.Navigator>
  );
}

function JobStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JobSearchScreen" component={JobSearchScreen} />
    </Stack.Navigator>
  );
}

function CommentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserNotification" component={UserNotification} />
    </Stack.Navigator>
  );
}

function SavedJobsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SavedJobsScreen" component={SavedJobsScreen} />
    </Stack.Navigator>
  );
}

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function TabNavigator({navigation}:any) {
  const [localModalVisible, setLocalModalVisible] = useState(false);
  const [activeScreen, setActiveScreen] = useState('Home');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade-in animation when the active screen changes
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [activeScreen, fadeAnim]);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            // Skip icon rendering for the Add tab since it has a custom button
            if (route.name === 'Add') return null;
            
            const platform = platforms.find((p) => p.name === route.name);
            if (platform) {
              return (
                <View style={focused ? styles.iconShadow : null}>
                  <Image
                    source={platform.image}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: focused ? '#4285F4' : '#B0B0B0',
                    }}
                  />
                </View>
              );
            }
            return null;
          },
          tabBarActiveTintColor: '#4285F4',
          tabBarInactiveTintColor: '#B0B0B0',
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: 'white',
            paddingBottom: 7,
            height: 58,
            borderTopWidth: 0,
            marginHorizontal: 20,
            borderRadius: 20,
            position: 'absolute',
            bottom: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          headerShown: false,
        })}
        screenListeners={{
          state: (e) => {
            const currentRoute = e.data.state.routes[e.data.state.index];
            setActiveScreen(currentRoute.name);
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Jobs" component={JobStack} />
        <Tab.Screen 
  name="Add" 
  component={() => null} 
  options={{
    tabBarLabel: () => null,
    tabBarButton: () => (
      <View style={styles.addButtonContainer}>
        <Pressable
          style={[styles.addButton, activeScreen === "CampusScreen" && styles.activeAddButton]}
          onPress={() => setLocalModalVisible(true)}
        >
          <Image source={require("../assets/icons/plus.png")} style={styles.plusIcon} />
        </Pressable>
      </View>
    ),
  }}
/>
        <Tab.Screen name="Notification" component={CommentStack} />
        <Tab.Screen name="Saved" component={SavedJobsStack} />
      </Tab.Navigator>

      {/* Modal from the attached TabBar component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={localModalVisible}
        onRequestClose={() => setLocalModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setLocalModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>What would you like to do?</Text>
            <Text style={styles.modalDescription}>
              Would you like to explore job opportunities or post a new job listing?
            </Text>
            <Pressable
              style={styles.postButton}
              onPress={() => {
                setLocalModalVisible(false);
                navigation.navigate('CampusScreen');
              }}
            >
              <Text style={styles.postButtonText}>MY JOB CAMPUS</Text>
            </Pressable>
            <Pressable
              style={styles.makeJobButton}
              onPress={() => {
                setLocalModalVisible(false);
                // Navigate to JobPost
                // You'll need to implement navigation here based on your navigation structure
              }}
            >
              <Text style={styles.makeJobButtonText}>Explore</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconShadow: {
    shadowColor: '#4285F4',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: -15,
    left: 0,
    right: 0,
  },
  addButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeAddButton: {
    backgroundColor: '#4285F4',
  },
  plusIcon: {
    width: 20,
    height: 20,
    tintColor: '#4285F4',
  },
  // Modal styles from the attached TabBar component
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
  }
});