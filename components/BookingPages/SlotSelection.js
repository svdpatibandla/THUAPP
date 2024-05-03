import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from './Header'; 
import { useNavigation } from '@react-navigation/native';
import { format, addDays, subDays } from 'date-fns';

import jsonData from '../avail_appointments.json';

const SlotSelection = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState({});
  const navigation = useNavigation();

  const getCurrentDate = () => {
    return format(selectedDate, 'EEEE, MMMM d');
  };

  const handleNextDate = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const handlePrevDate = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };

  useEffect(() => {
    const allSlots = jsonData.all_slots;
    const appointmentsList = Object.keys(allSlots).map(date => {
      return {
        date,
        slots: allSlots[date]
      };
    });
    setAppointments(appointmentsList);
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.navigate('AppNavigator');
  };

  const handleLanguageSelect = (practitionerName, language) => {
    setSelectedLanguages(prevState => ({
      ...prevState,
      [practitionerName]: language,
    }));
  };
  
  return (
    <View style={styles.container}>
      <Header handleBack={handleGoBack} handleClose={handleClose} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <View style={styles.secondContainer}>
        <View style={styles.resultsContainer}>
          <View style={styles.filterContainer}>
            <Text style={styles.resultText}>2 results found</Text>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.filterIcon}>
              <Image source={require('../../assets/filter.png')} style={styles.filterImage} />
            </View>
            <Text style={styles.filterText}>Filters</Text>
          </View>
        </View>       
        <View style={styles.header}>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <Text style={{ textAlign: 'center' }}>{getCurrentDate()}</Text>
            </View>
            <TouchableOpacity onPress={handlePrevDate} style={styles.searchImage}>
              <Image source={require('../../assets/chevron_right.png')} style={styles.searchImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextDate} style={styles.micImage}>
              <Image source={require('../../assets/chevron_right.png')} style={[styles.micImage, { transform: [{ rotate: '180deg' }] }]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        {appointments.map(({ date, slots }) => {
          if (selectedDate && date !== format(selectedDate, 'yyyy-MM-dd')) {
            return null;
          }
          return (
            <View key={date} style={styles.dateContainer}>
              {slots.reduce((practitioners, slot) => {
                const existingPractitioner = practitioners.find(p => p.name === slot.practitioner.name);
                if (existingPractitioner) {
                  existingPractitioner.slots.push(slot);
                } else {
                  practitioners.push({
                    name: slot.practitioner.name,
                    specialization: slot.practitioner.specialization,
                    languages: slot.practitioner.languages,
                    slots: [slot],
                  });
                }
                return practitioners;
              }, []).map((practitioner, index) => (
                <View key={index} style={styles.practitionerContainer}>
                  <View style={styles.practitionerDetails}>
                    <View style={styles.AboutPractitioner}>
                      <Text style={styles.practitionerName}>{practitioner.name}</Text>
                      <Text style={styles.practitionerSpecialization}>{practitioner.specialization}</Text>
                      <View style={styles.practitionerLanguage}>
                        <Text style={styles.practitionerLanguageText}>Practitioner speaks</Text>
                        <Text style={styles.practitionerLanguageValue}>{practitioner.languages}</Text>
                      </View>
                    </View>
                    <View style={styles.TreatsContainer}>
                      <View style={styles.Treatsblock}>
                        <Text style={styles.TreatsText}>Treats Adults</Text>
                      </View>
                      <View style={styles.Treatsblock}>
                        <Text style={styles.TreatsText}> Treats Children </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ width: '100%', height: 1, backgroundColor: '#E0E0E0' }} />
                  <View style={styles.LanguageContainer}>
                    <Text style={styles.LanguageHeading}>Select an appointment language</Text>
                    <View style={styles.languageItemContainer}>
                      <TouchableOpacity
                        style={[styles.languageButton, selectedLanguages[practitioner.name] === 'Ukrainian' && styles.selectedLanguageButton]}
                        onPress={() => handleLanguageSelect(practitioner.name, 'Ukrainian')}
                      >
                        <Text style={[styles.languageButtonText, selectedLanguages[practitioner.name] === 'Ukrainian' && styles.selectedLanguageButtonText]}>Ukrainian</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.languageButton, selectedLanguages[practitioner.name] === 'Russian' && styles.selectedLanguageButton]}
                        onPress={() => handleLanguageSelect(practitioner.name, 'Russian')}
                      >
                        <Text style={[styles.languageButtonText, selectedLanguages[practitioner.name] === 'Russian' && styles.selectedLanguageButtonText]}>Russian</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.languageButton, selectedLanguages[practitioner.name] === 'English' && styles.selectedLanguageButton]}
                        onPress={() => handleLanguageSelect(practitioner.name, 'English')}
                      >
                        <Text style={[styles.languageButtonText, selectedLanguages[practitioner.name] === 'English' && styles.selectedLanguageButtonText]}>English</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.AvailableTimes}>
                    <Text styles={styles.AvailableTimestext}> Available Times for {getCurrentDate()}</Text>
                  </View>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.slotTimesContainer}>
                    {practitioner.slots.map((slot, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.slotTimeButton}
                        onPress={() => navigation.navigate('AppointmentDetails', { slotDetails: slot })}
                      >
                        <Text style={styles.slotTimeButtonText}>{format(slot.time, 'HH:mm')}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TouchableOpacity style={styles.AllSlotsContainer}>
                    <Text style={styles.AllSlotsText}>View all times</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>   
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
  },
  secondContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: 16,
    display: 'flex',
    backgroundColor: '#ffffff',
  },
  resultsContainer: {
    width: 376,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  resultText: {
    color: '#151515',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    lineHeight: 24,
  },
  filterContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 4,
    paddingRight: 18,
  },
  filterIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  filterText: {
    textAlign: 'right',
    color: '#151515',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    lineHeight: 24,
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
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    justifyContent: 'center',
    textAlign: 'center',
  },
  micImage: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 10,
  },
  searchImage: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 10,
  },
  filterImage: {
    width: 24,
    height: 24,
  },
  leftItemText: {
    color: '#151515',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    lineHeight: 24,
  },
  bodyContainer: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  dateContainer: {
    marginBottom: 20,
  },
  practitionerContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    marginBottom: 10,
  },
  practitionerDetails: {
    marginBottom: 10,
  },
  slotTimesContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  AllSlots: {
    borderColor: '#3369BD',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
    color: '#3369BD',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  AboutPractitioner: {
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    gap: 2, 
    display: 'inline-flex'
  },
  practitionerName: {
    color: 'black', 
    fontSize: 18, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '600', 
    lineHeight: 24, 
  },
  practitionerSpecialization: {
    color: 'black', 
    fontSize: 16, 
    fontFamily: 'Source Sans Pro',
     fontWeight: '400', 
     lineHeight: 24, 
  },
  practitionerLanguage: { 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 2,
    display: 'inline-flex',
  },
  practitionerLanguageText: {
    color: '#575757',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 24,
  },
  practitionerLanguageValue: {
    color: '#575757',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    lineHeight: 24,
  },
  TreatsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  Treatsblock: {
    overflow: 'hidden',
    textAlign: 'center',
    marginRight: 8,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    color: 'black',
    paddingBottom: 5,
    paddingTop: 5, 
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px #D9D9D9 solid',
    gap: 10, 
    display: 'inline-flex',
    background: 'white', 
  },  
  TreatsText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    fontWeight: '600',
    lineHeight: 14,
  },
  LanguageContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
    display: 'inline-flex',
  },
  LanguageHeading: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 24,
  },
  languageItemContainer: {
    width: 340,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'inline-flex',
    flexDirection: 'row',
  },
  languageButton: {
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    display: 'inline-flex',
    borderColor: '#E0E0E0',
    flexDirection: 'row',
  },
  languageButtonText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 16,
  },
  selectedLanguageButton: {
    backgroundColor: '#FFF9D9',
  },
  selectedLanguageButtonText: {
    fontWeight: 'bold',
  },  
  AvailableTimestext: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    lineHeight: 24,
  },
  AvailableTimes: {
    color: 'black', 
    fontSize: 16, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '400', 
    lineHeight: 24, 
    wordWrap: 'break-word',
    marginTop: 16,
  },
  slotTimeButton: {
    backgroundColor: '#3369BD',
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
    paddingLeft: 18, 
    paddingRight: 18, 
    paddingTop: 8, 
    paddingBottom: 8, 
    borderRadius: 4, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 10, 
    display: 'inline-flex'
  },
  slotTimeButtonText: {
    fontSize: 14,
    color: 'white', 
    fontSize: 16, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '700', 
    lineHeight: 16, 
  },
  AllSlotsContainer: {
    paddingLeft: 18, 
    paddingRight: 18, 
    paddingTop: 8, 
    paddingBottom: 8, 
    borderRadius: 4, 
    borderWidth: 1,
    borderColor: '#3369BD',
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 10, 
    display: 'inline-flex',
    marginBottom: 18,
    marginTop: 16,
  },
  AllSlotsText: {
    color: '#3369BD',
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    fontWeight: '600',
    lineHeight: 14,
  },
});

export default SlotSelection;
