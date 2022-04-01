/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Button, TouchableOpacity, Image ,Pressable
} from 'react-native';
import Login from './screens/Login';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Played from './screens/Played';
import Home from './screens/Home';
import ListMusic from './screens/ListMusic';
import Search from './screens/Search';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet from "./screens/BottomSheet";
import { Provider } from "react-native-paper";

import TrackPlayer, {
  Capability, Event, RepeatMode,
  State, usePlaybackState, useProgress
  , useTrackPlayerEvents, getQueue, TrackPlayerEvents
  , STATE_PLAYING
} from 'react-native-track-player';
import { Tracks } from "./list_music.js"
import Slider from '@react-native-community/slider';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const globalScreenOptions = {
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: "#87CEFA" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
}
const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

// const events = [
//   TrackPlayerEvents.PLAYBACK_STATE,
//   TrackPlayerEvents.PLAYBACK_ERROR
// ];



export default function App() {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  

  const [btnPlayer, setbtnPlayer] = useState('play');
  const [showPlayer, setshowPlayer] = useState(false);
  const [data, setdata] = useState([]);
  const auth = getAuth();
  
  // useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event) => {
  //   if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
  //     console.warn('An error occured while playing the current track.');
  //   }
  //   if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
  //     setshowPlayer(true);
  //   }
  // });
  
  useEffect(() => {

    onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      // console.log('login success')
    });
   
  });

  const SetShowButtonSheet = () => {
    setShow(true);

  }
  const SetStatusbtnPlay = () => {
    if (btnPlayer == "pause") {
      setbtnPlayer("play");
    } else {
      setbtnPlayer("pause");
    }
  }
  // if (user == null) {
  //   return <Login />;
  // }

 
  return (
    <Provider >
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'TabHome') {
            return (
              <Icon

                name='home'
                type='font-awesome'
                size={size}
                color={color}
          
              />
            );
          } else if (route.name === 'TabSearch') {
            return (
              <Icon

                name='search'
                type='font-awesome'
                size={size}
                color={color}

              />
            );
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'white',
      })}>
        <Tab.Screen options={{ headerShown: false }} name='TabHome' >
        {() => (
         <Stack.Navigator >
              <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
              <Stack.Screen options={{ headerShown: false }} name='ListMusic' component={ListMusic} />
              <Stack.Screen options={{ headerShown: false }} name='Played' component={Played} />
            </Stack.Navigator>
           
        )}
        </Tab.Screen>
          <Tab.Screen options={{ headerShown: false }} name='TabSearch'>
          {() => (
            <Stack.Navigator >
              <Stack.Screen options={{ headerShown: false }} name='Search' component={Search} />
         
            </Stack.Navigator>
          )}
        </Tab.Screen>
        
      </Tab.Navigator>
   
       
        {(showPlayer) && 
          <View>
          <View style={{
            position: "absolute",
            bottom: 48,
            left: 0,
            backgroundColor: "#9999ff",
            width: "100%",
            marginBottom: 0,
          }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 7,
            }}>
              <Pressable onPress={() => SetShowButtonSheet()} style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 80,
                // backgroundColor: "red"
              }}>
             
                <Image source={require('./image/F.hero.png')} style={{ width: 50, height: 50, marginHorizontal: 10, }} />
                <View style={{ alignItems: "center", marginVertical: 5 }}>
                  <Text style={{ color: "#ffffff" }}>
                    F.HERO Ft. LAZYLOXY & OG-ANIC
                  </Text>
                  <Text style={{ color: "#ffffff" }}>
                    มีแค่เรา
                  </Text>
                </View>
                
              </Pressable>
              <TouchableOpacity onPress={() => SetStatusbtnPlay()}>

                <Icon
                  name={btnPlayer}
                  type='font-awesome'
                  color='white'
                  size={28}
                 
                />
              </TouchableOpacity>
            </View>
             
          </View>
           <BottomSheet
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          enableBackdropDismiss
        >

          
            </BottomSheet>
          </View>
        }
        
       
    
      </NavigationContainer>
    </Provider>
  );
};

{/* <NavigationContainer theme={DarkTheme}>
  <Tab.Navigator>
    <Stack.Navigator >
      <Stack.Screen options={{ title: 'เข้าสู่ระบบ' }} name='Login' component={HomeStack} />
      <Stack.Screen options={{ headerShown: false }} name='Played' component={Played} />
      <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
      <Stack.Screen options={{ headerShown: false }} name='ListMusic' component={ListMusic} />
    </Stack.Navigator>
  </Tab.Navigator>
</NavigationContainer> */}

const styles = StyleSheet.create({
 
});


