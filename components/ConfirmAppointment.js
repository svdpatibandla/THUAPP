import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ConfirmAppointment = ({ route, navigation }) => {
  const { practitioner, timeSlot } = route.params;
  console.log('practitioner: ', practitioner);
  console.log(timeSlot);

  const handleBookAppointment = () => {
    // Logic to book the appointment goes here
    // For example, you can navigate to a confirmation screen
    navigation.navigate('AppointmentsPage', { practitioner, timeSlot });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Confirm Appointment</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Practitioner Name:</Text>
          <Text style={styles.value}>{practitioner.name}</Text>
          <Text style={styles.label}>Specialization:</Text>
          <Text style={styles.value}>{practitioner.specialization}</Text>
          <Text style={styles.label}>Appointment Date:</Text>
          <Text style={styles.value}>{timeSlot.date}</Text>
          <Text style={styles.label}>Appointment Time:</Text>
          <Text style={styles.value}>{timeSlot.time}</Text>
          <Text style={styles.label}>Language:</Text>
          <Text style={styles.value}>{timeSlot.language}</Text>
          {/* You can add more appointment details here */}
        </View>
      </View>
      <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Center content vertically
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#2989F6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    paddingBottom: 10
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmAppointment;
