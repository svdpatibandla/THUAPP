import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ukrainianFlag from './assets/ukrainian-flag.png';
import englishFlag from './assets/english-flag.png';
import { useNavigation } from '@react-navigation/native';

const LanguageSelection = () => {
  const navigation = useNavigation();

  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
  };

  const handleContinue = () => {

    if (selectedLanguage) {
      console.log("first page:1")
      navigation.navigate('PersonalInfoSelection',{selectedLanguage});
    } else {
      alert('Please select a language to continue');}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Choose Language</Text>
        <View style={styles.languageContainer}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              selectedLanguage === 'ukrainian' && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageSelection('ukrainian')}
          >
            <Image source={ukrainianFlag} style={styles.flagIcon} />
            <Text style={styles.languageText}>ukrainian</Text>
            {selectedLanguage === 'ukrainian' && (
              <MaterialIcons name="check-circle" size={24} color="green" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageButton,
              selectedLanguage === 'english' && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageSelection('english')}
          >
            <Image source={englishFlag} style={styles.flagIcon} />
            <Text style={styles.languageText}>English language</Text>
            {selectedLanguage === 'english' && (
              <MaterialIcons name="check-circle" size={24} color="green" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.continueButton}onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },

    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },

  languageContainer: {
    width: '80%',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 20,
  },
  selectedLanguage: {
    backgroundColor: '#e0e0e0',
  },
  languageText: {
    fontSize: 16,
    marginLeft: 8,
  },
  flagIcon: {
    width: 24,
    height: 16,
  },
  footerContainer: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  continueButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 4,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LanguageSelection;