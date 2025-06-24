import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the Language Context
export const LanguageContext = createContext({
  language: 'en',
  changeLanguage: (lang:any) => {},
});


// Language Provider Component
export const LanguageProvider = ({ children }:any) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load saved language from AsyncStorage on mount
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang:any) => {
    setLanguage(lang);
    await AsyncStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook
export const useLanguageContext = () => useContext(LanguageContext);
