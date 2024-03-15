import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth0Provider } from 'react-native-auth0';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
// Import your components
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './components/auth0-configuration';

// Import screens
import LandingPage from './components/LandingPage';
import NewPatientForm from './components/NewPatientForm';
import AppNavigator from './components/AppNavigator';
import AccountPage from './components/AccountPage';
import AvailableAppointments from './components/AvailableAppointments';
import MentalContent from './components/MentalContentPage';
import PlanPage from './components/PlanPage';

const Stack = createStackNavigator();

// Logged-in user navigator
const LoggedInNavigator = () => (
  <Stack.Navigator initialRouteName="AppNavigator" screenOptions={{ headerShown: true }}>
    <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ title: 'My Appointments', headerLeft: null, headerTitleAlign: 'center' }} />
    <Stack.Screen name="Account" component={AccountPage} />
    <Stack.Screen name="MentalContent" component={MentalContent} />
    <Stack.Screen name="PlanPage" component={PlanPage} />
    <Stack.Screen name="AvailableAppointments" component={AvailableAppointments} />
    <Stack.Screen name="LandingPage" component={LandingPage} />
    <Stack.Screen name="NewPatientForm" component={NewPatientForm} />
  </Stack.Navigator>
);

// Guest user navigator
const GuestNavigator = () => (
  <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LandingPage" component={LandingPage} />
    <Stack.Screen name="NewPatientForm" component={NewPatientForm} screenOptions={{ headerShown: true }} />
    <Stack.Screen name="AppNavigator" component={AppNavigator} />
  </Stack.Navigator>
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedIn, setLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log('Data at app:', data);
    setLoggedIn(data === 'true'); // Assuming 'isLoggedIn' is stored as a string
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
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
