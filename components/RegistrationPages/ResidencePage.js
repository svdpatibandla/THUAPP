import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


const ResidencePage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const[country, setCountry] = useState('');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const navigation = useNavigation();
  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCountryPickerVisible(false);
  };

  const route = useRoute();
  const {
    selectedLanguage,
    name,
    surname,
    birthYear,
    gender,
    selectedOptions,
    primaryLanguage,
    otherLanguages,
    noOtherLanguage,
  } = route.params;

  console.log('RESIDENCEPAGE: PAGE 4')
  console.log('Name:', name);
  console.log('Surname:', surname);
  console.log('Birth Year:', birthYear);
  console.log('gender',gender);
  console.log('primarylanguage:', primaryLanguage);
  console.log('selectedLanguage:', selectedLanguage);
  console.log('otherLanguages:', otherLanguages[0]);
  console.log('noOtherLanguage:', noOtherLanguage);
  console.log('Telegram Id:', telegramId);
  console.log('Phone Number:', phoneNumber);
  console.log('Country Code:', countryCode);
  console.log('selectedOptions:', selectedOptions);

  const handleCountrySelect = (country) => {
    setCountry(country);
  };


  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('after submission: PAGE 4 at');
    console.log('Telegram Id:', telegramId);
    console.log('Phone Number:', phoneNumber);
    console.log('Country Code:', countryCode);
    navigation.navigate('FinalPage',{name,
      surname,
      birthYear,
      gender,
      selectedLanguage,
      selectedOptions,
      primaryLanguage,
      phoneNumber,
      countryCode,
      country,
      telegramId,
      otherLanguages,
      noOtherLanguage});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Complete the registration</Text>
        <Text style={styles.instructions}>
          Add information about yourself that will be linked to patientemail@gmail.com
        </Text>

        <View>
      <Text style={styles.selectCountry}>Select Country*</Text>
      <TouchableOpacity
        style={styles.countryOption}
        onPress={() => handleCountrySelect('ukraine')}
      >
        <View
          style={[
            styles.radioButton,
            country === 'ukraine' && styles.selectedRadioButton,
          ]}
        />
        <Text style={styles.countryLabel}>Ukraine</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.countryOption}
        onPress={() => handleCountrySelect('poland')}
      >
        <View
          style={[
            styles.radioButton,
            country === 'poland' && styles.selectedRadioButton,
          ]}
        />
        <Text style={styles.countryLabel}>Poland</Text>
      </TouchableOpacity>
    </View>

        <View style={styles.phoneInputContainer}>
          <Text style={styles.PhoneInputHeading}>Phone Number</Text>
          <PhoneInput
            style={styles.phoneInput}
            textStyle={styles.phoneInputText}
            value={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
            initialCountry="us"
            onSelectCountry={(iso2) => setCountryCode(iso2)}
          />
        </View>
        <View style={styles.TelegramContainer}>
      <Text style={styles.TelegramInputHeading}>Telegram Id</Text>
      <TextInput
        style={styles.telegramInput}
        onChangeText={setTelegramId} // Use onChangeText to update the state with the entered value
        value={telegramId} // Pass the state value to the value prop of TextInput
        placeholder="Telegram Username"
        placeholderTextColor="#999"
      />
      </View>
        <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 16,
  },
  selectCountry: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 8,
  },
  selectedRadioButton: {
    backgroundColor: '#007AFF',
  },
  countryLabel: {
    fontSize: 16,
    color: '#007AFF',
  },

  PhoneInputHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  
  phoneInputContainer: {
    marginBottom: 16,
  },
  TelegramContainer: {
    marginBottom: 16,
  },
  TelegramInputHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  phoneInputText: {
    fontSize: 16,
  },
  telegramInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#015ABE',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
},
});

export default ResidencePage;
