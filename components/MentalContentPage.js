// MentalContentPage.js
import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet, Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const MentalHealthItems = [
    { id: '1', title: 'Adult Psychologist', screen: 'Item1Screen', image: require('../assets/arrow.png'), description: "" },
    { id: '2', title: 'Adult Talk Therapy', screen: 'Item2Screen', image: require('../assets/arrow.png'), description: "" },
    { id: '3', title: 'Adult Psychiatrist', screen: 'Item1Screen', image: require('../assets/arrow.png'), description: "" },
    { id: '4', title: 'Child Talk Therapy', screen: 'Item2Screen', image: require('../assets/arrow.png'), description: "" },
  ];
  
const MentalHealthStack = createStackNavigator();

const ItemStackScreen = () => (
<MentalHealthStack.Navigator>
    <ItemStack.Screen name="Item1Screen" component={Item1Screen} />
    <ItemStack.Screen name="Item2Screen" component={Item2Screen} />
</MentalHealthStack.Navigator>
);

const MentalContent = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.additionalInfoContainer}>
            <Text>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MentalHealthItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
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
  additionalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 24,
    height: 24,
  },
  column: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default MentalContent;
