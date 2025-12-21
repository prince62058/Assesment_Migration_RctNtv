import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import api from '../api/axios';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!search.trim()) return;

    if (!user) {
      Alert.alert('Login Required', 'Please login to search.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Go to Login', onPress: () => navigation.navigate('Login') },
      ]);
      return;
    }

    try {
      const normalizedSearch = search.toUpperCase().replace(/[\s-]/g, '');

      const response = await api.get(
        `/vehicles/search?query=${normalizedSearch}`,
      );

      setData(response.data || null);
      setStatus(200);
    } catch (error) {
      console.log('Search error:', error);
      setData(null);
      setStatus(404);
    }
  };

  const handleReset = () => {
    setSearch('');
    setStatus(0);
    setData(null);
    setModalVisible(false);
  };

  const ResultCard = () => {
    if (status === 0) return null;

    const isValid = status === 200;
    const bgColor = isValid ? '#dcfce7' : '#fee2e2';
    const borderColor = isValid ? '#86efac' : '#fca5a5';
    const textColor = isValid ? '#15803d' : '#b91c1c';
    const iconSource = isValid
      ? require('../assets/check.png')
      : require('../assets/Wrong.png');

    return (
      <Pressable
        style={({ pressed }) => [
          styles.resultCard,
          { backgroundColor: bgColor, borderColor: borderColor },
          pressed && { opacity: 0.9 },
        ]}
        onPress={() => isValid && setModalVisible(true)}
        disabled={!isValid}
      >
        <Image
          source={iconSource}
          style={styles.resultIcon}
          resizeMode="contain"
        />
        <Text style={[styles.resultTitle, { color: textColor }]}>
          {isValid ? 'Valid' : 'Vehicle Not Found'}
        </Text>
        {isValid && (
          <Text style={[styles.resultSubtitle, { color: '#166534' }]}>
            Details Found
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <Pressable
            onPress={logout}
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        <View style={styles.centerContent}>
          <Image
            source={require('../assets/vv.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter Vehicle Number"
              value={search}
              onChangeText={text => {
                setSearch(text);
                if (status !== 0) {
                  setStatus(0);
                  setData(null);
                }
              }}
              autoCapitalize="characters"
            />
            <Pressable
              style={({ pressed }) => [
                styles.searchButton,
                !search.trim() && styles.searchButtonDisabled,
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleSearch}
              disabled={!search.trim()}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
          </View>

          <ResultCard />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{data?.vehicleNumber}</Text>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={({ pressed }) => [pressed && { opacity: 0.5 }]}
                >
                  <Text style={styles.closeButton}>✕</Text>
                </Pressable>
              </View>

              <ScrollView style={styles.modalBody}>
                <DetailRow label="Owner Name" value={data?.ownerName} />
                <DetailRow label="Owner Contact" value={data?.ownerContact} />
                <DetailRow
                  label="Alternate Contact"
                  value={data?.alternateContact}
                />
                <DetailRow label="Flat Owner" value={data?.flatOwnerName} />
                {data?.flatOwnerContact && (
                  <DetailRow
                    label="Flat Owner Contact"
                    value={data?.flatOwnerContact}
                  />
                )}
                <DetailRow
                  label="Valid Till"
                  value={
                    data?.validTill
                      ? new Date(data.validTill).toLocaleDateString()
                      : ''
                  }
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ScreenWrapper>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value || '-'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.md,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 50,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  searchInput: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderTopLeftRadius: theme.borderRadius.md,
    borderBottomLeftRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: theme.borderRadius.md,
    borderBottomRightRadius: theme.borderRadius.md,
  },
  searchButtonDisabled: {
    backgroundColor: theme.colors.secondary,
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  resultCard: {
    width: '80%',
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: theme.spacing.lg,
  },
  resultIcon: {
    width: 80,
    height: 80,
    marginBottom: theme.spacing.sm,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  resultSubtitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
    maxHeight: '80%',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  closeButton: {
    fontSize: 24,
    color: theme.colors.textSecondary,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  detailLabel: {
    fontWeight: '600',
    color: theme.colors.textSecondary,
    flex: 1,
  },
  detailValue: {
    color: theme.colors.text,
    flex: 1,
    textAlign: 'right',
  },
});

export default HomeScreen;
