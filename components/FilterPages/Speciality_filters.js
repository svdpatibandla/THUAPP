import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Speciality_filters = () => {
    return (
        <View style={{ backgroundColor: "#ffffff" }}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Speciality Filters</Text>
        </View>
    
        <View style={styles.container}>
            <ScrollView>
            <Text>Here you will be able to see all the speciality filters available</Text>
            </ScrollView>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        padding: 10,
    },
});
export default Speciality_filters;

