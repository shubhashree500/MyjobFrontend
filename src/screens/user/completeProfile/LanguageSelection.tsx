import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguageContext } from '../../../context/LanguageContext';

const LanguageSelection = () => {
  const navigation = useNavigation();
  const { language, changeLanguage } = useLanguageContext();

  // Only allow Hindi, Odia, and English
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'or', name: 'Odia' },
  ];

  const handleLanguageSelection = (code:any) => {
    changeLanguage(code); // Update the global language
    navigation.goBack(); // Navigate back
  };

  const renderLanguageItem = ({ item }:any) => (
    <Pressable
      style={[
        styles.languageItem,
        language === item.code && styles.selectedLanguageItem,
      ]}
      onPress={() => handleLanguageSelection(item.code)}
    >
      <Text
        style={[
          styles.languageText,
          language === item.code && styles.selectedLanguageText,
        ]}
      >
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Setting')}>
        <Image
          source={require('../../../assets/icons/blackBack.png')} // Replace with your back icon
          style={styles.backImage}
        />
      </Pressable>
      <Text style={styles.title}>Select Your Language</Text>
      <FlatList
        data={languages}
        keyExtractor={(item) => item.code}
        renderItem={renderLanguageItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  backImage: {
    height: 20,
    width: 20,
    marginBottom: 10,
  },
  languageItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  selectedLanguageItem: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  languageText: {
    fontSize: 18,
    color: '#333',
  },
  selectedLanguageText: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
});

export default LanguageSelection;
