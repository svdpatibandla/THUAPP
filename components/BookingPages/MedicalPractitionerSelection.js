import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header'; 
import { useDispatch, useSelector } from 'react-redux';

const MedicalPractitionerTypes = ["Cardiologist", "Dermatologist", "Rheumatologist", "Oncologist", "Gastroenterologist", "Endocrinologist", "Family doctor", "Other"];

const MedicalPractitionerSelection = () => {
  const navigation = useNavigation();
  const [selectedMedicalPractitionerType, setSelectedMedicalPractitionerType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const translations = useSelector(state => state.auth.translations);

  const handleMedicalPractitionerTypeSelection = (medicalPractitionerType) => {
    setSelectedMedicalPractitionerType(medicalPractitionerType);
  };

  const handleContinue = () => {
    if (selectedMedicalPractitionerType) {
      navigation.navigate('SlotSelection', { selectedMedicalPractitionerType });
    }
  };

  const handleClose = () => {
    navigation.navigate('AppNavigator');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const filteredMedicalPractitionerTypes = MedicalPractitionerTypes.filter(medicalPractitionerType =>
    medicalPractitionerType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const waitlistUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeTaVwXEi8BhgHg_Ebs0sEIqXMirthyWx3UzlOnJpb89NBbTg/viewform';
  const handleWaitlist = () => {
    console.log('waitlist');
    Linking.openURL(waitlistUrl);
  }


  return (
    <ScrollView>
      <View style={styles.container}>
        <Header handleBack={handleGoBack} handleClose={handleClose} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{translations?.message_choose_appt_type}</Text>
        </View>

        <View style={styles.datacontainer}>
          {filteredMedicalPractitionerTypes.map((medicalPractitionerType, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.practitionerBox, selectedMedicalPractitionerType === medicalPractitionerType && styles.selected]}
              onPress={() => handleMedicalPractitionerTypeSelection(medicalPractitionerType)}
            >
              <View style={styles.radioContainer}>
                <View style={styles.outerCircle}>
                  {selectedMedicalPractitionerType === medicalPractitionerType && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.medicalPractitionerTypeText}>{medicalPractitionerType}</Text>
              </View>
            </TouchableOpacity>
          ))}
          
          { selectedMedicalPractitionerType === 'Other'  ? (
            <View>
              <Text style={{fontSize: 14, fontFamily: 'Source Sans Pro', fontWeight: '400', lineHeight: 24}}>We are very sorry if you couldn’t find the specialist you were looking for. We can suggest seeing a Family doctor or signing up for our waitlist. We’ll contact you when we have available slots for practitioners with this specialization.</Text>
              <ScrollView>
                <TouchableOpacity style={styles.otherBox} onPress={handleWaitlist} >
                  <Text style={{ color: '#3269bd', fontSize: 16, fontFamily: 'Source Sans Pro', fontWeight: '600', lineHeight: 24, }}>Sign up to the wailist</Text>
                  <Image source={require('../../assets/chevron_right.png')} style={[styles.arrowRight, { transform: [{ rotate: '180deg' }] }]} />
                </TouchableOpacity>
              </ScrollView>
            </View>
          ) : null}
        </View>
        
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    color: '#353535',
    textAlign: 'center',
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
  practitionerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    marginVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    fontSize: 16,
  },
  otherBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: 'lightgrey',
    borderRadius: 5,
    fontSize: 16,
  },
  selected: {
    backgroundColor: '#e6ecfc',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3269bd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3269bd',
  },
  medicalPractitionerTypeText: {
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default MedicalPractitionerSelection;
