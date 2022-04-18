import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
    Image, StatusBar,TouchableOpacity
} from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import {Button} from 'react-native-elements';
import Video from 'react-native-video';
const Welcome = ({ navigation }) => {
  const [show, setshow] = useState(true);
  return (
    <View style={{ width: '100%', height: '100%',backgroundColor:"black" }}>
      <ImageBackground
        source={require('../image/welcome1.png')}
        resizeMode="cover"
              style={{ width: '100%', height: '100%' }}>
     
        <StatusBar translucent backgroundColor='transparent' barStyle="light-content" />
        <View style={styles.container}>
          {/* <Image source={require('../assets/logo2.png')} style={styles.logo} /> */}
      
          <Text style={styles.slogan}>
            <Text>หลายสิบเพลง</Text>
            <Text>ฟรีที่ Smerp</Text>
          </Text>

          <View style={styles.buttongroup}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{
                color: "black", paddingHorizontal: 10, paddingVertical: 15, backgroundColor: '#1ed660',
                borderRadius: 30, paddingLeft: 80, paddingRight: 80, fontSize: 19, fontWeight:"bold"
              }}>ลงทะเบียนฟรี</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{
                color: "white", paddingHorizontal: 10, paddingVertical: 20,
                borderRadius: 30, paddingLeft: 70, paddingRight: 70, fontSize: 20, fontWeight:"600"
              }}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
            {/* <Button
              type="clear"
              onPress={() => navigation.navigate('Register')}
              title="ลงทะเบียนฟรี"
              titleStyle={styles.titlestyle}
              buttonStyle={{
                backgroundColor: '#1ed660',
                borderRadius: 25,
                width: 280,
                height: 50,
              }}
              containerStyle={styles.button}></Button> */}
         
            {/* <Button
              onPress={() => navigation.navigate('Login')}
              title="เข้าสู่ระบบ"
              type="clear"
              titleStyle={styles.titlestyle}
              buttonStyle={{
                // width: '100%',
                // height: 50,
              }}
              containerStyle={styles.button}>
              
            </Button> */}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slogan: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '30%',
    fontFamily: '',
  },
  logo: {
    width: '20%',
    height: '20%',
  },
  buttongroup: {
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    // shadowOffset: { height: 0, width: 0 },
  },
  titlestyle: {
    fontSize: 18,
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
    left: 0,
    opacity: 5,
    backgroundColor: "black"
  },
});
