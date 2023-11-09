import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../contexts/Auth'
import { Button, TextInput } from 'react-native-paper';


const RegisterScreen = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, onRegister } = useAuth(); 

  const register = async () => {
    const result = await onRegister!(email, password);
  }
  return (
    <SafeAreaView>
      <TextInput
        label="Username"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        label="Email"
        value={email}
        keyboardType='email-address'
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
      />
      <Button onPress={() => register()}>Register</Button>
      <Text style={{textAlign:'center'}}>Already have an account ? <Text style={{color:'red'}} onPress={()=> navigation.navigate("SignIn")}>Login here</Text></Text>
    </SafeAreaView>
  )
}

export default RegisterScreen