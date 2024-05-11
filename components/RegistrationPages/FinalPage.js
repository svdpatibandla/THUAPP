import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
const FinalPage = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token.idToken);
  const {
    name, surname, birthYear, gender, selectedLanguage, selectedOptions, primaryLanguage,
    otherLanguages, noOtherLanguage, phoneNumber, countryCode, country, telegramId
  } = route.params;

  const [additionalInfo, setAdditionalInfo] = useState('');
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const [localDoctor, setLocalDoctor] = useState('');
    const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let newErrors = {};
    
    // Check each required field
    if (!additionalInfo.trim()) {
      newErrors.additionalInfo = 'Additional information is required';
      valid = false;
    }
    if (!localDoctor.trim()) {
      newErrors.localDoctor = 'Local doctor name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const LanguageMap = {
    Ukrainian: 4,
    Russian: 5,
    English: 6,
  }


  const toggleCheckBox = () => setCheckBoxChecked(!checkBoxChecked);


  /*          name, surname, birthYear, gender, selectedLanguage, selectedOptions, primaryLanguage,
  phoneNumber,otherLanguages,noOtherLanguage, country, countryCode, telegramId, telegramId, localDoctor,
  receiveUpdates: checkBoxChecked,
  */
  const handleSubmit = async() => {
    console.log('localDoctor:', localDoctor);
    if (validateForm()) {
      try{

        const patientData = {
          first_name: name,
          last_name: surname,
          email: user.email,
          year_of_birth: parseInt(birthYear),
          tz: country,
          created_at: moment().utc().format(),
          first_language_id: LanguageMap[primaryLanguage],
          second_language_id: LanguageMap[otherLanguages],
          phone: phoneNumber,
          notes: additionalInfo,
          telegram: telegramId,
          practitioner: localDoctor,
          health_concerns: additionalInfo,
          auth0_id: user.sub, 
          token: token
        };      
  
        const jsonData = JSON.stringify(patientData);
        console.log('Sending JSON:', jsonData);
  
        /*
        const response = await axios.post('https://mobile-app-thu-e036558309fd.herokuapp.com/mobile/onboard', jsonData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        console.log('API Response:', response.data);
        */
        Alert.alert('Success', 'Patient information saved successfully.');
  
  
        navigation.navigate('AppNavigator', {
          name, surname, birthYear, gender, selectedLanguage, selectedOptions, primaryLanguage,
          phoneNumber,otherLanguages,noOtherLanguage, country, countryCode, telegramId, additionalInfo, localDoctor,
          receiveUpdates: checkBoxChecked,
        });
      }
      catch(e){
        console.log(e);
      }
    } else {
      Alert.alert("Validation Error", "Please fill in all required fields.");
    }
  };


  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
      </TouchableOpacity>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '80%' }]} />
      </View>
    </View>
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.title}>Complete the registration</Text>
      <Text style={styles.subtitle}>
        Add information about yourself that will be linked to patientemail@gmail.com
      </Text>
      <Text style={styles.note}>Fields marked with * are required</Text>

      <Text style={styles.inputHeading}>Additional Information *</Text>
      <TextInput
        style={[styles.input, errors.additionalInfo ? { borderColor: 'red' } : {}]}
        placeholder="Enter additional information here..."
        multiline
        numberOfLines={4}
        onChangeText={text => { setAdditionalInfo(text); setErrors({...errors, additionalInfo: null}); }}
        value={additionalInfo}
      />
      {errors.additionalInfo && <Text style={styles.errorText}>{errors.additionalInfo}</Text>}

      <Text style={styles.inputHeading}>Name of the local doctor *</Text>
      <TextInput
        style={[styles.input, errors.localDoctor ? { borderColor: 'red' } : {}]}
        placeholder="Enter the name of the local doctor"
        onChangeText={text => { setLocalDoctor(text); setErrors({...errors, localDoctor: null}); }}
        value={localDoctor}
      />
      {errors.localDoctor && <Text style={styles.errorText}>{errors.localDoctor}</Text>}

      <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckBox}>
        <Image style={styles.checkbox} source={checkBoxChecked ? require('../../assets/checked.png') : require('../../assets/unchecked.png')} />
        <Text style={styles.checkboxLabel}>I want to receive updates by email.</Text>
      </TouchableOpacity>
    </ScrollView>
    <View style={styles.footer}>
      <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
        <Text style={styles.continueButtonText}>Save the information</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: 24,
    height: 24,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFC107',
    borderRadius: 4,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  note: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  inputHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  continueButton: {
    backgroundColor: '#3269bd',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
});

export default FinalPage;
