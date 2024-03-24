import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth0 } from 'react-native-auth0';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../redux/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'; // Import jwtDecode


const LandingPage = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { authorize, clearSession, getCredentials, error, isLoading, user } = useAuth0();
  const loggedIn = useSelector(state => state.auth.isAuthenticated);

  const onLogin = async (userType) => {

    if (user) {
      console.log('User is already logged in.');
      navigation.navigate('AppNavigator');
      return;
    }
    try {
      console.log(`Attempting to log in as ${userType} user...`);
      await authorize({}, {});

      console.log('Logged in successfully!');
      const credentials = await getCredentials();
      console.log(credentials);

      const user_id = credentials?.user_id;
      console.log('ID Token:', credentials?.idToken);
      console.log('User ID:', user_id);


      //AsyncStorage.setItem('@user_info', JSON.stringify({ name: userType, ...credentials }));
      AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
      dispatch(setUser({ name: userType, ...credentials }));

      if (userType === 'New') {
        if (credentials){
          navigation.navigate('NewPatientForm');
        }
        
      } else if (userType === 'existing') {
        if (credentials){
          navigation.navigate('AppNavigator');
        }
      }
    } catch (e) {
      console.error('Login Error:', e);
    }
  };

  const onLogout = async () => {
    console.log('Logging out...');
    try {
      await AsyncStorage.removeItem('@user_info');
      AsyncStorage.removeItem('isLoggedIn');
      await clearSession({ federated: false }); // Ensure parameters match your Auth0 setup requirements
      dispatch(clearUser());
      console.log('Logged out successfully!');
      navigation.navigate('LandingPage'); // Navigate to the landing page or another initial screen
    } catch (e) {
      console.error('Logout Error:', e);
      // Optionally, update the UI to show an error message
    }
  };
  

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={() => onLogin('New')}>
        <Text style={styles.text}>New Patient</Text>
        <Image source={require('../assets/arrow.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => onLogin('existing')}>
        <Text style={styles.text}>Existing Patient</Text>
        <Image source={require('../assets/arrow.png')} style={styles.image} />
      </TouchableOpacity>

      {error && <Text style={styles.error}></Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  error: {
    margin: 20,
    textAlign: 'center',
    color: '#D8000C',
  },
  box: {
    borderWidth: 2,
    borderColor: '#c8e1ff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    flex: 1,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default LandingPage;