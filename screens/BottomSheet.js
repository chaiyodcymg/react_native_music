import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    View, StatusBar, ScrollView, Text, TouchableOpacity, Image
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Portal } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

import TrackPlayer, {
    Capability, Event, RepeatMode,
    State, usePlaybackState, useProgress
    , useTrackPlayerEvents, getQueue
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';


const BottomSheet = ({ show, onDismiss, enableBackdropDismiss, color, children }) => {
    const bottomSheetHeight = Dimensions.get("window").height * 1.0;
    const deviceWidth = Dimensions.get("window").width;
    const [open, setOpen] = useState(show);
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;

   

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

                    }, { backgroundColor: color }

                ]}
            >
                <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
                    <View
                        style={[
                            {
                                height: 100,
                                backgroundColor: color,
                            },
                            styles.common,
                            {
                                position: "relative",
                                // shadowOffset: {
                                //     height: 3,
                                // },
                            },
                        ]}
                    >


                    </View>
                </PanGestureHandler>
                <Icon
                    name='angle-down'
                    type='font-awesome'
                    color='white'
                    size={35}
                    style={styles.closeIcon}
                    onPress={onDismiss}
                />
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

        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: "hidden",
    },


    closeIcon: {
        marginTop: 30,
        position: "absolute",
        left: 25,
        top: 40,
        zIndex: 10,

    },
    backDrop: {

        ...StyleSheet.absoluteFillObject,
        zIndex: 80,
        // backgroundColor: "rgba(0,0,0, 0.12)",
    },
});

export default BottomSheet;
