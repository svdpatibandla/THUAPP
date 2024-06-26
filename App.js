import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import LandingPage from './components/LandingPage';
import config from './components/auth0-configuration';
import NewPatientForm from './components/NewPatientForm';
import AppNavigator from './components/AppNavigator';
import AccountPage from './components/AccountPage';

import MentalContent from './temp/MentalContentPage';
import PlanPage from './temp/PlanPage';
import PractitionerPage from './components/PractitionerPage';
import AppointmentsPage from './components/AppointmentsPage';
import ConfirmAppointment from './components/ConfirmAppointment';
import PractitionerSelection from './components/BookingPages/PractitionerSelection';
import AgeGroupSelection from './components/BookingPages/AgeGroupSelection';
import HealthTypeSelection from './components/BookingPages/HealthTypeSelection';
import MentalIssueSelection from './components/BookingPages/MentalIssueSelection';
import MentalPractitionerSelection from './components/BookingPages/MentalPractitionerSelection';
import MedicalPractitionerSelection from './components/BookingPages/MedicalPractitionerSelection';
import SlotSelection from './components/BookingPages/SlotSelection';
import AppointmentDetails from './components/BookingPages/AppointmentDetails';
import BookAppointment from './components/BookingPages/BookAppointment';
import PersonalInfo from './components/AccountPages/PersonalInfo';
import PatientAttachments from './components/AccountPages/PatientAttachments';
import PersonalInfo_Edit from './components/AccountPages/PersonalInfo_Edit';
import PastAppointments from './components/AccountPages/PastAppointments';
import AdditionalGender from './components/RegistrationPages/AdditionalGender';
import DataPrintPage from './components/RegistrationPages/DataPrintPage';
import FinalPage from './components/RegistrationPages/FinalPage';
import LanguageSelection from './components/RegistrationPages/LanguageSelection';
import PersonalInfoSelection from './components/RegistrationPages/PersonalInfoSelection';
import ResidencePage  from './components/RegistrationPages/ResidencePage';
import SelectLangcont from './components/RegistrationPages/SelectLangcont';
import All_filters from './components/FilterPages/All_filters';
import Speciality_filters from './components/FilterPages/Speciality_filters';
import Search_focussed from './components/SearchPages/Search_focussed';
import Search_speciality from './components/SearchPages/Search_speciality';
import PatientLanguages from './components/AccountPages/PatientLanguages';
import PatientLanguage_Edit from './components/AccountPages/PatientLanguage_Edit';
import AppLanguage from './components/AccountPages/AppLanguage';

const Stack = createStackNavigator();

const LoggedInNavigator = () => (
  <Stack.Navigator initialRouteName="AppNavigator" screenOptions={{ headerShown: true }}>
    <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
    <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="AccountPage" component={AccountPage} options={{ headerShown: false }} />
    <Stack.Screen name="MentalContent" component={MentalContent} />
    <Stack.Screen name="PlanPage" component={PlanPage} />
    <Stack.Screen name="AppointmentsPage" component={AppointmentsPage} options={{ headerShown: false }} />
    <Stack.Screen name="PractitionerPage" component={PractitionerPage} />
    <Stack.Screen name="ConfirmAppointment" component={ConfirmAppointment} />
    <Stack.Screen name="PractitionerSelection" component={PractitionerSelection} options={{ headerShown: false}} />
    <Stack.Screen name="AgeGroupSelection" component={AgeGroupSelection} options={{ headerShown: false}} />
    <Stack.Screen name="HealthTypeSelection" component={HealthTypeSelection} options={{ headerShown: false}} />
    <Stack.Screen name="MentalIssueSelection" component={MentalIssueSelection} options={{ headerShown: false}} />
    <Stack.Screen name="MentalPractitionerSelection" component={MentalPractitionerSelection} options={{ headerShown: false}} />
    <Stack.Screen name="MedicalPractitionerSelection" component={MedicalPractitionerSelection} options={{ headerShown: false}} />
    <Stack.Screen name="SlotSelection" component={SlotSelection} options={{ headerShown: false}} />
    <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} options={{ headerShown: false}} />
    <Stack.Screen name="NewPatientForm" component={NewPatientForm} screenOptions={{ headerShown: true }} />
    <Stack.Screen name="BookAppointment" component={BookAppointment} options={{ headerShown: false }} />
    <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{ headerShown: false }} />
    <Stack.Screen name="PersonalInfo_Edit" component={PersonalInfo_Edit} options={{ headerShown: false }} />
    <Stack.Screen name="PatientAttachments" component={PatientAttachments} options={{ headerShown: false }} />
    <Stack.Screen name="PastAppointments" component={PastAppointments} options={{ headerShown: false }} />
    <Stack.Screen name="AdditionalGender" component={AdditionalGender} options={{ headerShown: false }} />
    <Stack.Screen name="DataPrintPage" component={DataPrintPage} options={{ headerShown: false }} />
    <Stack.Screen name="FinalPage" component={FinalPage} options={{ headerShown: false }} />
    <Stack.Screen name="LanguageSelection" component={LanguageSelection} options={{ headerShown: false }} />
    <Stack.Screen name="PersonalInfoSelection" component={PersonalInfoSelection} options={{ headerShown: false }} />
    <Stack.Screen name="ResidencePage" component={ResidencePage} options={{ headerShown: false }} />
    <Stack.Screen name="SelectLangcont" component={SelectLangcont} options={{ headerShown: false }} />
    <Stack.Screen name="All_filters" component={All_filters} options={{ headerShown: false }} />
    <Stack.Screen name="Speciality_filters" component={Speciality_filters} options={{ headerShown: false }} />
    <Stack.Screen name="Search_focussed" component={Search_focussed} options={{ headerShown: false }} />
    <Stack.Screen name="Search_speciality" component={Search_speciality} options={{ headerShown: false }} />
    <Stack.Screen name="PatientLanguages" component={PatientLanguages} options={{ headerShown: false }} />
    <Stack.Screen name="PatientLanguage_Edit" component={PatientLanguage_Edit} options={{ headerShown: false }} />
    <Stack.Screen name="AppLanguage" component={AppLanguage} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const GuestNavigator = () => (
  <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LandingPage" component={LandingPage}  screenOptions={{ headerShown: false }}/>
    <Stack.Screen name="NewPatientForm" component={NewPatientForm} screenOptions={{ headerShown: false }} />
    <Stack.Screen name="AppNavigator" component={AppNavigator}  screenOptions={{ headerShown: false }}/>
    <Stack.Screen name="LanguageSelection" component={LanguageSelection}  screenOptions={{ headerShown: false }}/>
  </Stack.Navigator>
);

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log('Data at app:', data);
    setLoggedIn(data === 'true'); 
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <SafeAreaView style={styles.root}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNavigator /> : <GuestNavigator />}
        </NavigationContainer>
      </SafeAreaView>
    </Auth0Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;