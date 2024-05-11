import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PatientLanguages = () => {

    const navigation = useNavigation();
    const translations = useSelector(state => state.auth.translations);

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleEdit = () => {
        navigation.navigate('PatientLanguage_Edit', { selectedLanguage });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
                </TouchableOpacity>
                <Text style={styles.headerText}>{translations.languages}</Text>
                <TouchableOpacity onPress={handleEdit}>
                    <Text style={styles.EditText}>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.ItemContainer}>
                    <Text style={styles.ItemTitle}>{translations.first_lang}</Text>
                    <Text style={styles.ItemValue}>Ukranian Language</Text>
                </View>
                <View style={styles.ItemContainer}>
                    <Text style={styles.ItemTitle}>{translations.other_lang}</Text>
                    <Text style={styles.ItemValue}>English Language</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fdfdfd',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 58,
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
      textAlign: 'center', 
      color: '#151515', 
      fontSize: 18, 
      fontFamily: 'Source Sans Pro', 
      fontWeight: '800', 
      lineHeight: 28,
    },
    EditText: {
      textAlign: 'right', 
      color: '#015ABE', 
      fontSize: 16, 
      fontFamily: 'Source Sans Pro', 
      fontWeight: '800', 
      lineHeight: 24, 
    },
    formContainer: {
        paddingLeft: 18,
        paddingTop: 10,
        marginTop: 10,
        backgroundColor: '#ffffff',
      },
      ItemContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 1,
      },
      ItemTitle: {
        color: '#696767',
        fontSize: 14,
        fontFamily: 'Source Sans Pro',
        fontWeight: '700',
        lineHeight: 20,
      },
      ItemValue: {
        color: '#363636',
        fontSize: 14,
        fontFamily: 'Source Sans Pro',
        fontWeight: '400',
        lineHeight: 24,
      },
});

export default PatientLanguages;
