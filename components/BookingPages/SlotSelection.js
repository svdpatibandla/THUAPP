import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from './Header'; 
import { useNavigation } from '@react-navigation/native';

import jsonData from '../avail_appointments.json';

const SlotSelection = () => {
  const currentDate = new Date();

  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [searchQuery, setSearchQuery] = useState('');
  console.log(selectedDate);
  const navigation = useNavigation();

  const getSelectedDate = () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateDisplay =  selectedDate.toLocaleDateString('en-US', options);
    console.log(dateDisplay);
    return dateDisplay;
  };

  const handleNextDate = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
  };

  const handlePrevDate = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
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
    console.log(appointmentsList);
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.navigate('AppNavigator');
  };

  return (
    <View style={styles.container}>
      <Header handleBack={handleGoBack} handleClose={handleClose} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <View>
        <View style={styles.header}>
          <Text style={styles.leftItemText}>2 results found</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleClose}>
              <Image source={require('../../assets/filter.png')} style={styles.filterImage} />
            </TouchableOpacity>
            <Text style={{ marginLeft: 5 }}>Filter</Text>
          </View>
        </View>
        <View style={styles.header}>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <Text style={{ textAlign: 'center' }}>{getSelectedDate()}</Text>
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
          if (selectedDate && date !== selectedDate.toLocaleDateString('en-US')) {
            return null;
          }
          return (
            <View key={date} style={styles.dateContainer}>
              <Text style={styles.dateText}>{date}</Text>
              {slots.map((slot, index) => (
                <View key={index} style={styles.slotContainer}>
                  <View style={styles.slotContent}>
                    <View style={styles.slotHeader}>
                      <Text style={styles.slotHeaderText}>{slot.practitioner.name}</Text>
                      <Text style={styles.slotSubHeaderText}>{slot.practitioner.specialization}</Text>
                      <Text><Text style={styles.slotSubHeaderText}>Practitioner speaks </Text><Text style={styles.slotSubHeaderText}>{slot.practitioner.languages}</Text></Text>
                    </View>
                    <View style={styles.slotBody}>
                      <View style={styles.slotBodyRow}>
                        <TouchableOpacity style={styles.slotBodyButton}>
                          <Text style={styles.slotBodyButtonText}>Treats Adults</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.slotBodyButton}>
                          <Text style={styles.slotBodyButtonText}>Treats Children</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.slotBodyDivider} />
                      <View style={styles.slotBodyRow}>
                        <Text style={styles.slotBodyLabel}>Choose appointment language:</Text>
                        <View style={styles.slotBodyLanguage}>
                          {slot.practitioner.languages.split(',').map((language, i) => (
                            <TouchableOpacity key={i} style={styles.slotBodyLanguageButton}>
                              <Text style={styles.slotBodyLanguageButtonText}>{language.trim()}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                      <View style={styles.slotBodyDivider} />
                      <Text style={styles.slotBodyText}>Available times for {date}</Text>
                      <View style={styles.slotBodyTimes}>
                        {slot.slots.map((time, i) => (
                          <TouchableOpacity key={i} style={styles.slotBodyTimeButton}>
                            <Text style={styles.slotBodyTimeButtonText}>{time}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                      <TouchableOpacity style={styles.slotViewAllButton}>
                        <Text style={styles.slotViewAllButtonText}>View all times</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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
    paddingHorizontal: 20,
  },
  leftItemText: {
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
    marginLeft: 10,
    marginRight: 10,
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
  bodyContainer: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slotContainer: {
    width: '100%',
    height: '100%',
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: 'white',
    borderRadius: 6,
    overflow: 'hidden',
    border: '1px #E0E0E0 solid',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    display: 'inline-flex',
  },
  slotContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  slotHeader: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 16,
    display: 'flex',
  },
  slotHeaderText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Source Sans Pro',
    fontWeight: '600',
    lineHeight: 24,
    wordWrap: 'break-word',
  },
  slotSubHeaderText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 24,
    wordWrap: 'break-word',
  },
  slotBody: {
    paddingLeft: 18,
    paddingRight: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
    display: 'inline-flex',
  },
  slotBodyRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
  },
  slotBodyButton: {
    width: 103,
    height: 36,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
    border: '1px #D9D9D9 solid',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    display: 'flex',
  },
  slotBodyButtonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    fontWeight: '600',
    lineHeight: 14,
    wordWrap: 'break-word',
  },
  slotBodyDivider: {
    width: 376,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  slotBodyLabel: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 24,
    wordWrap: 'break-word',
  },
  slotBodyLanguage: {
    width: 340,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'inline-flex',
  },
  slotBodyLanguageButton: {
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#FFF9D9',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    border: '1px #FFD600 solid',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    display: 'inline-flex',
  },
  slotBodyLanguageButtonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '600',
    lineHeight: 16,
    wordWrap: 'break-word',
  },
  slotBodyText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 24,
    wordWrap: 'break-word',
  },
  slotBodyTimes: {
    width: 340,
    height: 48,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    display: 'inline-flex',
  },
  slotBodyTimeButton: {
    height: 48,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#3369BD',
    borderRadius: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    display: 'inline-flex',
  },
  slotBodyTimeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    lineHeight: 16,
    wordWrap: 'break-word',
  },
  slotViewAllButton: {
    width: 340,
    height: 48,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    border: '1px #3369BD solid',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    display: 'flex',
  },
  slotViewAllButtonText: {
    color: '#3369BD',
    fontSize: 18,
    fontFamily: 'Source Sans Pro',
    fontWeight: '600',
    lineHeight: 16,
    wordWrap: 'break-word',
  },
});

export default SlotSelection;
