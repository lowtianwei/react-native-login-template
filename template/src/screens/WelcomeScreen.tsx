import { View, Text, SafeAreaView} from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';

const WelcomeScreen = ({navigation}:any) => {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 2}}>
        <LottieView source={require('../assets/lottie/login.json')} autoPlay loop style={{flex: 1}}/>
      </View>
      <View style={{flex:1}}>
        <Button onPress={(() => navigation.navigate("SignIn"))}>Sign In</Button>
        <Button onPress={(() => navigation.navigate("Register"))}>Register</Button>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen