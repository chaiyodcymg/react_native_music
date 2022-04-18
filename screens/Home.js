import React, { Component, useEffect, useState } from 'react';
import {
    SafeAreaView, ScrollView, StatusBar, StyleSheet,
    Text, View, Button, TouchableOpacity, ImageBackground,
    FlatList, Image, Alert, Pressable
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

import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
const Home = ({ navigation }) => {


    const [show, setShow] = useState(false);
    const [dataartist, setDataartist] = useState(null);
    const [colorpage, setcolorpage] = useState('#004d1a');
    const authen = auth;
    const color = ['#4dc3ff', '#004d1a', '#ff0000', '#ff3399','#ff9900']
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
                        })
                }
            ]
        );

    }
    // const SignOut = () => {
    //     global.app.setState({logined:false});
    //     this.setState({});
    // }

    useEffect(() => {

        const db = getDatabase();
        const starCountRef = ref(db, 'listartist/');
        onValue(starCountRef, (snapshot) => {

            const data = snapshot.val();
            // console.log(data);
            setDataartist(data)

            // return this.showmsg = data;
        });
    
       
    }, [])
    useEffect(() => {
        setcolorpage(color[Math.floor(Math.random() * color.length)]);

    }, [colorpage])
    const renderItem = ({ item }) => {
        // console.log("------------------------------------------------------------------");  


        // console.log(item);
        return (


            <TouchableOpacity onPress={() => navigation.navigate('ListMusic', {
                nameartist: item.name,
                photo_uri: item.picture,
                color: item.color,
                nameshow: item.nameshow

            })}
                style={{ marginHorizontal: 10, marginVertical: 15 }}
            >
                <View style={{ alignItems: "center", }} >
                    <StatusBar barStyle="light-content" />
                    <Image source={{ uri: item.picture }} style={{ width: 150, height: 150, borderRadius: 30, }} />

                    <View style={{ alignItems: "center", marginTop: 10 }}>
                        <Text style={{ color: "#ffffff" }}>
                            {item.nameshow}

                        </Text>

                    </View>

                </View>
            </TouchableOpacity>

        );
    }
    const List_artist = ({ items }) => {
        // console.log(items);
        let list = [];
        let listname = ['นักร้องยอดนิยม', 'แนะนำสำหรับวันนี้']
        let count = 0;
        items.map((item,key) => {
            // console.log(item);
                list.push(
                    <View key={key}>
                    <FlatList
                   
                        horizontal
                        data={item}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        style={styles.flatlist}
                    />
                        <Text style={{
                            textAlign: "left", color: "#ffffff",
                            fontSize: 22, fontWeight: "800", fontFamily: 'Roboto', marginLeft: 25
                        }}>
                        {listname[count]}
                    </Text>
                </View>
            );

            count++;
        })
        // items.forEach(item => {
        //     // console.log(item)
        //     list.push(
        //         <View>
        //             <FlatList
        //                 horizontal
        //                 data={item}
        //                 renderItem={renderItem}
        //                 showsHorizontalScrollIndicator={false}
        //                 style={styles.flatlist}
        //             />
        //             <Text style={{ textAlign: "left", color: "#ffffff", fontSize: 22, fontWeight: "800", fontFamily: 'Roboto', marginLeft: 25 }}>
        //                 {listname[count]}
        //             </Text>
        //         </View>
        //     );

        //     count++;
        // });


        // for (const item in items) {
      
        //     list.push(
        //         <View>
        //             <FlatList
        //                 horizontal
        //                 data={items[item]}
        //                 renderItem={renderItem}
        //                 showsHorizontalScrollIndicator={false}
        //                 style={styles.flatlist}
        //             />
        //             <Text style={{ textAlign: "left", color: "#ffffff", fontSize: 22, fontWeight: "800", fontFamily: 'Roboto', marginLeft: 25 }}>
        //                 {listname[count]}
        //             </Text>
        //         </View>
        //     );




        //     count++;

        // }

        return (
            <View>
                {list}

            </View>
        )

    }
    
    return (

        // <ImageBackground source={require('../image/back-index.png')}
        //     style={{
        //         width: '100%',
        //         height: '100%',
        //         paddingBottom: 0,
        //         margin:0
        //         }}>
        <LinearGradient colors={[colorpage, '#001a09', '#000000']} style={styles.container}>
            {/* <View style={styles.container}> */}
            {dataartist == null &&
                <View style={[StyleSheet.absoluteFillObject, styles.container_spiner]}>


                </View>
            }
            {dataartist == null &&
                <LottieView style={styles.spiner} source={require('../image/loader_logo.json')} autoPlay loop />
            }
            <ScrollView>
                <View style={{ height: 50 }} />

                <StatusBar translucent backgroundColor='transparent' />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 15 }}>
                    <Text style={{
                        textAlign: "left", color: "#ffffff",
                        fontSize: 22, fontWeight: "800", fontFamily: 'Roboto',
                        marginLeft: 25
                    }}>
                        เพลงแนะนำ
                    </Text>
                    <TouchableOpacity style={{ marginRight: 25 }}>
                        <Icon

                            name='sign-out'
                            type='font-awesome'
                            color='#ffffff'

                            size={30}
                            onPress={SignOut}
                        />
                    </TouchableOpacity>


                </View>



                {dataartist != null &&
                    <View style={{ marginVertical: 10 }}>

                        <List_artist items={dataartist} />


                    </View>
                }


            </ScrollView>
            {/* </View>  */}


            {/* // </ImageBackground> */}
        </LinearGradient >
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // height: '100%',
        flex: 1,
        flexGrow: 2,
        // backgroundColor: "#000000"
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