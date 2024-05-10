import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DataPrintPage = ({ route }) => {
    const navigation = useNavigation();
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
        telegramId,
        additionalInfo,
        localdoctor,
        recieveupdates,
    } = route.params;
    console.log(otherLanguages);
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Data Received from FinalPage</Text>
            <Text>Name: {name}</Text>
            <Text>Surname: {surname}</Text>
            <Text>Birth Year: {birthYear}</Text>
            <Text>Gender: {gender}</Text>
            <Text>Selected Language: {selectedLanguage}</Text>
            <Text>Primary Language: {primaryLanguage}</Text>
            <Text>Other Languages: {otherLanguages}</Text>
            <Text>No Other Language: {noOtherLanguage ? 'Yes' : 'No'}</Text>
            <Text>Selected Options: {selectedOptions}</Text>
            <Text>Phone Number: {phoneNumber}</Text>
            <Text>Country Code: {countryCode}</Text>
            <Text>Country: {country}</Text>
            <Text>Telegram ID: {telegramId}</Text>
            <Text>Additional Info: {additionalInfo}</Text>
            <Text>Local Doctor: {localdoctor}</Text>
            <Text>Receive Updates: {recieveupdates ? 'Yes' : 'No'}</Text>
            <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                <Text style={styles.goBackButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    goBackButton: {
        backgroundColor: '#015ABE',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    goBackButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DataPrintPage;
