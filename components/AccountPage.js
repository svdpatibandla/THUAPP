import React from 'react';
import { useAuth0 } from 'react-native-auth0';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/actions/authActions';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountPage = () => {

  const user = useSelector(state => state.auth.user);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { clearSession} = useAuth0();

  const patientItems = {
    "Personal Info": "PersonalInfo",
    "Languages": "PatientLanguages",
    "Documents/Files": "PatientAttachments",
    "Past appointments": "PastAppointments",
    "App language": "Applanguage"
  };

  const thuItems = {
    "About us": "https://telehelpukraine.com/who-we-are-0",
    "Contact us": "https://telehelpukraine.com/contact-0",
    "Useful resources": "https://telehelpukraine.com/patient-resources-0",
    "Share THU": "https://drive.google.com/drive/u/1/folders/15z8SM3XZGyGhFe6sWKz5cgj-dyOAaZyV",
  };

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
  
  const navigateToPage = (pageName) => {
    if (pageName.startsWith('http')) {
      Linking.openURL(pageName);
    } else {
      console.log(`Navigating to ${pageName}`);
      navigation.navigate(pageName);
    }
  };

  const renderItems = (items) => {
    return Object.keys(items).map((item, index) => (
      <TouchableOpacity key={index} onPress={() => navigateToPage(items[item])} style={styles.containerItem}>
        <Text style={styles.itemsText}>{item}</Text>
        <Image source={require('../assets/chevron_left.png')} style={styles.arrowIcon} />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cabinet</Text>
      </View>
      <Text style={styles.titleText}>Psvdutt</Text>
      <View style={styles.patientContainer}>
        {renderItems(patientItems)}
      </View>
      <View style={styles.divider}></View>
      <View style={styles.patientContainer}>
        {renderItems(thuItems)}
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={onLogout} style={styles.logoutText}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
        <Text style={styles.logoutSubText}>Log out of your account to change your password</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomColor: '#dfdfdf',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'left',
    color: '#363636',
    fontFamily: 'Source Sans Pro',
    paddingHorizontal: 18,
  },
  titleText: {
    color: '#151515',
    fontSize: 17,
    fontFamily: "Source Sans Pro-SemiBold",
    fontWeight: '700',
    paddingVertical: 20,
    paddingHorizontal: 18,  
  },
  patientContainer: {
    backgroundColor: '#ffffff',
    paddingLeft: 18,
  },
  containerItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsText: { 
    color: '#151515',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 24,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    paddingVertical: 12,
    marginRight: 10,
  },
  divider: {
    height: 6,
    marginHorizontal: 18,
  },
  logoutContainer: {
    paddingHorizontal: 18,
    paddingTop: 60,
    flexDirection: 'column',
  },
  logoutText: {
    color: '#363636',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    textDecorationLine: 'underline',
    lineHeight: 24,
  },
  logoutSubText: {
    color: '#575757',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
    lineHeight: 24,
  }
});

export default AccountPage;