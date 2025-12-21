import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import api from '../api/axios';

const DisplayScreen = () => {
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

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>Record #{index + 1}</Text>
      <View style={styles.cardBody}>
        <DetailRow label="Vehicle Number" value={item.vehicleNumber} />
        <DetailRow label="Pass Number" value={item.passNumber} />
        <DetailRow label="RC/DL Number" value={item.dlOrRcNumber} />
        <DetailRow label="Owner Name" value={item.ownerName} />
        <DetailRow label="Owner Contact" value={item.ownerContact} />
        <DetailRow label="Address" value={item.permanentAddress} />
        <DetailRow label="Flat Number" value={item.flatNumber} />
        <DetailRow label="Flat Owner" value={item.flatOwnerName} />
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
        <Text style={styles.title}>Vehicle Records</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
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

export default DisplayScreen;
