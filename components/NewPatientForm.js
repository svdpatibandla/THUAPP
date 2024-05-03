//NewPatientForm.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import moment from 'moment-timezone';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; 

const NewPatientForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token.idToken);
  const firstName = useSelector(state => state.auth.firstName);
  const lastName = useSelector(state => state.auth.lastName);

  console.log('user: ',user);
  console.log('token: ',token);

  /*
  const [FirstName, setFirstName] = useState('dutt');
  const [LastName, setLastName] = useState('patibandla');
  const [Email, setEmail] = useState(user.email);
  const [YearOfBirth, setYearOfBirth] = useState('1988');
  const [FirstLanguage, setFirstLanguage] = useState('Ukranian');
  const [AdditionalLanguage, setAdditionalLanguage] = useState('Russian');
  const [Country, setCountry] = useState('Ukraine');
  const [CountryCode, setCountryCode] = useState('+380'); 
  const [PhoneNumber, setPhoneNumber] = useState('6692209884');
  const [TelegramId, setTelegramId] = useState('psvdutt');
  const [CheifConcern, setCheifConcern] = useState('concern-1');
  const [LocalPhysician, setLocalPhysician] = useState('Dr. Prasanth');
  const [receiveInstructions, setReceiveInstructions] = useState(true);
  */

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState(user.email);
  const [YearOfBirth, setYearOfBirth] = useState('');
  const [FirstLanguage, setFirstLanguage] = useState('');
  const [AdditionalLanguage, setAdditionalLanguage] = useState('');
  const [Country, setCountry] = useState('');
  const [CountryCode, setCountryCode] = useState(''); 
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [TelegramId, setTelegramId] = useState('');
  const [CheifConcern, setCheifConcern] = useState('');
  const [LocalPhysician, setLocalPhysician] = useState('');
  const [receiveInstructions, setReceiveInstructions] = useState(false);


  const Years = Array.from({ length: moment().year() - 1919 }, (_, i) => (1920 + i).toString());
  const FirstLanguages = ['Ukrainian', 'Russian'];
  const AdditionalLanguages = ['English', 'Ukrainian', 'Russian'];
  const Countries = ['Ukraine', 'Poland'];
  const LanguageMap = {
    Ukrainian: 4,
    Russian: 5,
    English: 6,
  }

  const handleCountryChange = (country) => {
    const code = getCountryCodePrefix(country);
    setCountry(country);
    setCountryCode(code);
    setPhoneNumber('');
  };

  const handlePhoneNumberChange = (text) => {
    const numericText = text.replace(/\D/g, '');
    setPhoneNumber(numericText);
  };

  const getCountryCodePrefix = (country) => {
    switch (country) {
      case 'Ukraine':
        return '+380';
      case 'Poland':
        return '+48';
      default:
        return '+380'; 
    }
  };

  const handleSave = async () => {
    try {
      if (!FirstName.trim() || !LastName.trim() || !Email.trim() || !YearOfBirth.trim() || !FirstLanguage.trim() || !Country.trim() || !PhoneNumber.trim()) {
        Alert.alert('Please Fill out the mandatory fields.');
        return;
      }

      if (PhoneNumber.length != 10) {
        Alert.alert('Invalid Phone Number', 'Please enter a valid phone number with 10 to 13 digits.');
        return;
      }

      const patientData = {
        first_name: FirstName,
        last_name: LastName,
        email: Email,
        year_of_birth: parseInt(YearOfBirth),
        tz: Country === 'Poland' ? 'Poland' : 'Ukraine',
        created_at: moment().utc().format(),
        first_language_id: LanguageMap[FirstLanguage],
        second_language_id: LanguageMap[AdditionalLanguage],
        phone: `${CountryCode}${PhoneNumber}`,
        notes: `${CheifConcern} Telegram: ${TelegramId} Local practitioner: ${LocalPhysician}`,
        telegram: TelegramId,
        practitioner: LocalPhysician,
        health_concerns: CheifConcern,
        auth0_id: user.sub, 
        token: token
      };      

      const jsonData = JSON.stringify(patientData);
      console.log('Sending JSON:', jsonData);

      const response = await axios.post('https://mobile-app-thu-e036558309fd.herokuapp.com/mobile/onboard', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('API Response:', response.data);
      Alert.alert('Success', 'Patient information saved successfully.');

      const tokenResponse = await axios.post('https://dev-telehelpukraine.us.auth0.com/oauth/token', {
        client_id: 'p0kAe8cN24qvpOxapv6piX0ph8SPdepJ',
        client_secret: 'dN9KyW_5yC-VVu2PL5Tg8mYJbiAnxZXL-YxGDIKQB4ntmqbs1JPtjJWm2iQGCdic',
        audience: 'https://dev-telehelpukraine.us.auth0.com/api/v2/',
        grant_type: 'client_credentials',
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const accessToken = tokenResponse.data.access_token;

      const roleResponse = await axios.post(
        `https://dev-telehelpukraine.us.auth0.com/api/v2/users/${user.sub}/roles`,
        { roles: ['rol_2uV5KBYIEa1bZWyN'] },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Cache-Control': 'no-cache',
          },
        }
      );

      console.log('Role Assignment Response status:', roleResponse.status);
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
            {AdditionalLanguages.map((language, index) => (
              <View key={index} style={styles.radioButtonContainer}>
                <RadioButton
                  value={language}
                  status={AdditionalLanguage === language ? 'checked' : 'unchecked'}
                  onPress={() => setAdditionalLanguage(language)}
                />
                <Text>{language}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country*</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={Country}
              onValueChange={(itemValue) => handleCountryChange(itemValue)}
            >
              <Picker.Item label="Ukraine" value="Ukraine" />
              <Picker.Item label="Poland" value="Poland" />
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number*</Text>
          <View style={styles.phoneNumberContainer}>
            <TextInput
              style={styles.countryCodeInput}
              editable={false}
              value={CountryCode}
            />
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
  selectedCountryContainer: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'gray',
  },
  selectedCountryText: {
    fontSize: 16,
  },
});

export default NewPatientForm;

/*
here is my flow,

if not logged-in, 
-->goes to LandingPage, selects one in (new, existing)
-------> if new selected goes to auth0 login chrome web page, once logged in goes back to newpatientform page in app, once form filled it goes to AppNavigator
-------> if existing selected goes to auth0 login chrome web page, once logged in goes to AppNavigator

if logged-in,  goes to AppNavigator

i have these files app.js, NewPatientForm.js, AppNavigator Page, LandingPage

*/