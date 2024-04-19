import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import jsonData from '../avail_appointments.json';

const SlotSelection = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  useEffect(() => {
    console.log("Component rendered!");
  }, []);

  const navigateToNewPage = (practitioner, timeSlot) => {
    navigation.navigate('SelectPractitioner');
  };
  
  const todayDate = new Date().toISOString().split('T')[0];
  const groupedSlotsByPractitioner = () => {
    const groupedSlots = {};
  
    jsonData.data.forEach(item => {
      item['Mental Cliniko Account'].services.forEach(service => {
        service.practitioners.forEach(practitioner => {
          const practitionerId = practitioner.cliniko_practitioner_id;
          const practitionerName = practitioner.name.toLowerCase();
  
          if (!groupedSlots[practitionerId]) {
            groupedSlots[practitionerId] = {
              name: practitionerName,
              slots: [],
              todayAppointments: [],
              details: practitioner
            };
          }
  
          if (service.slots && service.slots.all_slots) {
            Object.entries(service.slots.all_slots).forEach(([date, slots]) => {
              slots.forEach(slot => {
                const [datePart, timePart] = slot.time.split(' ');
                const [hour, minute, second] = timePart.split(':');
                groupedSlots[practitionerId].slots.push({
                    date: datePart,
                    time: `${hour}:${minute}`, 
                    language: slot.language,
                    appointment: item 
                });
            
                if (date === todayDate) {
                    groupedSlots[practitionerId].todayAppointments.push({
                        date: datePart,
                        time: `${hour}:${minute}`, 
                        language: slot.language,
                        appointment: item 
                    });
                  }
              });
            });
          }
        });
      });
    });
  
    Object.keys(groupedSlots).forEach(practitionerId => {
      groupedSlots[practitionerId].slots.sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time);
        }
        return a.date.localeCompare(b.date);
      });
      groupedSlots[practitionerId].todayAppointments.sort((a, b) => a.time.localeCompare(b.time));
    });
  
    console.log("Grouped slots:", groupedSlots); // Log groupedSlots here
    return groupedSlots;
  };
  const groupedSlots = groupedSlotsByPractitioner();

  const renderTimeSlots = (practitioner, slots) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.timeSlotsContainer}>
        {slots.map((slot, index) => {
          if (slot.language === selectedLanguage) {
            return (
              <TouchableOpacity key={index} style={styles.timeSlot} onPress={() => handleTimeSlotPress(practitioner, slot)}>
                <Text style={styles.timeText}>{slot.time}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </ScrollView>
  );

  const renderDateItems = () => {
    return dates.map((date, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.dateItem,
          selectedDateIndex === index && styles.selectedDateItem,
        ]}
        onPress={() => handleDatePress(index)}
      >
        <Text style={[styles.dateText, selectedDateIndex === index && styles.selectedDateText]}>{date}</Text>
      </TouchableOpacity>
    ));
  };

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    if (i === 0) {
      dates.push('Today');
    } else {
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      dates.push(formattedDate);
    }
  }

  const handleBack = () => {
    navigation.goBack(); 
  };

  const handleClose = () => {
    navigation.navigate('AppNavigator'); 
  };

  const handleSearch = () => {
    const results = dates.filter(date => date.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(results);
  };

  const handleDatePress = (index) => {
    setSelectedDateIndex(index);
  };

  useEffect(() => {
    handleDatePress(0); 
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const renderPractitionerAppointments = (practitionerId) => {
    const selectedDate = dates[selectedDateIndex];
    const practitioner = groupedSlots[practitionerId];
    console.log(selectedDate);
    const filteredAppointments = practitioner.slots.filter(slot => slot.date === selectedDate);
    console.log("Filtered Appointments for practitionerId", practitionerId, ":", filteredAppointments);
    
    return (
      <View key={practitionerId} style={styles.practitionerBlock}>
        <Text style={styles.practitionerName}>{practitioner.name}</Text>
        <View style={styles.practitionerDetails}>
          <Text>{`${practitioner.details.specialization}`}</Text>
          <Text>{`Practitioner speaks ${practitioner.details.first_lang_id}`}</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.appointmentList}>
        <Text style={styles.appointmentHeader}>Appointments on {selectedDate}:</Text>
          {filteredAppointments.length > 0 ? (
            renderTimeSlots(practitioner.details, filteredAppointments)
          ) : (
            <Text>No appointments on {selectedDate}</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => navigateToNewPage(practitioner.details)} style={styles.viewMoreButton}>
          <Text style={styles.viewMoreText}>View All Times</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.iconContainer}>
            <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
          </TouchableOpacity>
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search for Health Type"
              textAlign='center'
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch} 
            />
            <Image source={require('../../assets/search.png')} style={[styles.icon, styles.searchIcon]} />
            <Image source={require('../../assets/mic.png')} style={[styles.icon, styles.micIcon]} />
          </View>
          <TouchableOpacity onPress={handleClose} style={styles.iconContainer}>
            <Image source={require('../../assets/cancel.png')} style={styles.headerImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <Text style={styles.resultsText}>{searchResults.length} results found.</Text>
          <TouchableOpacity style={styles.filtersButton}>
            <Text style={styles.filtersButtonText}>Filters</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datesContainer}>
          {renderDateItems()}
        </ScrollView>
      </View>

      {/* Practitioner Appointments */}
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        {Object.keys(groupedSlots).map(practitionerId => (
          renderPractitionerAppointments(practitionerId)
        ))}
      </ScrollView>   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
  },
  iconContainer: {
    padding: 5,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dfdfdf',
  },
  icon: {
    width: 20,
    height: 20,
  },
  searchIcon: {
    marginRight: 5,
  },
  micIcon: {
    marginLeft: 5,
  },
  headerImage: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  datesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 14,
  },
  dateItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 0, // Remove the border
    borderBottomWidth: 1,
    borderBottomColor: 'transparent', // Initially transparent
  },
  selectedDateItem: {
    borderBottomColor: '#3269bd', // Blue color for selected item
  },
  selectedDateText: {
    color: '#3269bd', // Change text color to blue
  },
  resultsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filtersButton: {
    backgroundColor: '#3269bd',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  filtersButtonText: {
    color: 'white',
    fontSize: 14,
  },
  bodyContainer: {
    backgroundColor: '#f8f8f8',
  },
  practitionerBlock: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dfdfdf',
  },
  practitionerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  practitionerDetails: {
    marginBottom: 10,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  appointmentList: {
    marginBottom: 10,
  },
  appointmentHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSlot: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  timeText: {
    fontSize: 14,
  },
  viewMoreButton: {
    backgroundColor: '#3269bd',
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  viewMoreText: {
    color: 'white',
    fontSize: 14,
  },
  line: {
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default SlotSelection;
