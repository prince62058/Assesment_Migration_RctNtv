import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import api from '../api/axios';

const UpdateVehicleScreen = () => {
  const [vehicleRecords, setVehicleRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/vehicles');
      setVehicleRecords(response.data);
    } catch (error) {
      console.log('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  const handleDelete = id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this vehicle record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/vehicles/${id}`);
              Alert.alert('Success', 'Vehicle deleted successfully');

              fetchData();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete vehicle');
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardHeader}>Record #{index + 1}</Text>
        <Pressable
          onPress={() => handleDelete(item._id)}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && { opacity: 0.8 },
          ]}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>

      <View style={styles.cardBody}>
        <DetailRow label="Vehicle Number" value={item.vehicleNumber} />
        <DetailRow label="Owner Name" value={item.ownerName} />
        <DetailRow label="Flat No." value={item.flatNumber} />
        <DetailRow
          label="Valid Till"
          value={
            item.validTill ? new Date(item.validTill).toLocaleDateString() : ''
          }
        />
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Update Vehicle Records</Text>
        <FlatList
          data={vehicleRecords}
          renderItem={renderItem}
          keyExtractor={item => item._id || item.vehicleNumber}
          contentContainerStyle={styles.listContent}
          refreshing={loading}
          onRefresh={fetchData}
          ListEmptyComponent={
            !loading && <Text style={styles.emptyText}>No records found.</Text>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value || '-'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardBody: {
    gap: theme.spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  detailLabel: {
    fontWeight: '600',
    color: theme.colors.textSecondary,
    width: 120,
    fontSize: 14,
  },
  detailValue: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.textSecondary,
  },
});

export default UpdateVehicleScreen;
