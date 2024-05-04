import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MentalPractitionerTypes = [
  {
    name: "Psychologist / Talk Therapy",
    description: "The help of psychologists, psychotherapists and psychiatrists for adults and children.",
  },
  {
    name: "Psychiatrist",
    description: "The help of psychologists, psychotherapists and psychiatrists for adults and children.",
  },
];

const nameMapping = {
  "Psychologist / Talk Therapy": "Adult Talk Therapy",
  "Psychiatrist": "Psychiatrist"
};

const MentalPractitionerSelection = ({ route }) => {
  const navigation = useNavigation();
  const [selectedMentalPractitionerType, setSelectedMentalPractitionerType] = useState('');
  const [services, setServices] = useState(null);
  const user = useSelector(state => state.auth.user);
  const translations = useSelector(state => state.auth.translations);
  const previousDetails = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const paramsData = {
        auth0_id: "auth0|6634357975c4bd61c0d7eeaa",
        email: "psvdutt+test5@gmail.com",
        account_id: previousDetails.account_id,
        permissions: 'get:patient_cabinet'
      };

      try {
        const response = await axios.get('https://mobile-app-thu-e036558309fd.herokuapp.com/mobile/services', { params: paramsData });
        setServices(response.data.services);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [user.sub, user.email, previousDetails.account_id]);

  const handleMentalPractitionerTypeSelection = (mentalPractitionerType) => {
    setSelectedMentalPractitionerType(mentalPractitionerType);
  };

  const handleContinue = () => {
    console.log("Selected Mental Practitioner Type:", selectedMentalPractitionerType);
    console.log("Services:", services);
    if (selectedMentalPractitionerType && services) {
      let specific_services;
      if (previousDetails.AgeDetails === 'Adult') {
        specific_services = services.adult_services.filter(service => {
          return nameMapping[selectedMentalPractitionerType.name] === service.name;
        });
      } else if (previousDetails.AgeDetails === 'Child') {
        specific_services = services.child_services.filter(service => {
          return nameMapping[selectedMentalPractitionerType.name] === service.name;
        });
      }

      if (specific_services.length > 0) {
        navigation.navigate('SlotSelection', {
          AgeDetails: previousDetails.AgeDetails,
          cliniko_appointment_type_id: specific_services[0].cliniko_appointment_type_id,
          account_id: previousDetails.account_id,
        });
      } else {
        console.log("No matching service found.");
      }
    }
  };

  const handleClose = () => {
    navigation.navigate('AppNavigator');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header handleBack={handleGoBack} handleClose={handleClose} />
      
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{translations?.message_choose_appt_type}</Text>
      </View>

      <View style={styles.datacontainer}>
        {MentalPractitionerTypes.map((mentalPractitionerType, index) => (
          <TouchableOpacity
            key={index} 
            style={[styles.MentalPractitionerTypeBox, selectedMentalPractitionerType === mentalPractitionerType && styles.selected]}
            onPress={() => handleMentalPractitionerTypeSelection(mentalPractitionerType)}
          >
            <View style={styles.radioContainer}>
              <View style={styles.outerCircle}>
                {selectedMentalPractitionerType === mentalPractitionerType && <View style={styles.innerCircle} />}
              </View>
              <View style={styles.mentalPractitionerTypeContent}>
                <Text style={styles.MentalPractitionerTypeName}>{mentalPractitionerType.name}</Text>
                <Text style={styles.MentalPractitionerTypeDescription}>{mentalPractitionerType.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
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
  MentalPractitionerTypeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100, 
    backgroundColor: 'white',
    marginVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
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
  mentalPractitionerTypeContent: {
    marginLeft: 5,
    flex: 1,
  },
  MentalPractitionerTypeName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#353535',
    paddingTop: 5,
    paddingBottom: 5,
  },
  MentalPractitionerTypeDescription: {
    fontSize: 12,
    color: '#353535',
  },
});

export default MentalPractitionerSelection;
