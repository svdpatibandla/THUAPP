import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet, Linking, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import config from '../components/auth0-configuration';
import { useNavigation } from '@react-navigation/native';


const Item1Screen = () => <Text>Item 1 Details</Text>;
const Item2Screen = () => <Text>Item 2 Details</Text>;

const accountItems = [
  { id: '1', title: 'Patient', screen: 'Item1Screen', image: require('../assets/arrow.png') },
  { id: '2', title: 'Personal Info', screen: 'Item2Screen', image: require('../assets/arrow.png') },
  { id: '3', title: 'Documents/Files', screen: 'Item1Screen', image: require('../assets/arrow.png') },
  { id: '4', title: 'Settings(language, notifications)', screen: 'Item2Screen', image: require('../assets/arrow.png') },
  { id: '5', title: 'About us', url: 'https://telehelpukraine.com/who-we-are-0', image: require('../assets/arrow.png') },
  { id: '6', title: 'Contact us', url: 'https://telehelpukraine.com/contact-0', image: require('../assets/arrow.png') },
  { id: '7', title: 'Useful resource', url: 'https://telehelpukraine.com/patient-resources-0', image: require('../assets/arrow.png') },
  { id: '8', title: 'Logout', screen: 'Item1Screen', image: require('../assets/arrow.png')}
];

const AccountPage = () => {

  const navigation = useNavigation();
  const { authorize, clearSession, user, getCredentials, error, isLoading } = useAuth0();

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    console.log('Logging out...');
    await clearSession({}, {});
    console.log('Logged out successfully!');
    navigation.navigate('Login');
  };

  if (isLoading) {
    return <View style={styles.container}><Text>Loading</Text></View>;
  }

  if (loggedIn) {
    console.log('User Information:', user);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        if (item.url) {
          Linking.openURL(item.url).catch((err) => console.error('An error occurred', err));
        } else if (item.action === 'logout') {
          onLogout();
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


/*

if a practitioner is clicked, to go practitioner page
else continue selected, go to new page with same header and footer but content varies, asks for adult or child and click continue(one must be selected), if any selected(one must) go to new content now to select medical or mental to select, if medical show medical1, 2, 3 ...mental selected mental 1, 2, 3 .... if any selected show all the practitioners in that services, now how should I design my page

ChatGPT
To design your page with the described functionality, you'll need to implement navigation between screens and conditionally render different content based on user actions. Here's how you can structure your page:

Practitioner Selection Page:

Display a list of practitioners.
If a practitioner is clicked, navigate to the practitioner page.
If "Continue" is selected, navigate to the next page.
Selection Confirmation Page:

Display a message asking the user to select either adult or child.
Provide buttons for adult and child selection.
If any option is selected, navigate to the next page.
Medical or Mental Selection Page:

Display a message asking the user to select medical or mental services.
Provide buttons for medical and mental selection.
If any option is selected, navigate to the next page.
Practitioners List Page:

Display a list of practitioners based on the selected service (medical or mental).
Provide an option to go back to the previous selection page.
If a practitioner is clicked, navigate to the practitioner page.
Here's a basic structure of how you can implement these pages:

*/

export default AccountPage;