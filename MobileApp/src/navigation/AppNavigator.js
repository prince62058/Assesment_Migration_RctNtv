import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View, Image } from 'react-native';
import { theme } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DisplayScreen from '../screens/DisplayScreen';
import AddVehicleScreen from '../screens/AddVehicleScreen';
import AddAdminScreen from '../screens/AddAdminScreen';
import UpdateVehicleScreen from '../screens/UpdateVehicleScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import CustomHeader from '../components/CustomHeader';

const MainTabNavigator = () => {
  const { user } = useAuth();
  const role = user?.role;

  const isSuperAdmin = role === 'superadmin';
  const isAdminOrSuper = ['admin', 'superadmin'].includes(role);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <CustomHeader />,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'AddVehicle') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Display') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Update') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'AddAdmin') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />

      {isAdminOrSuper && (
        <Tab.Screen
          name="AddVehicle"
          component={AddVehicleScreen}
          options={{ title: 'Add Vehicle' }}
        />
      )}

      {isAdminOrSuper && (
        <Tab.Screen
          name="Display"
          component={DisplayScreen}
          options={{ title: 'Display' }}
        />
      )}

      {isSuperAdmin && (
        <Tab.Screen
          name="Update"
          component={UpdateVehicleScreen}
          options={{ title: 'Manage' }}
        />
      )}

      {isSuperAdmin && (
        <Tab.Screen
          name="AddAdmin"
          component={AddAdminScreen}
          options={{ title: 'Add User' }}
        />
      )}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
