import React, { Component, useEffect, useState } from 'react';
import {
    SafeAreaView, ScrollView, StatusBar, StyleSheet,
    Text, View, TouchableOpacity, ImageBackground,
    FlatList, Image, useWindowDimensions, Dimensions,
} from 'react-native';
import { signOut, getAuth } from "firebase/auth";
import TrackPlayer, {
    Capability, Event, RepeatMode,
    State, usePlaybackState, useProgress
    , useTrackPlayerEvents
} from 'react-native-track-player';


import Icon from 'react-native-vector-icons/FontAwesome';

import BottomSheet, { ShowStatusPlayer } from "./BottomSheet";
import { Provider, DarkTheme, DefaultTheme } from "react-native-paper";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import { getDatabase, ref, onValue } from "firebase/database";
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
const ListMusic = ({ route, navigation }) => {
    // const [isVisible, setIsVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [volumemusic, setVolumemusic] = useState(0.5);
    const playbackState = usePlaybackState();
    const [indexTrack, setindexTrack] = useState(0);

    const { nameartist, photo_uri, color, nameshow } = route.params;

    //const { nameartist } = route.params;
    const [listmusic, setlistmusic] = useState(null);
    const [allmusic, setallmusic] = useState(null);
    const [dataartist, setDataartist] = useState(null);
    // { JSON.stringify(itemId) }

    const renderItem = ({ item }) => {

        // console.log(item);
        return (
            <View>

                <TouchableOpacity
                    onPress={() => setupToPlay(item.id)}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, marginHorizontal: 10, }}>

                        <Image source={{ uri: item.artwork }} style={{ width: 50, height: 50, marginHorizontal: 10, }} />
                        <View style={{ marginVertical: 5 }}>
                            <Text style={{ color: "#ffffff", fontSize: 16, }}>
                                {item.title}
                            </Text>
                            <Text style={{ color: "rgb(210, 210, 210)", fontSize: 14, }}>
                                {item.artist}
                            </Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        );
    }





    const setupToPlay = async (id) => {
        // const tracks = await TrackPlayer.getQueue();
        // console.log( tracks[0].artist);
        // console.log(listmusic[0].artist);
        const currentTrack = await TrackPlayer.getCurrentTrack();
        // console.log("crren =" + currentTrack);
        if (currentTrack != null) {
            await TrackPlayer.skip(id);
            await TrackPlayer.play();
        }

        else {
            TrackPlayer.setupPlayer({});
            TrackPlayer.updateOptions({
                stopWithApp: true,
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    //     Capability.SkipToNext,
                    //     Capability.SkipToPrevious,
                    // Capability.Stop
                ],

            });

        await  TrackPlayer.add(allmusic);
            await TrackPlayer.skip(id);
            await TrackPlayer.play();
        }
      
    };
    useEffect(() => {
        // console.log(nameartist);
        const db = getDatabase();
        const starCountRef = ref(db, 'listmusic/' + nameartist);
        onValue(starCountRef,async (snapshot) => {

            const data =await snapshot.val();

            setlistmusic(data);

        });


        const starCountRef2 = ref(db, 'allmusic/');
        onValue(starCountRef2,async (snapshot) => {

            const data =await snapshot.val();
            setallmusic(data);;
        });

    }, []);
    return (
        <LinearGradient colors={[color, '#000000', '#000000']} style={styles.container}>
            {listmusic == null &&
                <View style={[StyleSheet.absoluteFillObject, styles.container_spiner]}>


                </View>
            }
            {listmusic == null &&
                <LottieView style={styles.spiner} source={require('../image/loader_logo.json')} autoPlay loop />
            }

            <StatusBar translucent backgroundColor='transparent' style="light" />
            <View style={{ height: 50 }} />
            <TouchableOpacity
                style={{ alignItems: "flex-start", marginLeft: 20, marginTop: 10 }}
                onPress={() => navigation.navigate('Home')}

            >
                <Icon

                    name='angle-left'
                    type='font-awesome'
                    color='#ffffff'

                    size={26}
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.1)", paddingLeft: 13, paddingRight: 14, paddingVertical: 4, borderRadius: 75
                    }}
                />
            </TouchableOpacity>

            <View style={{ maxHeight: "100%" }}>

                <View style={{ alignItems: "center", justifyContent: "center", }}>
                    <Image source={{ uri: photo_uri }} style={{ width: 200, height: 200, marginBottom: 10, marginTop: 30 }} />
                    <Text style={{ color: "#ffffff", fontSize: 26, marginBottom: 10, }}>{nameshow}</Text>

                </View>
                <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold", marginBottom: 10, marginLeft: 20 }}>ผลงานเพลง</Text>
                <FlatList
                    data={listmusic}

                    renderItem={renderItem}

                    showsHorizontalScrollIndicator={false}
                />


            </View>



        </LinearGradient >
    );
};

export default ListMusic

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        // marginLeft: 15,


        // backgroundColor: "black",
        // alignItems: "center",
        // justifyContent: "center",
    },
    flatlist: {
        // maxHeight: "87%",
        // marginBottom: 0,
    },
    containerstyle: {
        flex: "1",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 10,
    },
    button: {
        backgroundColor: '#1ed660',
        borderRadius: 25,
        padding: 20,
        paddingHorizontal: 60,
        paddingVertical: 15,
    },
    buttonText: {
        fontSize: 20,
        color: '#ffffff',
    },
        container_spiner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(46, 46, 46)',
        zIndex: 1,
        opacity: 0.6,
    },
    spiner: {
        zIndex: 2,
    },

})