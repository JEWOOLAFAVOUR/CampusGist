import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from './Account';
import Setting from './Setting';
import EditProfile from './EditProfile';
import ContactUs from './ContactUs';
import Saved from './Saved';
import AboutUs from './AboutUs';
import Notification from './Notification';
import ChangeBio from './ChangeBio';
import Test from './Test';

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
                initialRouteName="Account"
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name='Account'
                    component={Account}
                />
                <Stack.Screen
                    name='Setting'
                    component={Setting}
                />
                <Stack.Screen
                    name='EditProfile'
                    component={EditProfile}
                />
                <Stack.Screen
                    name='ContactUs'
                    component={ContactUs}
                />
                <Stack.Screen
                    name='Saved'
                    component={Saved}
                />
                <Stack.Screen
                    name='AboutUs'
                    component={AboutUs}
                />
                <Stack.Screen
                    name='SNotification'
                    component={Notification}
                />
                <Stack.Screen
                    name='ChangeBio'
                    component={ChangeBio}
                />
                <Stack.Screen
                    name='Test'
                    component={Test}
                />
            </Stack.Navigator>
        </View>
    );
};

export default SettingStack

const styles = StyleSheet.create({});
