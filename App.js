import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { firestore, authentication } from './util/Firebase'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='AddScreen' component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

