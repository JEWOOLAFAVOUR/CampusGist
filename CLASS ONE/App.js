import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './DAVIDCLASS/Login'
import Home from './DAVIDCLASS/Home'
import Class1 from './DAVIDCLASS/Class1'

const App = () => {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Home'
          component={Home}
        />

        <Stack.Screen
          name='Class1'
          component={Class1}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})