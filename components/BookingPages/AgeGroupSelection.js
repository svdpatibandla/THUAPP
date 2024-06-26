import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';

const AgeGroupSelection = () => {
  const dispatch = useDispatch();
  const translations = useSelector(state => state.auth.translations);
  const AgeGroups = [translations.message_adult, translations.message_child];

  const navigation = useNavigation();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(AgeGroups[0]);
  const [searchText, setSearchText] = useState('');

  const handleAgeGroupSelection = (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
  };

  const handleContinue = () => {
    if (selectedAgeGroup) {
      navigation.navigate('HealthTypeSelection', { AgeDetails: selectedAgeGroup });
      console.log('Selected Age Group:', selectedAgeGroup);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.navigate('AppNavigator');
  };

  const filteredAgeGroups = AgeGroups.filter((ageGroup) =>
    ageGroup.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header handleBack={handleGoBack} handleClose={handleClose} searchQuery={searchText} />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{translations?.message_appt_age}</Text>
      </View>

      <View style={styles.datacontainer}>
        {filteredAgeGroups.map((ageGroup, index) => {
          if (typeof ageGroup === 'string' || typeof ageGroup === 'number') {
            return (
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
            );
          }
          return null; 
        })}
      </View>

      <View style={styles.bottomLine} />

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>{translations?.message_continue}</Text>
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
