import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import SpecialDatesModal from './SpecialDatesModal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { useTranslation } from 'react-i18next';

export default function CalendarScreen({ onEditDate }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
  const [specialDates, setSpecialDates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [inputText, setInputText] = useState('');
  const [descriptionText, setDescriptionText] = useState({ name: '', description: '', date: '' });
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const navigation = useNavigation();
  const {t} = useTranslation();

  useEffect(() => {
    loadSpecialDates();
  }, []);

  useEffect(() => {
    saveSpecialDates();
  }, [specialDates]);

  const loadSpecialDates = async () => {
    try {
      const storedDates = await AsyncStorage.getItem('specialDates');
      if (storedDates) {
        setSpecialDates(JSON.parse(storedDates));
      }
    } catch (error) {
      console.error('Error loading Event dates: ', error);
    }
  };

  const handleDateSelect = (day) => {
    const selectedDateString = day.dateString;
    setSelectedDate(selectedDateString);
    setMarkedDates({
      [selectedDateString]: { selected: true, selectedColor: 'blue' },
    });
  };

  const saveSpecialDates = async () => {
    try {
      await AsyncStorage.setItem('specialDates', JSON.stringify(specialDates));
    } catch (error) {
      console.error('Error saving Event dates: ', error);
    }
  };

  const addSpecialDate = (name, description) => {
    if (selectedDate && name) {
      const updatedSpecialDates = [...specialDates, { date: selectedDate, name, description }];
      setSpecialDates(updatedSpecialDates);
      setSelectedDate('');
      setInputText('');
    }
  };

  const deleteSpecialDate = (index) => {
    const updatedSpecialDates = [...specialDates];
    updatedSpecialDates.splice(index, 1);
    setSpecialDates(updatedSpecialDates);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const openDescriptionModal = (name, description, date) => {
    setDescriptionText({ name, description, date });
    setDescriptionModalVisible(true);
  };

  const closeDescriptionModal = () => {
    setDescriptionModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollableContent}>
        <Text style={[styles.title, { alignSelf: 'center' }]}>{t('Events Calendar')}</Text>
        <Calendar onDayPress={(day) => handleDateSelect(day)} markedDates={markedDates} />
        <Text style={styles.date}>{t('Selected Date')} {selectedDate}</Text>
        <Text style={styles.subtitle}>{t('Event Dates')}</Text>
        {specialDates.length === 0 ? (
          <Text style={styles.noEventsMessage}>{t('No events added')}</Text>
        ) : (
          specialDates.map((dateObj, index) => (
            <TouchableOpacity
              key={index}
              style={styles.specialDateContainer}
              onPress={() =>
                openDescriptionModal(dateObj.name, dateObj.description, dateObj.date)
              }
            >
              <Text style={styles.specialDateName}>
                {dateObj.name} ({dateObj.date})
              </Text>
              <FontAwesome name="info-circle" size={24} color="gray" />
            </TouchableOpacity>
          ))
        )}
        <SpecialDatesModal
          visible={modalVisible}
          specialDates={specialDates}
          onClose={toggleModal}
          onAddDate={addSpecialDate}
          onDeleteDate={deleteSpecialDate}
        />
      </ScrollView>
      <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>{t('Add / Edit')}</Text>
      </TouchableOpacity>
      <Modal visible={descriptionModalVisible} transparent={true} animationType="slide">
        <View style={styles.descriptionModalContainer}>
          <View style={styles.descriptionModal}>
            <Text style={styles.descriptionTitle}>{t('Event Description')}</Text>
            <Text style={styles.descriptionText}>
              {t('Name')} {descriptionText.name}
              {"\n"}
              {t('Date')} {descriptionText.date}
              {"\n"}
              {t('Description')} {descriptionText.description}
            </Text>
            <TouchableOpacity
              onPress={closeDescriptionModal}
              style={styles.closeDescriptionModalButton}
            >
              <Text style={styles.closeDescriptionModalButtonText}>{t('Close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    padding: 20,
  },
  backButton: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText3: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: 'darkgreen',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 6,
    fontWeight: 'bold',
  },
  specialDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  specialDateName: {
    fontSize: 16,
  },
  noEventsMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  scrollableContent: {
    flex: 1,
    marginBottom: 50, // Adjust this value to your desired spacing
  },
  descriptionModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  descriptionModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
  },
  closeDescriptionModalButton: {
    backgroundColor: 'darkgreen',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeDescriptionModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
