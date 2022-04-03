import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    View, StatusBar, ScrollView, Text, TouchableOpacity, Image
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import {  Portal } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import Played from './Played'
import TrackPlayer, {
    Capability, Event, RepeatMode,
    State, usePlaybackState, useProgress
    , useTrackPlayerEvents, getQueue
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';


const BottomSheet = ({show, onDismiss, enableBackdropDismiss, children }) => {
    const bottomSheetHeight = Dimensions.get("window").height * 1.0;
    const deviceWidth = Dimensions.get("window").width;
    const [open, setOpen] = useState(show);
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;

    const [showPlayer, setshowPlayer] = useState(false);
    const [trackArtwork, setTrackArtwork] = useState("");
    const [trackTitle, setTrackTitle] = useState("");
    const [trackArtist, setTrackArtist] = useState("");

    const onGesture = (event) => {
        if (event.nativeEvent.translationY > 0) {
            bottom.setValue(-event.nativeEvent.translationY);
        }
    };

    const onGestureEnd = (event) => {
        if (event.nativeEvent.translationY > bottomSheetHeight / 2) {
            onDismiss();
        } else {
            bottom.setValue(0);
        }
    };

    useEffect(() => {
       
        if (show) {
            setOpen(show);
            Animated.timing(bottom, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
          
        } else {
            Animated.timing(bottom, {
                toValue: -bottomSheetHeight,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setOpen(false);
            });
        }
    }, [show]);

    if (!open) {
        return null;
    }
    // useTrackPlayerEvents(
    //     [
    //         Event.PlaybackQueueEnded,
    //         Event.PlaybackTrackChanged,
    //         Event.RemotePlay,
    //         Event.RemotePause,
    //     ],
    //     async event => {
    //         if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== undefined) {
    //             // const track = await TrackPlayer.getTrack(event.nextTrack);
    //             // console.log("เข้าา")
    //             setshowPlayer(true);
    //             setbtnPlayer('pause')
    //             const track = await TrackPlayer.getTrack(event.nextTrack);
    //             const { title, artist, artwork } = track || {};
    //             console.log(title);
    //             setTrackTitle(title);
    //             setTrackArtist(artist);
    //             setTrackArtwork(artwork);
    //             // console.log(tracks);

    //         }

    //         else {
    //             setshowPlayer(false);
    //             setbtnPlayer('play')
    //             console.log('Event.PlaybackQueueEnded fired.');
    //         }
    //         // console.log(Event.PlaybackQueueEnded);
    //     },
    // );
    return (
        
      
             
        <Portal>
          
            {/* <StatusBar translucent backgroundColor='transparent' barStyle="dark-content"/> */}
            <Pressable
                onPress={enableBackdropDismiss ? onDismiss : undefined}
                style={styles.backDrop}
            />
            <Animated.View
                style={[
                    styles.root,
                    {
                        height: "100%",
                        bottom: bottom,
                        shadowOffset: {
                            height: -3,
                        },
                    },
                    styles.common,
                ]}
            >
                <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
                    <View
                        style={[
                            styles.header,
                            styles.common,
                            {
                                position: "relative",
                                shadowOffset: {
                                    height: 3,
                                },
                            },
                        ]}
                    >
                    
                        <Icon
                            name='angle-down'
                            type='font-awesome'
                            color='white'
                            size={35}
                            style={styles.closeIcon}
                            onPress={onDismiss}
                        />
                    </View>
                </PanGestureHandler>
                {children}
            </Animated.View>
            </Portal>
        
    );
};

const styles = StyleSheet.create({
    root: {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 99,
        backgroundColor: "#80bfff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: "hidden",
    },
    header: {
        height: 100,
        backgroundColor: "#80bfff",
    },
    common: {
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        // },
        // shadowOpacity: 0.24,
        // shadowRadius: 4,
        // elevation: 3,
    },
    closeIcon: {
        marginTop: 30,
        position: "absolute",
        left: 25,
        top:40,
        zIndex: 10,
   
    },
    backDrop: {
        
        ...StyleSheet.absoluteFillObject,
        zIndex: 80,
        backgroundColor: "rgba(0,0,0, 0.12)",
    },
});

export default BottomSheet;
