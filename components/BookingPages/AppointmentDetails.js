import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, ScrollView, Button, Modal, TouchableHighlight } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

const AppointmentDetails = ({ route }) => {

    const navigation = useNavigation();
    const [appointmentReason, setAppointmentReason] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [receiveInstructions, setReceiveInstructions] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { slotDetails } = route.params;
    console.log(slotDetails);
    practitioner = slotDetails.practitioner;

    const handleAppointmentReasonChange = (text) => {
        setAppointmentReason(text);
    };

    const handleClose = () => {
        navigation.navigate('SlotSelection');
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSave = async () => {
        try {
            setModalVisible(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleClose}>
                        <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Appointment Details</Text>
                    <TouchableOpacity onPress={handleClose}>
                        <Image source={require('../../assets/cancel.png')} style={styles.headerImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.slotTimesContainer}>
                    <Text style={styles.titleText}>Review and Book</Text>
                    <View style={styles.practitionerContainer}>
                        <View style={styles.practitionerDetails}>
                            <View style={styles.AboutPractitioner}>
                                <Text style={styles.practitionerName}>{practitioner.name}</Text>
                                <Text style={styles.practitionerSpecialization}>{practitioner.specialization}</Text>
                                <View style={styles.practitionerLanguage}>
                                    <Text style={styles.practitionerLanguageText}>Practitioner speaks</Text>
                                    <Text style={styles.practitionerLanguageValue}>{slotDetails.language}</Text>
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
                    </View>

                    <Text style={styles.AppointmentDetailsText}>Appointment Details</Text>
                    <View style={styles.AppointmentCard}>
                        <View style={styles.Appointmentitem}>
                            <Text style={styles.Appointmenttitle}>Date and Time</Text>
                            <Text style={styles.Appointmentdetail}>{slotDetails.patient_datetime} ({practitioner.tz} time)</Text>
                        </View>
                        <View style={styles.Appointmentitem}>
                            <Text style={styles.Appointmenttitle}>Appointment Type</Text>
                            <Text style={styles.Appointmentdetail}>Adult Psychologist / Talk Therapy</Text>
                        </View>
                        <View style={styles.Appointmentitem}>
                            <Text style={styles.Appointmenttitle}>No Interpreter</Text>
                            <Text style={styles.Appointmentdetail}>Appointment in English</Text>
                        </View>
                    </View>

                    <Text style={styles.AppointmentDetailsText}>Appointment Reason</Text>
                    <View style={styles.AppointmentCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter appointment reason"
                            value={appointmentReason}
                            onChangeText={handleAppointmentReasonChange}
                        />
                    </View>

                    <View style={{ background: '#E0E0E0' }} />

                    <Text style={styles.AppointmentDetailsText}>Documents</Text>
                    <View style={styles.uploadButton}>
                        <View style={styles.uploadIcon}>
                            <View style={styles.uploadIconInner}>
                                <Image source={require('../../assets/file_upload.png')} style={styles.uploadImage} />
                            </View>
                        </View>
                        <Text style={styles.uploadText}>Upload</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title="Я хочу отримати інструкції з завантаження файлів (аналізи, рентген, КТ, МРТ, УЗД, тощо) на пошту.s"
                            checked={receiveInstructions}
                            onPress={() => setReceiveInstructions(!receiveInstructions)}
                        />
                    </View>
                    <Button title="Book appointment" onPress={handleSave} color='#3369BD' />

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Book appointment?</Text>
                                <Text style={styles.modalTimeText}>{slotDetails.patient_datetime}.</Text>
                                <View style={styles.modalButtons}>
                                    <TouchableHighlight
                                        style={{ ...styles.modalButton,}}
                                        onPress={() => {
                                            console.log('Cancel Pressed');
                                            setModalVisible(!modalVisible);
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={{ ...styles.modalButton,}}
                                        onPress={() => {
                                            console.log('Book Now Pressed');
                                            setModalVisible(!modalVisible);
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Book Now</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        borderBottomColor: '#dfdfdf',
        backgroundColor: '#ffffff',
        paddingHorizontal: 14,
    },
    headerImage: {
        width: 24,
        height: 24,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
    },
    slotTimesContainer: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        marginBottom: 10,
        paddingLeft: 18,
        paddingRight: 18,
    },
    titleText: {
        color: '#151515',
        fontSize: 20,
        fontFamily: 'Source Sans Pro',
        fontWeight: '600',
        lineHeight: 28,
        paddingTop: 20,
        paddingBottom: 20,
    },
    practitionerContainer: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dfdfdf',
    },
    practitionerDetails: {
        marginBottom: 10,
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
    AppointmentDetailsText: {
        color: '#151515',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        fontWeight: '400',
        lineHeight: 28,
        paddingTop: 20,
        paddingBottom: 4,
    },
    AppointmentCard: {
        paddingTop: 18,
        paddingBottom: 18,
        backgroundColor: 'white',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
        paddingLeft: 18,
    },
    Appointmentitem: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    Appointmenttitle: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        fontWeight: '600',
        lineHeight: 24,
    },
    Appointmentdetail: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        fontWeight: '400',
        lineHeight: 24,
    },
    uploadButton: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        background: '#3369BD',
        backgroundColor: '#3369BD',
        width: 'auto',
        borderRadius: 4,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
        width: 147
    },
    uploadIcon: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 8,

    },
    uploadIconInner: {
        width: 16,
        height: 16,
    },
    uploadText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        fontWeight: '600',
        lineHeight: 24,
        flex: 1,
    },
    checkboxText: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Source Sans Pro',
        fontWeight: '400',
        lineHeight: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
        paddingRight: 18,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        color: '#363636', 
        fontSize: 24, 
        fontFamily: 'Source Sans Pro', 
        fontWeight: '400', 
        lineHeight: 32, 
        paddingBottom: 16,
        paddingTop: 24,
    },
    modalTimeText: {
        width: '100%', 
        color: '#363636', 
        fontSize: 18, 
        fontFamily: 'Source Sans Pro', 
        fontWeight: '400', 
        lineHeight: 20, 
        letterSpacing: 0.25, 
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        borderRadius: 5,
        paddingTop: 24,
        minWidth: 100,
        marginHorizontal: 10,
        alignItems: 'center',
        paddingBottom: 24,
    },
    textStyle: {
        color: '#3369BD',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AppointmentDetails;
