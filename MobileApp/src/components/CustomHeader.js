import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';

const CustomHeader = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  // Format the role to be capitalized (e.g., "admin" -> "Admin")
  const getRoleDisplay = () => {
    if (!user || !user.role) return 'User()';
    const role = user.role;
    return `${role.charAt(0).toUpperCase() + role.slice(1)}()`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.contentContainer}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Vehicle Validator</Text>
          <Text style={styles.companyName}>NAME OF THE COMPANY</Text>
        </View>
        <Text style={styles.userRole}>{getRoleDisplay()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A', // Dark blue background similar to screenshot
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  contentContainer: {
    paddingHorizontal: 20,
    position: 'relative',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  companyName: {
    color: '#F59E0B', // Amber/Gold color
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  userRole: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 15, // Space it below or position it specifically
    alignSelf: 'flex-start',
    fontWeight: '500',
  },
});

export default CustomHeader;
