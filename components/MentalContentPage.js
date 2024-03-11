import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { AvailableAppointments } from './AvailableAppointments';
import { useNavigation } from '@react-navigation/native';

const MentalHealthItems = [
    { id: '1', title: 'Adult Psychologist', description: "Description 1" },
    { id: '2', title: 'Adult Talk Therapy', description: "Description 2" },
    { id: '3', title: 'Adult Psychiatrist', description: "Description 3" },
    { id: '4', title: 'Child Talk Therapy', description: "Description 4" },
];

const MentalContent = () => {

  const navigation = useNavigation();
  const handlePress = (item) => {
    navigation.navigate('AvailableAppointments', {
      selectedItemTitle: item.title,
      selectedItemDescription: item.description
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.itemContainer}>
      <View style={styles.column}>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
      <View style={styles.rowcontainer}>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <Image source={require('../assets/arrow.png')} style={styles.itemImage} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {MentalHealthItems.map(item => (
        <View key={item.id} style={styles.item}>
          {renderItem({item})}
        </View>
      ))}
    </View>
  );
};

const itemHeight = 150;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
  },
  itemContainer: {
    height: itemHeight,
    padding: 10,
  },
  rowcontainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10, 
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemImage: {
    width: 24,
    height: 24,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
  },
  column: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 2
  },
});

export default MentalContent;
