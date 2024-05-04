import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import axios from 'axios';

const BookAppointment = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [selectedLanguage, setSelectedLanguage] = useState('Ukrainian');
    const [availableSlots, setAvailableSlots] = useState([]);

    const customTheme = {
        calendarBackground: '#ffffff',
        arrowColor: '#3369BD',
    };

    useEffect(() => {
        console.log(selectedDate);
        const fetchData = async () => {
            const paramsData = {
                auth0_id: "auth0|6634357975c4bd61c0d7eeaa",
                email: "psvdutt+test5@gmail.com",
                permissions: "get:patient_cabiner",
                cliniko_appointment_type_id: "1384084284544911455",
                cliniko_practitioner_id: "933300557148326133",
            }

            try {
                const response = await axios.get('https://mobile-app-thu-e036558309fd.herokuapp.com/mobile/slots', { params: paramsData });
                setAvailableSlots(response.data.all_slots[selectedDate] || []);
                console.log(availableSlots);
            } catch (error) {
                console.log(error);
            }
        };

        if (selectedDate) {
            fetchData();
        }
    }, [selectedDate]);

    const handleClose = () => {
        navigation.navigate('SlotSelection');
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const getCurrentDate = () => {
        return format(selectedDate, 'EE, MMMM d');
    };

    const languageMap = {
        4: 'Ukrainian',
        5: 'Russian',
        6: 'English',
    };

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
    };
    const handleSlotSelection = (slot) => {
        navigation.navigate('AppointmentDetails', { slot });
    };


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Book Appointment</Text>
                    <TouchableOpacity onPress={handleClose}>
                        <Image source={require('../../assets/cancel.png')} style={styles.headerImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.slotTimesContainer}>
                    <Text style={styles.titleText}>Choose Date and Time</Text>
                    <View style={styles.practitionerContainer}>
                        <View style={styles.practitionerDetails}>
                            <View style={styles.AboutPractitioner}>
                                <Text style={styles.practitionerName}>Bender Rodriguez</Text>
                                <Text style={styles.practitionerSpecialization}>Psychologist</Text>
                                <View style={styles.practitionerLanguage}>
                                    <Text style={styles.practitionerLanguageText}>Practitioner speaks</Text>
                                    <Text style={styles.practitionerLanguageValue}>Ukraine</Text>
                                </View>
                            </View>
                            <View style={styles.TreatsContainer}>
                                <View style={styles.Treatsblock}>
                                    <Text style={styles.TreatsText}>Treats Adults</Text>
                                </View>
                                <View style={styles.Treatsblock}>
                                    <Text style={styles.TreatsText}>Treats Children</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.LanguageContainer}>
                            <Text style={styles.LanguageHeading}>Select an appointment language</Text>
                            <View style={styles.languageItemContainer}>
                                {[4, 5, 6].map(id => (
                                    <TouchableOpacity
                                        key={id}
                                        style={[styles.languageButton, selectedLanguage === languageMap[id] && styles.selectedLanguageButton]}
                                        onPress={() => handleLanguageSelect(languageMap[id])}
                                    >
                                        <Text style={[styles.languageButtonText, selectedLanguage === languageMap[id] && styles.selectedLanguageButtonText]}>
                                            {languageMap[id]}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#E0E0E0', height: 1 }} />
                </View>
                <View style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={(day) => handleDateSelect(day.dateString)}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: '#3369BD' },
                        }}
                        style={[styles.calendar, { borderTopWidth: 0 }]} 
                        theme={customTheme}
                    />
                </View>
                <View style={styles.AvailableTimesContainer}>
                    <View style={styles.AvailableTimesTextContainer}>
                        <Text style={styles.AvailableTimestext}> Available Times for</Text>
                        <Text style={styles.AvailableTimestextValue}> {getCurrentDate()}</Text>
                    </View>
                    <View style={styles.timeButtonsContainer}>
                        {availableSlots.map((slot, index) => (
                            <TouchableOpacity key={index} style={styles.timeButton} onPress={() => handleSlotSelection(slot)}>
                                <Text style={styles.timeButtonText}>{format(new Date(slot.time), 'HH:mm')}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        borderBottomColor: '#dfdfdf',
        backgroundColor: '#ffffff',
        paddingHorizontal: 14,
        borderBottomWidth: 1,
    },
    headerImage: {
        width: 24,
        height: 24,
    },
    headerText: {
        flex: 1,
        fontSize: 18,
        fontWeight: '900',
        textAlign: 'center',
    },
    slotTimesContainer: {
        backgroundColor: '#ffffff',
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 5,
        marginBottom: 10,
    },
    titleText: {
        color: '#151515',
        fontSize: 20,
        fontFamily: "Source Sans Pro-SemiBold",
        fontWeight: '700',
        lineHeight: 28,
        paddingTop: 20,
        paddingBottom: 20,
    },
    practitionerContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
    practitionerDetails: {
        marginBottom: 10,
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 1,
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
        fontWeight: '700',
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
        marginBottom: 20,
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
    AppointmentDetailsText: {
        color: '#151515',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        fontWeight: '400',
        lineHeight: 28,
        paddingTop: 20,
        paddingBottom: 4,
    },
    calendarContainer: {
        marginBottom: 20,
        width: 'auto',
        height: 'auto',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#dfdfdf',
    },
    calendar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    LanguageContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8,
        display: 'inline-flex',
        paddingBottom: 20,
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 1,
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
    AvailableTimesContainer: {
        padding: 10,
    },
    AvailableTimesTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    AvailableTimestext: {
        fontSize: 18,
        marginBottom: 10,
    },
    AvailableTimestextValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    timeButtonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    timeButton: {
        backgroundColor: '#3369BD',
        marginVertical: 8,
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 8,
        paddingBottom: 8,
        margin: 8,
        borderRadius: 5,
    },
    timeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    
});

export default BookAppointment;
