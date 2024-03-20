import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import jsonData from './avail_appointments.json';

const BookingPage = () => {
  console.log('JsonData: ', jsonData);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const todayDate = new Date().toISOString().split('T')[0];
  const groupedSlotsByPractitioner = () => {
    const groupedSlots = {};
  
    jsonData.data.forEach(item => {
      item['Mental Cliniko Account'].services.forEach(service => {
        service.practitioners.forEach(practitioner => {
          const practitionerId = practitioner.cliniko_practitioner_id;
          const practitionerName = practitioner.name.toLowerCase();
  
          if (!practitionerName.includes(searchQuery.toLowerCase())) {
            return;
          }
  
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
                    language: slot.language
                });
            
                if (date === todayDate) {
                    groupedSlots[practitionerId].todayAppointments.push({
                        date: datePart,
                        time: `${hour}:${minute}`, 
                        language: slot.language
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
  
    return groupedSlots;
  };
  

  const groupedSlots = groupedSlotsByPractitioner();

  const navigateToNewPage = practitioner => {
    navigation.navigate('PractitionerPage', { practitioner: practitioner });
  };

  const renderTableData = (slots) => {
    const tableData = [];
    const chunkSize = 4;

    for (let i = 0; i < slots.length; i += chunkSize) {
      tableData.push(slots.slice(i, i + chunkSize));
    }

    return tableData.map((row, index) => (
      <View key={index} style={styles.tableRow}>
        {row.map((slot, idx) => (
          <View key={idx} style={styles.tableCell}>
            <Text style={styles.timeText}>{slot.time}</Text>
          </View>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Practitioner"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      {Object.keys(groupedSlots).map(practitionerId => (
        <View key={practitionerId} style={styles.practitionerBlock}>
          <Text style={styles.practitionerName}>{groupedSlots[practitionerId].name}</Text>
          <View style={styles.practitionerDetails}>
            <Text style={styles.detailsTitle}>Practitioner Details:</Text>
            <Text>{`ID: ${groupedSlots[practitionerId].details.cliniko_practitioner_id}`}</Text>
            <Text>{`Specialization: ${groupedSlots[practitionerId].details.specialization}`}</Text>
            <Text>{`First Language: ${groupedSlots[practitionerId].details.first_lang_id}`}</Text>
            <Text>{`Second Language: ${groupedSlots[practitionerId].details.second_lang_id}`}</Text>
          </View>
          <View style={styles.appointmentList}>
            <Text style={styles.appointmentHeader}>Today's Appointments:</Text>
            {groupedSlots[practitionerId].todayAppointments.length > 0 ? (
              renderTableData(groupedSlots[practitionerId].todayAppointments)
            ) : (
              <Text>No appointments today</Text>
            )}
          </View>
          <TouchableOpacity onPress={() => navigateToNewPage(groupedSlots[practitionerId])} style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View All Times</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#2989F6', // Change border color to a blue shade
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8, // Add border radius for rounded corners
    fontSize: 16, // Increase font size
    color: '#333', // Change text color
  },
  practitionerBlock: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    borderColor: '#2989F6',
  },
  practitionerName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  practitionerDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  detailsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  appointmentList: {
    marginLeft: 10,
    marginBottom: 10,
  },
  appointmentHeader: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  viewMoreButton: {
    backgroundColor: '#2989F6',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  viewMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  tableCell: {
    flexBasis: '18%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 1, // Adjust padding to fit the time properly
    width: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignContent: 'center'
  },
  timeText: {
    fontSize: 16,
    alignContent: 'center'
  },
});

export default BookingPage;
