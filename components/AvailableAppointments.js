import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';

import appointmentData from './appdates.json';

const AvailableAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);

    const appointments = filterAppointmentsByDate();
    console.log("Appointments for selected date:", appointments);
  };

  const handleNextDate = () => {
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      currentDate.setDate(currentDate.getDate() + 1);
      const nextDate = currentDate.toISOString().split('T')[0];
      setSelectedDate(nextDate);
    }
  };

  const filterAppointmentsByDate = () => {
    if (!selectedDate) return [];
    const selectedDateWithoutTime = selectedDate.split(' ')[0];
    const allSlots = appointmentData.data[0]["account.name"].services[0].slots.all_slots;
    
    const allSlotsDateOnly = Object.keys(allSlots).reduce((acc, dateTime) => {
      const dateOnly = dateTime.split(' ')[0];
      acc[dateOnly] = allSlots[dateTime];
      return acc;
    }, {});
  
    return allSlotsDateOnly[selectedDateWithoutTime] || [];
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentBox}>
      <View style={styles.firstQuarter}>
        <Text style={styles.timeText}>{item.human_readable_UA.split(',')[0]}</Text>
      </View>
      <View style={styles.threeQuarters}>
        <View style={styles.practitionerInfo}>
          <Text>{item.cliniko_practitioner_id}</Text>
        </View>
        <View style={styles.completeDate}>
          <Text>{item.human_readable_UA}</Text>
          <Text>{item.language_id}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => handleDateSelect(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#2989F6' },
          }}
        />
      </View>
      <View style={styles.nextDateContainer}>
        <Text style={styles.nextDate}>Next Date</Text>
        <TouchableOpacity onPress={handleNextDate}>
          <Image source={require('../assets/arrow.png')} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.selectedDate}>
        <Text style={styles.dayText}>{selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' })},</Text>
        <Text style={styles.dateText}>{selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</Text>
      </View>
      <FlatList
        style={styles.appointmentsContainer}
        data={filterAppointmentsByDate()}
        renderItem={renderAppointmentItem}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  selectedDate: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  dayText: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  dateText: {
    fontWeight: 'bold',
  },
  nextDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    color: '#2989F6',
  },
  nextDate: {
    color: '#2989F6',
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  appointmentsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appointmentBox: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    borderColor: '#2989F6',
    borderWidth: 1,
  },
  firstQuarter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  threeQuarters: {
    flex: 3,
    padding: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#2989F6',
  },
  practitionerInfo: {
    marginBottom: 10,
  },
});

export default AvailableAppointments;
