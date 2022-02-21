/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import TabBar from '../components/TabBar';
import Text from '../components/Text';

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
      initialRouteName='Root'
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

  const navigation = useNavigation();

  const [profile,setProfile] = React.useState();

  const checkSession = async()=>{
    const session = await AsyncStorage.getItem('session');

    if (!session) {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Root' },
                ],
            })
        )
    }else{
      setProfile(JSON.parse(session))
    }
  }

  React.useEffect(()=>{
    checkSession()
  },[])

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
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home-outline" color={color} />,
            headerTitle:()=><Text size={18} weight="semi" >Hi, {profile?.name}</Text>
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
