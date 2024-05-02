import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const PractitionerPage = ({ route }) => {
  const { practitioner } = route.params; 
  const [selectedDate, setSelectedDate] = useState(null);
  const navigation = useNavigation(); 

  const slots = practitioner.slots.reduce((acc, slot) => {
    const date = slot.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {});

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleAppointmentPress = (time) => {
    navigation.navigate('ConfirmAppointment', { time, practitioner });
  };

  const renderAppointmentItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleAppointmentPress(item.time)}>
      <View style={styles.appointmentBox}>
        <Text>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.practitionerDetails}>
        <Text style={styles.practitionerName}>{practitioner.details.name}</Text>
        <Text style={styles.detailsTitle}>Practitioner Details:</Text>
        <Text>{`ID: ${practitioner.details.cliniko_practitioner_id}`}</Text>
        <Text>{`Specialization: ${practitioner.details.specialization}`}</Text>
        <Text>{`First Language: ${practitioner.details.first_lang_id}`}</Text>
        <Text>{`Second Language: ${practitioner.details.second_lang_id}`}</Text>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => handleDateSelect(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#2989F6' },
          }}
          style={styles.calendar}
        />
      </View>
      <View style={styles.appointmentsContainer}>
        <FlatList
          data={selectedDate ? slots[selectedDate] || [] : []}
          renderItem={renderAppointmentItem}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  practitionerDetails: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  practitionerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  practitionerSpecialization: {
    fontSize: 16,
  },
  calendarContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  appointmentsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appointmentBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    borderColor: '#2989F6',
    borderWidth: 1,
  },
});

export default PractitionerPage;
