//NewPatientForm.js

import React from 'react';
import { useSelector } from 'react-redux'; 
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';


const PersonalInfo = () => {

  const navigation = useNavigation();
  const translations = useSelector(state => state.auth.translations);

  const patientData = {
    first_name: "dutt",
    last_name: "patibandla",
    email: "psvdutt+test5@gmail.com",
    year_of_birth: 1998,
    gender: "Male",
    country: "Ukraine",
    phone_number: "+3806692209884",
    notes: `Test Notes`,
    telegram: "psvdutt",
    practitioner: "Dr. Prasanth",
    health_concerns: "concern-1",
  };

  const handleGoBack = () => {
    navigation.navigate('AppNavigator');
  };

  handleEdit = () => {
    navigation.navigate('PersonalInfo_Edit', { PersonalInfo: patientData});
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Personal Info</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.EditText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.ItemContainer}>
          <Text style={styles.ItemTitle}>{translations.first_name}</Text>
          <Text style={styles.ItemValue}>{patientData.first_name}</Text>
        </View>
        <View style={styles.ItemContainer}>
          <Text style={styles.ItemTitle}>{translations.last_name}</Text>
          <Text style={styles.ItemValue}>{patientData.last_name}</Text>
        </View>
        <View style={styles.ItemContainer}>
          <Text style={styles.ItemTitle}>{translations.yob}</Text>
          <Text>{patientData.year_of_birth}</Text>
        </View>
        <View style={styles.ItemContainer}>
          <Text style={styles.ItemTitle}>{translations.gender}</Text>
          <Text style={styles.ItemValue}>{patientData.gender}</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.ItemContainer}>
          <Text style={styles.ItemTitle}>{translations.country}</Text>
          <Text style={styles.ItemValue}>{patientData.country}</Text>
        </View>
        <View style={styles.ItemContainer}>
          <Text style={styles.ItemTitle}>{translations.email}</Text>
          <Text style={styles.ItemValue}>{patientData.email}</Text>
        </View>
        <View style={styles.ItemContainer}>
          <Text style={styles.ItemTitle}>{translations.mobile}</Text>
          <Text style={styles.ItemValue}>{patientData.phone_number}</Text>
        </View>
        <View style={styles.ItemContainer}>
          <Text style={styles.ItemTitle}>{translations.telegram}</Text>
          <Text style={styles.ItemValue}>{patientData.telegram}</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.ItemContainer}>
          <Text style={styles.ItemTitle}>{translations.add_info}</Text>
          <Text style={styles.ItemValue}>{patientData.notes}</Text>
        </View>
        <View style={styles.ItemContainer}>
          <Text style={styles.ItemTitle}>{translations.local_doc}</Text>
          <Text style={styles.ItemValue}>{patientData.practitioner}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default PersonalInfo;

