import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Setting from './Setting';
import EditProfile from './EditProfile';

const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();

const SettingStack = () => {
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
                    name='Setting'
                    component={Setting}
                />
                <Stack.Screen
                    name='EditProfile'
                    component={EditProfile}
                />
            </Stack.Navigator>
        </View>
    );
};

export default SettingStack

const styles = StyleSheet.create({});
