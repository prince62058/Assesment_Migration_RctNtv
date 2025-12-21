import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import api from '../api/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!role) {
      Alert.alert('Error', 'Please select a role');
      return;
    }
    if (!mobile || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        mobile,
        password,
        role,
      });

      const { token, ...userData } = response.data;

      await login(
        {
          id: response.data._id,
          name: response.data.name,
          role: response.data.role,
        },
        response.data.token,
      );
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Login failed';
      Alert.alert('Login Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Select Role</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={role}
                onValueChange={itemValue => setRole(itemValue)}
                dropdownIconColor={theme.colors.primary}
              >
                <Picker.Item
                  label="Are You ?"
                  value=""
                  color={theme.colors.textSecondary}
                />
                <Picker.Item label="Super Admin" value="superadmin" />
                <Picker.Item label="Admin" value="admin" />
                <Picker.Item label="Guard" value="guard" />
              </Picker>
            </View>

            <Input
              label="Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              placeholder="Enter your mobile number"
              keyboardType="phone-pad"
            />

            <View>
              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
              />
              <Pressable
                style={({ pressed }) => [
                  styles.eyeIcon,
                  pressed && { opacity: 0.6 },
                ]}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </Pressable>
            </View>

            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbEAFE',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  form: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  pickerContainer: {
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 38,
    zIndex: 1,
  },
  loginButton: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 14,
  },
});

export default LoginScreen;
