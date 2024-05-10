import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from './Header'; 
import { useNavigation } from '@react-navigation/native';
import { format, addDays, subDays, addMinutes } from 'date-fns';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SlotSelection = ({ route }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState({});
  const navigation = useNavigation();

  const user = useSelector(state => state.auth.user);
  const prevDetails = route.params;
  console.log("Prev Details: ",prevDetails);

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

    paramsData = {
      auth0_id: "auth0|6634357975c4bd61c0d7eeaa",
      email: "psvdutt+test5@gmail.com",
      cliniko_appointment_type_id: "1384084284544911455",
      permissions: 'get:patient_cabinet'
    };
    console.log("slot selection params data",paramsData);

    const fetchData = async () => {
      try {
        const response = await axios.get('https://mobile-app-thu-e036558309fd.herokuapp.com/mobile/slots', { params: paramsData });
        console.log("Response:  ",response.data);
        const allSlots = response.data.all_slots;
        const appointmentsList = Object.keys(allSlots).map(date => {
          return {
            date,
            slots: allSlots[date].map(slot => ({
              ...slot,
              time: addMinutes(new Date(slot.time), new Date().getTimezoneOffset())
            }))
          };
        });
        setAppointments(appointmentsList);
        console.log("Appointments::: ",appointmentsList);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };
    fetchData();
  }, []);
  

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.navigate('AppNavigator');
  };
  
  const languageMap = {
    4: 'Ukrainian',
    5: 'Russian',
    6: 'English',
  };

  const handleLanguageSelect = (practitionerName, language) => {
    setSelectedLanguages(prevState => ({
      ...prevState,
      [practitionerName]: language,
    }));
  };
  
  useEffect(() => {
    const initialLanguages = {};
    appointments.forEach(({ slots }) => {
      slots.forEach(slot => {
        initialLanguages[slot.practitioner.name] = 'Ukrainian';
      });
    });
    setSelectedLanguages(initialLanguages);
  }, [appointments]);

  return (
    <View style={styles.container}>
      <Header handleBack={handleGoBack} handleClose={handleClose} searchQuery={searchQuery} />
      <View style={styles.headerContainer}>
        <View style={styles.resultsContainer}>
          <Text style={styles.resultText}>Results</Text>
          <View style={styles.filterContainer}>
            <Image source={require('../../assets/filter.png')} style={styles.filterImage} />
            <Text style={styles.filterText}>Filters</Text>
          </View>
        </View>

        <View style={styles.calenderContainer}>
          <TouchableOpacity onPress={handlePrevDate} style={styles.Imagestyle}>
            <Image source={require('../../assets/chevron_right.png')} style={styles.Imagestyle} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Image source={require('../../assets/Appointments_Icon.png')} style={styles.Imagestyle} />
            <Text style={styles.DateText}>{getCurrentDate()}</Text>
            <Image source={require('../../assets/arrow_drop_down.png')} style={styles.Imagestyle} />
          </View>
          <TouchableOpacity onPress={handleNextDate} style={styles.Imagestyle}>
            <Image source={require('../../assets/chevron_right.png')} style={[styles.Imagestyle, { transform: [{ rotate: '180deg' }] }]} />
          </TouchableOpacity>
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
                      {[4, 5, 6].map(id => (
                        <TouchableOpacity
                          key={id}
                          style={[styles.languageButton, selectedLanguages[practitioner.name] === languageMap[id] && styles.selectedLanguageButton]}
                          onPress={() => handleLanguageSelect(practitioner.name, languageMap[id])}
                        >
                          <Text style={[styles.languageButtonText, selectedLanguages[practitioner.name] === languageMap[id] && styles.selectedLanguageButtonText]}>
                            {languageMap[id]}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <View style={styles.AvailableTimes}>
                    <Text styles={styles.AvailableTimestext}> Available Times for {getCurrentDate()}</Text>
                  </View>
                  <View style={styles.selectedLanguageContainer}>
                    <Text style={styles.selectedLanguageText}>
                      Selected Language: {selectedLanguages[practitioner.name]}
                    </Text>
                  </View>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.slotTimesContainer}>
                    {practitioner.slots
                      .map((slot, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.slotTimeButton}
                          onPress={() => navigation.navigate('AppointmentDetails', { slotDetails: slot })}
                        >
                          <Text style={styles.slotTimeButtonText}>{format(slot.time, 'HH:mm')}</Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                  <TouchableOpacity 
                    style={styles.AllSlotsContainer}
                    onPress = {() => navigation.navigate('BookAppointment', { 
                      auth0_id: user.sub,
                      email: user.email,
                      cliniko_practitioner_id: practitioner.slots[0].cliniko_practitioner_id,
                      cliniko_appointment_type_id: paramsData.cliniko_appointment_type_id,
                    })}
                  >
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
  headerContainer:{
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
  },
  calenderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    paddingBottom: 12,
  },
  resultsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginTop: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  resultText: {
    color: '#151515',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    lineHeight: 24,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterIcon: {
    width: 16,
    height: 16,
  },
  filterText: {
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
    borderRadius: 35,
    borderWidth: 1,
  },
  CalenderBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 35,
    borderColor: '#dfdfdf',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    display: 'inline-flex',
  },
  calenderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 35,
    borderColor: '#dfdfdf',
    marginBottom: 12,
  },
  DateText: { 
    textAlign: 'center', 
    fontWeight: '700', 
    color: '#363636',
    fontFamily: 'Source Sans Pro',
    fontSize: 16
  },
  Imagestyle: {
    width: 24,
    height: 24,
    marginRight: 10, // Adjust as needed
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
