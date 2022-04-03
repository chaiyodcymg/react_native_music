import {
    StyleSheet, Text, View, KeyboardAvoidingView,
    Button,TextInput

} from 'react-native'
import React, { useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBqdFA00KuOF-3IZSB0V3KgRsW0t8NuY1E",
    authDomain: "react-music-b727c.firebaseapp.com",
    projectId: "react-music-b727c",
    storageBucket: "react-music-b727c.appspot.com",
    messagingSenderId: "76095914634",
    appId: "1:76095914634:web:937bb379fa5f6913fa2373",
    measurementId: "G-SV7GSPD4NT"
};
initializeApp(firebaseConfig);

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth();

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

        signInWithEmailAndPassword(auth, email, password)
          
    }
  return (
      <KeyboardAvoidingView enabled style={styles.container}>
        
         
          <View style={styles.inputContainer}>
              <TextInput
                  placeholder='อีเมล'
                  autoFocus
                  type="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                  placeholder='รหัสผ่าน'
                  secureTextEntry
                  type="password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
              />
          </View>

          <Button containerStyle={styles.button} onPress={signIn} title="เข้าสู่ระบบ" />

          <Button containerStyle={styles.button} onPress={() => navigation.navigate('Register')} type="outline" title="สร้างบัญชีใหม่" />
          <View style={{ height: 20 }} />
      </KeyboardAvoidingView>
  )
}
export default Login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,

    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,

    },
})