import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header'; 
import { useDispatch, useSelector } from 'react-redux';


const practitionersData = [
  {
    id: 1,
    name: "Dr. John Doe",
    type: "General Physician",
    language: "English",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    type: "Dermatologist",
    language: "Spanish",
  },
  {
    id: 3,
    name: "Dr. Michael Johnson",
    type: "Pediatrician",
    language: "French",
  },
];

const PractitionerSelection = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const translations = useSelector(state => state.auth.translations);
  const AgeGroups = [translations.message_adult, translations.message_child];

  const filteredPractitioners = practitionersData.filter(practitioner =>
    practitioner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = () => {
    navigation.navigate('AgeGroupSelection', { screen: 'AgeGroupSelection' });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.navigate('AppNavigator');
  };
  
  const handlePractitionerSelection = (practitioner) => {
    navigation.navigate('AppointmentSelection', { practitioner });
  }

  return (
    <View style={styles.container}>
      <Header handleBack={handleGoBack} handleClose={handleClose} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{translations?.message_previous_practitioners}</Text>
      </View>

      <View style={styles.datacontainer}>
        <ScrollView style={styles.scrollView}>
          {filteredPractitioners.map((practitioner) => (
            <TouchableOpacity
              key={practitioner.id}
              style={styles.practitionerBox}
              onPress={() => handlePractitionerSelection(practitioner)}
            >
              <View style={styles.practitionerDetails}>
                <Text style={styles.practitionerName}>{practitioner.name}</Text>
                <Text style={styles.practitionerInfo}>{practitioner.type}</Text>
                <Text style={styles.practitionerLanguage}>Practitioner speaks {practitioner.language}</Text>
              </View>
              <Image source={require('../../assets/SelectionArrow.png')} style={[styles.arrowImage]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.bottomLine} />
      
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>{translations?.message_new_doctor_appt}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', 
  },
  datacontainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    backgroundColor: '#ffffff',
  },
  
  headerImage: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff', 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dfdfdf',
  },
  micImage: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
  },
  searchImage: { 
    width: 20,
    height: 20,
    position: 'absolute',
    left: 10,
  },
  headerLine: {
    height: 1,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#353535'
  },
  bottomLine: {
    height: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 20, 
    backgroundColor: '#ffffff',
  },
  continueButton: {
    flex: 1,
    borderColor: '#3269bd',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20, 
  },
  continueButtonText: {
    color:  '#3269bd',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  practitionerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 90,
    backgroundColor: 'white',
    marginVertical: 5,
    paddingHorizontal: 20, // Add horizontal padding for space
    justifyContent: 'space-between', // To space items horizontally
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
  },
  practitionerName: {
    marginTop: 5,
    fontWeight: 'bold', 
    fontSize: 10, 
    marginBottom: 5,
    color: '#353535',
    fontSize: 16,
  },
  practitionerDetails: {
    flex: 1, // Occupy remaining space
  },
  practitionerInfo: {
    fontWeight: '500', 
    fontSize: 14, 
    marginBottom: 2
  },
  practitionerLanguage: {
    fontSize: 14, 
    marginBottom: 5
  },
  arrowImage: {
    width: 20,
    height: 20,
  }
});

export default PractitionerSelection;
