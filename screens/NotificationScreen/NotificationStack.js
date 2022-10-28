import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notification from './Notification';

const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();

const NotificationStack = () => {
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
                    name='Notification'
                    component={Notification}
                />
            </Stack.Navigator>
        </View>
    );
};

export default NotificationStack

const styles = StyleSheet.create({});
