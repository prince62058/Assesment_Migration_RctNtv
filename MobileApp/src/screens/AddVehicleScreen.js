import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ScreenWrapper from '../components/ScreenWrapper';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import api from '../api/axios';

const AddVehicleScreen = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    vehicleNumber: '',
    passNumber: '',
    vehicleType: '',
    ownerName: '',
    flatNumber: '',
    dlOrRcNumber: '',
    ownerContact: '',
    alternateContact: '',
    email: '',
    permanentAddress: '',
    flatOwnerName: '',
    flatOwnerContact: '',
    validTill: '',
  });

  const [errors, setErrors] = useState({});

  const handleInput = (name, value) => {
    if (name === 'vehicleNumber') {
      setInput(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, vehicleNumber: '' }));
    } else {
      setInput(prev => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    const formattedVehicleNumber = input.vehicleNumber
      .toUpperCase()
      .replace(/\s+/g, '');

    const regex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;

    if (!regex.test(formattedVehicleNumber)) {
      newErrors.vehicleNumber =
        'Invalid vehicle number format (e.g. MH12AB1234)';
      isValid = false;
    }

    if (!input.passNumber) {
      newErrors.passNumber = 'Required';
      isValid = false;
    }
    if (!input.vehicleType) {
      newErrors.vehicleType = 'Required';
      isValid = false;
    }
    if (!input.ownerName) {
      newErrors.ownerName = 'Required';
      isValid = false;
    }
    if (!input.flatNumber) {
      newErrors.flatNumber = 'Required';
      isValid = false;
    }
    if (!input.dlOrRcNumber) {
      newErrors.dlOrRcNumber = 'Required';
      isValid = false;
    }
    if (!input.ownerContact) {
      newErrors.ownerContact = 'Required';
      isValid = false;
    }
    if (!input.permanentAddress) {
      newErrors.permanentAddress = 'Required';
      isValid = false;
    }
    if (!input.flatOwnerName) {
      newErrors.flatOwnerName = 'Required';
      isValid = false;
    }
    if (!input.validTill) {
      newErrors.validTill = 'Required (YYYY-MM-DD)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Alert.alert('Validation Error', 'Please check the form for errors.');
      return;
    }

    setLoading(true);
    try {
      const formattedVehicleNumber = input.vehicleNumber
        .toUpperCase()
        .replace(/\s+/g, '');

      const vehicleData = {
        vehicleNumber: formattedVehicleNumber,
        passNumber: input.passNumber,
        flatNumber: input.flatNumber,
        ownerName: input.ownerName,
        dlOrRcNumber: input.dlOrRcNumber,
        ownerContact: input.ownerContact,
        alternateContact: input.alternateContact,
        email: input.email,
        permanentAddress: input.permanentAddress,
        flatOwnerName: input.flatOwnerName,
        flatOwnerContact: input.flatOwnerContact,
        validTill: input.validTill,
      };

      await api.post('/vehicles', vehicleData);

      Alert.alert('Success', 'Vehicle added successfully!');

      setInput({
        vehicleNumber: '',
        passNumber: '',
        vehicleType: '',
        ownerName: '',
        flatNumber: '',
        dlOrRcNumber: '',
        ownerContact: '',
        alternateContact: '',
        email: '',
        permanentAddress: '',
        flatOwnerName: '',
        flatOwnerContact: '',
        validTill: '',
      });
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Failed to add vehicle';
      if (
        error.response?.status === 400 &&
        error.response?.data?.error?.includes('passNumber')
      ) {
        Alert.alert('Error', 'Pass number already exists.');
      } else {
        Alert.alert('Error', message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add Vehicle</Text>

        <View style={styles.form}>
          <Input
            label="Vehicle Number *"
            value={input.vehicleNumber}
            onChangeText={text => handleInput('vehicleNumber', text)}
            placeholder="e.g. MH12AB1234"
            error={errors.vehicleNumber}
            autoCapitalize="characters"
          />

          <Input
            label="Pass Number *"
            value={input.passNumber}
            onChangeText={text => handleInput('passNumber', text)}
            placeholder="Enter pass number"
            error={errors.passNumber}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Vehicle Type *</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={input.vehicleType}
                onValueChange={itemValue =>
                  handleInput('vehicleType', itemValue)
                }
              >
                <Picker.Item
                  label="Select Vehicle Type"
                  value=""
                  color={theme.colors.textSecondary}
                />
                <Picker.Item label="Bike" value="Bike" />
                <Picker.Item label="Car" value="Car" />
                <Picker.Item label="Truck" value="Truck" />
                <Picker.Item label="Auto Rickshaw" value="Auto Rickshaw" />
              </Picker>
            </View>
            {errors.vehicleType && (
              <Text style={styles.errorText}>{errors.vehicleType}</Text>
            )}
          </View>

          <Input
            label="Vehicle Owner Name *"
            value={input.ownerName}
            onChangeText={text => handleInput('ownerName', text)}
            placeholder="Owner Name"
            error={errors.ownerName}
          />

          <Input
            label="Flat No. *"
            value={input.flatNumber}
            onChangeText={text => handleInput('flatNumber', text)}
            placeholder="Flat Number"
            error={errors.flatNumber}
          />

          <Input
            label="DL / RC Number *"
            value={input.dlOrRcNumber}
            onChangeText={text => handleInput('dlOrRcNumber', text)}
            placeholder="DL/RC Number"
            error={errors.dlOrRcNumber}
          />

          <Input
            label="Vehicle Owner Contact *"
            value={input.ownerContact}
            onChangeText={text => handleInput('ownerContact', text)}
            placeholder="Contact Number"
            keyboardType="phone-pad"
            error={errors.ownerContact}
          />

          <Input
            label="Alternate Contact"
            value={input.alternateContact}
            onChangeText={text => handleInput('alternateContact', text)}
            placeholder="Alternate Contact"
            keyboardType="phone-pad"
          />

          <Input
            label="Email"
            value={input.email}
            onChangeText={text => handleInput('email', text)}
            placeholder="Email Address"
            keyboardType="email-address"
          />

          <Input
            label="Permanent Address *"
            value={input.permanentAddress}
            onChangeText={text => handleInput('permanentAddress', text)}
            placeholder="Address"
            error={errors.permanentAddress}
          />

          <Input
            label="Flat Owner Name *"
            value={input.flatOwnerName}
            onChangeText={text => handleInput('flatOwnerName', text)}
            placeholder="Flat Owner Name"
            error={errors.flatOwnerName}
          />

          <Input
            label="Flat Owner Contact"
            value={input.flatOwnerContact}
            onChangeText={text => handleInput('flatOwnerContact', text)}
            placeholder="Flat Owner Contact"
            keyboardType="phone-pad"
          />

          <Input
            label="Valid Till (YYYY-MM-DD) *"
            value={input.validTill}
            onChangeText={text => handleInput('validTill', text)}
            placeholder="YYYY-MM-DD"
            error={errors.validTill}
          />

          <Button
            title="Add Vehicle"
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
    color: theme.colors.text,
    textAlign: 'center',
  },
  form: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    elevation: 2,
  },
  pickerContainer: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
  },
  submitButton: {
    marginTop: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: theme.spacing.xs,
  },
});

export default AddVehicleScreen;
