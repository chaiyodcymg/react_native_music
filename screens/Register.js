import {
    View, StyleSheet, TextInput, KeyboardAvoidingView, ImageBackground,
    Image, Alert, TouchableOpacity
  } from 'react-native';
  import React, {useLayoutEffect, useState} from 'react';
import { Button, Input, Text } from 'react-native-elements';
import { auth } from '../firebase';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';


  const Register = ({navigation}) => {
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
      const authen = auth;
    
    useLayoutEffect(() => {
 
    }, []);
  
    const create_account = () => {
        createUserWithEmailAndPassword(authen, email, password)
      .then((authUser) => {
        console.log('Account created!')
        const user = authUser.user;
        console.log(user)
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
    };
    return (
        <KeyboardAvoidingView>
           
        <ImageBackground
          source={require('../image/register.png')}
          resizeMode="cover"
                style={{ width: '100%', height: '100%' }}>
                <TouchableOpacity style={{ alignItems: "flex-start", marginLeft: 20, marginTop: 50 }}>
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
              placeholder="Email"
              type="text"
              value={email}
              onChangeText={(text)=>setEmail(text)}
              placeholderTextColor="white"></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Password"
              type="password"
              secureTextEntry
              value={password}
              onChangeText={(text)=>setPassword(text)}
              placeholderTextColor="white"></TextInput>
            <Button
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
              }}></Button>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: '#a9a9a9',
      borderRadius: 10,
      width: 350,
      padding: 15,
      color: 'white',
      marginBottom: 10,
      fontSize: 20,
    },
    button: {
      // marginTop: 10,
    },
    titlestyle: {
      fontSize: 20,
      color: 'white',
    },
  });
  
  export default Register;
  