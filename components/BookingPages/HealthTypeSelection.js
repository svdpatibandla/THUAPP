import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header'; 

const HealthTypes = [
  {
    name: "Mental Health",
    description: "The help of psychologists, psychotherapists and psychiatrists for adults and children.",
  },
  {
    name: "Medical Health",
    description: "The help of oncologists, endocrinologists, cardiologists, rheumatologists, dermatologists, etc. ",
  },
];

const HealthTypeSelection = () => {
  const navigation = useNavigation();
  const [selectedHealthType, setSelectedHealthType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleHealthTypeSelection = (healthType) => {
    setSelectedHealthType(healthType);
  };

  const handleContinue = () => {
    console.log("Selected Health Type:", selectedHealthType);
    if (selectedHealthType === HealthTypes[0]) {
      navigation.navigate('MentalIssueSelection', { selectedHealthType });
    } else if (selectedHealthType === HealthTypes[1]){
      navigation.navigate('MedicalPractitionerSelection', { selectedHealthType });
    } else{
      console.log("Please select a Health Type");
    }
  };

  const handleClose = () => {
    navigation.navigate('AppNavigator'); 
  };

  const handleBack = () => {
    navigation.goBack(); 
  };

  const filteredHealthTypes = HealthTypes.filter(healthType =>
    healthType.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header handleBack={handleBack} handleClose={handleClose} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>What type of help are you looking for?</Text>
      </View>

      <View style={styles.datacontainer}>
        {filteredHealthTypes.map((healthType, index) => (
          <TouchableOpacity
            key={index} 
            style={[styles.healthTypeBox, selectedHealthType === healthType && styles.selected]}
            onPress={() => handleHealthTypeSelection(healthType)}
          >
            <View style={styles.radioContainer}>
              <View style={styles.outerCircle}>
                {selectedHealthType === healthType && <View style={styles.innerCircle} />}
              </View>
              <View style={styles.healthTypeContent}>
                <Text style={styles.healthTypeName}>{healthType.name}</Text>
                <Text style={styles.healthTypeDescription}>{healthType.description}</Text>
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
    backgroundColor: '#3269bd',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center', 
    marginBottom: 20,
    marginHorizontal: 20,
    flex: 1,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
  },
  healthTypeBox: {
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
  healthTypeContent: {
    marginLeft: 5,
    flex: 1,
  },
  healthTypeName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#353535',
    paddingTop: 5,
    paddingBottom: 5,
  },
  healthTypeDescription: {
    fontSize: 12,
    color: '#353535',
  },
});

export default HealthTypeSelection;
