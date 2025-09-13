import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import styles from './styles'; // Import the styles defined in styles.js
import { useTranslation } from 'react-i18next';

export default function SpecialDatesModal({ visible, specialDates, onClose, onAddDate, onDeleteDate, onEditDate }) {
  const [dateName, setDateName] = useState('');
  const [dateDescription, setDateDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [selectedDate, setSelectedDate] = useState(null);
  const {t} = useTranslation();

  const handleAddDate = () => {
    if (!dateName || !dateDescription) {
      // Check if dateName or dateDescription is empty
      Alert.alert(t('errorTitle'), t('errorMessage'));
    } else {
      if (editingIndex === -1) {
        onAddDate(dateName, dateDescription);
      } else {
        onEditDate(editingIndex, dateName, dateDescription);
        setEditingIndex(-1);
      }
      setDateName('');
      setDateDescription('');
    }
  };


  const handleEditDate = (index) => {
    const dateToEdit = specialDates[index];
    setDateName(dateToEdit.name);
    setDateDescription(dateToEdit.description);
    setEditingIndex(index);

    // Ask for confirmation before editing
    Alert.alert(
      t('confirmEditTitle'),
      t('confirmEditMessage'),
      [
        {
          text: t(confirmEditCancel),
          onPress: () => {
            setEditingIndex(-1); // Clear editing state
          },
          style: 'cancel',
        },
        {
          text: t(confirmEditButton),
          onPress: () => {
            // Edit the special date
            handleAddDate();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteDate = (index) => {
    // Ask for confirmation before deleting
    Alert.alert(
      t('confirmDeleteTitle'),
      t('confirmDeleteMessage'),
      [
        {
          text: t('confirmDeleteCancel'),
          style: 'cancel',
        },
        {
          text: t('confirmDeleteButton'),
          onPress: () => {
            onDeleteDate(index);
            if (editingIndex === index) {
              setEditingIndex(-1); // Clear editing state if the deleted date was being edited
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {editingIndex === -1 ? t('addEventDate') : t('editEventDate')}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={t('enterDateName')}
            onChangeText={(text) => setDateName(text)}
            value={dateName}
          />
          <TextInput
            style={styles.input}
            placeholder={t('enterDateDescription')}
            onChangeText={(text) => setDateDescription(text)}
            value={dateDescription}
          />
          <TouchableOpacity onPress={handleAddDate} style={styles.addButton}>
            <Text style={styles.addButtonLabel}>
              {editingIndex === -1 ? t('addDate') : t('saveChanges')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>{t('eventDates')}</Text>
          <View style={styles.dateList}>
            {specialDates.map((date, index) => (
              <View key={index} style={styles.dateItem}>
                <ScrollView horizontal={true} style={styles.dateTextContainer}>
                  <Text style={styles.dateText}>
                    <Text style={styles.dateName}>{date.name}</Text>{' '}
                    <Text style={styles.dateDescription}>{date.description}</Text>
                  </Text>
                </ScrollView>
                <TouchableOpacity onPress={() => handleEditDate(index)} style={styles.editButton}>
                  <Text style={styles.editButtonText}>{t('edit')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteDate(index)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>{t('delete')}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>{t('Close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}