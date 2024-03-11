import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

import appointmentData from './appdates.json';

const AppointmentOptionsPopup = ({ visible, onClose, onCancel, onUploadFiles, position }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.popupBackground} onPress={onClose}>
        <View style={[styles.popupContainer, position]}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.popupOption}>Cancel Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onUploadFiles}>
            <Text style={styles.popupOption}>Upload Files</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.popupCloseButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const AppointmentButton = ({ onPress, isActive }) => (
  <TouchableOpacity onPress={onPress} style={[styles.appointmentButton, { backgroundColor: isActive ? 'blue' : 'gray' }]}>
    <Text style={styles.appointmentButtonText}>Join the Appointment</Text>
  </TouchableOpacity>
);

const AppointmentsPage = () => {
  const [appointmentsByDate, setAppointmentsByDate] = useState({});
  const [popupVisible, setPopupVisible] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const allSlots = appointmentData.patient.appointments;
    const appointmentsGroupedByDate = {};
    allSlots.forEach(appointment => {
      const date = appointment.starts_at.split('T')[0];
      if (appointmentsGroupedByDate[date]) {
        appointmentsGroupedByDate[date].push(appointment);
      } else {
        appointmentsGroupedByDate[date] = [appointment];
      }
    });

    // Sort appointments within each date group by start time
    Object.keys(appointmentsGroupedByDate).forEach(date => {
      appointmentsGroupedByDate[date].sort((a, b) => {
        return new Date(a.starts_at) - new Date(b.starts_at);
      });
    });
    
    setAppointmentsByDate(appointmentsGroupedByDate);
  }, []);

  const handleCancel = () => {
    setPopupVisible(false);
  };

  const handleUploadFiles = () => {
    setPopupVisible(false);
  };

  const renderAppointmentItem = ({ item, index }) => {
    const position = popupVisible[index] ? { top: popupVisible[index].y, left: popupVisible[index].x } : null;
    const isCurrentAppointment = isAppointmentCurrent(item);

    return (
      <View style={styles.appointmentBox}>
        <View style={styles.dateAndOptions}>
          <Text style={styles.date}>{new Date(item.starts_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {new Date(item.ends_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</Text>
          <TouchableOpacity
            onPress={event => {
              setSelectedAppointment(item);
              setPopupVisible({ ...popupVisible, [index]: { x: event.nativeEvent.pageX, y: event.nativeEvent.pageY } });
            }}
            style={styles.optionsButton}
          >
            <Text>...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.practitionerInfo}>
          <Text>{item.human_readable_UA}</Text>
          <Text>{item.practitioner.name}</Text>
          <Text>{item.practitioner.specialization}</Text>
        </View>
        <AppointmentButton onPress={() => {}} isActive={isCurrentAppointment} />
        {popupVisible[index] && (
          <AppointmentOptionsPopup
            visible={true}
            onClose={() => setPopupVisible({ ...popupVisible, [index]: null })}
            onCancel={handleCancel}
            onUploadFiles={handleUploadFiles}
            position={position}
          />
        )}
      </View>
    );
  };

  const isAppointmentCurrent = (appointment) => {
    const currentTime = new Date();
    const appointmentStartTime = new Date(appointment.starts_at);
    const appointmentEndTime = new Date(appointment.ends_at);
    return currentTime >= appointmentStartTime && currentTime <= appointmentEndTime;
  };

  return (
    <View style={styles.container}>
      {Object.keys(appointmentsByDate).map(date => (
        <View key={date}>
          <Text style={styles.dateHeading}>
            {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}, {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </Text>
          <FlatList
            style={styles.appointmentsContainer}
            data={appointmentsByDate[date]}
            renderItem={renderAppointmentItem}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  dateHeading: {
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  appointmentsContainer: {
    paddingHorizontal: 20,
  },
  appointmentBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  dateAndOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  date: {
  },
  optionsButton: {
    padding: 5,
  },
  appointmentButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  appointmentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  popupBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    minWidth: 100,
    position: 'absolute',
  },
  popupOption: {
    fontSize: 16,
    paddingVertical: 5,
  },
  popupCloseButton: {
    fontSize: 16,
    paddingVertical: 5,
    color: 'blue',
    marginTop: 5,
  },
  practitionerInfo: {
    marginBottom: 10, 
  },
});

export default AppointmentsPage;
