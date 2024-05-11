import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Platform,Image } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


const ResidencePage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const[country, setCountry] = useState('');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('+380');
  const navigation = useNavigation();
console.log("Fourth page:4");
  const onSelectCountry = (country) => {
    setCountryPickerVisible(false);
  };

  const handlePhoneNumberChange = (Phone) => {
    const PhoneNumber = Phone.replace(/\D/g, '');
    setPhoneNumber(PhoneNumber);
    console.log('line 25'+PhoneNumber);
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
  console.log('selectedOptions:', selectedOptions);

  const handleGoBack = () => navigation.goBack();

  const handleCountrySelect = (country) => {
    setCountry(country);
  };


  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('after submission: PAGE 4 at');
    console.log('Telegram Id:', telegramId);
    console.log('Phone Number:', phoneNumber);
    navigation.navigate('FinalPage',{name,
      surname,
      birthYear,
      gender,
      selectedLanguage,
      selectedOptions,
      primaryLanguage,
      phoneNumber,
      country,
      countryCode,
      telegramId,
      otherLanguages,
      noOtherLanguage});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '30%' }]} />
        </View>
      </View>

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

    <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number*</Text>
          <View style={styles.phoneNumberContainer}>
           <Picker
            selectedValue={countryCode}
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
              value={`${phoneNumber}`}
              onChangeText={handlePhoneNumberChange}
            />
          </View>
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
    </ScrollView>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 58,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
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
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFC107',
    borderRadius: 4,
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
    borderColor: 'black',
    marginRight: 8,
  },
  selectedRadioButton: {
    backgroundColor: '#007AFF',
  },
  countryLabel: {
    fontSize: 16,
    color: 'black',
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
  lineHeight: 20,  
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
  phoneInput: {
    flex: 2, 
    height: 40,
    paddingVertical: 8,
    paddingLeft: 16,
    fontSize: 16,
    color: '#363636',
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 24,
  }, 
  borderVertical: {
    width: 1,
    height: '100%',
    backgroundColor: 'gray',
  }, 

});

export default ResidencePage;