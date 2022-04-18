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
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
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
import Video from 'react-native-video';
import { ProgressBar, Colors } from 'react-native-paper';
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







export default function App({ navigation }) {



  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);


  const [btnPlayer, setbtnPlayer] = useState('play');
  const showPlayer = useRef(false);
  const trackArtwork = useRef(null);
  const trackTitle = useRef(null);
  const trackArtist = useRef(null);
  const trackList = useRef(null);
  const [backcolor, setbackcolor] = useState("#000000");
  const [TimeStart, setTimeStart] = useState(0);


  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [statusTimeStart, setstatusTimeStart] = useState(0);
  const [statusTimeEnd, setstatusTimeEnd] = useState(0);
  const [check, setcheck] = useState(0);
  const [volumemusic, setVolumemusic] = useState(0.5);

  useTrackPlayerEvents(
    [
      Event.PlaybackQueueEnded,
      Event.PlaybackTrackChanged,
      Event.RemotePlay,
      Event.RemotePause,
      Event.RemoteSkip
    ],
    async event => {

      console.log(event);

      if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== undefined) {

        // setcheck(check);
        // console.log(playbackState);
        // const tracks = await TrackPlayer.getQueue();
        // if (event.nextTrack != 0) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const { title, artist, artwork, color } = track || {};
        // console.log(track);
        trackTitle.current = title;
        trackArtwork.current = artwork;
        trackArtist.current = artist;
        showPlayer.current = true;
        // console.log(track);
        setbackcolor(color);
        // }

        // console.log("playbackState = " + playbackState);
        // console.log("playbackState = "+playbackState);
        //   // setbtnPlayer("pause");
        // console.log("State  = "+State.Paused);
        // if (playbackState == State.Paused) {

        //   setbtnPlayer("play");
        // } else if (playbackState == State.Playing) {

        setbtnPlayer("pause");
        TrackPlayer.setVolume(value);
        setVolumemusic(value);
        // }
      } else if (event.type == Event.RemotePlay) {
        setbtnPlayer("pause");
      }
      else if (event.type == Event.RemotePause) {
        setbtnPlayer("play");
      }
      else {


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
    // console.log(progress.position);
  }, []);

  const SetShowButtonSheet = () => {
    setShow(true);

  }
  const PlayBack = async (playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      if (playbackState == State.Paused) {
        setbtnPlayer("pause");
        await TrackPlayer.play();
      } else {
        setbtnPlayer("play");
        await TrackPlayer.pause();

      }
    }
  }
  const SkipTo = async () => {
    try {

      await TrackPlayer.skipToNext()
      await TrackPlayer.play();
    } catch (error) {

    }

  }
  const SkipBack = async () => {
    try {

      await TrackPlayer.skipToPrevious();
      await TrackPlayer.play();
    } catch (error) {

    }
  }
  if (user == null) {
    showPlayer.current = false;
  }
  const setVolume_Music = async (value) => {
    TrackPlayer.setVolume(value);
    setVolumemusic(value);
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

      >

        {user == null ? (

          <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
          </Stack.Navigator>

        ) : (

          <Stack.Navigator >


            <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
            <Stack.Screen options={{ headerShown: false }} name='ListMusic' component={ListMusic} />
            <Stack.Screen options={{ headerShown: false }} name='Played' component={Played} />
          </Stack.Navigator>






        )
        }


        {(showPlayer.current) &&
          <View>


            <View style={{
              position: "absolute",
              bottom: 0,
              left: 4,
              backgroundColor: backcolor,
              width: "98%",
              marginBottom: 0,
              borderRadius: 10,
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
                    maxWidth: 365,
                    minWidth: 365,


                    // backgroundColor: "red",

                  }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <Image source={{ uri: trackArtwork.current }} style={{ width: 45, height: 45, marginLeft: 5, marginRight: 10, marginBottom: 3, marginTop: 7, borderRadius: 10, }} />


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
                  style={styles.btn_close}
                >

                  <Icon
                    name={btnPlayer}
                    type='font-awesome'
                    color='white'
                    size={22}

                  />
                </TouchableOpacity>

              </View>

              <ProgressBar progress={progress.position / progress.duration} color={"#FFFFFF"} style={{ marginLeft: 10, marginBottom: 1, width: "95%", height: 2.5 }} />
            </View>

            <BottomSheet
              show={show}
              onDismiss={() => {
                setShow(false);
              }}
              enableBackdropDismiss
              color={backcolor}
            >
              <View style={styles.ViewbackgroundVideo}>
                {/* <Video
                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-music-b727c.appspot.com/o/blackpinkcrop.mp4?alt=media&token=b90cdaaf-3f95-45df-98c3-423cdcce370c" }}
                style={styles.backgroundVideo}
                muted={true}
                repeat={true}
                resizeMode={'cover'}
                rate={1.0}
                ignoreSilentSwitch={'obey'}
                /> */}
              </View>
              <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

                {/* <View style={{ height:450,}}/> */}
                <Image source={{ uri: trackArtwork.current }} style={{ width: "90%", height: 350, marginTop: 40, marginBottom: 20, }} />
                <Text style={{ color: "white", fontSize: 20, fontWeight: "800" }}>
                  {trackTitle.current}
                </Text>
                <Text style={{ color: "#d9d9d9", fontSize: 16, fontWeight: "600" }}>
                  {trackArtist.current}
                </Text>

                <View style={{ flexDirection: 'column', width: "90%", marginTop: 20 }}>
                  <Slider
                    style={{ width: "100%", height: 15 }}
                    value={progress.position}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="rgb(217, 217, 217)"
                    thumbTintColor="white"
                    size={1}
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

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 50 }}>
                  <TouchableOpacity onPress={() => SkipBack()}
                  // style={{ marginRight: 50 }}
                  >

                    <Icon
                      name="step-backward"
                      type='font-awesome'
                      color='#f2f2f2'
                      size={32}

                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => PlayBack(playbackState)}
                    style={{
                      marginRight: 75, marginLeft: 75, backgroundColor: "rgb(255, 255, 255)",
                      paddingLeft: 20,
                      paddingVertical: 16,
                      borderRadius: 75,
                      maxHeight: 58, minHeight: 58
                      , maxWidth: 60, minWidth: 60
                    }}
                  >

                    <Icon
                      name={btnPlayer}
                      type='font-awesome'
                      color='black'
                      size={25}

                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => SkipTo()}
                  // style={{ marginRight: 10 }}
                  >

                    <Icon
                      name="step-forward"
                      type='font-awesome'
                      color='white'
                      size={32}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ maxWidth: 30, minWidth: 30 }}>
                    {parseInt(volumemusic * 100) <= 0 &&
                      <Icon
                        name="volume-off"
                        type='font-awesome'
                        color='#f2f2f2'
                        size={30}

                      />
                    }
                    {(parseInt(volumemusic * 100) >= 1 && parseInt(volumemusic * 100) < 75) &&
                      <Icon
                        name="volume-down"
                        type='font-awesome'
                        color='#f2f2f2'
                        size={30}

                      />
                    }
                    {parseInt(volumemusic * 100) >= 75 &&
                      <Icon
                        name="volume-up"
                        type='font-awesome'
                        color='#f2f2f2'
                        size={30}

                      />
                    }
                  </View>
                  {/* <Text>{parseInt(volumemusic * 100)}%</Text> */}
                  <Slider
                    style={{ width: "60%", height: 30, marginLeft: 0 }}
                    value={0.5}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="rgb(217, 217, 217)"
                    thumbTintColor="white"
                    onValueChange={value => setVolume_Music(value)}
                  />

                </View>
              </View>


            </BottomSheet>
          </View>
        }



      </NavigationContainer>
    </Provider>
  );
};



const styles = StyleSheet.create({
  backgroundVideo: {
    width: "100%",
    height: '100%',
    zIndex: -1,
    position: 'absolute',

  },
  ViewbackgroundVideo: {
    width: "100%",
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    opacity: 0.4,
    backgroundColor: "black"
  },
  btn_close: {
    marginRight: 20,

  }
});


