import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Modal,
  Animated,
} from 'react-native';
import TabBar from '../../component/TabBar';

interface NotificationItem {
  id: string;
  icon: any;
  title: string;
  description: string;
  time: string;
  actionText?: string;
}

const notifications: NotificationItem[] = [
  {
    id: '1',
    icon: require('../../assets/icons/google.png'),
    title: 'Application sent',
    description: 'Applications for Google Inc have entered for company review',
    time: '20 minutes ago',
    actionText: 'Application details',
  },
  {
    id: '2',
    icon: require('../../assets/icons/google.png'),
    title: 'Your job notification',
    description: 'Bristlecone AI inc has 50+ new jobs for UI/UX Designer in California USA',
    time: '1 hour ago',
    actionText: 'See new job',
  },
  {
    id: '3',
    icon: require('../../assets/icons/google.png'),
    title: 'Twitter Inc is looking for a UI/UX Designer',
    description: 'Check out this and 9 other job recommendations',
    time: '2 hours ago',
    actionText: 'See job',
  },
];

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (optionId: string) => void;
  selectedOption: string | null;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ visible, onClose, onOptionSelect, selectedOption }) => {
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateY]);

  const options = [
    { id: 'delete', title: 'Delete', icon: require('../../assets/icons/Delete.png') },
    { id: 'turnoff', title: 'Turn off notifications', icon: require('../../assets/icons/Bell.png') },
    { id: 'settings', title: 'Setting', icon: require('../../assets/icons/Setting.png') },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.bottomSheetContent}>
            <View style={styles.indicator} />
            {options.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  styles.option,
                  selectedOption === option.id && styles.optionHighlighted,
                ]}
                onPress={() => onOptionSelect(option.id)}
              >
                <Image source={option.icon} style={styles.optionIcon} />
                <Text
                  style={[
                    styles.optionText,
                    selectedOption === option.id && styles.optionTextHighlighted,
                  ]}
                >
                  {option.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const NotificationItem: React.FC<{ item: NotificationItem; onMorePress: () => void }> = ({ item, onMorePress }) => (
  <View style={styles.notificationItem}>
    <Image source={item.icon} style={styles.icon} />
    <View style={styles.notificationContent}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.time}>{item.time}</Text>
      {item.actionText && (
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>{item.actionText}</Text>
        </Pressable>
      )}
    </View>
    <Pressable style={styles.moreButton} onPress={onMorePress}>
      <Image source={require('../../assets/icons/more.png')} style={styles.moreIcon} />
    </Pressable>
  </View>
);

export default function UserNotification({navigation}:any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleMorePress = (notificationId: string) => {
    setSelectedNotification(notificationId);
    setModalVisible(true);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    // Handle option selection here
    console.log(`Selected ${optionId} for notification ${selectedNotification}`);
    // Keep the modal open to show the highlighted option
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('UserHomeScreen')}>
          <Image 
            source={require('../../assets/icons/Back.png')} 
            style={styles.backArrow}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>
      {notifications.length > 0 ? (
        <ScrollView style={styles.notificationList}>
          {notifications.map(item => (
            <NotificationItem
              key={item.id}
              item={item}
              onMorePress={() => handleMorePress(item.id)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noNotifications}>
          <Text style={styles.noNotificationsTitle}>No notifications</Text>
          <Text style={styles.noNotificationsText}>
            You have no notifications at this time{'\n'}thank you
          </Text>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/icons/NoNotifications.png')}
              style={styles.noNotificationsImage}
            />
          </View>
        </View>
      )}

      <BottomSheet
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedOption(null);
        }}
        onOptionSelect={handleOptionSelect}
        selectedOption={selectedOption}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 24,
  },
  notificationList: {
    flex: 1,
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333333',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
  },
  actionButton: {
    backgroundColor: '#5E35B1',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  moreButton: {
    padding: 4,
  },
  moreIcon: {
    width: 16,
    height: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    minHeight: 200,
  },
  bottomSheetContent: {
    alignItems: 'center',
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    borderRadius: 12,
  },
  optionHighlighted: {
    backgroundColor: '#5E35B1',
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  optionTextHighlighted: {
    color: '#FFFFFF',
  },
  noNotifications: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  noNotificationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  noNotificationsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  }
});