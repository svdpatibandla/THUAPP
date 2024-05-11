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
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
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
  header:{
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'space-between',
    height: 58,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',  // Ensure alignment to the start
    paddingTop: 40,
    paddingHorizontal: 20,  // Side padding for better layout spacing
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,  // Increased bottom margin to push the language options down
  },
  languageContainer: {
    width: '100%',  // Use full width for better control
    marginTop: 10,  // Additional top margin to create more space below the title
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
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
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    // Increased top padding to push the button down
    borderTopColor: '#dfdfdf',
    borderTopWidth: 1,

  },
  continueButton: {
    flex: 1, 
    backgroundColor: '#3269bd',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LanguageSelection;