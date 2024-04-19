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

const Stack = createStackNavigator();

const LoggedInNavigator = () => (
  <Stack.Navigator initialRouteName="AppNavigator" screenOptions={{ headerShown: true }}>
    <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ title: 'My Appointments', headerLeft: null, headerTitleAlign: 'center', headerShown: false }} />
    <Stack.Screen name="Account" component={AccountPage} />
    <Stack.Screen name="MentalContent" component={MentalContent} />
    <Stack.Screen name="PlanPage" component={PlanPage} />
    <Stack.Screen name="LandingPage" component={LandingPage} />
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
  </Stack.Navigator>
);

const GuestNavigator = () => (
  <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LandingPage" component={LandingPage} />
    <Stack.Screen name="NewPatientForm" component={NewPatientForm} screenOptions={{ headerShown: true }} />
    <Stack.Screen name="AppNavigator" component={AppNavigator} />
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