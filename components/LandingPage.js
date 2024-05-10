import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth0 } from 'react-native-auth0';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setToken, clearUser, fetchTranslations } from '../redux/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LandingPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { authorize, clearSession, getCredentials, error, isLoading, user } = useAuth0();
  const loggedIn = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchTranslations());
  }, [dispatch]);


  useEffect(() => {
    if (user) {
      dispatch(setUser(user)); 
    }
  }, [user, dispatch]);


const onLogin = async (userType) => {
  try {
    console.log(`Attempting to log in as ${userType} user...`);
    await authorize({}, {});

    console.log('Logged in successfully!');
    const credentials = await getCredentials();
    const idToken = credentials?.idToken;

    console.log('ID Token:', idToken);

    AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
    dispatch(setToken(credentials));

    if (userType === 'New') {
      if (credentials) {
        navigation.navigate('LanguageSelection');
      }
    } else if (userType === 'existing') {
      if (credentials) {
        navigation.navigate('AppNavigator');
      }
    }
  } catch (e) {
    console.error('Login Error:', e);
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
