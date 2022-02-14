/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Index from '../screens/Index';
import Login from '../screens/Login';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Login'
    >
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Index"
      screenOptions={{
        tabBarActiveTintColor   : Colors.primary,
        tabBarInactiveTintColor :Colors.textSecondary,
      }}>
      <BottomTab.Screen
        name="Index"
        component={Index}
        options={({ navigation }: RootTabScreenProps<'Index'>) => ({
          title: 'Beranda',
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home-outline" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Items"
        component={Index}
        options={{
          title: 'Produk',
          tabBarIcon: ({ color }) => <TabBarIcon name="md-cube-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="History"
        component={Index}
        options={{
          title: 'Notifikasi',
          tabBarIcon: ({ color }) => <TabBarIcon name="md-notifications-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Index}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="md-person-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}
