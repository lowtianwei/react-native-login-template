import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useAuth } from '../contexts/Auth'

const HomeScreen = ({navigation}:any) => {
  const { onLogout } = useAuth();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={() => onLogout!()} >Logout</Button>
    </View>
  )
}

export default HomeScreen