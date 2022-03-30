/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Button
} from 'react-native';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ListMusic from './screens/ListMusic';



const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: "#87CEFA" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
}
export default function App() {
  

  return (
 
    <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen options={{ title: 'เข้าสู่ระบบ' }} name='Login' component={Login} />
        <Stack.Screen options={{  headerShown: false }} name='Home' component={Home} />
        <Stack.Screen options={{  headerShown: false }} name='ListMusic' component={ListMusic} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
 
});


