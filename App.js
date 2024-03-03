import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import Login from './components/LoginPage';
import LandingPage from './components/LandingPage';
import NewPatientForm from './components/NewPatientForm';
import AppNavigator from './components/AppNavigator';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import AccountScreen from './components/AccountScreen';

const Stack = createStackNavigator();

const auth0Config = {
  domain: 'dev-8tjrasnlq302ey51.us.auth0.com',
  clientId: 'SV2DsWEvZd86DWrtKv3VJHNFywPuXn7W',
};


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { user } = useAuth0(); // Retrieve user information using useAuth0

  console.log('App component is rendered');
  return (
    <Auth0Provider domain={auth0Config.domain} clientId={auth0Config.clientId} >
      <SafeAreaView style={styles.root}>
        {console.log('SafeAreaView is rendered')}
        
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        {console.log('AuthContextProvider is wrapped around the NavigationContainer')}
        
          <NavigationContainer>
            {console.log('Stack Navigator is rendered')}
            <Stack.Navigator initialRouteName={user ? "AppNavigator" : "Login"}  screenOptions={{ headerShown: true }}>
              <Stack.Screen name="AppNavigator" component={AppNavigator}  screenOptions={{ headerShown: true }}/>
              <Stack.Screen name="LandingPage" component={LandingPage}  screenOptions={{ headerShown: false }}/>
              <Stack.Screen name="NewPatientForm" component={NewPatientForm} screenOptions={{ headerShown: true }}/>
              <Stack.Screen name="Loading" component={LoadingScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="Login" component={Login}  screenOptions={{ headerShown: false }}/>
              <Stack.Screen name="Account" component={AccountScreen} />
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