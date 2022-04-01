import {
    StyleSheet, Text, View, KeyboardAvoidingView,
    Button,TextInput

} from 'react-native'
import React, { useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyC6cyXh4HIM_ycqmratF1farIrbnCLQZUA",
    authDomain: "react-music-3270e.firebaseapp.com",
    databaseURL: "https://react-music-3270e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-music-3270e",
    storageBucket: "react-music-3270e.appspot.com",
    messagingSenderId: "469054163159",
    appId: "1:469054163159:web:d523f3cac566c9ea740892",
    measurementId: "G-BJ0L0MD115"
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