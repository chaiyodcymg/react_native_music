import React, { Component, useEffect, useState } from 'react';
import {
    SafeAreaView, ScrollView, StatusBar, StyleSheet,
    Text, View, Button, TouchableOpacity, ImageBackground,
    FlatList, Image
} from 'react-native';
import { signOut, getAuth } from "firebase/auth";
import TrackPlayer, {
    Capability, Event, RepeatMode,
    State, usePlaybackState, useProgress
    , useTrackPlayerEvents, getQueue
} from 'react-native-track-player';
import { Tracks, Tracks2 } from "../list_music.js"

import Icon from 'react-native-vector-icons/FontAwesome';

const ListMusic = ({ navigation }) => {
    const renderItem = ({ item }) => {
        return (

            <TouchableOpacity onPress={() => navigation.navigate('Played')}>
                <StatusBar barStyle="light-content" />
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10, marginHorizontal: 10, }}>
                  
                    <Image source={item.artwork} style={{ width: 70, height: 70, marginHorizontal: 10,}} />
                    <View style={{  alignItems: "center", marginVertical: 5 }}>
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
  return (
      <View style={styles.container}>
          <View style={{ height: 50 }} />
          <View>
            <FlatList
              
                data={Tracks2}
                renderItem={renderItem}
            // showsHorizontalScrollIndicator={false}
            />
        </View>

    </View>
  )
}

export default ListMusic

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // height: '100%',
        flex: 1,
        flexGrow: 2,
        backgroundColor: "#000000"
    },
})