import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext'; // Import the custom hook

const SplashScreen = ({ navigation }: { navigation: any }) => {
  const { userToken, type, loading }: any = useAuth(); // Access type from AuthContext

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) return; // Wait for loading to finish

      if (userToken) {
        // Navigate based on the user type
        if (type === 'user') {
          navigation.replace('TabNavigator'); // User Home Screen
        } else if (type === 'Org') {
          navigation.replace('OrganizationHomeScreen'); // Organization Home Screen
        } else {
          navigation.replace('Login'); // Default screen for other types
        }
      } else {
        navigation.replace('Login'); // Redirect to Login if no token
      }
    }, 3000); // 5-second delay

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [userToken, type, loading, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/Logo3.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b59d6',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
