import React, { useState } from 'react';
import { View,TouchableOpacity, StyleSheet, Text, ScrollView} from 'react-native';
import CalenderScreen from './CalenderScreen'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [addedSpecialDates, setAddedSpecialDates] = useState([]);
  const navigation = useNavigation()

  const onEditDate = (selectedDate) => {
    // Implement your logic to edit or delete the selected date here
    // For this example, we'll add or remove the selected date from addedSpecialDates
    if (addedSpecialDates.includes(selectedDate)) {
      const updatedDates = addedSpecialDates.filter((date) => date !== selectedDate);
      setAddedSpecialDates(updatedDates);
    } else {
      setAddedSpecialDates([...addedSpecialDates, selectedDate]);
    }
  };

  const getCustomDateStyles = () => {
    const customStyles = {};
    addedSpecialDates.forEach((date) => {
      customStyles[date] = {
        container: {
          backgroundColor: 'green', // Background color of the marking
          borderRadius: 16, // Border radius for a circular marking
        },
        text: {
          color: 'white', // Text color
        },
      };
    });
    return customStyles;
  };

  // Function to generate markedDates object for CalendarScreen
  const getMarkedDates = () => {
    const markedDates = {};
    addedSpecialDates.forEach((date) => {
      // Use custom marking type with a symbol
      markedDates[date] = {
        customStyles: {
          container: {
            backgroundColor: 'green', // Background color of the marking
            borderRadius: 16, // Border radius for a circular marking
          },
          text: {
            color: 'white', // Text color
          },
        },
      };
    });
    return markedDates;
  };

  return (
    <View style={{color:'#FAF3E0', flex: 1, padding: 20, paddingTop: 40 , marginBottom:1}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={33} color="black" />
      </TouchableOpacity>
      <Text style={{ alignSelf:'center', fontWeight:'bold', fontSize:30}}>AgFarMo</Text>
      <CalenderScreen onEditDate={onEditDate} markedDates={getMarkedDates()}/>
  </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // Ensure the button is above other elements
    marginTop:30
  },
})