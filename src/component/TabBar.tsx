import React, { useState, useEffect, useRef } from "react";
import { View, Image, Pressable, StyleSheet, Animated, Text, Modal } from "react-native";

interface TabBarProps {
  navigation: any;
  setIsModalVisible: (visible: boolean) => void; // Prop for controlling modal visibility
}

const TabBar: React.FC<TabBarProps> = ({ navigation, setIsModalVisible }) => {
  const [activeScreen, setActiveScreen] = useState("UserHomeScreen");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [localModalVisible, setLocalModalVisible] = useState(false); // Renamed state variable

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e: any) => {
      const currentRoute = e.data.state.routes[e.data.state.index];
      setActiveScreen(currentRoute.name);

      // Fade-in animation when the active screen changes
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    return unsubscribe;
  }, [navigation, fadeAnim]);

  const getIconStyle = (screenName: string) => {
    return [
      styles.navIcon,
      activeScreen === screenName && styles.activeIcon,
      { backgroundColor: activeScreen === screenName ? "#E6E6FA" : "transparent" },
    ];
  };

  return (
    <View style={styles.bottomNav}>
      <Pressable onPress={() => navigation.navigate("UserHomeScreen")}>
        <Animated.View style={[getIconStyle("UserHomeScreen"), { opacity: activeScreen === "UserHomeScreen" ? fadeAnim : 1 }]}>
          <Image source={require("../assets/icons/home.png")} style={styles.icon} />
        </Animated.View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("JobSearchScreen")}>
        <Animated.View style={[getIconStyle("JobSearchScreen"), { opacity: activeScreen === "JobSearchScreen" ? fadeAnim : 1 }]}>
          <Image source={require("../assets/icons/loupe.png")} style={styles.icon} />
        </Animated.View>
      </Pressable>

      {/* Open Modal instead of navigating */}
      <View style={styles.addButtonContainer}>
        <Pressable
          style={[styles.addButton, activeScreen === "CampusScreen" && styles.activeAddButton]}
          onPress={() => setLocalModalVisible(true)} // Use local state
        >
          <Image source={require("../assets/icons/plus.png")} style={styles.plusIcon} />
        </Pressable>
      </View>

      <Pressable onPress={() => navigation.navigate("userNotifications")}>
        <Animated.View style={[getIconStyle("Notifications"), { opacity: activeScreen === "Notifications" ? fadeAnim : 1 }]}>
          <Image source={require("../assets/icons/chart.png")} style={styles.icon} />
        </Animated.View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("SavedJobsScreen")}>
        <Animated.View style={[getIconStyle("SavedJobsScreen"), { opacity: activeScreen === "SavedJobsScreen" ? fadeAnim : 1 }]}>
          <Image source={require("../assets/icons/save.png")} style={styles.icon} />
        </Animated.View>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={localModalVisible} // Use local state
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
                navigation.navigate('JobPost');
              }}
            >
              <Text style={styles.makeJobButtonText}>Explore</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  navIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  activeIcon: {
    backgroundColor: "#E6E6FA",
  },
  icon: {
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
    backgroundColor: "#1A1150",
    justifyContent: "center",
    alignItems: "center",
  },
  activeAddButton: {
    backgroundColor: "#2A2160",
  },
  plusIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
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
  }
});

export default TabBar;
