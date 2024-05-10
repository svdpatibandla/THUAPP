import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, SafeAreaView,ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const SelectLangcont = () => {
  const [primaryLanguage, setPrimaryLanguage] = useState('');
  const [otherLanguages, setOtherLanguages] = useState([]);
  const [noOtherLanguage, setNoOtherLanguage] = useState(false);
  const navigation = useNavigation();

  const handlePrimaryLanguageChange = (language) => {
    setPrimaryLanguage(language);
  };

  const route = useRoute();
  const {
    name,
    surname,
    birthYear,
    gender,
    selectedLanguage,
    selectedOptions,
  } = route.params;
  console.log('selectLONGCONT: PAGE 3')
  console.log('Name:', name);
  console.log('Surname:', surname);
  console.log('Birth Year:', birthYear);
  console.log('gender',gender);
  console.log('selectedLanguage:', selectedLanguage);
  console.log('selectedOptions:', selectedOptions);

  const handleOtherLanguageChange = (language) => {
    if (otherLanguages.includes(language)) {
      setOtherLanguages(otherLanguages.filter((lang) => lang !== language));
    } else {
      setOtherLanguages([...otherLanguages, language]);
    }
  };



  const toggleNoOtherLanguage = () => {
    setNoOtherLanguage(true);
    if (noOtherLanguage) {
      setOtherLanguages([]);
    }
  };

  const handleSubmit = () => {
    console.log('otherLanguages:', otherLanguages);
    console.log('noOtherLanguage:', noOtherLanguage);
    navigation.navigate('ResidencePage', {
      name,
      surname,
      birthYear,
      gender,
      selectedLanguage,
      selectedOptions,
      primaryLanguage,
      otherLanguages,
      noOtherLanguage,
    });
  };


  return (
    <ScrollView
  contentContainerStyle={styles.scrollViewContent}
  scrollIndicatorInsets={{ right: 20, top: 0, bottom: 0 }} // Adjust the size of the scroll button
>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Complete the registration</Text>
      <Text style={styles.subtitle}>
      Add information about yourself that will be linked to patientemail@gmail.com
      </Text>
      <Text style={styles.label}>The first language of communication*</Text>
      <View>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handlePrimaryLanguageChange('ukrainian')}
        >
          <View
            style={[
              styles.radioCircle,
              primaryLanguage === 'ukrainian' && styles.selectedRadio,
            ]}
          />
          <Text style={[styles.radioLabel, primaryLanguage === 'ukrainian' && styles.selectedText]}>Українська мова</Text>
            
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handlePrimaryLanguageChange('russian')}
        >
          <View
            style={[
              styles.radioCircle,
              primaryLanguage === 'russian' && styles.selectedRadio,
            ]}
          />
          <Text style={[styles.radioLabel, primaryLanguage === 'russian' && styles.selectedText]}>Русский язык</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handlePrimaryLanguageChange('english')}
        >
          <View
            style={[
              styles.radioCircle,
              primaryLanguage === 'english' && styles.selectedRadio,
            ]}
          />
          <Text style={[styles.radioLabel, primaryLanguage === 'english' && styles.selectedText]}>English language</Text>
        </TouchableOpacity>
      </View>
      {primaryLanguage && (
        <>
          <View style={[styles.switchContainer, { justifyContent: 'space-between' }]}>
            <Text style={styles.switchLabel}>no other language</Text>
            <Switch
              value={noOtherLanguage}
              onValueChange={toggleNoOtherLanguage}
              style={[styles.switch, noOtherLanguage && styles.selectedSwitch]}
            />
          </View>
          <Text style={styles.label}>Another language of communication*</Text>
          <View>
            <TouchableOpacity
              style={styles.checkboxButton}
              onPress={() => handleOtherLanguageChange('russian')}
              disabled={noOtherLanguage}
            >
              <View
                style={[
                  styles.checkboxCircle,
                  otherLanguages.includes('russian') && styles.selectedCheckbox,
                  noOtherLanguage && styles.disabledCheckbox,
                ]}
              >
                {otherLanguages.includes('russian') && <View style={styles.checkboxDot} />}
              </View>
              <Text
                style={[
                  styles.checkboxLabel,
                  otherLanguages.includes('russian') && styles.selectedText,
                  noOtherLanguage && styles.disabledCheckboxLabel,
                ]}
              >
                Russian language
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxButton}
              onPress={() => handleOtherLanguageChange('english')}
              disabled={noOtherLanguage}
            >
              <View
                style={[
                  styles.checkboxCircle,
                  otherLanguages.includes('english') && styles.selectedCheckbox,
                  noOtherLanguage && styles.disabledCheckbox,
                ]}
              >
                {otherLanguages.includes('english') && <View style={styles.checkboxDot} />}
              </View>
              <Text
                style={[
                  styles.checkboxLabel,
                  otherLanguages.includes('english') && styles.selectedText,
                  noOtherLanguage && styles.disabledCheckboxLabel,
                ]}
              >
                English language (Advanced)
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedRadio: {
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#007AFF',
  },
  selectedText: {
    color: '#007AFF',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  selectedSwitch: {
    tintColor: '#007AFF',
  },
  checkboxButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedCheckbox: {
    borderColor: '#007AFF',
  },
  checkboxDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  disabledCheckboxLabel: {
    opacity: 0.5,
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

export default SelectLangcont;
