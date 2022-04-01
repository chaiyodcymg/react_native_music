import React, { Component, useEffect, useState } from 'react';
import {
    SafeAreaView, ScrollView, StatusBar, StyleSheet,
    Text, View,  TouchableOpacity, ImageBackground,
    FlatList, Image, useWindowDimensions, Dimensions,
} from 'react-native';
import { signOut, getAuth } from "firebase/auth";
import TrackPlayer, {
    Capability, Event, RepeatMode,
    State, usePlaybackState, useProgress
    , useTrackPlayerEvents
} from 'react-native-track-player';
import { Tracks, Tracks2 } from "../list_music.js"

import Icon from 'react-native-vector-icons/FontAwesome';

import BottomSheet from "./BottomSheet";
import { Provider, DarkTheme, DefaultTheme } from "react-native-paper";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
const ListMusic = ({ navigation, route}) => {
    // const [isVisible, setIsVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [volumemusic, setVolumemusic] = useState(0.5);
    const renderItem = ({ item }) => {
        return (

            <TouchableOpacity
                onPress={() => setupToPlay() }
            >
               
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10, marginHorizontal: 10, }}>

                    <Image source={item.artwork} style={{ width: 50, height: 50, marginHorizontal: 10, }} />
                    <View style={{ alignItems: "center", marginVertical: 5 }}>
                        <Text style={{ color: "#ffffff" }}>
                            {item.artist}
                        </Text>
                        <Text style={{ color: "#ffffff" }}>
                            {item.title}
                        </Text>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
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
  
    return (
        <View style={styles.container}>
         <StatusBar style="light" />
      
            <StatusBar translucent backgroundColor='transparent' />
             <View style={{ height: 50 }} /> 
            <TouchableOpacity style={{ alignItems: "flex-start", marginLeft: 10, marginTop: 10 }}>
                 <Icon

                      name='angle-left'
                      type='font-awesome'
                      color='#f50'

                      size={30}
                      onPress={() => navigation.navigate('Home')}
                  />
              </TouchableOpacity>
            <View>
                
                <FlatList

                    data={Tracks2}
                    renderItem={renderItem}
                    style={styles.flatlist}
                // showsHorizontalScrollIndicator={false}
                />
              
              </View> 
          
            {/* <View style={{ height: 50 }} />  */}
            {/* <Button
                onPress={() => setShow(true)} title="Show Bottom Sheet"
                containerStyle={styles.button}
            /> */}                     
        </View >
    );
};

export default ListMusic

const styles = StyleSheet.create({
    container: {
       marginLeft:15,
       
             
            // backgroundColor: "black",
            // alignItems: "center",
            // justifyContent: "center",
    },
    flatlist: {
        maxHeight: "87%",
        marginBottom:0,
    },
  

})