import React from 'react';
import jsonData from './prev_apps.json';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const PreviousAppointments = () => {
    const navigation = useNavigation();
    const translations = useSelector(state => state.auth.translations);

    const handleGoBack = () => {
        navigation.navigate('AccountPage');
    }

    return (
        <View style={{ backgroundColor: "#ffffff" }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
                </TouchableOpacity>
                <Text style={styles.headerText}>{translations.past_appts}</Text>
            </View>

            <View style={styles.container}>
                <ScrollView>
                    {jsonData.patient.appointments.map(appointment => (
                        <View style={styles.appointmentContainer} key={appointment.id}>
                            <Text style={styles.date}>{format(new Date(appointment.starts_at), "eeee, MMMM d, yyyy")}</Text>
                            <Text style={styles.time}>{format(new Date(appointment.starts_at), "HH:mm")} - {format(new Date(appointment.ends_at), "HH:mm")}</Text>
                            <Text style={styles.title}>{translations.message_practitioner}: {appointment.practitioner.name}</Text>
                            <Text style={styles.interpreter}>{translations.message_interpreter}: {appointment.interpreter}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomColor: '#dfdfdf',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    headerText: {
        color: '#151515',
        fontSize: 18,
        fontFamily: 'Source Sans Pro',
        fontWeight: '800',
        marginRight: 'auto',
        paddingHorizontal: 80,
    },
    headerImage: {
        width: 20,
        height: 20,
        marginLeft: 20,
    },
    appointmentContainer: {
        paddingLeft: 18,
        paddingTop: 10,
        paddingBottom: 10,
        marginHorizontal: 18,
        marginVertical: 5,
        borderColor: '#dfdfdf',
        borderWidth: 1,
        borderRadius: 5,
    },
    date: {
        color: '#575757',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        fontWeight: '800',
        lineHeight: 24,
    },
    time: {
        color: '#575757',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        fontWeight: '800',
        lineHeight: 24,
    },
    title: {
        width: 249,
        color: '#575757',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        fontWeight: '600',
        textTransform: 'capitalize',
        lineHeight: 24,
    },
    interpreter: {
        color: '#575757',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        fontWeight: '400',
        lineHeight: 24,
    },
});

export default PreviousAppointments;
