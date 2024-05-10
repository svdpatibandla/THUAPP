import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import AppointmentsPage from './AppointmentsPage';
import AccountPage from './AccountPage';

const Tab = createBottomTabNavigator();
const CustomTabIcon = ({ icon, focused }) => {
  const shadowStyle = {
    shadowColor: '#3269bd',
    shadowOffset: {
      width: 20,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  };

  return (
    <View style={[{ borderColor: focused ? '#363636' : 'transparent', borderWidth: 2, borderRadius: 16, paddingVertical: 4, paddingHorizontal: 20 }, focused && shadowStyle]}>
      <Image source={icon} style={{ width: 24, height: 24 }} />
    </View>
  );
};
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === 'Appointments') {
            icon = require('../assets/Appointments_Icon.png');
          } else if (route.name === 'Account') {
            icon = require('../assets/Account_Icon.png');
          }

          return <CustomTabIcon icon={icon} focused={focused} />;
        },
        tabBarLabelStyle: {
          marginBottom: 12,
          fontSize: 16,
          fontFamily: 'Source Sans Pro',
          fontWeight: '600',
          paddingTop: 5,
          lineHeight: 16,
          letterSpacing: 0.50,
          color: '#363636',
        },
        tabBarStyle: {
          display: 'flex',
          height: 80,
          backgroundColor: '#ffffff',
          paddingTop: 10, 
          paddingBottom: 5, 
          paddingLeft: 8,
        },
      })}
    >
      <Tab.Screen name="Appointments" component={AppointmentsPage} />
      <Tab.Screen name="Account" component={AccountPage} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
