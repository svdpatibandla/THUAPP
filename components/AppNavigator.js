// AppNavigator.js
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import AppointmentsPage from './AppointmentsPage';
import AccountPage from './AccountPage';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {

  const translations = useSelector(state => state.auth.translations);
  AppointmentsTitle = translations?.message_appointments;
  AccountTitle = translations?.message_profile;
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          marginBottom: 16,
          color: '#363636',
          fontSize: 16,
          fontFamily: 'Source Sans Pro',
          fontWeight: '600',
          lineHeight: 16,
          letterSpacing: 0.50,
        },
        tabBarStyle: [
          {
            display: 'flex',
            height: 80,
            backgroundColor: '#ffffff',
            paddingTop: 1,
            paddingBottom: 10,
            paddingLeft: 8,
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name= {AppointmentsTitle}
        component={AppointmentsPage}
        options={{
          tabBarLabel: translations?.message_appointments,
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../assets/Appointments_Icon.png')}
              style={
                { 
                  width: 24, 
                  height: 24,
                  marginTop: 4,
                  marginBottom: 4,
                  marginLeft: 4,
                }
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={AccountTitle}
        component={AccountPage}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../assets/Account_Icon.png')}
              style={
                { 
                  width: 24, 
                  height: 24,
                  marginTop: 4,
                  marginBottom: 4,
                  marginLeft: 4,
                }
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;