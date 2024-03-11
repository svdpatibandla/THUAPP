import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import LandingPage from './components/LandingPage';
import config from './components/auth0-configuration';
import NewPatientForm from './components/NewPatientForm';
import AppNavigator from './components/AppNavigator';
import AccountPage from './components/AccountPage';
import { useSelector } from 'react-redux';
import AvailableAppointments from './components/AvailableAppointments';
import MentalContent from './components/MentalContentPage';
import PlanPage from './components/PlanPage';
import AppointmentsPage from './components/AppointmentsPage';


const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { user } = useAuth0();
  const user_state = useSelector(state => state.auth.user)
  console.log('user state: ',user_state);
  useEffect(() => {
    if (user) {
      console.log('User is logged in, navigating to AppNavigator');
    } else {
      console.log('User is not logged in, staying at LandingPage');
    }
  }, [user]);

  console.log('user at app:', user);
  console.log('App component is rendered');

  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: true }}>

            <Stack.Screen name="AppNavigator" 
              component={AppNavigator} 
              options={{
                title: 'My Appointments',
                headerLeft: null,
                headerTitleAlign: 'center'
              }}/>

            <Stack.Screen name="LandingPage" 
              component={LandingPage} 
              screenOptions={{ 
                headerShown: false 
              }}/>

            <Stack.Screen name="NewPatientForm" 
              component={NewPatientForm} 
              screenOptions={{ headerShown: true }}/>

            <Stack.Screen name="Account" 
              component={AccountPage} />

            <Stack.Screen name="MentalContent" 
              component={MentalContent} />

            <Stack.Screen name="PlanPage" 
              component={PlanPage} />

            <Stack.Screen name="AvailableAppointments" 
              component={AvailableAppointments} />
          </Stack.Navigator>
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