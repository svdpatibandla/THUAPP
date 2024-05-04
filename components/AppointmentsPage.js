import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import appointmentsData from './patient_appointments.json'; 
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const AppointmentItem = ({ appointment }) => {
  const currentTime = new Date();
  const appointmentTime = new Date(appointment.starts_at);

  const isFutureAppointment = appointmentTime > currentTime;
  const isActiveAppointment = appointmentTime.getTime() === currentTime.getTime();

  const joinButtonStyle = [
    styles.joinButton,
    !isFutureAppointment && styles.disabledButton,
    isActiveAppointment && styles.joinButtonActive,
  ];

  const joinButtonTextStyle = [
    styles.joinButtonText,
    isActiveAppointment && styles.joinButtonTextActive,
  ];

  return (
    <View style={styles.appointmentItem}>
      <Text style={styles.appointmentDate}>{appointment.date}</Text>
      <Text style={styles.appointmentTime}>{appointment.time}</Text>
      <Text style={styles.appointmentTitle}>{appointment.human_readable_UA}</Text>
      <Text style={styles.appointmentText}>Practitioner: {appointment.practitioner.name} (Speaks {appointment.practitioner.language})</Text>
      {appointment.interpreter ? (
        <Text style={styles.appointmentText}>Interpreter: {appointment.interpreter.name} ({appointment.interpreter.language})</Text>
      ) : (
        <Text style={styles.appointmentText}>No interpreter: Appointment in {appointment.practitioner.language}</Text>
      )}
      <View style={styles.uploadedFilesContainer}>
        <Text style={styles.appointmentText}>Uploaded files:</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.modifyButton}>
          <Image source={require('../assets/modify.png')} style={styles.buttonImage} />
          <Text style={styles.modifyButtonText}>Modify</Text>
        </TouchableOpacity>
        <TouchableOpacity style={joinButtonStyle}>
          <Text style={joinButtonTextStyle}>Join the appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AppointmentsPage = () => {
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [scrolling, setScrolling] = useState(false);
  const [fabVisible, setFabVisible] = useState(true); 

  const navigation = useNavigation();
  const translations = useSelector(state => state.auth.translations);

  useEffect(() => {
    if (appointmentsData && appointmentsData.patient && appointmentsData.patient.appointments) {
      const appointments = appointmentsData.patient.appointments;
      const currentDate = new Date();
      const future = [];
      const previous = [];
  
      appointments.forEach((appointment) => {
        const appointmentDate = new Date(appointment.starts_at);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const formattedDate = appointmentDate.toLocaleDateString('en-US', options);
        const startTime = appointmentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const endTime = new Date(appointment.ends_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const timeRange = `${startTime} - ${endTime}`;
        const details = `${formattedDate}\n${timeRange}\n${appointment.human_readable_UA}\nPractitioner: ${appointment.practitioner.name} (Speaks ${appointment.practitioner.language})`;
        const interpreter = appointment.interpreter ? appointment.interpreter.name : null;
        const uploadedFiles = appointment.attachments ? appointment.attachments.map(file => file.filename) : [];
        const formattedAppointment = {
          id: appointment.id,
          date: formattedDate,
          time: timeRange,
          details: details,
          interpreter: interpreter,
          uploadedFiles: uploadedFiles,
          ...appointment,
        };
  
        if (appointmentDate > currentDate) {
          future.push(formattedAppointment);
        } else {
          previous.push(formattedAppointment);
        }
      });
  
      future.sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));
  
      setFutureAppointments(future);
      setPreviousAppointments(previous);
    }
  }, []);
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFabVisible(true);
    }, 2000); 

    return () => clearTimeout(timeout);
  }, [scrolling]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { 
      useNativeDriver: false,
      listener: event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setScrolling(offsetY !== 0);
      }
    }
  );

  const fabTextOpacity = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        onScrollBeginDrag={() => setFabVisible(true)} 
        onScrollEndDrag={() => setFabVisible(true)} 
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <Text style={styles.titleText}>{translations?.message_profile_title}</Text>
        </View>
        
        <View style={styles.headerLine} />

        {futureAppointments.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.appointmentsContainer}>
              {futureAppointments.map((appointment) => (
                <AppointmentItem key={appointment.id} appointment={appointment} />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.noAppointmentsContainer}>
            <View style={styles.noAppointmentsTextContainer}>
              <Text style={styles.noAppointmentsTitle}>{translations?.message_no_appts}</Text>
              <Text style={styles.noAppointmentsSubtitle}>Find a specialist today</Text>
            </View>
            <TouchableOpacity style={styles.noAppointmentsButton} onPress={() => navigation.navigate('PractitionerSelection')}>
              <Image source={require('../assets/fab_icon.png')} style={styles.noAppointmentsButtonImage} />
              <Text style={styles.noAppointmentsButtonText}>{translations?.message_book_appt}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {futureAppointments.length > 0 ? ( <Animated.View style={[styles.fab]}>
        <TouchableOpacity onPress={() => navigation.navigate('PractitionerSelection')}>
          <View style={styles.fabContent}>
            <Image source={require('../assets/fab_icon.png')} style={styles.fabImage} />
            <Animated.Text style={[styles.fabText, { opacity: fabTextOpacity }]}>Sign up</Animated.Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      ) : null}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#353535',
    justifyContent: 'center', 
  },
  headerLine: {
    height: 1,
    backgroundColor: '#dfdfdf',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    paddingTop: 10, 
    fontWeight: 'bold',
    fontSize: 16,
    color: '#353535',
    marginBottom: 10,
    marginLeft: 10,
  },
  noAppointmentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft : 180,
    paddingRight : 180,
    marginLeft : 180,
    marginRight : 180,
  },
  noAppointmentsTextContainer: {
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    gap: 12, 
    display: 'flex',
    marginLeft: 10,
    marginRight: 10,
    paddingLeft : 18,
    paddingRight : 18,
  },
  noAppointmentsTitle: {
    width: 376, 
    textAlign: 'center', 
    color: '#363636', 
    fontSize: 24, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '600', 
    lineHeight: 32, 
  },
  noAppointmentsSubtitle: {
    width: 376, 
    textAlign: 'center', 
    color: '#363636', 
    fontSize: 24, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '400', 
    lineHeight: 22, 
    paddingBottom: 20
  },
  noAppointmentsButton: {
    width: 376, 
    height: 56, 
    paddingLeft: 16, 
    paddingRight: 16, 
    paddingTop: 8, 
    paddingBottom: 8, 
    backgroundColor: '#3369BD', 
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.20)', 
    borderRadius: 4, 
    overflow: 'hidden', 
    justifyContent: 'center',
    alignItems: 'center', 
    gap: 8, 
    display: 'inline-flex',
    flexDirection: 'row'
  },
  noAppointmentsButtonImage:{
    width: 24, 
    height: 24, 
    position: 'relative'
  },
  noAppointmentsButtonText: {
    color: 'white', 
    fontSize: 18, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '600', 
    lineHeight: 24, 
  },
  appointmentsContainer: {
    padding: 10,
  },
  appointmentItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dfdfdf',
  },
  appointmentTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3269bd',
    marginBottom: 5,
  },
  appointmentDate: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#353535',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#353535',
  },
  appointmentDetails: {
    fontSize: 16,
    color: '#353535',
    marginBottom: 5,
  },
  appointmentText: {
    fontSize: 14,
    color: '#353535',
  },
  uploadedFilesContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  uploadedFile: {
    fontSize: 14,
    color: '#353535',
    backgroundColor: '#e6ecf0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  modifyButton: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row', 
    alignItems: 'center'
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  modifyButtonText: {
    color: '#3269bd',
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: '#8a8a8a',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  joinButtonActive: {
    backgroundColor: '#3269bd',
  },
  joinButtonTextActive: {
    color: 'white',
  },
  disabledButton: {
    opacity: 0.5,
  },
  noAppointmentsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  noAppointmentsText: {
    fontSize: 16,
    color: '#353535',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    width: 'auto', 
    height: 60,
    backgroundColor: '#3269bd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10, 
    right: 20,
    bottom: 20,
    elevation: 8,
  },
  fabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10, 
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: '#3269bd',
  },
  fabImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  fabText: {
    fontSize: 16,
    color: 'white',
  }
});

export default AppointmentsPage;
