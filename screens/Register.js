import {
    View, StyleSheet, TextInput, KeyboardAvoidingView, ImageBackground,
  Image, Alert, TouchableOpacity, Keyboard
  } from 'react-native';
  import React, {useLayoutEffect, useState} from 'react';
import { Button, Input, Text } from 'react-native-elements';
import { auth } from '../firebase';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import LottieView from 'lottie-react-native';
  const Register = ({navigation}) => {
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginPending, setLoginPending] = useState(false);
      const authen = auth;
    
    useLayoutEffect(() => {
 
    }, []);
  
    const create_account = () => {
      Keyboard.dismiss()

      setLoginPending(true)
        createUserWithEmailAndPassword(authen, email, password)
      .then((authUser) => {
        setLoginPending(false)
        Alert.alert("สมัครสมาชิกสำเร็จ")
      })
      .catch(error => {
        setLoginPending(false)
        Alert.alert(error.message)
      })
    };
    return (
      <View style={styles.container}>
        <View style={[StyleSheet.absoluteFillObject, styles.containerback]}>
        <Video

          source={require('../image/youngohm2.mp4')}
            style={[StyleSheet.absoluteFillObject, styles.containervideo]}
          muted={true}
          repeat={true}
          resizeMode='cover'
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
    
        </View>
        {/* <ImageBackground
          source={require('../image/register.png')}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}> */}
          
          {loginPending &&
            <View style={[StyleSheet.absoluteFillObject, styles.container_spiner]}>


            </View>



          }
          {loginPending && <LottieView style={styles.spiner} source={require('../image/loader_logo.json')} autoPlay loop />

          }
        <View>
                <TouchableOpacity style={{ alignItems: "flex-start", marginLeft: -20, marginTop: 50 }}>
                    <Icon

                        name='angle-left'
                        type='font-awesome'
                        color='#ffffff'

                        size={30}
                        onPress={() => navigation.navigate('Welcome')}
                    />
                </TouchableOpacity>
          <View style={styles.container}>
            <Image source={require('../image/music_icon.png')} style={{ width: 180, height: 180 }} />
                  
            <TextInput
              onSubmitEditing={create_account}
              style={styles.input}
              placeholder="อีเมล"
              type="text"
              value={email}
              onChangeText={(text)=>setEmail(text)}
              placeholderTextColor="white"></TextInput>
            <TextInput
              onSubmitEditing={create_account}
              style={[styles.input, styles.input2]}
              placeholder="รหัสผ่าน"
              type="password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
          
              placeholderTextColor="white">
              
              </TextInput>
            {/* <Button
              onPress={create_account}
              title="สร้างบัญชี"
              titleStyle={styles.titlestyle}
              buttonStyle={{
                backgroundColor: '#1ed660',
                borderRadius: 25,
                width: 350,
                height: 50,
              }}
              containerStyle={styles.button}></Button>
            <Button
              onPress={() => navigation.navigate('Login')}
              title="มีบัญชีแล้ว"
              type="clear"
              titleStyle={styles.titlestyle}
              buttonStyle={{
                width: 150,
                // marginRight: 250,
                marginTop: 10,
              }}></Button> */}

              <TouchableOpacity onPress={create_account}>
                  <Text style={{
                      color: "black", paddingHorizontal: 10, paddingVertical: 13, backgroundColor: '#1ed660',
                      borderRadius: 30, paddingLeft: 108, paddingRight: 108, fontSize: 19, fontWeight:"blod"
                  }}>สร้างบัญชี</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={{
                  color: "white", paddingHorizontal: 10, paddingVertical: 10,
                  borderRadius: 30, paddingLeft: 70, paddingRight: 70, fontSize: 19, fontWeight:"blod"
                  }}>มีบัญชีแล้ว</Text>
              </TouchableOpacity>
          </View>
        </View>
        {/* </ImageBackground> */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
    },
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
    button: {
      marginTop: 10,
    },
    titlestyle: {
      fontSize: 19,
      color: 'white',
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
    containervideo: {
      // zIndex: 1,
   backgroundColor:"black"
    },
    containerback: {
      opacity: 0.6,
      backgroundColor:""
      // zIndex: 2,
      // opacity: 0.6,
    }
  });
  
  export default Register;
  