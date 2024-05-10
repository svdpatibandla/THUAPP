import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import appointmentsData from './patient_appointments.json'; 
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AppointmentItem = ({ appointment, translations }) => {
  const currentTime = new Date();
  const appointmentTime = new Date(appointment.starts_at);

  const isFutureAppointment = appointmentTime.future_appts;
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

  console.log(appointment);


  return (
    <View style={styles.appointmentItem}>
      <Text style={styles.appointmentDate}>{appointment.date}</Text>
      <Text style={styles.appointmentTime}>{appointment.time}</Text>
      <Text style={styles.appointmentSpecialization}>{appointment.practitioner.specialization}</Text>
      <Text style={styles.appointmentText}>{translations.message_practitioner}: {appointment.practitioner.name} (Speaks {appointment.practitioner.language})</Text>
      {appointment.interpreter ? (
        <Text style={styles.appointmentText}>{translations.message_practitioner}: {appointment.interpreter.name} ({appointment.interpreter.language})</Text>
      ) : (
        <Text style={styles.appointmentText}>No interpreter: Appointment in {appointment.practitioner.language}</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.modifyButton}>
          <Image source={require('../assets/modify.png')} style={styles.modifyImage} />
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
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [scrolling, setScrolling] = useState(false);
  const [fabVisible, setFabVisible] = useState(true); 

  const navigation = useNavigation();
  const translations = useSelector(state => state.auth.translations);

  useEffect(() => {
    if (appointmentsData && appointmentsData.patient && appointmentsData.patient.appointments) {
      const appointments = appointmentsData.patient.appointments;
      const future = [];
      
                           
      appointments.forEach((appointment) => {
        if (appointment.future_appt) {
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
    
          future.push(formattedAppointment);
        };
      });
  
      future.sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));
      setFutureAppointments(future);
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
              {futureAppointments.map((appointment, index) => (
                <AppointmentItem key={`${appointment.id}_${index}`} appointment={appointment} translations={translations}/>
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
    height: 50,
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
    padding: 18,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  appointmentTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3269bd',
    marginBottom: 5,
  },
  appointmentDate: {
    color: '#363636', 
    fontSize: 16, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '700', 
    lineHeight: 24, 
  },
  appointmentTime: {
    color: '#363636', 
    fontSize: 16, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '700', 
    lineHeight: 24, 
  },
  appointmentSpecialization: {
    color: '#363636', 
    fontSize: 16, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '700', 
    lineHeight: 24, 
  },
  appointmentDetails: {
    fontSize: 18,
    color: '#353535',
    marginBottom: 5,
  },
  appointmentText: {
    color: '#575757', 
    fontSize: 16, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '400', 
    lineHeight: 24, 
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    gap: 8, 
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  modifyButton: {
    width: 'auto', 
    height: 'auto', 
    paddingVertical: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    borderRadius: 4, 
    borderWidth: 1,
    borderColor: '#575757',
    overflow: 'hidden', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 8, 
    display: 'flex',
  },
  modifyImage: {
    width: 24, 
    height: 24, 
    position: 'relative'
  },
  joinButton: {
    backgroundColor: '#8a8a8a',
    paddingVertical: 8,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  modifyButtonText: {
    color: '#363636',
    fontSize: 18,
    fontWeight: '400',
    color: '#363636',
    fontFamily: 'Source Sans Pro',
    lineHeight: 24
  },
  joinButton: {
    width: 'auto',
    height: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    paddingVertical: 8, 
    backgroundColor: '#FFD600', 
    borderRadius: 4, 
    overflow: 'hidden', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 10, 
    display: 'inline-flex',
    borderWidth: 1,
    borderColor: '#FFD600',
  },
  joinButtonText: {
    textAlign: 'center', 
    color: '#363636', 
    fontSize: 18, 
    fontFamily: 'Source Sans Pro', 
    fontWeight: '800', 
    lineHeight: 24, 
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
    paddingHorizontal: 16, 
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: '#3269bd',
  },
  fabImage: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Source Sans Pro',
    fontWeight: '600',
    lineHeight: 24,
  }
});

export default AppointmentsPage;
