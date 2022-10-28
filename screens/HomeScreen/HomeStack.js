import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';

const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <View
            style={{
                width,
                height,
            }}>
            <Stack.Navigator
                // initialRouteName="Profile"
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name='Home'
                    component={Home}
                />
            </Stack.Navigator>
        </View>
    );
};

export default HomeStack

const styles = StyleSheet.create({});
