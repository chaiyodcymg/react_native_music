
import React, { Component, useEffect, useState } from 'react';
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,View,Button, TouchableOpacity, ImageBackground} from 'react-native';
import { signOut ,getAuth } from "firebase/auth";
import TrackPlayer, {
    Capability, Event, RepeatMode,
    State, usePlaybackState, useProgress
    , useTrackPlayerEvents, getQueue
} from 'react-native-track-player';
import { Tracks } from "../list_music.js"
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';


const Home = ({  navigation }) => {

    const [volumemusic, setVolumemusic] = useState(0.5);
    const [repeatMode, setRepeatMode] = useState('off');
    const [btnPlayer, setbtnPlayer] = useState('pause');


    TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop
        ]
    });

    const setupToPlay = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(Tracks);
        await TrackPlayer.play();
        await TrackPlayer.setVolume(volumemusic);
    };

    useEffect(() => {
     
        setupToPlay();
    },[]);
        


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

    const trackStop = async () => {
        TrackPlayer.stop();
    }
    const SkipTo = async () => {
        await TrackPlayer.skipToNext()
    }
    const SkipBack = async () => {
        await TrackPlayer.skipToPrevious();
    }
    const playbackState = usePlaybackState();
    const progress = useProgress();
    
    const setVolume_Music = async (value) => {
        TrackPlayer.setVolume(value);
        setVolumemusic(value);
    }
    const repeatChange = () => {
        if (repeatMode == 'off') {
            TrackPlayer.setRepeatMode(RepeatMode.Track)
            setRepeatMode('track');
        }
        if (repeatMode == 'track') {
            TrackPlayer.setRepeatMode(RepeatMode.Queue)
            setRepeatMode('repeat');
        }
        if (repeatMode == 'repeat') {
            TrackPlayer.setRepeatMode(RepeatMode.Off)
            setRepeatMode('off');
        }
    }

  
    return (
       
        <View>
            <StatusBar barStyle="dark-content" />
            <View style={{ height: 50 }} />
        
          <View style={{ height: 100 }} />
          <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: "#000000" }}>
                  {new Date(progress.position * 1000).toISOString().substring(14, 19)}
              </Text>

             
              <Slider
                  style={{ width: 200, height: 40 }}
                  value={progress.position}
                  minimumValue={0}
                  maximumValue={progress.duration}
                  minimumTrackTintColor="red"
                  maximumTrackTintColor="#000000"
                  onSlidingComplete={async (value) => {
                      await TrackPlayer.seekTo(value);
                  }}
              />

              <Text style={{ color: "#000000" }}>
                  {new Date((progress.duration - progress.position) * 1000).toISOString().substring(14, 19)}
              </Text>

          </View>
          <View style={{ flexDirection: "column" }}>
              <Slider
                  style={{ width: 200, height: 40 }}
                  value={0.5}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="red"
                  maximumTrackTintColor="#000000"
                  onValueChange={value => setVolume_Music(value)}
              />
              <Text>{parseInt(volumemusic * 100)}%</Text>
          </View>
          <View style={{ height: 100 }} />
      
          {/* <Button onPress={setupToPlay} title="Select"></Button> */}
          <Button onPress={() => PlayBack(playbackState)} title="Play"></Button>
          <Button onPress={trackStop} title="stop"></Button>
          <Button onPress={SkipTo} title="=>"></Button>
          <Button onPress={SkipBack} title="<="></Button>
          <Button onPress={repeatChange} title={repeatMode}></Button>
            </View>
       
  )
}

export default Home

const styles = StyleSheet.create({})