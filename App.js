/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Button, TouchableOpacity, Image, Pressable, FlatList
} from 'react-native';
import Login from './screens/Login';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Played from './screens/Played';
import Home from './screens/Home';
import ListMusic from './screens/ListMusic';
import Search from './screens/Search';
import Register from './screens/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet from "./screens/BottomSheet";
import { Provider } from "react-native-paper";


//yun

// import Register from './screens/Register';

import TrackPlayer, {
  Capability, Event, RepeatMode,
  State, usePlaybackState, useProgress
  , useTrackPlayerEvents, getQueue, TrackPlayerEvents
  , STATE_PLAYING
} from 'react-native-track-player';
import { Tracks } from "./list_music.js"
import Slider from '@react-native-community/slider';


import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import Welcome from './screens/Welcome';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const globalScreenOptions = {
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: "#87CEFA" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
}

// const events = [
//   TrackPlayerEvents.PLAYBACK_STATE,
//   TrackPlayerEvents.PLAYBACK_ERROR
// ];







export default function App({navigation}) {



  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);


  const [btnPlayer, setbtnPlayer] = useState('play');
  const showPlayer = useRef(false);
  const trackArtwork = useRef(null);
  const trackTitle = useRef(null);
  const trackArtist = useRef(null);
  const trackList = useRef(null);
  const [TimeStart, setTimeStart] = useState(0);


  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [statusTimeStart, setstatusTimeStart] = useState(0);
  const [statusTimeEnd, setstatusTimeEnd] = useState(0);

  useTrackPlayerEvents(
    [
      Event.PlaybackQueueEnded,
      Event.PlaybackTrackChanged,
      Event.RemotePlay,
      Event.RemotePause,
    ],
    async event => {

      console.log(event.type);
  
      if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== undefined) {
      

        // console.log(playbackState);
        // console.log(State)
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const { title, artist, artwork } = track || {};
        // console.log(track);
        trackTitle.current = title;
        trackArtwork.current = artwork;
        trackArtist.current = artist;
     
    
          showPlayer.current = true;
        // console.log("playbackState = " + playbackState);
        // console.log("playbackState = "+playbackState);
        //   // setbtnPlayer("pause");
        // console.log("State  = "+State.Paused);
        if (playbackState == State.Paused) {
      
          setbtnPlayer("play");
        } else if (playbackState == State.Playing) {
 
          setbtnPlayer("pause");
        }
      }
 
       
      else {
     
        showPlayer.current = true;
        // }
        setbtnPlayer('play')
        console.log('Event.PlaybackQueueEnded fired.');
      }
      // console.log(Event.PlaybackQueueEnded);
    },
  );


  const authen = auth;
  useEffect(() => {

    onAuthStateChanged(authen, (authUser) => {
      setUser(authUser);
   
    });

  }, []);

  const SetShowButtonSheet = () => {
    setShow(true);

  }
  const PlayBack = async (playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      if (playbackState == State.Paused) {
  
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
 
      }
    }
  }
  const SkipTo = async () => {
    try {

      await TrackPlayer.skipToNext()
    } catch (error) {

    }

  }
  const SkipBack = async () => {
    try {

      await TrackPlayer.skipToPrevious();
    } catch (error) {

    }
  }
  // const SetStatusbtnPlay = () => {
  //   if (btnPlayer == "pause") {
  //     setbtnPlayer("play");
  //   } else {
  //     setbtnPlayer("pause");
  //   }
  // }
  // const screen = '';
  // if (user == null) {
 
  //   <Stack.Navigator >
  //         <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
  //         <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
  //       </Stack.Navigator>

  
  // } else {
  //     <Tab.Screen options={{ headerShown: false }} name='TabHome' >
  //     {() => (
  //       <Stack.Navigator >

  //         <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
  //         <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
  //         <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
  //         <Stack.Screen options={{ headerShown: false }} name='ListMusic' component={ListMusic} />
  //         <Stack.Screen options={{ headerShown: false }} name='Played' component={Played} />
  //       </Stack.Navigator>

  //     )}
  //   </Tab.Screen>
  // }

  const renderItem = ({ item }) => {
    // console.log(item.artwork);
    return (
      <View style={{ marginHorizontal: 20, height: 60, justifyContent: "center" }}>
        <Image source={item.artwork} style={{ width: 50, height: 50, }} />
      </View>
    )
  }
  return (
    <Provider >
      <NavigationContainer
        theme={DarkTheme}
      >
       
          {user == null ? (
         
            <Stack.Navigator >
              <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
            </Stack.Navigator>
          
        ) : (
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
          )
        }
              {/* <Tab.Screen options={{ headerShown: false }} name='TabHome' >
                {() => (
                  <Stack.Navigator >

                    <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
                    <Stack.Screen options={{ headerShown: false }} name='ListMusic' component={ListMusic} />
                    <Stack.Screen options={{ headerShown: false }} name='Played' component={Played} />
                  </Stack.Navigator>

                )}
                </Tab.Screen> */}
        
        

         


        {(showPlayer.current) &&
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

              }}>

                <Pressable
                  onPress={() => SetShowButtonSheet()}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    maxWidth: 370,
                    minWidth: 370,


                    // backgroundColor: "red",

                  }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <Image source={trackArtwork.current} style={{ width: 50, height: 50, }} />
                    {/* <FlatList
                      contentContainerStyle={{ alignSelf: 'flex-start' }}
                      data={Tracks}
                      renderItem={renderItem}
                   
                      keyExtractor={item => item}
                      style={{ maxWidth:200}}
                      horizontal
                    
                      showsHorizontalScrollIndicator={false}
                      /> */}

                    <View >
                      <Text style={{ color: "#ffffff" }}>
                        {trackArtist.current}

                      </Text>
                      <Text style={{ color: "#ffffff" }}>

                        {trackTitle.current}
                      </Text>
                    </View>
                  </View>
                </Pressable>

                <TouchableOpacity
                  onPress={() => PlayBack(playbackState)}
                  style={{ marginRight: 20 }}
                >

                  <Icon
                    name={btnPlayer}
                    type='font-awesome'
                    color='white'
                    size={22}

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
              <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

                <Image source={trackArtwork.current} style={{ width: "90%", height: 350, marginTop: 40, marginBottom: 20, }} />

                <Text style={{ color: "white", fontSize: 20, fontWeight: "800" }}>
                  {trackArtist.current}
                </Text>
                <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
                  {trackTitle.current}
                </Text>
                <View style={{ flexDirection: 'column', width: "90%", marginTop: 20, }}>
                  <Slider
                    style={{ width: "100%", height: 15 }}
                    value={progress.position}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="rgb(217, 217, 217)"
                    thumbTintColor="white"
                    onValueChange={(value) => {
                      // progress.position = value
                      // console.log("value =" + progress.position)
                      setstatusTimeStart(value);
                      // setstatusTimeEnd(value);
                    }}
                    onSlidingComplete={async (value) => {
                      // console.log("value =" + value)
                      await TrackPlayer.seekTo(value);


                    }}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={{ color: "#f2f2f2", height: 40, fontSize: 12, fontWeight: "700", marginLeft: 15 }}>

                      {new Date(progress.position * 1000).toISOString().substring(14, 19)}
                    </Text>

                    <Text style={{ color: "#f2f2f2", height: 40, fontSize: 12, fontWeight: "700", marginRight: 15 }}>
                      {(new Date((progress.duration - progress.position) * 1000).toISOString().substring(14, 19) != "00:00") && <Text>-</Text>}

                      {new Date((progress.duration - progress.position) * 1000).toISOString().substring(14, 19)}

                    </Text>
                  </View>

                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                  <TouchableOpacity onPress={() => SkipBack()}
                  // style={{ marginRight: 50 }}
                  >

                    <Icon
                      name="step-backward"
                      type='font-awesome'
                      color='#f2f2f2'
                      size={35}

                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => PlayBack(playbackState)}
                    style={{ marginRight: 80, marginLeft: 80 }}
                  >

                    <Icon
                      name={btnPlayer}
                      type='font-awesome'
                      color='white'
                      size={35}

                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => SkipTo()}
                  // style={{ marginRight: 10 }}
                  >

                    <Icon
                      name="step-forward"
                      type='font-awesome'
                      color='white'
                      size={35}
                    />
                  </TouchableOpacity>
                </View>
              </View>


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


