import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, useWindowDimensions, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Logo from '../../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const FertilizerCalculatorScreen = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const { height } = useWindowDimensions();
  const [cropType, setCropType] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [fertilizerRecommendation, setFertilizerRecommendation] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedFertilizer, setSelectedFertilizer] = useState('');
  const [areaValue, setAreaValue] = useState('');
  const navigation = useNavigation();

  const fertilizerDatabase = {
    wheat: {
      "10-15 days": { nitrogen: 20, phosphorus: 15, potassium: 10 },
      "30-40 days": { nitrogen: 40, phosphorus: 20, potassium: 20 },
      "50-60 days": { nitrogen: 60, phosphorus: 30, potassium: 30 },
      "80-90 days": { nitrogen: 100, phosphorus: 60, potassium: 40 }
    },
    corn: {
      "10-15 days": { nitrogen: 20, phosphorus: 10, potassium: 10 },
      "40-50 days": { nitrogen: 60, phosphorus: 30, potassium: 20 },
      "60-70 days": { nitrogen: 90, phosphorus: 45, potassium: 30 },
      "90-100 days": { nitrogen: 120, phosphorus: 60, potassium: 45 }
    },
    rice: {
      "10-15 days": { nitrogen: 20, phosphorus: 10, potassium: 10 },
      "30-40 days": { nitrogen: 30, phosphorus: 15, potassium: 20 },
      "50-60 days": { nitrogen: 60, phosphorus: 30, potassium: 40 },
      "70-80 days": { nitrogen: 80, phosphorus: 40, potassium: 60 }
    },
    banana: {
      "0-30 days": { nitrogen: 20, phosphorus: 10, potassium: 20 },
      "30-90 days": { nitrogen: 40, phosphorus: 20, potassium: 40 },
      "90-180 days": { nitrogen: 80, phosphorus: 40, potassium: 80 },
      "180-270 days": { nitrogen: 100, phosphorus: 60, potassium: 100 }
    },
    pearl_millet: {
      "10-15 days": { nitrogen: 20, phosphorus: 10, potassium: 10 },
      "40-50 days": { nitrogen: 60, phosphorus: 30, potassium: 20 },
      "60-70 days": { nitrogen: 90, phosphorus: 45, potassium: 30 },
      "90-100 days": { nitrogen: 120, phosphorus: 60, potassium: 45 }
    },
    cotton: {
      "10-15 days": { nitrogen: 20, phosphorus: 10, potassium: 10 },
      "50-60 days": { nitrogen: 60, phosphorus: 30, potassium: 40 },
      "70-80 days": { nitrogen: 80, phosphorus: 40, potassium: 60 },
      "100-120 days": { nitrogen: 120, phosphorus: 60, potassium: 80 }
    },
    soyabean: {
      "10-15 days": { nitrogen: 20, phosphorus: 10, potassium: 10 },
      "40-50 days": { nitrogen: 50, phosphorus: 30, potassium: 20 },
      "70-80 days": { nitrogen: 80, phosphorus: 45, potassium: 30 },
      "90-100 days": { nitrogen: 100, phosphorus: 60, potassium: 40 }
    },
    pulses: {
      "10-15 days": { nitrogen: 20, phosphorus: 10, potassium: 10 },
      "40-50 days": { nitrogen: 50, phosphorus: 30, potassium: 20 },
      "70-80 days": { nitrogen: 80, phosphorus: 45, potassium: 30 },
      "90-100 days": { nitrogen: 100, phosphorus: 60, potassium: 40 }
    },
    sunflower: {
      "10-15 days": { nitrogen: 20, phosphorus: 10, potassium: 10 },
      "50-60 days": { nitrogen: 60, phosphorus: 30, potassium: 40 },
      "70-80 days": { nitrogen: 80, phosphorus: 40, potassium: 60 },
      "100-120 days": { nitrogen: 120, phosphorus: 60, potassium: 80 }
    },
    mustard: {
      "10-15 days": { nitrogen: 20, phosphorus: 10, potassium: 10 },
      "40-50 days": { nitrogen: 50, phosphorus: 30, potassium: 20 },
      "60-70 days": { nitrogen: 80, phosphorus: 45, potassium: 30 },
      "80-90 days": { nitrogen: 100, phosphorus: 60, potassium: 40 }
    },
    sugarcane: {
      "0-30 days": { nitrogen: 40, phosphorus: 30, potassium: 40 },
      "30-90 days": { nitrogen: 80, phosphorus: 60, potassium: 60 },
      "90-180 days": { nitrogen: 120, phosphorus: 90, potassium: 120 },
      "180-270 days": { nitrogen: 160, phosphorus: 120, potassium: 160 }
    },
    barley: {
      "10-15 days": { nitrogen: 30, phosphorus: 15, potassium: 10 },
      "30-40 days": { nitrogen: 60, phosphorus: 30, potassium: 20 },
      "50-60 days": { nitrogen: 90, phosphorus: 45, potassium: 30 },
      "70-80 days": { nitrogen: 120, phosphorus: 60, potassium: 40 }
    },
  };

  const cropGrowthPeriods = {
    wheat: ['10-15 days', '30-40 days', '50-60 days', '80-90 days'],
    corn: ['10-15 days', '40-50 days', '60-70 days', '90-100 days'],
    rice: ['10-15 days', '30-40 days', '50-60 days', '70-80 days'],
    banana: ['0-30 days', '30-90 days', '90-180 days', '180-270 days'],
    pearl_millet: ['10-15 days', '40-50 days', '60-70 days', '90-100 days'],
    cotton: ['10-15 days', '50-60 days', '70-80 days', '100-120 days'],
    soyabean: ['10-15 days', '40-50 days', '70-80 days', '90-100 days'],
    pulses: ['10-15 days', '40-50 days', '70-80 days', '90-100 days'],
    sunflower: ['10-15 days', '50-60 days', '70-80 days', '100-120 days'],
    mustard: ['10-15 days', '40-50 days', '60-70 days', '80-90 days'],
    sugarcane: ['0-30 days', '30-90 days', '90-180 days', '180-270 days'],
    barley: ['10-15 days', '30-40 days', '50-60 days', '70-80 days'],
  };

  const calculateFertilizer = () => {
    const recommendations = fertilizerDatabase[cropType];

    if (recommendations && recommendations[selectedPeriod]) {
      const recommendationForSelectedPeriod = recommendations[selectedPeriod];

      const areaInAcres = selectedUnit === 'acres' ? parseFloat(areaValue) : parseFloat(areaValue) / 100;

      let fertilizerRecommendation = '';

      let nitrogenAmount = 0;
      let phosphorusAmount = 0;
      let potassiumAmount = 0;
      let ureaAmount = 0;
      let dapAmount = 0;
      let mopAmount = 0;

      switch (selectedFertilizer) {
        case 'nitrogen':
          nitrogenAmount = (areaInAcres * recommendationForSelectedPeriod.nitrogen).toFixed(2);
          fertilizerRecommendation = `${t('nitrogen')}: ${nitrogenAmount} kg`
          break;
        case 'phosphorus':
          phosphorusAmount = (areaInAcres * recommendationForSelectedPeriod.phosphorus).toFixed(2);
          fertilizerRecommendation = `${t('phosphorus')}: ${phosphorusAmount} kg`
          break;
        case 'potassium':
          potassiumAmount = (areaInAcres * recommendationForSelectedPeriod.potassium).toFixed(2);
          fertilizerRecommendation = `${t('potassium')}: ${potassiumAmount} kg`
          break;
        case 'urea':
          ureaAmount = (areaInAcres * recommendationForSelectedPeriod.nitrogen).toFixed(2);
          fertilizerRecommendation = `${t('urea')}: ${ureaAmount} kg`
          break;
        case 'dap':
          dapAmount = (areaInAcres * recommendationForSelectedPeriod.phosphorus * 100 / 18.46).toFixed(2);
          fertilizerRecommendation = `${t('dap')}: ${dapAmount} kg`
          break;
        case 'mop':
          mopAmount = (areaInAcres * recommendationForSelectedPeriod.potassium * 100 / 60).toFixed(2);
          fertilizerRecommendation = `${t('mop')}: ${mopAmount} kg`
          break;
        default:
          break;
      }

      setFertilizerRecommendation(fertilizerRecommendation);
    } else {
      setFertilizerRecommendation(t('recommendation_not_available'));
    }
  };

  const updateGrowthPeriods = (crop) => {
    const periods = cropGrowthPeriods[crop] || [];
    setSelectedPeriod(periods[0] || '');
  };

  const resetValues = () => {
    setAreaValue('');
    setSelectedUnit('');
    setCropType('');
    setSelectedPeriod('');
    setFertilizerRecommendation('')
    setSelectedFertilizer('1')
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={33} color="black" />
        <Text style={{ top: -31, left: 35, fontSize: 17.5, fontWeight: 'bold' }}>{t('back')}</Text>
      </TouchableOpacity>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.header}>{t('fertilizer_calculator')}</Text>

      <Text style={styles.label}>{t('select_unit')}:</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="filetext1" size={24} color="#333" style={styles.icon} />
        <Picker
          style={styles.picker}
          selectedValue={selectedUnit}
          onValueChange={(itemValue) => {
            setSelectedUnit(itemValue);
            if (itemValue === 'acres') {
              setCropType('');
              setSelectedPeriod('');
            }
          }}
        >
          <Picker.Item label={t('select_unit')} value="" />
          <Picker.Item label={t('cents')} value="cents" />
          <Picker.Item label={t('acres')} value="acres" />
        </Picker>
      </View>

      <Text style={styles.label}>{t('enter_area')}:</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="table" size={24} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={`${t('area_in')} ${selectedUnit}`}
          value={areaValue}
          onChangeText={(text) => setAreaValue(text)}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>{t('select_fertilizer_type')}:</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="database" size={24} color="#333" style={styles.icon} />
        <Picker
          style={styles.picker}
          selectedValue={selectedFertilizer}
          onValueChange={(itemValue) => setSelectedFertilizer(itemValue)}
        >
          <Picker.Item label={t('select_fertilizer')} value="1" />
          <Picker.Item label={t('nitrogen')} value="nitrogen" />
          <Picker.Item label={t('phosphorus')} value="phosphorus" />
          <Picker.Item label={t('potassium')} value="potassium" />
          <Picker.Item label={t('urea')} value="urea" />
          <Picker.Item label={t('dap')} value="dap" />
          <Picker.Item label={t('mop')} value="mop" />
        </Picker>
      </View>

      <Text style={styles.label}>{t('select_crop_type')}:</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="appstore1" size={24} color="#333" style={styles.icon} />
        <Picker
          style={styles.picker}
          selectedValue={cropType}
          onValueChange={(itemValue) => {
            setCropType(itemValue);
            updateGrowthPeriods(itemValue);
          }}
        >
          <Picker.Item label={t('select_crop')} value="" />
          <Picker.Item label={t('wheat')} value="wheat" />
          <Picker.Item label={t('corn')} value="corn" />
          <Picker.Item label={t('rice')} value="rice" />
          <Picker.Item label={t('banana')} value="banana" />
          <Picker.Item label={t('pearl_millet')} value="pearl_millet" />
          <Picker.Item label={t('cotton')} value="cotton" />
          <Picker.Item label={t('soyabean')} value="soyabean" />
          <Picker.Item label={t('pulses')} value="pulses" />
          <Picker.Item label={t('sunflower')} value="sunflower" />
          <Picker.Item label={t('mustard')} value="mustard" />
          <Picker.Item label={t('sugarcane')} value="sugarcane" />
          <Picker.Item label={t('barley')} value="barley" />
        </Picker>
      </View>

      <Text style={styles.label}>{t('select_period_after_sowing')}:</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="calendar" size={24} color="#333" style={styles.icon} />
        <Picker
          style={styles.picker}
          selectedValue={selectedPeriod}
          onValueChange={(itemValue) => setSelectedPeriod(itemValue)}
        >
          {cropGrowthPeriods[cropType]?.map((period) => (
            <Picker.Item key={period} label={period} value={period} />
          ))}
        </Picker>
      </View>

      {fertilizerRecommendation && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>{t('amount_of')} {selectedFertilizer} {t('for')} {areaValue} {selectedUnit} {t('is')}:</Text>
          <Text style={styles.resultText}>{fertilizerRecommendation}</Text>
        </View>
      )}

<TouchableOpacity style={styles.calculateButton} onPress={calculateFertilizer}>
        <AntDesign name="check" size={24} color="white" />
        <Text style={styles.buttonText}>{t('calculate_fertilizer_needed')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={resetValues}>
        <AntDesign name="close" size={24} color="white" />
        <Text style={styles.buttonText}>{t('reset')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FAF3E0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    textDecorationLine: 'underline',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555',
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // Ensure the button is above other elements
    marginTop: 30,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  calculateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: '#fb3640',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#fff',
    fontSize: 16.5,
    flex: 1,
  },
  picker: {
    height: 40,
    backgroundColor: '#fff',
    flex: 1,
  },
  resultContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultText: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginTop: 25,
  },
  root: {
    alignItems: 'center',
    padding: 5,
  },
  icon: {
    marginRight: 10,
  },
});

export default FertilizerCalculatorScreen;
