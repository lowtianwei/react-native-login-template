import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Title, TextInput, HelperText } from 'react-native-paper';
import { useAuth } from '../contexts/Auth';
import AuthStack from './AuthStack';
import GuestStack from './GuestStack';

//Screen
import WelcomeScreen from '../screens/WelcomeScreen';

const ProfileScreen = ({navigation}:any) => {
    const [text, setText] = useState("");
  
    const hasErrors = () => {
      return !text.includes('@');
    };
  
    return (
      <View style={styles.container}>
        <Title>Welcome to the Profile Screen!</Title>
        <TextInput
          label="Email"
          autoCapitalize="none"
          value={text}
          onChangeText={text => setText(text)}
        />
        <HelperText type="error" visible={hasErrors()}>Email address is invalid</HelperText>
        <Button mode="contained" icon="home" color="blue" 
          onPress={()=>navigation.navigate("Home")}>
            Go to Home Screen
        </Button>
      </View>
    )
  }
  
  const HomeScreen = ({navigation}:any) => {
    return (
      <View style={styles.container}>
        <Title>Welcome to React Native Home Screen!</Title>
        <Button 
          icon="camera"
          mode="elevated"
          onPress={() => console.log('Pressed')}
        >
          Sign In
        </Button>
        <Button icon="camera" mode="elevated" onPress={() => console.log('Pressed')}>
          Sign Up
        </Button>
        <Button mode="contained" icon="account" color="blue" 
          onPress={()=>navigation.navigate("Profile")}>
            Go to Profile Screen
        </Button>
      </View>
    )
  }

const Stack = createStackNavigator();

const Router = () => {
  const { authState } = useAuth();
  return (
    <>
      <NavigationContainer>
      {authState?.authenticated ? <AuthStack /> : <GuestStack /> }
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
    }
  });

export default Router