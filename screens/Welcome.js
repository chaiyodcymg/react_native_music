import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
    Image, StatusBar
} from 'react-native';
import React from 'react';
import {Button} from 'react-native-elements';

const Welcome = ({navigation}) => {
  return (
    <View>
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
            <Button
              onPress={() => navigation.navigate('Register')}
              title="ลงทะเบียนฟรี"
              titleStyle={styles.titlestyle}
              buttonStyle={{
                backgroundColor: '#1ed660',
                borderRadius: 25,
                width: 320,
                height: 50,
              }}
              containerStyle={styles.button}></Button>
            <Button
              onPress={() => navigation.navigate('Register')}
              title="ดำเนินการด้วยหมายเลขโทรศัพท์"
              titleStyle={styles.titlestyle}
              buttonStyle={{
                borderRadius: 25,
                width: 320,
                height: 50,
              }}
              containerStyle={styles.button}></Button>
            <Button
              onPress={() => navigation.navigate('Login')}
              title="เข้าสู่ระบบ"
              type="clear"
              titleStyle={styles.titlestyle}
              buttonStyle={{
                width: 320,
                height: 50,
              }}
              containerStyle={styles.button}></Button>
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
    fontSize: 40,
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
  },
  button: {
    marginTop: 10,
  },
  titlestyle: {
    fontSize: 20,
    color: 'white',
  },
});
