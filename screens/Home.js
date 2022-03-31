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
import { ListItem, Avatar } from 'react-native-elements';

const Home= ({  navigation }) => {
    const auth = getAuth();
    const SignOut = () => {
        signOut(auth).then(() => {
            TrackPlayer.stop();
            navigation.replace('Login');
        }).catch((error) => {
            alert(error.message)
        });
    }
    const renderItem = ({ item }) => {
        return (

            <TouchableOpacity onPress={() => navigation.navigate('ListMusic')}>
            <View style={{ alignItems: "center", marginHorizontal: 10, }}>
                <StatusBar barStyle="light-content"/>
                <Image source={item.artwork} style={{ width: 150, height: 150 }} />
                <View style={{ alignItems: "center", marginVertical: 5 }}>
                    <Text style={{ color: "#ffffff"}}>
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
        
        // <ImageBackground source={require('../image/back-index.png')}
        //     style={{
        //         width: '100%',
        //         height: '100%',
        //         paddingBottom: 0,
        //         margin:0
        //         }}>
            
        <View style={styles.container}>
            <ScrollView>
                <View style={{ height: 50 }} />
                
                <StatusBar translucent backgroundColor='transparent' />
                
             <TouchableOpacity style={{ alignItems: "flex-end", marginRight: 10, marginTop: 10 }}>
                 <Icon

                    name='sign-out'
                    type='font-awesome'
                    color='#f50'

                    size={30}
                    onPress={SignOut}
                />
            </TouchableOpacity>
            <Text style={{ textAlign: "left", color: "#ffffff", fontSize: 22, fontWeight: "800", marginLeft: 10 }}>สวัสดีตอนเย็น</Text>
           
                <View style={{ marginVertical: 10 }}>
            <FlatList
                horizontal
                data={Tracks}
                renderItem={renderItem}
                //   keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                />
            </View>
            
            <Text style={{textAlign:"left",color:"#ffffff",fontSize:22,fontWeight:"800",marginLeft:10}}>ศิลปินที่แนะนำ</Text>
            <View style={{ marginVertical: 10 }}>
            <FlatList
                horizontal
                data={Tracks2}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />
            </View>

                <View style={{ marginVertical: 10 }}>
                    <FlatList
                        horizontal
                        data={Tracks}
                        renderItem={renderItem}
                        //   keyExtractor={(item) => item}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <Text style={{ textAlign: "left", color: "#ffffff", fontSize: 22, fontWeight: "800", marginLeft: 10 }}>ศิลปินที่แนะนำ</Text>
                <View style={{ marginVertical: 10 }}>
                    <FlatList
                        horizontal
                        data={Tracks2}
                        renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
        </View> 
    // </ImageBackground>
       
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // height: '100%',
        flex: 1,
        flexGrow: 2,
        backgroundColor: "#000000"
    },
})