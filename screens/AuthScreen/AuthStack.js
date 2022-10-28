import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// SCREENS
import SplashScreen from './SplashScreen';
import Login from './Login';
import Register from './Register';
import Onboarding from './Onboarding';
import BottomTab from '../../navigator/BottomTab';

const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Bottom' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Splash' component={SplashScreen} />
            <Stack.Screen name='Bottom' component={BottomTab} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Onboarding' component={Onboarding} />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})