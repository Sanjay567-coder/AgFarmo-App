import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FertilizerCalculatorScreen = () => {
  const [areaInAcres, setAreaInAcres] = useState('');
  const [cropType, setCropType] = useState('');
  const [selectedNutrient, setSelectedNutrient] = useState('');
  const [fertilizerAmount, setFertilizerAmount] = useState(null);

  const calculateFertilizer = () => {
    // Define nutrient requirements per acre for different crop types (in kg/acre)
    const nutrientRequirements = {
      wheat: {
        nitrogen: 100,
        phosphorus: 40,
        potassium: 40,
      },
      corn: {
        nitrogen: 120,
        phosphorus: 60,
        potassium: 60,
      },
      soybeans: {
        nitrogen: 80,
        phosphorus: 40,
        potassium: 80,
      },
      rice: {
        nitrogen: 100,
        phosphorus: 60,
        potassium: 60,
      },
      cotton: {
        nitrogen: 150,
        phosphorus: 70,
        potassium: 70,
      },
      potatoes: {
        nitrogen: 120,
        phosphorus: 80,
        potassium: 160,
      },
      tomatoes: {
        nitrogen: 160,
        phosphorus: 80,
        potassium: 160,
      },
      barley: {
        nitrogen: 100,
        phosphorus: 60,
        potassium: 60,
      },
      oats: {
        nitrogen: 100,
        phosphorus: 60,
        potassium: 60,
      },
      sorghum: {
        nitrogen: 100,
        phosphorus: 60,
        potassium: 60,
      }
    };

    // Simplified calculation - adjust this based on local recommendations and soil tests
    const nutrientRequirementPerAcre = nutrientRequirements[cropType][selectedNutrient];
    const nutrientContentOfFertilizer = 0.1; // Nutrient content of the fertilizer (e.g., 10% nitrogen)

    if (areaInAcres && cropType && selectedNutrient && nutrientRequirementPerAcre) {
      const amountOfFertilizerNeeded =
        (nutrientRequirementPerAcre / nutrientContentOfFertilizer) * parseFloat(areaInAcres);
      setFertilizerAmount(amountOfFertilizerNeeded);
    }
  };

  return (
    <View>
      <Text>Enter Area in Acres:</Text>
      <TextInput
        placeholder="Area in Acres"
        value={areaInAcres}
        onChangeText={(text) => setAreaInAcres(text)}
        keyboardType="numeric"
      />

      <Text>Select Crop Type:</Text>
      <Picker
        selectedValue={cropType}
        onValueChange={(itemValue) => setCropType(itemValue)}
      >
        <Picker.Item label="Select Crop" value="" />
        <Picker.Item label="Wheat" value="wheat" />
        <Picker.Item label="Corn" value="corn" />
        <Picker.Item label="Soybeans" value="soybeans" />
        <Picker.Item label="Rice" value="rice" />
        <Picker.Item label="Cotton" value="cotton" />
        <Picker.Item label="Potatoes" value="potatoes" />
        <Picker.Item label="Tomatoes" value="Tomatoes" />
        <Picker.Item label="Barley" value="barley" />
        <Picker.Item label="Oats" value="oats" />
        <Picker.Item label="Sorghum" value="sorghum" />
        {/* Add more crop types as needed */}
      </Picker>

      <Text>Select Nutrient Type:</Text>
      <Picker
        selectedValue={selectedNutrient}
        onValueChange={(itemValue) => setSelectedNutrient(itemValue)}
      >
        <Picker.Item label="Select Nutrient" value="" />
        <Picker.Item label="Nitrogen" value="nitrogen" />
        <Picker.Item label="Phosphorus" value="phosphorus" />
        <Picker.Item label="Potassium" value="potassium" />
      </Picker>

      <Button title="Calculate Fertilizer" onPress={calculateFertilizer} />

      {fertilizerAmount !== null && (
        <View>
          <Text>Total Amount of Fertilizer Needed: {fertilizerAmount.toFixed(2)} kg</Text>
        </View>
      )}
    </View>
  );
};

export default FertilizerCalculatorScreen;