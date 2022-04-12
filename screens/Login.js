import {
    StyleSheet, Text, View, KeyboardAvoidingView,
    TextInput, StatusBar, ImageBackground, Dimensions, TouchableOpacity
} from 'react-native'
import { Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authen = auth;
 
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
        signInWithEmailAndPassword(authen, email, password)
            .then(() => {
                console.log("success");
            }).catch((error) => {
                alert(error)
            })
    }
    return (
        <KeyboardAvoidingView enabled style={styles.container}>
            <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />
            <View style={{ flex: 1 }}>
                <Video
                    source={require('../image/blackpinkcrop.mp4')}
                    style={styles.backgroundVideo}
                    muted={true}
                    repeat={true}
                    resizeMode={'cover'}
                    rate={1.0}
                    ignoreSilentSwitch={'obey'}
                />
                <TouchableOpacity style={{ alignItems: "flex-start", marginTop: 50 }}>
                    <Icon

                        name='angle-left'
                        type='font-awesome'
                        color='#ffffff'

                        size={30}
                        onPress={() => navigation.navigate('Welcome')}
                    />
                </TouchableOpacity>
                <View style={styles.container}>

                    <TextInput
                        style={styles.input}
                        placeholder="อีเมล"
                        type="text"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor="white"></TextInput>

                    <TextInput
                        style={styles.input}
                        placeholder="รหัสผ่าน"
                        type="password"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor="white"></TextInput>

                    <Button onPress={signIn} title="เข้าสู่ระบบ"
                        titleStyle={styles.titlestyle}
                        buttonStyle={{
                        backgroundColor: '#1ed660',
                        borderRadius: 25,
                        width: 350,
                        height: 50,
                        }}></Button>

                    <Button onPress={() => navigation.navigate('Register')} title="สร้างบัญชีใหม่"
                        type="clear"
                        titleStyle={styles.titlestyle}
                        buttonStyle={{
                            width: 320,
                            height: 50,
                        }}></Button>
                </View>
            </View>


            {/* <View style={{ height: 20 }} /> */}

        </KeyboardAvoidingView>
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:1
    },
    // inputContainer: {
    //     width: 300,
    // },
    input: {
        backgroundColor: '#a9a9a9',
        borderRadius: 10,
        width: 350,
        padding: 15,
        color: 'white',
        marginBottom: 10,
        fontSize: 20,
    },
    // button: {
    //     marginTop: 5,
    // },
    titlestyle: {
        fontSize: 20,
        color: 'white',
    },
    backgroundVideo: {
        width: "100%",
        height: '100%',
        // zIndex:0,
        position: 'absolute',
        // top: 0,
        // right: 0,
        // bottom: 0,
        left: -31,
    },
});