import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const AdditionalGender = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

 const navigation = useNavigation();
 const route = useRoute();

 const {
  selectedLanguage,
 name, surname, birthYear, gender
 }
  = route.params;


  const options = [
    { label: 'Assigned female at birth', value: 'assigned_female' },
    { label: 'Assigned male at birth', value: 'assigned_male' },
    { label: 'Cisgender', value: 'cisgender', description: 'A person whose current gender corresponds to the sex they were assigned at birth' },
    { label: 'Genderfluid', value: 'genderfluid', description: 'A person who does not identify with a fixed gender' },
    { label: 'Genderqueer', value: 'genderqueer', description: 'A person who does not follow binary gender norms' },
    { label: 'Intersex / variations in sex characteristics', value: 'intersex', description: 'A person born with traits, including genital anatomy, reproductive organs, hormone function, and/or chromosome patterns that may not fit the typical definition of male or female' },
    { label: 'Non-binary', value: 'non-binary', description: 'Umbrella term for a person whose gender identity lies outside the gender binary' },
    { label: 'Transgender man', value: 'trans_man', description: 'A person whose gender is male and whose sex assigned at birth was female' },
    { label: 'Transgender woman', value: 'trans_woman', description: 'A person whose gender is female and whose sex assigned at birth was male' },
    { label: 'Prefer not to say', value: 'prefer_not_say' },
    { label: 'None of these apply to me', value: 'none_apply' },
  ];

  const toggleOption = (optionValue) => {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(selectedOptions.filter((value) => value !== optionValue));
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  };
  const handleContinue = () => {
    // Navigate to the next page

    navigation.navigate('PersonalInfoSelection', { selectedLanguage, name, surname, birthYear, gender, selectedOptions});
      
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
      We are committed to creating a safe experience for all patients. If you would like to provide additional information, please select all options that correspond to your gender identity.
      </Text>
      <ScrollView style={styles.optionsContainer}>
        {options.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => toggleOption(option.value)}
            >
              <View style={[styles.checkbox, selectedOptions.includes(option.value) && styles.checkedCheckbox]}>
              </View>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
            {option.description && (
              <Text style={styles.optionDescription}>{option.description}</Text>
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    color: '#575757', // or 'var(--grey-accessible, #575757)'
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24, // 150% of 16px font size
    marginBottom: 16,
  },
  optionsContainer: {
    flex: 1,
  },
  optionContainer: {
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: '#007AFF', // Blue color
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionDescription: {
    fontSize: 14,
    marginTop: 8,
    marginLeft: 32,
  },
  continueButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 4,
    marginTop: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AdditionalGender;