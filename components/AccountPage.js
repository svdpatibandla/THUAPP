import React from 'react';
import { useAuth0 } from 'react-native-auth0';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../redux/actions/authActions';
import LandingPage from './LandingPage';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import{ clearSession } from 'react-native-auth0';

const AccountPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { authorize, clearSession, getCredentials, error, isLoading } = useAuth0();
  const loggedIn = useSelector(state => state.auth.isAuthenticated);

  const accountItems = [
    { id: '1', title: 'Patient', screen: 'Item1Screen', image: require('../assets/arrow.png') },
    { id: '2', title: 'Personal Info', screen: 'Item2Screen', image: require('../assets/arrow.png') },
    { id: '3', title: 'Documents/Files', screen: 'Item1Screen', image: require('../assets/arrow.png') },
    { id: '4', title: 'Settings(language, notifications)', screen: 'Item2Screen', image: require('../assets/arrow.png') },
    { id: '5', title: 'About us', url: 'https://telehelpukraine.com/who-we-are-0', image: require('../assets/arrow.png') },
    { id: '6', title: 'Contact us', url: 'https://telehelpukraine.com/contact-0', image: require('../assets/arrow.png') },
    { id: '7', title: 'Useful resource', url: 'https://telehelpukraine.com/patient-resources-0', image: require('../assets/arrow.png') },
    { id: '8', title: 'Logout', image: require('../assets/arrow.png') }, // Remove screen property for logout item
  ];


  const onLogout = async () => {
    console.log('Logging out...');
    try {
      await AsyncStorage.removeItem('@user_info');
      await AsyncStorage.removeItem('isLoggedIn');
      await clearSession({ federated: false }).then(() => {
        console.log('Logged out successfully!');
        dispatch(clearUser());
        navigation.navigate('LandingPage');
      }).catch((error) => {
        console.error('Logout failed', error);
      });
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        if (item.title === 'Logout') {
          onLogout();
        } else if (item.url) {
          Linking.openURL(item.url).catch((err) => console.error('An error occurred', err));
        } else {
          navigation.navigate(item.screen);
        }
      }}
    >
      <Text style={styles.itemText}>{item.title}</Text>
      <Image source={item.image} style={styles.itemImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={accountItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
  itemImage: {
    width: 24,
    height: 24,
  },
});

export default AccountPage;
