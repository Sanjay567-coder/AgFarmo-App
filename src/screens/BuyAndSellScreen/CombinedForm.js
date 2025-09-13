import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from './firebaseConfig'; // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { useTranslation } from 'react-i18next';

const CombinedFormDetails = () => {
  const [productType, setProductType] = useState('sell');
  const [productCategory, setProductCategory] = useState('plants');
  const [productName, setProductName] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [price, setPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [equipmentName, setEquipmentName] = useState('');
  const [machineType, setMachineType] = useState('1');
  const [productQuantity, setProductQuantity] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [rentalRate, setRentalRate] = useState('');
  const [rentalType, setRentalType] = useState('hour');
  const [selectState, setSelectState] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    loadDataFromStorage();
  }, []);

  const loadDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('combinedFormData');

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setFormState(parsedData);
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  const setFormState = (data) => {
    setProductType(data.productType);
    setProductCategory(data.productCategory);
    setProductName(data.productName);
    setPricePerKg(data.pricePerKg);
    setPrice(data.price);
    setProductDescription(data.productDescription);
    setEquipmentName(data.equipmentName);
    setMachineType(data.machineType);
    setProductQuantity(data.productQuantity);
    setContactName(data.contactName);
    setContactMobile(data.contactMobile);
    setContactAddress(data.contactAddress);
    setRentalRate(data.rentalRate);
    setRentalType(data.rentalType);
    setSelectState(data.selectState);
    setDistrict(data.district);
    setSelectedImage(data.selectedImage); // Set the selected image
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const saveDataToStorage = async () => {
    try {
      const dataToStore = {
        productType,
        productCategory,
        productName,
        pricePerKg,
        price,
        productDescription,
        equipmentName,
        machineType,
        productQuantity,
        contactName,
        contactMobile,
        contactAddress,
        rentalRate,
        rentalType,
        selectState,
        district,
        selectedImage, // Store the selected image
      };

      await AsyncStorage.setItem('combinedFormData', JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const handleSellButtonPress = async () => {
    if (
      (productType === 'sell' && productCategory === 'plants' && (!productName || !pricePerKg || !productQuantity )) ||
      (productType === 'sell' && productCategory === 'equipment' && (!equipmentName || !price || !productDescription))
    ) {
      Alert.alert(t('error'), t('fillInAllFields'));
      return;
    }

    if (!contactName || !contactMobile || !contactAddress || !selectState || !district) {
      Alert.alert(t('error'), t('contactLocationError'));
      return;
    }

    try {
      if (productType === 'sell' && productCategory === 'plants') {
        await addDoc(collection(db, 'sellCrops'), {
          productName,
          pricePerKg,
          productQuantity,
          productDescription,
          contactName,
          contactMobile,
          contactAddress,
          selectState,
          district,
          totalAmount: calculateTotalAmount(),
          selectedImage, // Add selected image to Firestore
        });
      } else if (productType === 'sell' && productCategory === 'equipment') {
        await addDoc(collection(db, 'sellEquipment'), {
          equipmentName,
          price,
          productDescription,
          contactName,
          contactMobile,
          contactAddress,
          selectState,
          district,
          selectedImage, // Add selected image to Firestore
        });
      }

      saveDataToStorage();
      clearFields();
      Alert.alert(t('success'), t('sellDataSaved'));
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
      Alert.alert(t('error'), t('savingError'));
    }
  };

  const handleRentButtonPress = async () => {
    if (
      !equipmentName ||
      !machineType ||
      !productDescription ||
      !rentalRate ||
      !rentalType ||
      !contactName ||
      !contactMobile ||
      !contactAddress ||
      !selectState ||
      !district
    ) {
      Alert.alert(t('error'), t('fillInAllFields'));
      return;
    }

    try {
      await addDoc(collection(db, 'rentEquipment'), {
        equipmentName,
        machineType,
        productDescription,
        rentalRate,
        rentalType,
        contactName,
        contactMobile,
        contactAddress,
        selectState,
        district,
        selectedImage, // Add selected image to Firestore
      });

      saveDataToStorage();
      clearFields();
      Alert.alert(t('error'), t('rentDataSaved'));
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
      Alert.alert(t('error'), t('savingError'));
    }
  };

  const clearFields = () => {
    setProductType('sell');
    setProductCategory('plants');
    setProductName('');
    setPricePerKg('');
    setPrice('');
    setProductDescription('');
    setEquipmentName('');
    setMachineType('1');
    setProductQuantity('');
    setContactName('');
    setContactMobile('');
    setContactAddress('');
    setRentalRate('');
    setRentalType('hour');
    setSelectState('');
    setDistrict('');
    setSelectedImage(null); // Reset the selected image
  };

  const calculateTotalAmount = () => {
    const quantity = parseFloat(productQuantity);
    const productPrice = productType === 'sell' ? parseFloat(pricePerKg) : parseFloat(price);
    if (!isNaN(quantity) && !isNaN(productPrice)) {
      return (quantity * productPrice).toFixed(2);
    }
    return '0.00';
  };

  const selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={33} color="black" />
        <Text style={styles.backText}>{t('back')}</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>{t('productDetails')}</Text>
      <Text>{t('typeOfProduct')}</Text>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={productType}
          onValueChange={(itemValue) => setProductType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label={t('Sell')} value="sell" />
          <Picker.Item label={t('rentEquipment')} value="rent" />
        </Picker>
      </View>

      {productType === 'sell' && (
        <>
          <Text>{t('productCategory')}</Text>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={productCategory}
              onValueChange={(itemValue) => setProductCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={t('crops')} value="plants" />
              <Picker.Item label={t('equipment')} value="equipment" />
            </Picker>
          </View>
        </>
      )}

      {productType === 'rent' && (
        <>
          <Text>{t('equipmentName')}</Text>
          <View style={styles.inputContainer}>
            <AntDesign name="tool" size={20} color="black" />
            <TextInput
              style={styles.input}
              value={equipmentName}
              onChangeText={(text) => setEquipmentName(text)}
            />
          </View>
          <Text>{t('equipmentType')}</Text>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={machineType}
              onValueChange={(itemValue) => setMachineType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={t('selectMachineType')} value="1" />
              <Picker.Item label={t('vehicle')} value="vehicle" />
              <Picker.Item label={t('farmEquipment')} value="farm" />
              <Picker.Item label={t('others')} value="others" />
            </Picker>
          </View>
        </>
      )}

      {productType === 'sell' && productCategory === 'plants' && (
        <>
          <Text>{t('productName')}</Text>
          <View style={styles.inputContainer}>
            <Icon name="leaf" size={20} color="green" />
            <TextInput
              style={styles.input}
              value={productName}
              onChangeText={(text) => setProductName(text)}
            />
          </View>

          <Text>{t('pricePerKg')}</Text>
          <View style={styles.inputContainer}>
            <Icon name="rupee" size={20} color="black" />
            <TextInput
              style={styles.input}
              value={pricePerKg}
              onChangeText={(text) => setPricePerKg(text)}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
        </>
      )}

      {productType === 'sell' && productCategory === 'equipment' && (
        <>
          <Text>{t('equipmentName')}</Text>
          <View style={styles.inputContainer}>
            <AntDesign name="tool" size={20} color="black" />
            <TextInput
              style={styles.input}
              value={equipmentName}
              onChangeText={(text) => setEquipmentName(text)}
            />
          </View>
          <Text>{t('price')}</Text>
          <View style={styles.inputContainer}>
            <Icon name="rupee" size={20} color="black" />
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
        </>
      )}

      <Text>{t('productDescription')}</Text>
      <View style={styles.inputContainer}>
        <Icon name="info-circle" size={20} color="blue" />
        <TextInput
          style={styles.input}
          value={productDescription}
          onChangeText={(text) => setProductDescription(text)}
          multiline
        />
      </View>

      {productType === 'sell' && productCategory === 'plants' && (
        <>
          <Text>{t('productQuantity')}</Text>
          <View style={styles.inputContainer}>
            <Icon name="balance-scale" size={20} color="gray" />
            <TextInput
              style={styles.input}
              value={productQuantity}
              onChangeText={(text) => setProductQuantity(text)}
              keyboardType="numeric"
            />
          </View>
        </>
      )}

      {productType === 'rent' && (
        <>
          <Text>{t('rentalRate')}</Text>
          <View style={styles.inputContainer}>
            <Icon name="rupee" size={20} color="black" />
            <TextInput
              style={styles.input}
              value={rentalRate}
              onChangeText={(text) => setRentalRate(text)}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>

          <Text>{t('rentalType')}</Text>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={rentalType}
              onValueChange={(itemValue) => setRentalType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={t('perHour')} value="hour" />
              <Picker.Item label={t('perDay')} value="day" />
              <Picker.Item label={t('perWeek')} value="week" />
            </Picker>
          </View>
        </>
      )}

      <Text>{t('contactName')}:</Text>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="purple" />
        <TextInput
          style={styles.input}
          value={contactName}
          onChangeText={(text) => setContactName(text)}
        />
      </View>

      <Text>{t('contactMobile')}:</Text>
      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="green" />
        <TextInput
          style={styles.input}
          value={contactMobile}
          onChangeText={(text) => setContactMobile(text)}
          keyboardType="phone-pad"
        />
      </View>

      <Text>{t('address')}:</Text>
      <View style={styles.inputContainer}>
        <Icon name="map-marker" size={20} color="red" />
        <TextInput
          style={styles.input}
          value={contactAddress}
          onChangeText={(text) => setContactAddress(text)}
          multiline
        />
      </View>

      <Text>{t('district')}:</Text>
      <View style={styles.inputContainer}>
        <Icon name="map-marker" size={20} color="purple" />
        <TextInput
          style={styles.input}
          value={district}
          onChangeText={(text) => setDistrict(text)}
        />
      </View>

      <Text>{t('state')}:</Text>
      <View style={styles.inputContainer}>
        <Icon name="map" size={20} color="orange" />
        <TextInput
          style={styles.input}
          value={selectState}
          onChangeText={(text) => setSelectState(text)}
        />
      </View>

      {productType === 'sell' && productCategory === 'plants' && (
        <Text style={styles.totalAmount}>
          {t('totalExpectedAmount')}: {calculateTotalAmount()}
        </Text>
      )}

      {/* Display the selected image */}
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 100, height: 100 }}
        />
      )}

      {/* Button to take a live image */}
      <View style={styles.buttonContainer}>
        <Button title={t('takeImage')} onPress={takeImage} />
      </View>

      {/* Button to select an image */}
      <View style={styles.buttonContainer}>
        <Button title={t('selectImage')} onPress={selectImage} />
      </View>

      {productType === 'sell' && (
        <View style={styles.buttonContainer}>
          <Button title={t('sellButton')} onPress={handleSellButtonPress} />
        </View>
      )}
      {productType === 'rent' && (
        <View style={styles.buttonContainer}>
          <Button title={t('rentButton')} onPress={handleRentButtonPress} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'green',
  },
  buttonContainer: {
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CombinedFormDetails;