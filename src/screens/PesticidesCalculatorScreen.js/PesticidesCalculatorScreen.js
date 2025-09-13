import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import Logo from '../../../assets/logo.png';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const PesticidesCalculatorScreen = () => {
  const { height } = useWindowDimensions();
  const [crop, setCrop] = useState('');
  const [day, setDay] = useState('');
  const [selectedPesticide, setSelectedPesticide] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [areaValue, setAreaValue] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [waterAmount, setWaterAmount] = useState('');
  const navigation = useNavigation();
  const {t} = useTranslation();

  const pesticideDatabase = {
    Wheat: {
      "10 days": {
        pesticide: t('Imidacloprid'),
        amount: 2.5, // Amount in liters per acre
        waterAmount: 200, // Amount in liters per acre for mixing and spraying
        description: t('Wheat-Imidacloprid-description')
      },
      "30 days": {
        pesticide: t('Triadimefon'),
        amount: 3.0,
        waterAmount: 250,
        description: t('Wheat-Triadimefon-description')
      },
      "50 days": {
        pesticide: t('Metsulfuron-methyl'),
        amount: 4.0,
        waterAmount: 300,
        description: t('Wheat-Metsulfuron-methyl-description')
      },
      "80 days": {
        pesticide: t('Lambda-cyhalothrin'),
        amount: 2.0,
        waterAmount: 200,
        description: t('Wheat-Lambda-cyhalothrin-description')
      },
      // Add water amount for other stages
    },
    Corn: {
      "10 days": {
        pesticide: t('Chlorpyrifos'),
        amount: 1.5,
        waterAmount: 150,
        description: t('Corn-Chlorpyrifos-description')
      },
      "40 days": {
        pesticide: t('Tebuconazole'),
        amount: 2.0,
        waterAmount: 200,
        description: t('Corn-Tebuconazole-description')
      },
      "60 days": {
        pesticide: t('Atrazine'),
        amount: 3.0,
        waterAmount: 250,
        description: t('Corn-Atrazine-description')
      },
      "90 days": {
        pesticide: t('Cypermethrin'),
        amount: 2.5,
        waterAmount: 200,
        description: t('Corn-Cypermethrin-description')
      },
      // Add water amount for other stages
    },
    Rice: {
      "10 days": {
        pesticide: t('Bifenthrin'),
        amount: 2.0,
        waterAmount: 200,
        description: t('Rice-Bifenthrin-description')
      },
      "30 days": {
        pesticide: t('Tricyclazole'),
        amount: 2.5,
        waterAmount: 250,
        description: t('Rice-Tricyclazole-description')
      },
      "50 days": {
        pesticide: t('Butachlor'),
        amount: 3.5,
        waterAmount: 300,
        description: t('Rice-Butachlor-description')
      },
      "80 days": {
        pesticide: t('Cypermethrin'),
        amount: 3.0,
        waterAmount: 250,
        description: t('Rice-Cypermethrin-description')
      },
      // Add water amount for other stages
    },
    Banana: {
      "0 days": {
        pesticide: t('Carbendazim'),
        amount: 2.5,
        waterAmount: 200,
        description: t('Banana-Carbendazim-description')
      },
      "30 days": {
        pesticide: t('Imidacloprid'),
        amount: 3.0,
        waterAmount: 250,
        description: t('Banana-Imidacloprid-description')
      },
      "90 days": {
        pesticide:t('Propiconazole'),
        amount: 2.0,
        waterAmount: 200,
        description: t('Banana-Propiconazole-description')
      },
      "180 days": {
        pesticide: t('Abamectin'),
        amount: 3.5,
        waterAmount: 300,
        description: t('Banana-Abamectin-description')
      },
      // Add water amount for other stages
    },
    "Pearl Millet": {
      "10 days": {
        pesticide: t('Chlorpyrifos'),
        amount: 2.0,
        waterAmount: 200,
        description: t('Pearl-Millet-Chlorpyrifos-description')
      },
      "40 days": {
        pesticide: t('Tebuconazole'),
        amount: 2.5,
        waterAmount: 250,
        description: t('Pearl-Millet-Tebuconazole-description')
      },
      "60 days": {
        pesticide: t('Atrazine'),
        amount: 3.0,
        waterAmount: 300,
        description: t('Pearl-Millet-Atrazine-description')
      },
      "90 days": {
        pesticide: t('Cypermethrin'),
        amount: 3.5,
        waterAmount: 350,
        description: t('Pearl-Millet-Cypermethrin-description')
      },
      // Add water amount for other stages
    },
    Cotton: {
      "10 days": {
        pesticide: t('Imidacloprid'),
        amount: 2.5,
        waterAmount: 200,
        description: t('Cotton-Imidacloprid-description')
      },
      "50 days": {
        pesticide: t('Tricyclazole'),
        amount: 3.0,
        waterAmount: 250,
        description: t('Cotton-Tricyclazole-description')
      },
      "70 days": {
        pesticide: t('Glyphosate'),
        amount: 2.0,
        waterAmount: 200,
        description: t('Cotton-Glyphosate-description')
      },
      "100 days": {
        pesticide: t('Abamectin'),
        amount: 3.5,
        waterAmount: 300,
        description: t('Cotton-Abamectin-description')
      },
      // Add water amount for other stages
    },
    Soybean: {
      "10 days": {
        pesticide: t('Chlorpyrifos'),
        amount: 2.0,
        waterAmount: 200,
        description:t('Soybean-Chlorpyrifos-description')
      },
      "40 days": {
        pesticide: t('Tebuconazole'),
        amount: 2.5,
        waterAmount: 250,
        description: t('Soybean-Tebuconazole-description')
      },
      "70 days": {
        pesticide: t('Glyphosate'),
        amount: 3.0,
        waterAmount: 300,
        description: t('Soybean-Glyphosate-description')
      },
      "90 days": {
        pesticide: t('Abamectin'),
        amount: 3.5,
        waterAmount: 350,
        description: t('Soybean-Abamectin-description')
      },
      // Add water amount for other stages
    },
    Pulses: {
      "10 days": {
        pesticide: t('Imidacloprid'),
        amount: 2.5,
        waterAmount: 200,
        description: t('Pulses-Imidacloprid-description')
      },
      "40 days": {
        pesticide: t('Tebuconazole'),
        amount: 3.0,
        waterAmount: 250,
        description: t('Pulses-Tebuconazole-description')
      },
      "70 days": {
        pesticide: t('Glyphosate'),
        amount: 2.0,
        waterAmount: 200,
        description: t('Pulses-Glyphosate-description')
      },
      "90 days": {
        pesticide: t('Abamectin'),
        amount: 3.5,
        waterAmount: 300,
        description: t('Pulses-Abamectin-description')
      },
      // Add water amount for other stages
    },
    Sunflower: {
      "10 days": {
        pesticide: t('Bifenthrin'),
        amount: 2.0,
        waterAmount: 200,
        description: t('Sunflower-Bifenthrin-description')
      },
      "50 days": {
        pesticide: t('Tricyclazole'),
        amount: 2.5,
        waterAmount: 250,
        description: t('Sunflower-Tricyclazole-description')
      },
      "70 days": {
        pesticide: t('Atrazine'),
        amount: 3.0,
        waterAmount: 300,
        description: t('Sunflower-Atrazine-description')
      },
      "90 days": {
        pesticide: t('Cypermethrin'),
        amount: 3.5,
        waterAmount: 350,
        description: t('Sunflower-Cypermethrin-description')
      },
      // Add water amount for other stages
    },
    Mustard: {
      "10 days": {
        pesticide: t('Imidacloprid'),
        amount: 2.5,
        waterAmount: 200,
        description: t('Mustard-Imidacloprid-description')
      },
      "40 days": {
        pesticide: t('Trifloxystrobin'),
        amount: 3.0,
        waterAmount: 250,
        description: t('Mustard-Trifloxystrobin-description')
      },
      "70 days": {
        pesticide: t('Metribuzin'),
        amount: 2.0,
        waterAmount: 200,
        description: t('Mustard-Metribuzin-description')
      },
      "100 days": {
        pesticide: t('Abamectin'),
        amount: 3.5,
        waterAmount: 350,
        description: t('Mustard-Abamectin-description')
      },
      // Add water amount for other stages
    },
    Sugarcane: {
      "10 days": {
        pesticide: t('Chlorpyrifos'),
        amount: 2.0,
        waterAmount: 200,
        description: t('Sugarcane-Chlorpyrifos-description')
      },
      "40 days": {
        pesticide: t('Triadimefon'),
        amount: 2.5,
        waterAmount: 250,
        description: t('Sugarcane-Triadimefon-description')
      },
      "70 days": {
        pesticide: t('Glyphosate'),
        amount: 3.0,
        waterAmount: 300,
        description: t('Sugarcane-Glyphosate-description')
      },
      "100 days": {
        pesticide: t('Abamectin'),
        amount: 3.5,
        waterAmount: 350,
        description: t('Sugarcane-Abamectin-description')
      },
      // Add water amount for other stages
    },
    Barley: {
      "10 days": {
        pesticide: t('Imidacloprid'),
        amount: 2.5,
        waterAmount: 200,
        description: t('Barley-Imidacloprid-description')
      },
      "40 days": {
        pesticide: t('Tebuconazole'),
        amount: 3.0,
        waterAmount: 300,
        description: t('Barley-Tebuconazole-description')
      },
      "60 days": {
        pesticide: t('Atrazine'),
        amount: 2.0,
        waterAmount: 200,
        description: t('Barley-Atrazine-description')
      },
      "90 days": {
        pesticide: t('Cypermethrin'),
        amount: 3.5,
        waterAmount: 350,
        description: t('Barley-Cypermethrin-description')
      },
      // Add water amount for other stages
    }
  };
  
  const cropOptions = Object.keys(pesticideDatabase);

  const calculatePesticide = () => {
    if (pesticideDatabase[crop] && pesticideDatabase[crop][day]) {
      const { pesticide, amount, description } = pesticideDatabase[crop][day];
      setSelectedPesticide(pesticide);
      setDescription(description);

      if (selectedUnit && areaValue) {
        const areaInAcres = selectedUnit === 'acres' ? parseFloat(areaValue) : parseFloat(areaValue) / 100;
        const calculatedAmount = (amount * areaInAcres).toFixed(2);
        const calculatedWaterAmount = (pesticideDatabase[crop][day].waterAmount * areaInAcres).toFixed(2); // Calculate water amount
        setTotalAmount(calculatedAmount);
        setWaterAmount(calculatedWaterAmount); // Set the waterAmount state
      } else {
        setTotalAmount('');
        setWaterAmount(''); // Reset the waterAmount state if areaValue or selectedUnit is not set
      }
    } else {
      setSelectedPesticide('Not Found');
      setDescription('');
      setTotalAmount('');
      setWaterAmount(''); // Reset the waterAmount state if crop or day is not found
    }
  };

  const increaseAmount = () => {
    if (!isNaN(parseFloat(areaValue))) {
      const incrementedArea = (parseFloat(areaValue) + 1).toString();
      setAreaValue(incrementedArea);
      setTotalAmount(totalAmount + 0.1);
    }
  };

  const decreaseAmount = () => {
    if (!isNaN(parseFloat(areaValue)) && parseFloat(areaValue) > 0) {
      const decrementedArea = (parseFloat(areaValue) - 1).toString();
      setAreaValue(decrementedArea);
      if (totalAmount >= 0.1) { // Ensure totalAmount doesn't go negative
        setTotalAmount(totalAmount - 0.1); // You can adjust the decrement as needed
      }
    }
  };

  const resetValues = () => {
    setCrop('1');
    setDay('1');
    setSelectedUnit(' ');
    setAreaValue('');
    setSelectedPesticide('');
    setDescription('');
    setTotalAmount('');
    setWaterAmount('')
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={33} color="black" />
        <Text style={{ top: -31, left: 35, fontSize: 17.5, fontWeight: 'bold' }}>{t('back')}</Text>
      </TouchableOpacity>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />
      </View>
      <Text style={styles.header}>{t('Pesticide Calculator')}</Text>

      <Text style={styles.disclaimer}>
       {t("Note")}
      </Text>

      <Text style={styles.label}>{t('Select Crop')}</Text>
      <View style={styles.inputContainer}>
        <Picker style={styles.input} selectedValue={crop} onValueChange={(value) => setCrop(value)}>
          <Picker.Item label={t('Select Crop')} value="1" />
          {cropOptions.map((cropOption) => (
            <Picker.Item key={cropOption} label={t(cropOption)} value={cropOption} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>{t('Select Days')}</Text>
      <View style={styles.inputContainer}>
        <Picker style={styles.input} selectedValue={day} onValueChange={(value) => setDay(value)}>
          <Picker.Item label={t('Select Days')} value="1" />
          {pesticideDatabase[crop] &&
            Object.keys(pesticideDatabase[crop]).map((dayOption) => (
              <Picker.Item key={dayOption} label={dayOption} value={dayOption} />
            ))}
        </Picker>
      </View>

      <Text style={styles.label}>{t('Select Unit')}</Text>
      <View style={styles.inputContainer}>
        <Picker
          style={styles.input}
          selectedValue={selectedUnit}
          onValueChange={(value) => setSelectedUnit(value)}
        >
          <Picker.Item label={t('Select Unit')} value=" " />
          <Picker.Item label={t('Cents')} value="cents" />
          <Picker.Item label={t('Acres')} value="acres" />
        </Picker>
      </View>

      <Text style={styles.label}>{t('Enter Area')}</Text>
      <Input
        placeholder={`${t('Area in')} ${t(selectedUnit)}`}
        value={areaValue}
        onChangeText={(text) => setAreaValue(text)}
        keyboardType="numeric"
        leftIcon={<AntDesign name="table" size={24} color="black" />}
        rightIcon={
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 5 }}>
              <AntDesign
                name="pluscircleo"
                size={24}
                color="green"
                onPress={() => {
                  increaseAmount();
                  calculatePesticide();
                }}
              />
            </View>
            <View style={{ marginLeft: 5 }}>
              <AntDesign
                name="minuscircleo"
                size={24}
                color="red"
                onPress={() => {
                  decreaseAmount();
                  calculatePesticide();
                }}
              />
            </View>
          </View>
        }
      />

      <Button title={t('Calculate Pesticide')} onPress={calculatePesticide} />

      <Text style={styles.result}>{t('Selected Pesticide')} {selectedPesticide}</Text>
      <Text style={styles.result}>{t('Description')} {description}</Text>
      <Text style={styles.result}>{t('Total Area')} {areaValue} {selectedUnit}</Text>
      {totalAmount !== '' && (
        <Text style={styles.result}>{t('Total Amount')} {totalAmount >= 0.9 ? totalAmount + ' liters' : totalAmount * 1000 + ' ml'}</Text>
      )}
      <Text style={styles.result2}>{t('Amount of Water to Mix')} {waterAmount} {t('liters')}</Text>

      <Button title={t('reset')} onPress={resetValues} color="red" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FAF3E0',
  },
  disclaimer: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom:10
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
    textDecorationLine: 'underline',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    marginTop: 5,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200
  },
  root: {
    alignItems: 'center',
    padding: 5,
  },
  inputContainer: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  input: {
    flex: 1,
  },
  result: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 10,
  },
  result2: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 10,
    marginBottom:10
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default PesticidesCalculatorScreen;