import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AgeGroups = ["Adult", "Child / Teen"];

const AgeGroupSelection = () => {
  const navigation = useNavigation();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('Adult'); // Initialize with 'Adult'
  const [searchText, setSearchText] = useState('');

  const handleAgeGroupSelection = (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
  };

  const handleContinue = () => {
    if (selectedAgeGroup) {
      console.log("Selected Age Group:", selectedAgeGroup);
      navigation.navigate('HealthTypeSelection', { selectedAgeGroup });
    }
  };
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.navigate('AppNavigator');
  };

  // Filter age groups based on search text
  const filteredAgeGroups = AgeGroups.filter((ageGroup) =>
    ageGroup.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Age Groups"
            textAlign='center'
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <Image source={require('../../assets/search.png')} style={styles.searchImage} />
          <Image source={require('../../assets/mic.png')} style={styles.micImage} />
        </View>
        <TouchableOpacity onPress={handleClose}>
          <Image source={require('../../assets/cancel.png')} style={styles.headerImage} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.headerLine} />
      
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Who needs help?</Text>
      </View>

      <View style={styles.datacontainer}>
        {filteredAgeGroups.map((ageGroup, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.practitionerBox, selectedAgeGroup === ageGroup && styles.selected]}
            onPress={() => handleAgeGroupSelection(ageGroup)}
          >
            <View style={styles.radioContainer}>
              <View style={styles.outerCircle}>
                {selectedAgeGroup === ageGroup && <View style={styles.innerCircle} />}
              </View>
              <Text style={styles.ageGroupText}>{ageGroup}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.bottomLine} />
      
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
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
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
  ageGroupText: {
    fontSize: 16, 
    fontWeight: '500',
    color: '#353535',
  },
});

export default AgeGroupSelection;

//implement same close, back and console log selected item for this as well and update variable names according to the file