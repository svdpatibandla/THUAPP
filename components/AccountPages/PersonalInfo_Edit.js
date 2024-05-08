//NewPatientForm.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import moment from 'moment-timezone';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; 

const PersonalInfo = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token.idToken);
  const firstName = useSelector(state => state.auth.firstName);
  const lastName = useSelector(state => state.auth.lastName);

  console.log('user: ',user);
  console.log('token: ',token);

  const [FirstName, setFirstName] = useState('dutt');
  const [LastName, setLastName] = useState('patibandla');
  const [Email, setEmail] = useState('user.email');
  const [YearOfBirth, setYearOfBirth] = useState('1988');
  const [Gender, setGender] = useState('Male');
  const [Country, setCountry] = useState('Ukraine');
  const [CountryCode, setCountryCode] = useState('+380'); 
  const [PhoneNumber, setPhoneNumber] = useState('6692209884');
  const [TelegramId, setTelegramId] = useState('psvdutt');
  const [CheifConcern, setCheifConcern] = useState('concern-1');
  const [LocalPhysician, setLocalPhysician] = useState('Dr. Prasanth');


  const Years = Array.from({ length: moment().year() - 1919 }, (_, i) => (1920 + i).toString());
  const Genders = ['Male', 'Female'];
  const Countries = ['Ukraine', 'Poland'];


  const handleClose = () => {
    navigation.navigate('AppNavigator');
  };

  const handlePhoneNumberChange = (text) => {
    const numericText = text.replace(/\D/g, '');
    setPhoneNumber(numericText);
  };
  
  const changeGender = () => {
    navigation.navigate()
  };

  const handleSave = async () => {
    try {
      if (!FirstName.trim() || !LastName.trim() || !Email.trim() || !YearOfBirth.trim() || !Gender.trim() || !Country.trim() || !PhoneNumber.trim()) {
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
        tz: Country === 'Ukraine' ? 'Ukraine' : 'Poland',
        created_at: moment().utc().format(),
        gender: Gender,
        phone: `${CountryCode}${PhoneNumber}`, // Concatenate country code and phone number
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
    } catch (error) {
      console.error('Error saving patient information:', error);
      Alert.alert('Error', 'An error occurred while saving patient information.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Personal Info</Text>
        <TouchableOpacity onPress={handleClose}>
          <Text style={styles.EditText}>Edit</Text>
        </TouchableOpacity>
      </View>
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
          <Text style={styles.label}>Gender*</Text>
          <View style={styles.gender}>
            {Genders.map((gender, index) => (
              <View key={index} style={styles.radioButtonContainer}>
                <RadioButton
                  value={gender}
                  status={Gender === gender ? 'checked' : 'unchecked'}
                  onPress={() => setGender(gender)}
                />
                <Text>{gender}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.moreGenders}>
          <Text style={styles.Genderlabel}>Transgender Man </Text>
          <TouchableOpacity onPress={changeGender}>
            <Text style={styles.changeGender}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country of residence</Text>
          <View style={styles.languageContainer}>
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
          <Text style={styles.label}>Email*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            value={Email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number*</Text>
          <View style={styles.phoneNumberContainer}>
            <Picker
              selectedValue={CountryCode}
              onValueChange={(itemValue) => setCountryCode(itemValue)}
              style={styles.countryCodePicker}
            >
              <Picker.Item label="+380" value="+380" />
              <Picker.Item label="+48" value="+48" />
            </Picker>
            <View style={styles.borderVertical}></View>
            <TextInput
              style={styles.phoneInput}
              keyboardType="phone-pad"
              placeholder="Enter phone number"
              value={PhoneNumber}
              onChangeText={setPhoneNumber}
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
          <Text style={styles.label}>Additional information</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Chief Concern"
            value={CheifConcern}
            onChangeText={setCheifConcern}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Local Doctor</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Local Physician"
            value={LocalPhysician}
            onChangeText={setLocalPhysician}
          />
        </View>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.continueButton} onPress={handleSave}>
          <Text style={styles.continueButtonText}>Save the information</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 4,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderBottomColor: '#dfdfdf',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
  },
  headerImage: {
    width: 24,
    height: 24,
  },
  headerText: {
    textAlign: 'center', 
    color: '#151515', 
    fontSize: 18, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '800', 
    lineHeight: 28,
  },
  EditText: {
    textAlign: 'right', 
    color: '#015ABE', 
    fontSize: 16, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '800', 
    lineHeight: 24, 
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
    color: '#363636',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    lineHeight: 20,  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
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
    borderRadius: 6,
    overflow: 'hidden',
    height: 40,
  },
  borderVertical: {
    width: 1,
    height: '100%',
    backgroundColor: 'gray',
  }, 
  countryCodePicker: {
    flex: 1,
    padding: 3,
    fontSize: 14,
  },
  phoneInput: {
    flex: 2, 
    height: 40,
    padding: 8,
    fontSize: 16,
    color: '#363636',
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 24,
  }, 
  Genderlabel: {
    fontSize: 16,
  },
  changeGender: {
    fontSize: 16,
    color: '#015ABE',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
  },
  moreGenders: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
  },
  languageContainer: {
    flexDirection: 'columns',
    flexWrap: 'wrap',
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
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 20, 
    backgroundColor: '#ffffff',
    borderTopColor: '#dfdfdf',
    borderTopWidth: 1,
    paddingTop: 10,
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

export default PersonalInfo;

