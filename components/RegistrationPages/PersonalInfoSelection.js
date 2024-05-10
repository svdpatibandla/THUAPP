import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';

const PersonalInfo = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');
  const route = useRoute();
  const selectedLanguage = route.params.selectedLanguage || '';

  const selectedOptions = route.params.selectedOptions || [];

  // Retrieve selectedLanguage from page 2

  const handleSubmit = () => {
    console.log('Name:', name);
    console.log('Surname:', surname);
    console.log('Birth Year:', birthYear);
    console.log('Gender:', gender);
    console.log('Selected Language:', selectedLanguage);
    console.log('Selected Options:', selectedOptions);
    handleContinue();
  };
  const handleAdditionalGender = () => {
    // Navigate to the next page

    navigation.navigate('AdditionalGender', { selectedLanguage, name, surname, birthYear, gender,selectedOptions });
      
  
  };
  const handleContinue = () => {
    if (name && surname && birthYear && gender) {
      navigation.navigate('SelectLangcont', { selectedLanguage, name, surname, birthYear, gender,selectedOptions });  
    } else {
      let errorMessage = 'Please fill in the following fields:';
      if (!name) {
        errorMessage += '\n- Name';
      }
      if (!surname) {
        errorMessage += '\n- Surname';
      }
      if (!birthYear) {
        errorMessage += '\n- Birth Year';
      }
      if (!gender) {
        errorMessage += '\n- Gender';
      }
      alert(errorMessage);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 1923), (val, index) => currentYear - index);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>&#8592;</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '20%' }, styles.darkYellowFill]} />
          <View style={[styles.progressFill, { width: '5%' }]} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Complete the registration</Text>
        <Text style={styles.subtitle}>
          Add information about yourself that will be linked to patientemail@gmail.com
        </Text>
        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <Text style={styles.label}>Sur Name*</Text>
        <TextInput
          style={styles.input}
          value={surname}
          onChangeText={setSurname}
          placeholder="Sur Name"
        />
        <Text style={styles.label}>Year of Birth</Text>
        <Picker
          style={styles.input}
          selectedValue={birthYear}
          onValueChange={(itemValue) => setBirthYear(itemValue)}
        >
          {years.map((year) => (
            <Picker.Item key={year} label={year.toString()} value={year.toString()} />
          ))}
        </Picker>
        <Text style={styles.label}>Gender*</Text>
        <View style={styles.genderContainer}>
          <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
            <View style={styles.radioButtonContainer}>
              <RadioButton.Android value="male" />
              <Text style={styles.radioButtonText}>Male</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton.Android value="female" />
              <Text style={styles.radioButtonText}>Female</Text>
            </View>
          </RadioButton.Group>
        </View>
        <TouchableOpacity style={styles.viewListButton} onPress={(handleAdditionalGender)}>
          <Text style={styles.viewListButtonText}>See full list</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 32, // Increase the font size of the back button
  },
  progressBar: {
    flex: 1,
    flexDirection: 'row',
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginLeft: 8,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  darkYellowFill: {
    backgroundColor: '#FFC107',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
    overflow: 'hidden',
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  viewListButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  viewListButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  footerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default PersonalInfo;


