import React, { Component, useEffect, useState } from 'react';
import {
    SafeAreaView, ScrollView, StatusBar, StyleSheet,
    Text, View, Button, TouchableOpacity, ImageBackground,
    FlatList, Image, Alert
} from 'react-native';

import TrackPlayer, {
    Capability, Event, RepeatMode,
    State, usePlaybackState, useProgress
    , useTrackPlayerEvents, getQueue
} from 'react-native-track-player';
import { Tracks, Tracks2 } from "../list_music.js"

import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar } from 'react-native-elements';
import { Provider, DarkTheme, DefaultTheme } from "react-native-paper";
import BottomSheet from "./BottomSheet";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from "firebase/database";

const Home = ({  navigation }) => {
   

    const [show, setShow] = useState(false);
    const authen = auth;
    
    const SignOut = () => {
        Alert.alert(
            "ออกจากระบบ",
            "คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ",
            [
                {
                    text: "ยกเลิก",
                    
                    style: "cancel"
                },
                {
                    text: "ออกจากระบบ", onPress: () => 
                    signOut(authen).then(() => {
                        TrackPlayer.stop();
                        console.log("signout");
                    }).catch((error) => {
                        alert(error.message)
                    }) }
            ]
        );
        
    }
    // const SignOut = () => {
    //     global.app.setState({logined:false});
    //     this.setState({});
    // }

    const getdata = () => {
        const db = getDatabase();
        const starCountRef = ref(db, 'listmusic/');
        onValue(starCountRef, (snapshot) => {

            const data = snapshot;
            console.log(data);
            // return this.showmsg = data;
        });
    };
    useEffect(() => {

      

  },[])
   
    const renderItem = ({ item }) => {
        return (

            <TouchableOpacity onPress={() => getdata()
            }>  
                <View style={{ alignItems: "center", marginHorizontal: 10, }} >
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
                    color='#ffffff'

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
        // backgroundColor: "#000000"
    },
})