import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const PersonalInfoSelection = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');
  const route = useRoute();
  const selectedLanguage = route.params.selectedLanguage || '';
  const selectedOptions = route.params.selectedOptions || [];

  const handleGoBack = () => navigation.goBack();
  const handleEdit = () => console.log('Edit functionality here');

  const handleContinue = () => {
    if (name && surname && birthYear && gender) {
      navigation.navigate('SelectLangcont', { selectedLanguage, name, surname, birthYear, gender, selectedOptions });  
    } else {
      let errorMessage = 'Please fill in the following fields:';
      if (!name) errorMessage += '\n- Name';
      if (!surname) errorMessage += '\n- Surname';
      if (!birthYear) errorMessage += '\n- Birth Year';
      if (!gender) errorMessage += '\n- Gender';
      alert(errorMessage);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 1923), (val, index) => currentYear - index);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '30%' }]} />
        </View>
      </View>
      <View style={styles.InfoContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Complete the registration</Text>
          <Text style={styles.subtitle}>
            Add information about yourself that will be linked to patientemail@gmail.com
          </Text>
          <Text style={styles.note}>Fields marked with * are required</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name*</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <Text style={styles.label}>Surname*</Text>
          <TextInput
            style={styles.input}
            value={surname}
            onChangeText={setSurname}
            placeholder="Surname"
          />
          <Text style={styles.label}>Year of Birth*</Text>
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
            <RadioButton.Group onValueChange={setGender} value={gender}>
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
          <TouchableOpacity style={styles.viewListButton} onPress={() => navigation.navigate('AdditionalGender')}>
          <Text style={styles.selectedText}>{selectedOptions}</Text>
            <Text style={styles.viewListButtonText}>See full list</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 58,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
  },
  fieldContainer: {
    flex: 1,  //
    paddingVertical: 10,
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
  EditText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  InfoContainer: {
    flex: 1,
    paddingHorizontal: 18,
  },
  contentContainer: { // Full width and height
    flexDirection: 'column', // Stacks children vertically
    paddingTop: 16, // Padding inside the container
  },
  title: {
    color: '#363636',
    fontSize: 24,
    fontFamily: 'SourceSansPro-SemiBold', // Assuming you've loaded this font in your React Native project
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 16, // Adds space between the title and the subtitle
  },
  subtitle: {
    color: '#363636',
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 16, // Adds space between the subtitle and the note
  },
  note: {
    color: '#696767',
    fontSize: 14,
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: '400',
    lineHeight: 24,
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
    overflow: 'hidden',  // Ensure background is white for better contrast
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // Light gray background color
    justifyContent: 'center',
    color: '#000',
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
    alignSelf: 'flex-start',  // Aligns the button to the left side of its container,
    marginTop: 8,
  },
  viewListButtonText: {
    fontSize: 16,
    color: '#007AFF',
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
  darkYellowFill: {
    backgroundColor: '#FFC107',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 32,
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
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#ffffff',
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
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default PersonalInfoSelection;
