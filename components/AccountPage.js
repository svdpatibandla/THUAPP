import React from 'react';
import { useAuth0 } from 'react-native-auth0';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet, Linking } from 'react-native';

import LandingPage from './LandingPage';


const AccountPage = ({ navigation }) => {
  const { logout, clearSession } = useAuth0();

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
    await clearSession({}, {});
    console.log('Logged out successfully!');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        if (item.title === 'Logout') {
          onLogout(); // Call logout function from useAuth0 hook
          navigation.navigate(LandingPage);
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
