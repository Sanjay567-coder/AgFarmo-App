import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Lightbox from 'react-native-lightbox';
import { useTranslation } from 'react-i18next';

const BuyCropsScreen = () => {
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
      const q = query(collection(db, 'sellCrops'));
      const querySnapshot = await getDocs(q);
      const postData = [];
      querySnapshot.forEach((doc) => {
        postData.push({ id: doc.id, ...doc.data() });
      });
      setData(postData);
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

    Linking.canOpenURL(whatsappURL)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappURL);
        } else {
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
          <Icon name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleText}>
          <Icon name="leaf" size={30} color="green" />{t('title2')}
        </Text>
      </View>
      <Text style={styles.note}>{t('note')}</Text>
      <ScrollView>
        {data.map((post) => (
          <TouchableOpacity key={post.id} onPress={() => toggleModal(post)}>
            <View style={styles.postContainer}>
              <Lightbox>
                {post.selectedImage ? (
                  <Image source={{ uri: post.selectedImage }} style={styles.image} />
                ) : (
                  <View style={styles.noImageContainer}>
                    <Icon name="image" size={60} color="red" />
                    <Text style={styles.noImageText}>{t('noImageAvailable')}</Text>
                  </View>
                )}
              </Lightbox>
              <View style={styles.infoContainer}>
                <Text style={styles.postName}>{post.productName}</Text>
                <Text style={styles.totalPrice}>
                  <Icon name="money" size={16} color="green" /> {t('price')}: {post.totalAmount} {t('INR')}
                </Text>
                <Text style={styles.contactMobile}>
                  <Icon name="phone" size={16} color="blue" /> {t('contact')}: {post.contactMobile}
                </Text>
                <Text style={styles.location}>
                  <Icon name="map-marker" size={16} color="gray" /> {t('location')}: {post.district}, {post.selectState}
                </Text>
                <Text style={styles.detailText}>
                  <Icon name="info" size={20} color="green" /> {t('productDescription')}: {post.productDescription}
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => handleCall(post.contactMobile)}
                  >
                    <Icon name="phone" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.whatsAppButton}
                    onPress={() => handleWhatsApp(post.contactMobile)}
                  >
                    <Icon name="whatsapp" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal isVisible={isModalVisible}>
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
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Icon name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <ScrollView style={styles.detailContainer}>
            <Text style={styles.modalTitle}>{selectedItem?.productName}</Text>
            <Text style={styles.modalText}>
              <Icon name="money" size={20} color="green" /> {t('pricePerKg')} {selectedItem?.pricePerKg} {t('INR')}
            </Text>
            <Text style={styles.modalText}>
              <Icon name="balance-scale" size={20} color="green" /> {t('productQuantity')} {selectedItem?.productQuantity} {t('kg')}
            </Text>
            <Text style={styles.modalText}>
              <Icon name="info" size={20} color="green" /> {t('productDescription')} {selectedItem?.productDescription}
            </Text>
            <Text style={styles.modalText}>
              <Icon name="user" size={20} color="green" /> {t('contactName')}: {selectedItem?.contactName}
            </Text>
            <Text style={styles.modalText}>
              <Icon name="phone" size={20} color="green" /> {t('contactMobile')}: {selectedItem?.contactMobile}
            </Text>
            <Text style={styles.modalText}>
              <Icon name="map-marker" size={20} color="green" /> {t('address')}: {selectedItem?.contactAddress}
            </Text>
            <Text style={styles.modalText}>
              <Icon name="map-marker" size={20} color="green" /> {t('state')}: {selectedItem?.selectState}
            </Text>
            <Text style={styles.modalText}>
              <Icon name="map-marker" size={20} color="green" /> {t('district')}: {selectedItem?.district}
            </Text>
            <Text style={styles.modalText}>
              <Icon name="money" size={20} color="green" /> {t('totalAmount')}: {selectedItem?.totalAmount} {t("INR")}
            </Text>
          </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 16,
    marginBottom: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: '300',
  },
  postContainer: {
    flexDirection: 'row',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
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
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  postName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: 'green',
  },
  contactMobile: {
    color: 'blue',
  },
  location: {
    color: 'gray',
  },
  detailText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  callButton: {
    backgroundColor: '#15B2F7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsAppButton: {
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 20,
    color: 'black',
  },
  detailContainer: {
    marginBottom: 16,
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
});

export default BuyCropsScreen;
