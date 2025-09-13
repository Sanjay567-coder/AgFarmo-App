import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { Image } from 'react-native';
import Lightbox from 'react-native-lightbox';
import { useTranslation } from 'react-i18next';

const RentEquipmentScreen = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const q = query(collection(db, 'rentEquipment'));
      const querySnapshot = await getDocs(q);
      const equipmentData = [];
      querySnapshot.forEach((doc) => {
        equipmentData.push({ id: doc.id, ...doc.data() });
      });
      setData(equipmentData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleModal = (item) => {
    setSelectedItem(item);
    setModalVisible(!isModalVisible);
  };

  const handleCall = (phoneNumber) => {
    const telURL = `tel:${phoneNumber}`;
    Linking.openURL(telURL)
      .then((supported) => {
        if (!supported) {
          alert(t('phoneCallErrorMessage'));
        }
      })
      .catch((error) => {
        console.error('Error making a phone call:', error);
      });
  };

  const handleWhatsApp = (phoneNumber) => {
    const message = t('message');
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${message}`;

    Linking.openURL(whatsappURL)
      .then((supported) => {
        if (!supported) {
          alert(t('whatsappErrorMessage'));
        }
      })
      .catch((error) => {
        console.error('Error opening WhatsApp:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 16 }}>
          <Icon name="arrow-left" size={30} color="navy" />
        </TouchableOpacity>
        <Text style={styles.titleText}>
          <Icon name="wrench" size={30} color="navy" /> {t('rentEquipment')}
        </Text>
      </View>
      <Text style={styles.note}>{t('note2')}</Text>
      {data.map((equipment) => (
        <TouchableOpacity key={equipment.id} onPress={() => toggleModal(equipment)}>
          <View style={styles.equipmentContainer}>
          {equipment.selectedImage ? (
              <Lightbox>
              <Image source={{ uri: equipment.selectedImage }} style={styles.image} />
              </Lightbox>
            ) : (
              <View style={styles.noImageContainer}>
                <Icon name="image" size={60} color="red" />
                <Text style={styles.noImageText}>{t('noImageAvailable')}</Text>
              </View>
            )}
            <View style={styles.leftContainer}>
              <Text style={styles.equipmentName}>{equipment.equipmentName}</Text>
              <Text style={styles.machineType}>
                <Icon name="cogs" size={16} color="navy" /> {t('machineType')}: {equipment.machineType}
              </Text>
              <Text style={styles.rentalRate}>
                <Icon name="money" size={16} color="navy" /> {t('rate')}: {equipment.rentalRate} {t("INR")}/{equipment.rentalType}
              </Text>
              <Text style={styles.contactMobile}>
                <Icon name="phone" size={16} color="navy" /> {('contact')}: {equipment.contactMobile}
              </Text>
              <Text style={styles.location}>
                <Icon name="map-marker" size={16} color="gray" /> {t('location')}: {equipment.district}, {equipment.selectState}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => handleCall(`tel:${equipment.contactMobile}`)}
              >
                <Icon name="phone" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.whatsAppButton}
                onPress={() => handleWhatsApp(equipment.contactMobile)}
              >
                <Icon name="whatsapp" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalContainer}>
          <Lightbox>
        {selectedItem?.selectedImage ? (
          <Image source={{ uri: selectedItem.selectedImage }} style={styles.modalImage} />
        ) : (
          <View style={styles.noImageContainerDes}>
            <Icon name="image" size={70} color="red" />
            <Text style={styles.noImageTextDes}>{t('noImageAvailable')}</Text>
          </View>
        )}
        </Lightbox>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Icon name="arrow-left" size={30} color="navy" />
              </TouchableOpacity>
              <View style={styles.modalHeader}>
              {selectedItem && (
              <Text style={styles.popupTitle}>
                {selectedItem.equipmentName}
              </Text>
              )}
            </View>
            {selectedItem && (
              <ScrollView style={styles.detailContainer}>
                <Text style={styles.detailText}>
                  <Icon name="cogs" size={20} color="navy" /> {t('machineType')}: {selectedItem.machineType}
                </Text>
                <Text style={styles.detailText}>
                  <Icon name="info" size={20} color="navy" /> {t('description')}: {selectedItem.productDescription}
                </Text>
                <Text style={styles.detailText}>
                  <Icon name="money" size={20} color="navy" /> {t('rate')}: {selectedItem.rentalRate} {t("INR")}/{selectedItem.rentalType}
                </Text>
                <Text style={styles.detailText}>
                  <Icon name="user" size={20} color="navy" /> {t('contactName')}: {selectedItem.contactName}
                </Text>
                <Text style={styles.detailText}>
                  <Icon name="phone" size={20} color="navy" /> {t('contactMobile')}: {selectedItem.contactMobile}
                </Text>
                <Text style={styles.detailText}>
                  <Icon name="map-marker" size={20} color="navy" /> {t('address')}: {selectedItem.contactAddress}
                </Text>
                <Text style={styles.detailText}>
                  <Icon name="map-marker" size={20} color="navy" /> {t('district')}: {selectedItem.district}
                </Text>
                <Text style={styles.detailText}>
                  <Icon name="map-marker" size={20} color="navy" /> {t('state')}: {selectedItem.selectState}
                </Text>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'navy',
  },
  note: {
    fontSize: 16,
    marginBottom: 16,
    fontStyle: 'italic',
    fontWeight: '300',
    textAlign: 'center',
  },
  equipmentContainer: {
    borderColor: 'navy',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  leftContainer: {
    flex: 1,
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  machineType: {
    color: 'navy',
  },
  rentalRate: {
    color: 'navy',
  },
  contactMobile: {
    color: 'navy',
  },
  location: {
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  callButton: {
    backgroundColor: '#15B2F7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  whatsAppButton: {
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  noImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    fontSize: 13,
    color: 'red',
    textAlign: 'center',
  },
  noImageContainerDes: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageTextDes: {
    fontSize: 13,
    color: 'red',
    textAlign: 'center',
  },
  modalCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  closeButton: {
    padding: 8,
    position: 'absolute',
    left: 16,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center',
  },
  detailContainer: {
    marginBottom: 16,
    padding: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default RentEquipmentScreen;
