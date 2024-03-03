// AppNavigator.js
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppointmentsPage from './AppointmentsPage';
import PlanPage from './PlanPage';
import AccountPage from './AccountPage';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Appointments"
        component={AppointmentsPage}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../assets/PlusSign.png')}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Book/Plan"
        component={PlanPage}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../assets/PlusSign.png')}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountPage}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../assets/PlusSign.png')}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;