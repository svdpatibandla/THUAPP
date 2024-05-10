import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export const FinalPage = () => {
    const navigation = useNavigation();
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [checkBoxChecked, setCheckBoxChecked] = useState(false);
    const[localdoctor, setLocalDoctor] = useState('');
    const route = useRoute();
  const {
    name,
    surname,
    birthYear,
    gender,
    selectedLanguage,
    selectedOptions,
    primaryLanguage,
    otherLanguages,
    noOtherLanguage,
    phoneNumber,
    countryCode,
    country,
    telegramId} = route.params;

    console.log('FinalPage: PAGE 5');
    console.log('Name:', name);
    console.log('Surname:', surname);
    console.log('Birth Year:', birthYear);
    console.log('gender',gender);
    console.log('selectedLanguage:', selectedLanguage);
    console.log('selectedOptions:', selectedOptions);
    console.log('phoneNumber:', phoneNumber);
    console.log('otherLanguages',otherLanguages);
    console.log('primaryLanguage:', primaryLanguage);
    console.log('noOtherLanguage:', noOtherLanguage);
    console.log('countryCode:', countryCode);
    console.log('additionalInfo:', additionalInfo);
    console.log('country:', country);
    console.log('telegramId:', telegramId);

    const handleSubmit = () => {
        // Navigate to the DataPrint page
        /*
        navigation.navigate('DataPrintPage',{name,
            surname,
            birthYear,
            gender,
            selectedLanguage,
            primaryLanguage,
            otherLanguages,
            noOtherLanguage,
            phoneNumber,
            countryCode,
            country,
            telegramId,
            additionalInfo,
            localdoctor,
            recieveupdates: checkBoxChecked,

        });
        */
       navigation.navigate('AppNavigator');
      
    };
    const toggleCheckBox = () => {
        setCheckBoxChecked(!checkBoxChecked); // Toggle checkbox status
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>{'<--'}</Text>
                    </TouchableOpacity>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: '70%' }]} />
                    </View>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Complete the registration</Text>
                    <Text style={styles.subheaderText}>
                        Add information about yourself that will be linked to
                        {'\n'}
                        patientemail@gmail.com
                    </Text>
                    <Text style={styles.requiredFieldsText}>All fields with * are mandatory</Text>
                </View>
                <Text style={styles.sectionHeading}>Additional Information</Text>
                <TextInput
                    style={styles.textArea}
                    multiline={true}
                    numberOfLines={5}
                    placeholder="Enter additional information here..."
                    value={additionalInfo}
                    onChangeText={(text) => setAdditionalInfo(text)}
                />
                 <View style={styles.doctorSection}>
                 <Text style={styles.doctorText}>Local doctor</Text>
                <TextInput
                    style={styles.doctorName}
                    value={localdoctor}
                    onChangeText={setLocalDoctor}
                    placeholder="Enter the name of the local doctor"
                    placeholderTextColor="#999"
                />
                </View>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity style={styles.checkboxSection} onPress={toggleCheckBox}>
                        <View style={[styles.checkbox, checkBoxChecked && styles.checkedCheckbox]} />
                        <Text style={styles.checkboxText}>
                            I want to receive instructions for downloading files (analyses, X-ray, CT, MRI, ultrasound, etc.) by mail.
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSubmit} >
                        <Text style={styles.saveButtonText}>Save the information</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backButton: {
marginBottom: 16,   },
    backButtonText: {
        fontSize: 16,
        color: '#015ABE',
    },
    progressBarContainer: {
        flex: 1,
        marginLeft: 16,
        height: 3,
        backgroundColor: '#EAEAEA',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FFD700',
    },
    header: {
        marginBottom: 24,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subheaderText: {
        fontSize: 16,
        marginBottom: 8,
    },
    requiredFieldsText: {
        fontSize: 14,
        color: '#898B8E',
    },
    sectionHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        minHeight: 100,
    },
    doctorSection: {
        marginBottom: 16,
    },
    doctorText: {
        fontSize: 16,
        marginBottom: 8,
    },
    doctorName: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 4,
        marginRight: 12,
    },
    checkedCheckbox: {
        backgroundColor: '#007AFF', // Blue color
        borderColor: '#007AFF',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    checkboxSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxText: {
        fontSize: 16,
        flex: 1,
    },
  
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    saveButton: {
        backgroundColor: '#015ABE',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FinalPage;
