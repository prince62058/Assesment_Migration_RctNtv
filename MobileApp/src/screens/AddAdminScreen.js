import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ScreenWrapper from '../components/ScreenWrapper';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import api from '../api/axios';
import PasswordInput from '../components/Input'; // Reusing Input with secureTextEntry

const AddAdminScreen = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    role: isAdmin ? 'guard' : 'admin',
    address: '',
    designation: '',
    email: '',
  });

  // Handle input changes
  const handleChange = (name, value) => {
    if (name === 'role' && isAdmin) return;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.password ||
      !formData.address ||
      !formData.designation
    ) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        role: isAdmin ? 'guard' : formData.role,
      };

      await api.post('/auth/register', payload);
      Alert.alert('Success', 'User created successfully!');

      setFormData({
        name: '',
        mobile: '',
        password: '',
        role: isAdmin ? 'guard' : 'admin',
        address: '',
        designation: '',
        email: '',
      });
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Failed to create user';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add New User</Text>

        <View style={styles.form}>
          <Input
            label="Full Name *"
            value={formData.name}
            onChangeText={text => handleChange('name', text)}
            placeholder="Enter full name"
          />

          <Input
            label="Mobile Number *"
            value={formData.mobile}
            onChangeText={text => handleChange('mobile', text)}
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Role *</Text>
            <View
              style={[styles.pickerWrapper, isAdmin && styles.disabledPicker]}
            >
              <Picker
                selectedValue={isAdmin ? 'guard' : formData.role}
                onValueChange={itemValue => handleChange('role', itemValue)}
                enabled={!isAdmin}
              >
                <Picker.Item label="Admin" value="admin" />
                <Picker.Item label="Guard" value="guard" />
              </Picker>
            </View>
            {isAdmin && (
              <Text style={styles.helperText}>
                Admins can only create Guard users.
              </Text>
            )}
          </View>

          <Input
            label="Designation *"
            value={formData.designation}
            onChangeText={text => handleChange('designation', text)}
            placeholder="Enter designation"
          />

          <Input
            label="Email (Optional)"
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <Input
            label="Address *"
            value={formData.address}
            onChangeText={text => handleChange('address', text)}
            placeholder="Enter address"
          />

          <Input
            label="Password *"
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
            placeholder="Enter password"
            secureTextEntry
          />

          <Button
            title="Create User"
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
  disabledPicker: {
    backgroundColor: theme.colors.background,
    opacity: 0.7,
  },
  helperText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  submitButton: {
    marginTop: theme.spacing.md,
  },
});

export default AddAdminScreen;
