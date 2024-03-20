import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { AvailableAppointments } from './BookingPage';
import { useNavigation } from '@react-navigation/native';

const MentalHealthItems = [
    { id: '1', title: 'Adult Psychologist', description: "Provides counseling and therapy for adults dealing with various mental health issues." },
    { id: '2', title: 'Adult Talk Therapy', description: "Offers talk therapy sessions for adults to discuss and address personal concerns and challenges." },
    { id: '3', title: 'Adult Psychiatrist', description: "Specializes in diagnosing and treating mental health disorders in adults through medication management and therapy." },
    { id: '4', title: 'Child Talk Therapy', description: "Provides child-friendly talk therapy sessions to help children express their feelings and cope with emotional difficulties." },  
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
