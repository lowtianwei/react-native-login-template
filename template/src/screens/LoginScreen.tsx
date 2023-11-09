import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useAuth } from '../contexts/Auth'
import Fingerprint from '../assets/svg/fingerprint-svgrepo-com.svg';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const LoginScreen = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authState, onLogin } = useAuth();

  const rnBiometrics = new ReactNativeBiometrics()

  const fingerprintverify = async () => rnBiometrics.simplePrompt({promptMessage: 'Use your fingerprint to verify your identity'})
    .then((resultObject) => {
      const { success } = resultObject
  
      if (success) {
        console.log('successful biometrics provided')
      } else {
        console.log('user cancelled biometric prompt')
      }
    })
    .catch(() => {
      console.log('biometrics failed')
    })

  const login = async () => {
    const result = await onLogin!(email, password);
  }
  
  return (
    <SafeAreaView>
      <TextInput
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
        autoCapitalize='none'
        autoComplete='off'
        keyboardType='email-address'
        style={styles.textinput}
        underlineColor='transparent'
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
        autoCapitalize='none'
        secureTextEntry={true}
        style={styles.textinput}
        underlineColor='transparent'
      />
      <View style={{flexDirection: 'row'}}>
        <Button
          onPress={() => login()}
          buttonColor='purple'
          textColor='white'
          style={[styles.LoginButton,{flex: 4}]}
        >
          Login
        </Button>
        <Button buttonColor='grey' style={[styles.LoginButton,{flex: 1}]} onPress={() => fingerprintverify()}><Fingerprint fill='white' width={40} height={40}/></Button>
      </View>
      <Text style={styles.textInfo}>Don’t have an account yet? <Text onPress={() => navigation.navigate("Register")}style={styles.registerText}>Register</Text></Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textinput: {
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    marginHorizontal: 20,
    textDecorationLine: 'none',
    overflow: 'hidden',
    
  },
  textInfo: {
    textAlign: 'center'
  },
  registerText: {
    color: 'red'
  },
  LoginButton: {
    marginHorizontal: 20,
    marginTop: 10,
  }
})

export default LoginScreen