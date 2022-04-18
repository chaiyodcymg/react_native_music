import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import LottieView from 'lottie-react-native';

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, style.spiner]}>
      <LottieView source={require('../assets/loader.json')} autoPlay loop />
    </View>
  )
}
const style = StyleSheet.create({
  spiner:{
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0,3)',
        zIndex: 1
    }
})
export default AppLoader;