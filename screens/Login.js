import {
    StyleSheet, Text, View, KeyboardAvoidingView,
    TextInput, StatusBar, ImageBackground, TouchableOpacity,
    Image, Keyboard, Dimensions
} from 'react-native'
import { Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';

import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authen = auth;

    const [loginPending, setLoginPending] = useState(false);

    // useEffect(() => {
    //     // const auth = getAuth();
    //     onAuthStateChanged(auth, (authUser) => {
    //         // console.log(authUser);
    //         if (authUser) {
    //             navigation.replace('Home');
    //         }
    //     });
    // }, []);

    const signIn = () => {
        Keyboard.dismiss()
        setLoginPending(true)
        signInWithEmailAndPassword(authen, email, password)
            .then(() => {
                setLoginPending(false)

            }).catch((error) => {
                setLoginPending(false)
                alert(error)
            })
    }
    return (

        <View style={styles.container}>
            <Video

                source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-music-b52e8.appspot.com/o/background-video%2Fyoungohm2.mp4?alt=media&token=a8a4cdb1-73bf-4ed1-afa9-4ca1ab8945e7"}}
                style={[StyleSheet.absoluteFillObject, styles.backgroundVideo]}
                muted={true}
                repeat={true}
                resizeMode='cover'
                rate={1.0}
                ignoreSilentSwitch={'obey'}
            />
            {loginPending &&
                <View style={[StyleSheet.absoluteFillObject, styles.container_spiner]}>


                </View>

            }
            {loginPending && <LottieView style={styles.spiner}
                source={require('../image/loader_logo.json')} autoPlay loop />

            }
            <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
            <KeyboardAvoidingView>
               
                <TouchableOpacity >
                    <Icon

                        name='angle-left'
                        type='font-awesome'
                        color='#ffffff'
                        style={{ marginLeft:0, marginTop: 60 }}
                        size={30}
                        onPress={() => navigation.navigate('Welcome')}
                    />
                </TouchableOpacity>
                <View style={styles.container}>
                    <Image source={require('../image/music_icon.png')} style={{ width: 180, height: 180 }} />
                    <TextInput
                        onSubmitEditing={signIn}
                        style={styles.input}
                        placeholder="อีเมล"
                        type="text"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor="white"></TextInput>

                    <TextInput
                        onSubmitEditing={signIn}
                        style={[styles.input, styles.input2]}
                        placeholder="รหัสผ่าน"
                        type="password"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor="white"></TextInput>

                    <TouchableOpacity onPress={signIn}>
                        <Text style={{
                            color: "black", paddingHorizontal: 10, paddingVertical: 13, backgroundColor: '#1ed660',
                            borderRadius: 30, paddingLeft: 108, paddingRight: 108, fontSize: 19, fontWeight: "blod"
                        }}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{
                            color: "white", paddingHorizontal: 10, paddingVertical: 13,
                            borderRadius: 30, paddingLeft: 70, paddingRight: 70, fontSize: 19, fontWeight: "blod"
                        }}>สร้างบัญชีใหม่</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>


        </View>
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        // width: "100%",
        // height:"100%"
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',

    },
    // inputContainer: {
    //     width: 300,
    // },
    input: {
        backgroundColor: '#a9a9a9',
        borderRadius: 10,
        height: 55,
        width: 300,
        padding: 15,
        color: 'white',
        marginBottom: 15,
        fontSize: 17,
      },
    input2:{
        marginBottom: 40,
    },
    titlestyle: {
        fontSize: 19,
        color: 'white',
    },
    backgroundVideo: {
        // width: windowWidth,
        // height: "100%",
        // // zIndex:0,
        // position: 'absolute',
        // // top: 0,
        // // // right: 0,
        // // bottom: 0,
        // left: -56,
        // // opacity: 0.3,
        // // zIndex: -100,
        backgroundColor: "black",
      


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

    }
});