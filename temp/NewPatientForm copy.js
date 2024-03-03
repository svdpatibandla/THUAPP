import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import CountryPicker from 'react-native-country-picker-modal';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';

const NewPatientForm = ({ navigation }) => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [YearOfBirth, setYearOfBirth] = useState('');
  const [FirstLanguage, setFirstLanguage] = useState('');
  const [AdditionalLanguage, setAdditionalLanguage] = useState('');
  const [Country, setCountry] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [TelegramId, setTelegramId] = useState('');
  const [CheifConcern, setCheifConcern] = useState('');
  const [LocalPhysician, setLocalPhysician] = useState('');
  const [receiveInstructions, setReceiveInstructions] = useState(false);
  const [countryCode, setCountryCode] = useState('UA');

  const Years = Array.from({ length: 100 }, (_, i) => (i + 1920).toString());
  const FirstLanguages = ['Ukranian', 'Russian'];
  const AdditionalLanguages = ['English', 'Telugu', 'Tamil'];
  const Countries = ['Ukraine', 'Poland'];

  const handlePhoneNumberChange = (text) => {
    const numericText = text.replace(/\D/g, '');
    console.log(Country.callingCode)
    const code = Country.callingCode
    if (numericText.length === 10){
      const number = `+${code}${numericText}`
      console.log(number);
      setPhoneNumber(number);  
    }
    setPhoneNumber(numericText);  
  };

  const handleSave = async () => {

    console.log('FirstName:', FirstName);
    console.log('LastName:', LastName);
    console.log('Email:', Email);
    console.log('YearOfBirth:', YearOfBirth);
    console.log('FirstLanguage:', FirstLanguage);
    console.log('AdditionalLanguage:', AdditionalLanguage);
    console.log('Country:', Country);
    console.log('PhoneNumber:', PhoneNumber);
    console.log('TelegramId:', TelegramId);
    console.log('CheifConcern:', CheifConcern);
    console.log('LocalPhysician:', LocalPhysician);
    console.log("---------------------------------------------------");

    try{

      if (!FirstName.trim() || !LastName.trim() || !Email.trim() || !YearOfBirth.trim() || !FirstLanguage.trim() || !Country.trim() || !PhoneNumber.trim() || !PhoneNumber.trim().length != 10) {
        Alert.alert('Please Fill out the mandatory fields.');
        return;
      }

      const formData = {
        "first_name": FirstName,
        "last_name": LastName,
        "year_of_birth": Email,
        "email": YearOfBirth,
        "first_language": FirstLanguage,
        "second_language": AdditionalLanguage,
        "phone": PhoneNumber,
        "telegram": TelegramId,
        "health_concerns": CheifConcern,
        LocalPhysician,
        receiveInstructions,
      };
      console.log(formData);
      const response = await axios.post('YOUR_API_ENDPOINT', formData);
      Alert.alert('Success', 'Patient information saved successfully.');       
      navigation.navigate('AppNavigator');

    } catch (error) {
      
      console.error('Error saving patient information:', error);
      Alert.alert('Error', 'An error occurred while saving patient information.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your First Name"
            value={FirstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Last Name"
            value={LastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            value={Email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Year of Birth*</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={YearOfBirth}
              onValueChange={(itemValue) => setYearOfBirth(itemValue)}
            >
              {Years.map((year, index) => (
                <Picker.Item key={index} label={year} value={year} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Language*</Text>
          <View style={styles.pickerContainer}>
            {FirstLanguages.map((language, index) => (
              <View key={index} style={styles.radioButtonContainer}>
                <RadioButton
                  value={language}
                  status={FirstLanguage === language ? 'checked' : 'unchecked'}
                  onPress={() => setFirstLanguage(language)}
                />
                <Text>{language}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Additional Language</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={AdditionalLanguage}
              onValueChange={(itemValue) => setAdditionalLanguage(itemValue)}
            >
              {AdditionalLanguages.map((language, index) => (
                <Picker.Item key={index} label={language} value={language} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country*</Text>
          <View style={styles.pickerContainer}>
          {Countries.map((country, index) => (
            <View key={index} style={styles.radioButtonContainer}>
              <RadioButton
                value={country}
                status={Country === country ? 'checked' : 'unchecked'}
                onPress={() => setCountry(country)}
              />
              <Text>{country}</Text>
            </View>
          ))}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number*</Text>
          <View style={styles.phoneNumberContainer}>
            <CountryPicker
              withFilter
              withFlag
              withCountryNameButton
              withAlphaFilter
              withCallingCode
              onSelect={(country) => {
                setCountry(country);
                setCountryCode(country.cca2);
              }}
              countryCode={countryCode}
              withEmoji
              containerButtonStyle={styles.countryPickerButton}
            />
            <View style={styles.selectedCountryContainer}>
              <Text style={styles.selectedCountryText}>+{country?.callingCode}</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              keyboardType="phone-pad"
              placeholder="Enter phone number"
              value={PhoneNumber}
              onChangeText={handlePhoneNumberChange}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telegram ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Telegram ID"
            value={TelegramId}
            onChangeText={setTelegramId}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Chief Concern, additional Info</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Chief Concern"
            value={CheifConcern}
            onChangeText={setCheifConcern}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Local Physician</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Local Physician"
            value={LocalPhysician}
            onChangeText={setLocalPhysician}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            title="I want to receive the instructions of how to upload the files"
            checked={receiveInstructions}
            onPress={() => setReceiveInstructions(!receiveInstructions)}
          />
        </View>
        <Button title="Save The Info" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 4,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  countryPickerButton: {
    padding: 8,
  },
  phoneInput: {
    flex: 1,
    height: 40,
    padding: 8,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default NewPatientForm;